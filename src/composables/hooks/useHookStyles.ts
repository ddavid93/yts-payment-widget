import { useFetchConfigQuery } from "@/stores/settings/useFetchConfigQuery.store";
import { styleProperties } from "@/core/conf";
import { useBookingStore } from "@/stores/useBooking.store";
import { watch } from "vue";
import type { StyleDataType } from "@/extras/typing";
import { useTextColorFromBackground } from "@/composables/useTextColorFromBackground";
import { useCustomFont } from "@/composables/useCustomFont";
import { extractAndInjectFontImports, setStyleProperty } from "@/utils/styleHelper";

/**
 * Composable to trigger first in the app to initialize settings
 */
export function useHookStyles() {
  const DEFAULT_FONT = `Roboto, 'Open Sans', sans-serif`;
  const { widgetRefForStyle } = useBookingStore();
  const { data } = useFetchConfigQuery();

  const { enhanceStylesWithAutoTextColor, generateLightContainerOverrides } =
    useTextColorFromBackground();

  const { loadCustomFont } = useCustomFont();

  /**
   * Applies style settings from the API to the widget.
   * This includes:
   * - Loading custom fonts
   * - Setting CSS variables for colors and fonts
   * - Injecting context-aware CSS
   *
   * @param styleData The full style object returned by the API
   */
  async function _applyStyles(styleData: StyleDataType) {
    if (!widgetRefForStyle.value) return;

    // Load custom font if provided in general.font_url
    if (styleData.general?.font_url && styleData.general?.font_family) {
      try {
        await loadCustomFont({
          url: styleData.general.font_url,
          family: styleData.general.font_family
        });
      } catch (e) {
        // Don't throw here - we want the app to continue working with default fonts
        console.log(e);
      }
    }

    // Enhance style data with automatic text colors based on background brightness,
    // unless a global general.font_color is provided; in that case, it should override all.
    const hasGeneralFontColor = Boolean(styleData?.general?.font_color);
    const enhancedStyleData = hasGeneralFontColor
      ? styleData
      : enhanceStylesWithAutoTextColor(styleData);
    const generalFontFamily = enhancedStyleData?.general?.font_family;
    const generalFontColor = enhancedStyleData?.general?.font_color;

    // Apply all style properties from the configuration array
    // This handles colors, fonts, border radius, and other CSS custom properties
    styleProperties.forEach(
      ({
        key,
        textColor,
        bgColor,
        iconColor,
        fontFamily,
        borderRadius,
        secondaryBorderRadius
      }) => {
        const styleConfig = enhancedStyleData?.[key] || {};

        // Extract values from the style configuration
        const backgroundColor = styleConfig.background_color;
        const fontColor = styleConfig.font_color;

        /**
         * Check if we can remove this logic, instead inherit from CTA
         * the user should be able to set the background in the widget conf
         */
        // if (key === "step") {
        //   // If step doesn't have its own background, inherit from CTA
        //   if (!backgroundColor) {
        //     backgroundColor = enhancedStyleData?.cta.background_color;
        //   }
        //   // If step doesn't have its own font color, inherit from CTA
        //   if (!fontColor) {
        //     fontColor = enhancedStyleData?.cta.font_color;
        //   }
        // }

        setStyleProperty(
          textColor,
          fontColor || generalFontColor,
          widgetRefForStyle.value
        );

        setStyleProperty(bgColor, backgroundColor, widgetRefForStyle.value);

        setStyleProperty(
          iconColor,
          styleConfig.icon_color || styleConfig.background_color,
          widgetRefForStyle.value
        );

        setStyleProperty(
          fontFamily,
          styleConfig.font_family || generalFontFamily || DEFAULT_FONT,
          widgetRefForStyle.value
        );

        setStyleProperty(
          borderRadius,
          styleConfig.border_radius,
          widgetRefForStyle.value
        );

        setStyleProperty(
          secondaryBorderRadius,
          styleConfig.secondary_border_radius,
          widgetRefForStyle.value
        );
      }
    );

    // Inject context-aware CSS overrides for light background containers
    // This fixes visibility issues when the general background is dark but dialogs/modals have light backgrounds
    const contextOverrideCSS = generateLightContainerOverrides(
      enhancedStyleData?.general?.background_color
    );
    if (contextOverrideCSS) {
      _injectCustomCSS(contextOverrideCSS);
    }
  }

  /**
   * Injects CSS into the widget DOM.
   * Also handles any @import font statements by converting them to <link> tags.
   *
   * @param css CSS string to inject
   */
  function _injectCustomCSS(css: string) {
    if (css && widgetRefForStyle.value) {
      const cleanedCSS = extractAndInjectFontImports(css);
      const styleElement = document.createElement("style");
      styleElement.innerHTML = cleanedCSS;
      widgetRefForStyle.value.appendChild(styleElement);
    }
  }

  watch(
    data,
    (val) => {
      if (!val) return;
      _applyStyles(val.style);
      _injectCustomCSS(val.style_css);
    },
    { immediate: true }
  );
}
