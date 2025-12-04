import type { StyleDataType, StylePropertiesType } from "@/types/form.type.ts";
import { isBackgroundDark } from "@/lib/styleHelper.ts";

/**
 * Default CSS background colors from main.css
 * These are the actual background colors that will be rendered when
 * the API doesn't provide component-specific background colors.
 *
 * This mapping is crucial for correct text color calculation because
 * when API doesn't provide a background color, the component will use
 * these defaults instead of falling back to general.background_color.
 */
const DEFAULT_CSS_BACKGROUNDS: Partial<Record<StylePropertiesType, string>> = {
  cta: "#326bd5", // Dark blue
  secondaryCta: "#f4f7fd", // Light blue/gray
  step: "#326bd5", // Dark blue
  // Note: general background is transparent by default, so no entry needed
};

/**
 * Composable to determine optimal text color based on background brightness
 * This function enhances style configurations by automatically setting text colors
 * when they are not explicitly provided, ensuring good contrast and readability.
 *
 * Keys with DEFAULT text color configurations in Tailwind are excluded from
 * automatic text color assignment to maintain clean separation of concerns.
 *
 * CONTEXT-AWARE ENHANCEMENT:
 * This composable now includes context-aware functionality to handle cases where
 * global text colors (set based on general.background_color) become invisible
 * on light background containers like dialogs, modals, or buttons with custom backgrounds.
 */
export function useTextColorFromBackground() {
  /**
   * Helper function to determine the background color to use for automatic color assignment
   * @param styleConfig - Style configuration for a specific key
   * @param styleKey - The style key being processed
   * @param generalBackgroundColor - General background color as fallback
   * @returns Background color to use (priority: own background > default CSS > general background)
   */
  function _determineBackgroundColorToUse(
    styleConfig: { background_color?: string },
    styleKey: StylePropertiesType,
    generalBackgroundColor?: string,
  ): { bg: string | undefined; isDefault: boolean } {
    // Priority 1: Use the key's own background_color if available from API
    if (styleConfig.background_color) {
      return { bg: styleConfig.background_color, isDefault: false };
    }

    // Priority 2: Use default CSS background if available for this component
    // This is crucial to prevent incorrect text colors when API doesn't provide
    // component-specific backgrounds but CSS has default values
    const defaultCssBackground = DEFAULT_CSS_BACKGROUNDS[styleKey];
    if (defaultCssBackground) {
      return { bg: defaultCssBackground, isDefault: true };
    }

    // Priority 3: Use general.background_color as final fallback if available
    else if (generalBackgroundColor) {
      return { bg: generalBackgroundColor, isDefault: false };
    }

    return { bg: undefined, isDefault: false };
  }

  /**
   * Helper function to apply automatic color assignment for a specific color property
   * @param enhancedStyleData - The enhanced style data object to modify
   * @param styleKey - The style key being processed
   * @param colorProperty - The color property to set ('font_color' or 'icon_color')
   * @param backgroundColorToUse - The background color to base the automatic color on
   */
  function _applyAutomaticColor(
    enhancedStyleData: Record<StylePropertiesType, any>,
    styleKey: StylePropertiesType,
    colorProperty: "font_color" | "icon_color",
    backgroundColorToUse: string,
  ): void {
    const automaticColor = isBackgroundDark(backgroundColorToUse)
      ? "#ffffff" // White for dark backgrounds
      : "#000000"; // Black for light backgrounds

    // Create a new object to avoid mutating the original (preserve any previous changes)
    enhancedStyleData[styleKey] = {
      ...enhancedStyleData[styleKey],
      [colorProperty]: automaticColor,
    };
  }

  /**
   * Enhance style data by adding automatic text colors based on background brightness
   * @param styleData - Original style configuration from API
   * @returns Enhanced style configuration with automatic text colors where needed
   */
  function enhanceStylesWithAutoTextColor(
    styleData: StyleDataType,
  ): StyleDataType {
    const enhancedStyleData = { ...styleData };

    // Get the general background color for fallback logic
    const generalBackgroundColor = enhancedStyleData.general?.background_color;

    // Iterate through each style configuration
    Object.keys(enhancedStyleData).forEach((key) => {
      const styleKey = key as StylePropertiesType;
      const styleConfig = enhancedStyleData[styleKey];

      if (styleConfig) {
        // Determine the background color to use for automatic color assignment
        const { bg, isDefault } = _determineBackgroundColorToUse(
          styleConfig,
          styleKey,
          generalBackgroundColor,
        );

        if (bg && !isDefault) {
          // Apply automatic font color if not explicitly provided
          if (!styleConfig.font_color) {
            _applyAutomaticColor(enhancedStyleData, styleKey, "font_color", bg);
          }

          // Apply automatic icon color if not explicitly provided
          if (!styleConfig.icon_color) {
            _applyAutomaticColor(enhancedStyleData, styleKey, "icon_color", bg);
          }
        }
      }
    });

    return enhancedStyleData;
  }

  /**
   * Generate CSS overrides for light background containers
   * This addresses the issue where global dark-background text colors become invisible
   * on light background containers like dialogs, modals, etc.
   * @param generalBackgroundColor - The general background color from API
   * @returns CSS string with context-specific overrides
   */
  function generateLightContainerOverrides(
    generalBackgroundColor?: string,
  ): string {
    if (!generalBackgroundColor || !isBackgroundDark(generalBackgroundColor)) {
      return ""; // No overrides needed if general background is not dark
    }

    // CSS overrides for light background containers
    return `
/* Context-aware text color overrides for light background containers */
[data-radix-dialog-content],
.bg-white,
.bg-gray-50,
.bg-gray-100,
.dialog-content,
.modal-content,
.light-container {
  --title: #000000 !important;
  --general-text: #606060 !important;
}

/* Specific overrides for dialog components */
[data-radix-dialog-content] .text-c-title,
.bg-white .text-c-title,
.dialog-content .text-c-title {
  color: #000000 !important;
}

/* Override for elements with explicit white backgrounds */
[style*="background-color: white"] .text-c-title,
[style*="background-color: #ffffff"] .text-c-title,
[style*="background-color: #fff"] .text-c-title {
  color: #000000 !important;
}
`;
  }

  return {
    enhanceStylesWithAutoTextColor,
    generateLightContainerOverrides,
  };
}
