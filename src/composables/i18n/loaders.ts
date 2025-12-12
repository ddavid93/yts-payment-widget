/**
 * @fileoverview Language loaders configuration for lazy loading translations.
 *
 * This module defines the language loader functions that enable code splitting
 * and on-demand loading of translation files. Each language (except English,
 * which is bundled as the default) is loaded dynamically when requested.
 *
 * ## How it works:
 * - English translations are bundled with the main application (instant availability)
 * - Other languages use dynamic imports to create separate chunks
 * - Vite automatically splits these into separate files during build
 * - Only the requested language is downloaded at runtime
 *
 * ## Bundle Impact:
 * - Main bundle: Contains only English translations
 * - Language chunks: ~2-5KB each (gzipped), loaded on demand
 *
 * @module i18n/loaders
 * @author Yanovis Team
 * @since 1.0.0
 */

import en from "@/i18n/en";
import type { LanguageLoaderMapType, TranslationObjectType } from "./types";

/**
 * Default/fallback translations (English).
 *
 * English is imported statically to ensure:
 * 1. Immediate availability without async loading
 * 2. Fallback translations are always present
 * 3. No loading delay for the default language
 *
 * @constant
 */
export const defaultTranslations: TranslationObjectType = en;

/**
 * Default language code used as fallback.
 *
 * @constant
 */
export const DEFAULT_LANGUAGE = "en" as const;

/**
 * Language loaders map for lazy loading translations.
 *
 * Each entry maps a language code to a loader function that returns
 * a Promise resolving to the translation module.
 *
 * ### Supported Languages:
 * - `en` - English (default, bundled)
 * - `de` - German
 * - `it` - Italian
 * - `nl` - Dutch
 * - `cs` - Czech
 * - `pl` - Polish
 * - `fr` - French
 * - `es` - Spanish
 * - `ru` - Russian
 *
 * ### Adding a new language:
 * 1. Create a translation file in `@/i18n/` (e.g., `ja.ts`)
 * 2. Add the language code to `LangType` in `@/types/form.type.ts`
 * 3. Add a loader entry: `ja: () => import("@/i18n/ja")`
 *
 * @example
 * ```typescript
 * // Load German translations
 * const loader = languageLoaders.de;
 * const module = await loader();
 * const translations = module.default;
 * ```
 */
export const languageLoaders: LanguageLoaderMapType = {
  // English is bundled with the main application (no dynamic import)
  en: () => Promise.resolve({ default: en }),

  // European languages (lazy loaded)
  de: () => import("@/i18n/de"),
  it: () => import("@/i18n/it"),
  nl: () => import("@/i18n/nl"),
  fr: () => import("@/i18n/fr"),
  es: () => import("@/i18n/es"),

  // Eastern European languages (lazy loaded)
  cs: () => import("@/i18n/cs"),
  pl: () => import("@/i18n/pl"),
  ru: () => import("@/i18n/ru"),
};

/**
 * Loads translations for a specific language.
 *
 * This function retrieves the appropriate loader for the given language
 * and executes it. If the language is not found, it falls back to English.
 *
 * @param lang - The language code to load translations for
 * @returns A promise that resolves to the translation object
 *
 * @example
 * ```typescript
 * const germanTranslations = await loadTranslation("de");
 * console.log(germanTranslations.label.back); // "Zurück"
 * ```
 */
export async function loadTranslation(lang: string): Promise<TranslationObjectType> {
  const loader = languageLoaders[lang as keyof typeof languageLoaders] || languageLoaders.en;
  const module = await loader();
  return module.default;
}
