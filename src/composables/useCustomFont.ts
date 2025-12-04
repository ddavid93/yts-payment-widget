import { useTimeoutFn } from "@vueuse/core";
import type { ICustomFont } from "@/types/form.type.ts";

export function useCustomFont() {
  /**
   * Validate if a URL is a valid font URL
   * @param url - The URL to validate
   * @returns true if the URL appears to be a valid font URL
   */
  function isValidFontUrl(url: string): boolean {
    if (!url) return false;

    try {
      const urlObj = new URL(url);

      // Check if it's a valid HTTP/HTTPS URL
      if (!["http:", "https:"].includes(urlObj.protocol)) {
        return false;
      }

      // Check for common font URL patterns
      const validFontDomains = [
        "fonts.googleapis.com",
        "fonts.gstatic.com",
        "cdn.yanovis.com",
        "use.typekit.net",
        "fonts.adobe.com",
      ] as const;

      const isValidDomain = validFontDomains.some(
        (d) => urlObj.hostname === d || urlObj.hostname.endsWith("." + d),
      );

      // Check for font file extensions or CSS endpoints
      const validFontPatterns = [
        /\.css$/i,
        /\.woff2?$/i,
        /\.ttf$/i,
        /\.otf$/i,
        /\.eot$/i,
        /family=/i, // Google Fonts parameter
        /css2\?/i, // Google Fonts CSS2 API
      ] as const;

      const hasValidPattern = validFontPatterns.some((p) => p.test(url));

      return isValidDomain || hasValidPattern;
    } catch (error) {
      console.warn("Invalid font URL:", url, error);
      return false;
    }
  }

  /**
   * Load a custom font from a URL by injecting a link tag
   * @param customFont - The custom font object with url and family
   * @returns Promise that resolves when font is loaded (or rejects on error)
   */
  function loadCustomFont(customFont: ICustomFont): Promise<void> {
    if (!customFont?.url || !customFont?.family) {
      throw new Error("Custom font must have both url and family properties");
    }

    if (!isValidFontUrl(customFont.url)) {
      throw new Error(`Invalid font URL: ${customFont.url}`);
    }

    return new Promise((resolve, reject) => {
      // Check if the font is already loaded
      const existingLink = document.querySelector(
        `link[href="${customFont.url}"]`,
      );
      if (existingLink) {
        resolve();
        return;
      }

      // Create link element for font loading
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = customFont.url;
      link.type = "text/css";

      // Use VueUse useTimeoutFn for robust timeout handling
      const { start: startTimeout, stop: stopTimeout } = useTimeoutFn(() => {
        const error = new Error(`Font loading timeout for: ${customFont.url}`);
        console.error("Custom font loading timeout:", error);
        reject(error);
      }, 10000); // 10-second timeout

      // Add loading event handlers
      const handleSuccess = () => {
        stopTimeout();
        resolve();
      };

      const handleError = () => {
        stopTimeout();
        const error = new Error(
          `Failed to load custom font from: ${customFont.url}`,
        );
        console.error("Custom font loading failed:", error);
        reject(error);
      };

      link.onload = handleSuccess;
      link.onerror = handleError;

      // Start the timeout and inject the link tag
      startTimeout();
      document.head.appendChild(link);
    });
  }

  return {
    loadCustomFont,
  };
}
