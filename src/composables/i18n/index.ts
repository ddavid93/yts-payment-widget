/**
 * @fileoverview Lightweight i18n composable for Vue 3 applications.
 *
 * This module provides a simple, lightweight alternative to i18next for
 * internationalization in Vue applications. It's designed specifically
 * for widget-sized applications where bundle size is critical.
 *
 * ## Features:
 * - 🚀 Lazy loading of language files (code splitting)
 * - 📦 Minimal bundle impact (~2KB core + language chunks)
 * - 🔄 Singleton pattern for consistent state across components
 * - 🎯 Type-safe translation keys
 * - 📝 Pluralization support
 *
 * ## Usage:
 * ```typescript
 * // In App.vue - Initialize with language
 * import { useI18n } from "@/composables/i18n";
 * useI18n("de"); // Initialize with German
 *
 * // In any component - Get translation functions
 * import { useI18n } from "@/composables/i18n";
 * const { $t, $tc } = useI18n();
 *
 * // Use translations
 * const backLabel = $t("label.back"); // "Zurück"
 * const itemCount = $tc("items.count", 5); // "5 items"
 * ```
 *
 * ## Architecture:
 * ```
 * src/composables/i18n/
 * ├── index.ts    - Main composable (this file)
 * ├── types.ts    - TypeScript type definitions
 * ├── loaders.ts  - Language loader configuration
 * ├── state.ts    - State management
 * └── utils.ts    - Helper functions
 * ```
 *
 * @module i18n
 * @author Yanovis Team
 * @since 1.0.0
 */

import { createSharedComposable } from "@vueuse/core";
import type { LangType, ValidationKeyType, GetNestedValueType } from "@/types/form.type.ts";
import { getCurrentTranslation, initializeI18n } from "./state";
import { getNestedValue, pluralize } from "./utils";

// Re-export types and utilities for external use
export type { TranslationObjectType, LanguageLoaderType, II18nState, IUseI18nReturn } from "./types";
export { languageLoaders, loadTranslation, DEFAULT_LANGUAGE } from "./loaders";
export { getCurrentLanguage, setLanguage, isTranslationLoaded } from "./state";
export { getNestedValue, pluralize, isValidTranslation, isLanguageSupported } from "./utils";

/**
 * Internal implementation of the i18n composable.
 *
 * This function creates the translation functions and handles language
 * initialization. It's wrapped with `createSharedComposable` to ensure
 * a singleton instance across the application.
 *
 * @param lng - Optional language code to initialize with
 * @returns Object containing translation functions
 *
 * @internal
 */
function useI18nSingleton(lng?: LangType) {
  // Initialize language if provided
  if (lng) {
    initializeI18n(lng);
  }

  /**
   * Translates a key to its corresponding value in the current language.
   *
   * Uses dot notation to access nested translation values.
   * If the key is not found, returns the key itself (useful for debugging).
   *
   * @template T - The translation key type (for type inference)
   * @param key - The dot-notation translation key
   * @returns The translated string
   *
   * @example
   * ```typescript
   * $t("label.back");           // "Back"
   * $t("form.email.label");     // "Email address*"
   * $t("form.email.placeholder"); // "email@address.com"
   * ```
   */
  function $t<T extends ValidationKeyType>(key: T): GetNestedValueType<T> {
    return getNestedValue(getCurrentTranslation(), key) as GetNestedValueType<T>;
  }

  /**
   * Translates a key with pluralization support.
   *
   * Expects the translation value to contain singular and plural forms
   * separated by a pipe character (|). Returns the appropriate form
   * based on the count.
   *
   * @param key - The dot-notation translation key
   * @param count - The count used to determine singular or plural form
   * @returns The appropriate singular or plural translation
   *
   * @example
   * ```typescript
   * // If translation is: "1 item|{n} items"
   * $tc("cart.items", 1);  // "1 item"
   * $tc("cart.items", 5);  // "{n} items"
   * ```
   */
  function $tc(key: string, count: number): string {
    const value = getNestedValue(getCurrentTranslation(), key);
    return pluralize(value, count);
  }

  return { $t, $tc };
}

/**
 * Vue composable for internationalization.
 *
 * This is the main entry point for using translations in your application.
 * It's a shared composable, meaning all components share the same instance
 * and state.
 *
 * ## Initialization:
 * Call once at app startup with the desired language:
 * ```typescript
 * // App.vue
 * useI18n("de"); // Initialize with German
 * ```
 *
 * ## Usage in components:
 * ```typescript
 * // Any component
 * const { $t, $tc } = useI18n();
 *
 * // In template
 * <span>{{ $t("label.back") }}</span>
 * ```
 *
 * ## Supported Languages:
 * - `en` - English (default, bundled)
 * - `de` - German (lazy loaded)
 * - `it` - Italian (lazy loaded)
 * - `fr` - French (lazy loaded)
 * - `es` - Spanish (lazy loaded)
 * - `nl` - Dutch (lazy loaded)
 * - `cs` - Czech (lazy loaded)
 * - `pl` - Polish (lazy loaded)
 * - `ru` - Russian (lazy loaded)
 *
 * @param lng - Optional language code to initialize with
 * @returns Object containing `$t` and `$tc` translation functions
 *
 * @example
 * ```typescript
 * import { useI18n } from "@/composables/i18n";
 *
 * // Initialize (once in App.vue)
 * useI18n("de");
 *
 * // Use in components
 * const { $t, $tc } = useI18n();
 * const greeting = $t("label.back"); // "Zurück"
 * ```
 */
export const useI18n = createSharedComposable(useI18nSingleton);
