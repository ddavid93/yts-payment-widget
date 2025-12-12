/**
 * Utility function to convert hex color to RGB values
 * @param hex - Hex color string (e.g., "#ffffff" or "ffffff")
 * @returns RGB object with r, g, b values (0-255) or null if invalid
 */
export function hexToRgb(
  hex: string | null | undefined,
): { r: number; g: number; b: number } | null {
  if (typeof hex !== "string") return null;
  // Remove # if present and handle 3-digit hex
  const cleanHex = hex.replace("#", "");

  if (cleanHex.length === 3) {
    // Convert 3-digit hex to 6-digit
    const expandedHex = cleanHex
      .split("")
      .map((char) => char + char)
      .join("");
    return hexToRgb(expandedHex);
  }

  if (cleanHex.length !== 6) {
    return null;
  }

  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(cleanHex);
  if (!result || !result[1] || !result[2] || !result[3]) {
    return null;
  }
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
}

/**
 * Calculate the relative luminance of a color using the WCAG formula
 * @param r - Red component (0-255)
 * @param g - Green component (0-255)
 * @param b - Blue component (0-255)
 * @returns Luminance value (0-1)
 */
export function calculateLuminance(r: number, g: number, b: number): number {
  // Convert RGB to sRGB
  const rsRGB = r / 255;
  const gsRGB = g / 255;
  const bsRGB = b / 255;

  // Apply gamma correction
  const rLinear =
    rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
  const gLinear =
    gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
  const bLinear =
    bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);

  // Calculate luminance using WCAG formula
  return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
}

/**
 * Determines if a background color is considered dark
 * @param backgroundColor - Background color in hex format
 * @returns True if the color is dark, false if light, null if invalid color
 */
export function isBackgroundDark(backgroundColor: string): boolean | null {
  if (!backgroundColor || backgroundColor === "transparent") {
    return null;
  }

  // Handle hex colors with an alpha channel (e.g., #000000FF)
  let cleanColor = backgroundColor;
  if (backgroundColor.length === 9 && backgroundColor.startsWith("#")) {
    // Remove alpha channel for luminance calculation
    cleanColor = backgroundColor.substring(0, 7);
  }

  const rgb = hexToRgb(cleanColor);
  if (!rgb) {
    return null;
  }

  const luminance = calculateLuminance(rgb.r, rgb.g, rgb.b);

  // Threshold of 0.5 for determining dark vs. light
  // Colors with luminance < 0.5 is considered dark
  return luminance < 0.5;
}

export function setStyleProperty(
  property: string | undefined,
  value: string | undefined,
  element: HTMLDivElement | null | undefined,
) {
  if (property && value && element) {
    element.style.setProperty(property, value);
  }
}

/**
 * Extracts all @import font URLs from a CSS string,
 * injects them into the <head> via <link> elements,
 * and returns the remaining CSS without the import statements.
 *
 * @param cssString Raw CSS string from API
 * @returns CSS string with @import lines removed
 */
export function extractAndInjectFontImports(cssString: string): string {
  const importRegex = /@import\s+url\(["']?(.*?)["']?\);?/g;
  let match: RegExpExecArray | null;
  const urls: string[] = [];

  while ((match = importRegex.exec(cssString)) !== null) {
    if (match[1]) {
      urls.push(match[1]);
    }
  }

  urls.forEach((url) => {
    if (!document.querySelector(`link[href="${url}"]`)) {
      const link = document.createElement("link");
      link.href = url;
      link.rel = "stylesheet";
      link.type = "text/css";
      document.head.appendChild(link);
    }
  });

  return cssString.replace(importRegex, "").trim();
}

export function isDark(
  hex: string | null | undefined,
  threshold: number = 100, // You can adjust this for sensitivity
): boolean {
  const rgb = hexToRgb(hex);
  if (!rgb) return false;

  const { r, g, b } = rgb;
  const brightness = 0.299 * r + 0.587 * g + 0.114 * b;

  return brightness < threshold;
}
