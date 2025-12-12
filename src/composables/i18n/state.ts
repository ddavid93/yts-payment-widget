/**
 * @fileoverview State management for the i18n system.
 *
 * This module manages the internal state of the internationalization system,
 * including the current language, loaded translations, and loading status.
 * It provides a centralized location for state access and modification.
 *
 * ## State Management Strategy:
 * - Uses module-level variables for singleton-like behavior
 * - State persists across component lifecycles
 * - Lazy loading prevents unnecessary translation fetches
 *
 * @module i18n/state
 * @author Yanovis Team
 * @since 1.0.0
 */

import type { LangType } from "@/types/form.type.ts";
import type { II18nState, TranslationObjectType } from "./types";
import { DEFAULT_LANGUAGE, defaultTranslations, loadTranslation } from "./loaders";

/**
 * Internal state object for the i18n system.
 *
 * This object holds all mutable state used by the translation functions.
 * It's kept private to this module to prevent direct external manipulation.
 *
 * @internal
 */
const state: II18nState = {
  currentLanguage: DEFAULT_LANGUAGE,
  currentTranslation: defaultTranslations,
  translationLoaded: true, // English is loaded by default
};

/**
 * Gets the current active language code.
 *
 * @returns The current language code (e.g., "en", "de", "fr")
 *
 * @example
 * ```typescript
 * const lang = getCurrentLanguage();
 * console.log(lang); // "de"
 * ```
 */
export function getCurrentLanguage(): LangType {
  return state.currentLanguage;
}

/**
 * Gets the current translation object.
 *
 * Returns the loaded translations for the current language.
 * If translations haven't finished loading, returns English defaults.
 *
 * @returns The current translation object
 *
 * @example
 * ```typescript
 * const translations = getCurrentTranslation();
 * console.log(translations.label.back); // "Zurück" (if German is active)
 * ```
 */
export function getCurrentTranslation(): TranslationObjectType {
  return state.currentTranslation;
}

/**
 * Checks if translations have been loaded for the current language.
 *
 * @returns True if translations are loaded and ready
 *
 * @example
 * ```typescript
 * if (isTranslationLoaded()) {
 *   // Safe to use translations
 * }
 * ```
 */
export function isTranslationLoaded(): boolean {
  return state.translationLoaded;
}

/**
 * Sets the active language and triggers translation loading.
 *
 * This function updates the current language and initiates lazy loading
 * of the corresponding translation file. If the language is already
 * active, no action is taken.
 *
 * @param lang - The language code to set as active
 * @returns A promise that resolves when translations are loaded
 *
 * @example
 * ```typescript
 * // Switch to German
 * await setLanguage("de");
 *
 * // Now German translations are active
 * const { $t } = useI18n();
 * console.log($t("label.back")); // "Zurück"
 * ```
 *
 * @remarks
 * The loading happens asynchronously. During the brief loading period,
 * translations will continue to use the previous language or defaults.
 */
export async function setLanguage(lang: LangType): Promise<void> {
  // Skip if same language is already active
  if (lang === state.currentLanguage && state.translationLoaded) {
    return;
  }

  state.currentLanguage = lang;
  state.translationLoaded = false;

  try {
    state.currentTranslation = await loadTranslation(lang);
    state.translationLoaded = true;
  } catch (error) {
    // On error, fallback to English
    console.warn(`[i18n] Failed to load translations for "${lang}". Falling back to English.`, error);
    state.currentTranslation = defaultTranslations;
    state.translationLoaded = true;
  }
}

/**
 * Initializes the i18n state with a specific language.
 *
 * This function should be called once at application startup to set
 * the initial language. It handles the async loading gracefully.
 *
 * @param lang - The initial language code
 *
 * @example
 * ```typescript
 * // In App.vue or main.ts
 * initializeI18n("de");
 * ```
 *
 * @remarks
 * Unlike `setLanguage`, this function doesn't return a promise.
 * It triggers loading in the background, making it suitable for
 * synchronous initialization contexts.
 */
export function initializeI18n(lang: LangType): void {
  if (lang && lang !== state.currentLanguage) {
    state.currentLanguage = lang;
    state.translationLoaded = false;

    // Load translations in background
    loadTranslation(lang)
      .then((translation) => {
        state.currentTranslation = translation;
        state.translationLoaded = true;
      })
      .catch((error) => {
        console.warn(`[i18n] Failed to load translations for "${lang}". Using English.`, error);
        state.currentTranslation = defaultTranslations;
        state.translationLoaded = true;
      });
  }
}

/**
 * Resets the i18n state to defaults (English).
 *
 * Useful for testing or when needing to clear the state.
 *
 * @internal
 */
export function resetI18nState(): void {
  state.currentLanguage = DEFAULT_LANGUAGE;
  state.currentTranslation = defaultTranslations;
  state.translationLoaded = true;
}
