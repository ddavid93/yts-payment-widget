/**
 * @fileoverview Type definitions for the lightweight i18n system.
 *
 * This module contains all TypeScript type definitions used throughout
 * the internationalization (i18n) system. It provides type safety for
 * translation objects, language codes, and loader functions.
 *
 * @module i18n/types
 * @author Yanovis Team
 * @since 1.0.0
 */

import type { LangType } from "@/types/form.type.ts";

/**
 * Represents a translation object structure.
 *
 * Translation objects are nested key-value pairs where values can be
 * either strings (leaf translations) or nested objects (translation groups).
 *
 * @example
 * ```typescript
 * const translations: TranslationObjectType = {
 *   label: {
 *     back: "Back",
 *     next: "Next"
 *   },
 *   greeting: "Hello"
 * };
 * ```
 */
export type TranslationObjectType = Record<string, unknown>;

/**
 * Represents a language loader function.
 *
 * Language loaders are async functions that dynamically import translation files.
 * This enables code splitting and lazy loading of language resources.
 *
 * @returns A promise that resolves to a module with a default export containing translations
 *
 * @example
 * ```typescript
 * const germanLoader: LanguageLoaderType = () => import("@/i18n/de");
 * ```
 */
export type LanguageLoaderType = () => Promise<{ default: TranslationObjectType }>;

/**
 * A record mapping language codes to their respective loader functions.
 *
 * This type is used to define the complete set of available languages
 * and their lazy-loading strategies.
 *
 * @example
 * ```typescript
 * const loaders: LanguageLoaderMapType = {
 *   en: () => Promise.resolve({ default: enTranslations }),
 *   de: () => import("@/i18n/de"),
 * };
 * ```
 */
export type LanguageLoaderMapType = Record<LangType, LanguageLoaderType>;

/**
 * Represents the internal state of the i18n system.
 *
 * This interface tracks the current language, loaded translations,
 * and the loading status to prevent duplicate loading operations.
 */
export interface II18nState {
  /** The currently active language code */
  currentLanguage: LangType;
  /** The loaded translation object for the current language */
  currentTranslation: TranslationObjectType;
  /** Flag indicating whether translations have been loaded */
  translationLoaded: boolean;
}

/**
 * The return type of the useI18n composable.
 *
 * Provides translation functions that can be used throughout the application.
 */
export interface IUseI18nReturn {
  /**
   * Translates a key to its corresponding value in the current language.
   * @param key - The dot-notation translation key
   * @returns The translated string
   */
  $t: <T extends string>(key: T) => string;

  /**
   * Translates a key with pluralization support.
   * @param key - The dot-notation translation key (value should contain singular|plural format)
   * @param count - The count used to determine singular or plural form
   * @returns The appropriate singular or plural translation
   */
  $tc: (key: string, count: number) => string;
}
