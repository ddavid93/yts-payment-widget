import validations from "@/i18n/en";
import type { styleProperties } from "@/constants/conf.ts";

/**
 * Form data interface
 * Represents the complete form data structure for the registration form
 */
export interface IFormData {
  salutation?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  street?: string;
  zip?: string;
  city?: string;
  country?: string;
  paymentMethod?: string;
  dueDate?: Date;
  terms: boolean;
}

/**
 * Stepper component props interface
 */
export interface IStepperProps {
  steps: ReadonlyArray<ValidationKeyType>;
  currentStep: number;
}

/**
 * Form field name type
 * Union type of all possible form field names
 */
/**
 * Step component emit interface
 */
export interface IStepEmits {
  (e: "reset"): void;
}

/**
 * Select option interface
 */
export interface ISelectOption {
  value: string;
  label: string;
}

type Split<S extends string, D extends string> = string extends S
  ? string[]
  : S extends ""
    ? []
    : S extends `${infer T}${D}${infer U}`
      ? [T, ...Split<U, D>]
      : [S];
type GetValue<T, P extends string[]> = P extends [infer K, ...infer Rest]
  ? K extends keyof T
    ? Rest extends string[]
      ? GetValue<T[K], Rest>
      : T[K]
    : never
  : T;

export type ValidationKeyType<
  T = typeof validations,
  Prefix extends string = "",
> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? ValidationKeyType<T[K], `${K}.`>
          : `${Prefix}${K}`
        : never;
    }[keyof T]
  : "";
// Type to get the value type of nested property using a dot-separated key string
export type GetNestedValueType<K extends ValidationKeyType> = GetValue<
  typeof validations,
  Split<K, ".">
>;

export type DefaultLangType = "en" | "it" | "de";

export type LangType =
  | DefaultLangType
  | "es"
  | "fr"
  | "ru"
  | "pt"
  | "cs"
  | "nl";

export interface ICustomFont {
  url: string;
  family: string;
}

export interface ISettings {
  lang: LangType;
  id: string;
  endpoint: string;
  style: any;
}

export type StylePropertiesType = (typeof styleProperties)[number]["key"];

export type StyleDataType = Record<
  StylePropertiesType,
  {
    background_color?: string;
    border_radius?: string;
    font_color?: string;
    font_family?: string;
    font_url?: string;
    icon_color?: string;
    secondary_border_radius?: string;
  }
>;
