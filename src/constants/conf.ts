export const styleProperties = [
  // General app defaults
  {
    key: "general",
    bgColor: "--style-general-bg-color",
    textColor: "--style-general-font-color",
    fontFamily: "--style-general-font",
  },

  // Button styles (applies to all buttons, e.g., shadcn Button)
  {
    key: "button",
    bgColor: "--style-button-bg-color",
    textColor: "--style-button-font-color",
    iconColor: "--style-button-icon-color",
    fontFamily: "--style-button-font",
    borderRadius: "--style-button-border-radius",
    secondaryBorderRadius: "--style-button-secondary-border-radius",
  },

  // Steps (stepper + accordion)
  {
    key: "steps",
    bgColor: "--style-steps-bg-color",
    textColor: "--style-steps-font-color",
    iconColor: "--style-steps-icon-color",
    fontFamily: "--style-steps-font",
  },

  // Titles (page/section headers)
  {
    key: "titles",
    textColor: "--style-titles-font-color",
    fontFamily: "--style-titles-font",
  },
] as const;