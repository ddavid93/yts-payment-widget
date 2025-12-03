import i18next from "i18next";
import de from "@/i18n/de";
import it from "@/i18n/it";
import en from "@/i18n/en";
import nl from "@/i18n/nl";
import cs from "@/i18n/cs";
import pl from "@/i18n/pl";
import fr from "@/i18n/fr";
import es from "@/i18n/es";
import ru from "@/i18n/ru";
import type {
  GetNestedValueType,
  LangType,
  ValidationKeyType
} from "@/extras/typing";
import { createSharedComposable } from "@vueuse/core";

function useI18nSingleton(lng?: LangType) {

  i18next.init({
    lng,
    resources: {
      en: {
        translation: en
      },
      de: {
        translation: de
      },
      it: {
        translation: it
      },
      nl: {
        translation: nl
      },
      cs: {
        translation: cs
      },
      pl: {
        translation: pl
      },
      fr: {
        translation: fr
      },
      es: {
        translation: es
      },
      ru: {
        translation: ru
      }
    },
    debug: ["development", "testing"].includes(import.meta.env["VITE_ENDPOINT"])
  });

  function $t<T extends ValidationKeyType>(
    args: T,
    options?: {
      count?: number;
      phonenumber?: string;
      emailaddress?: string;
      fieldName?: string;
      minLength?: number;
    }
  ) {
    return i18next.t(args, options) as GetNestedValueType<T>;
  }

  function $tc(key: string, count: number) {
    const translation = i18next.t(key); // Use i18next to get the translation string
    const [singular, plural] = translation.split("|"); // Split the string
    return count === 1 ? singular : plural; // Return singular or plural based on the count
  }

  return { $t, $tc };
}

export const useI18n = createSharedComposable(useI18nSingleton);
