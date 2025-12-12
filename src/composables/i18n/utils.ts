/**
 * @fileoverview Utility functions for the i18n system.
 *
 * This module provides helper functions used internally by the i18n system
 * for tasks such as resolving nested translation keys and string manipulation.
 *
 * @module i18n/utils
 * @author Yanovis Team
 * @since 1.0.0
 */

import type { TranslationObjectType } from "./types";

/**
 * Retrieves a nested value from a translation object using dot notation.
 *
 * This function traverses a nested object structure using a dot-separated
 * path string and returns the corresponding value. If the path doesn't
 * exist, it returns the original key as a fallback.
 *
 * @param obj - The translation object to search in
 * @param path - The dot-notation path to the desired value (e.g., "form.email.label")
 * @returns The translation string if found, otherwise the original path
 *
 * @example
 * ```typescript
 * const translations = {
 *   form: {
 *     email: {
 *       label: "Email address"
 *     }
 *   }
 * };
 *
 * getNestedValue(translations, "form.email.label");
 * // Returns: "Email address"
 *
 * getNestedValue(translations, "form.unknown.key");
 * // Returns: "form.unknown.key" (fallback)
 * ```
 */
export function getNestedValue(obj: TranslationObjectType, path: string): string {
  const keys = path.split(".");
  let result: unknown = obj;

  for (const key of keys) {
    if (result && typeof result === "object" && key in result) {
      result = (result as TranslationObjectType)[key];
    } else {
      // Return the key path if translation not found (useful for debugging)
      return path;
    }
  }

  return typeof result === "string" ? result : path;
}

/**
 * Handles pluralization for translation strings.
 *
 * This function takes a translation string containing singular and plural
 * forms separated by a pipe character (|) and returns the appropriate
 * form based on the count.
 *
 * @param value - The translation string with format "singular|plural"
 * @param count - The count to determine which form to use
 * @returns The singular form if count is 1, otherwise the plural form
 *
 * @example
 * ```typescript
 * pluralize("1 item|{count} items", 1);
 * // Returns: "1 item"
 *
 * pluralize("1 item|{count} items", 5);
 * // Returns: "{count} items"
 * ```
 *
 * @remarks
 * If the value doesn't contain a pipe character, the original value
 * is returned regardless of count.
 */
export function pluralize(value: string, count: number): string {
  const parts = value.split("|");

  // If no pipe separator, return the value as-is
  if (parts.length === 1) {
    return value;
  }

  const singular = parts[0] ?? value;
  const plural = parts[1] ?? value;
  return count === 1 ? singular : plural;
}

/**
 * Checks if a value is a valid translation string.
 *
 * @param value - The value to check
 * @returns True if the value is a non-empty string
 *
 * @example
 * ```typescript
 * isValidTranslation("Hello"); // true
 * isValidTranslation(""); // false
 * isValidTranslation(null); // false
 * isValidTranslation({}); // false
 * ```
 */
export function isValidTranslation(value: unknown): value is string {
  return typeof value === "string" && value.length > 0;
}

/**
 * Validates a language code against supported languages.
 *
 * @param lang - The language code to validate
 * @param supportedLanguages - Array of supported language codes
 * @returns True if the language is supported
 *
 * @example
 * ```typescript
 * const supported = ["en", "de", "fr"];
 * isLanguageSupported("de", supported); // true
 * isLanguageSupported("ja", supported); // false
 * ```
 */
export function isLanguageSupported(
  lang: string,
  supportedLanguages: readonly string[]
): boolean {
  return supportedLanguages.includes(lang);
}
