import { styleProperties } from "@/constants/conf.ts";
import { useTextColorFromBackground } from "@/composables/useTextColorFromBackground";
import { useCustomFont } from "@/composables/useCustomFont";
import {
  extractAndInjectFontImports,
  setStyleProperty,
} from "@/lib/styleHelper.ts";
import type { StyleDataType } from "@/types/form.type.ts";
import type { ShallowRef } from "vue";

/**
 * Composable to trigger first in the app to initialize settings
 */
export function useHookStyles(
  widgetRefForStyle: Readonly<ShallowRef<HTMLDivElement | null | undefined>>,
) {
  const DEFAULT_FONT = `Roboto, 'Open Sans', sans-serif`;

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
  async function applyStyles(styleData: StyleDataType) {
    if (!widgetRefForStyle.value) return;

    // Load custom font if provided in general.font_url
    if (styleData.general?.font_url && styleData.general?.font_family) {
      try {
        await loadCustomFont({
          url: styleData.general.font_url,
          family: styleData.general.font_family,
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
        secondaryBorderRadius,
      }) => {
        const styleConfig = enhancedStyleData?.[key] || {};

        // Extract values from the style configuration
        const backgroundColor = styleConfig.background_color;
        const fontColor = styleConfig.font_color;

        setStyleProperty(
          textColor,
          fontColor || generalFontColor,
          widgetRefForStyle.value,
        );

        setStyleProperty(bgColor, backgroundColor, widgetRefForStyle.value);

        setStyleProperty(
          iconColor,
          styleConfig.icon_color || styleConfig.background_color,
          widgetRefForStyle.value,
        );

        setStyleProperty(
          fontFamily,
          styleConfig.font_family || generalFontFamily || DEFAULT_FONT,
          widgetRefForStyle.value,
        );

        setStyleProperty(
          borderRadius,
          styleConfig.border_radius,
          widgetRefForStyle.value,
        );

        setStyleProperty(
          secondaryBorderRadius,
          styleConfig.secondary_border_radius,
          widgetRefForStyle.value,
        );
      },
    );

    // Inject context-aware CSS overrides for light background containers
    // This fixes visibility issues when the general background is dark but dialogs/modals have light backgrounds
    const contextOverrideCSS = generateLightContainerOverrides(
      enhancedStyleData?.general?.background_color,
    );
    if (contextOverrideCSS) {
      injectCustomCSS(contextOverrideCSS);
    }
  }

  /**
   * Injects CSS into the widget DOM.
   * Also handles any @import font statements by converting them to <link> tags.
   *
   * @param css CSS string to inject
   */
  function injectCustomCSS(css: string) {
    if (css && widgetRefForStyle.value) {
      const cleanedCSS = extractAndInjectFontImports(css);
      const styleElement = document.createElement("style");
      styleElement.innerHTML = cleanedCSS;
      widgetRefForStyle.value.appendChild(styleElement);
    }
  }

  // applyStyles(val.style)
  //  injectCustomCSS(val.style_css)
  return { applyStyles, injectCustomCSS };
}
