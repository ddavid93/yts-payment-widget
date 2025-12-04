export const styleProperties = [
  // CTA configurations
  {
    key: "cta",
    textColor: "--cta-text",
    bgColor: "--cta",
    borderRadius: "--cta-border-radius"
  },

  // Secondary CTA configurations
  {
    key: "secondaryCta",
    textColor: "--secondary-cta-text",
    bgColor: "--secondary-cta"
  },

  // Title configurations
  {
    key: "title",
    textColor: "--title",
    fontFamily: "--font-title"
  },

  // General configurations
  {
    key: "general",
    bgColor: "--background",
    textColor: "--general-text",
    fontFamily: "--font-general",
    secondaryBgColor: "--secondary-background-color",
    secondaryBorderRadius: "--secondary-cta-border-radius"
  },

  // Step configurations
  {
    key: "step",
    bgColor: "--step",
    textColor: "--step-text",
    iconColor: "--step-icon",
    fontFamily: "--font-step"
  },

] as const;