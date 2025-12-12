import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format date in short format (DD.MM.YYYY)
 * @param date - Date to format (can be Date object or string)
 * @returns Formatted date string
 */
export const formatDateShort = (date: Date | string | undefined): string => {
  if (!date) return "";

  const dateObj = date instanceof Date ? date : new Date(date);

  if (isNaN(dateObj.getTime())) return "";

  return dateObj.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

/**
 * Format date in long format (DD. Month YYYY)
 * @param date - Date to format (can be Date object or string)
 * @returns Formatted date string
 */
export const formatDateLong = (date: Date | string | undefined): string => {
  if (!date) return "";

  const dateObj = date instanceof Date ? date : new Date(date);

  if (isNaN(dateObj.getTime())) return "";

  return dateObj.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

type AnyRecord = Record<string, any>;

function isPlainObject(value: unknown): value is AnyRecord {
  return Object.prototype.toString.call(value) === "[object Object]";
}

export function deepMerge<T extends AnyRecord>(
  target: T,
  source: Partial<T>,
): T {
  if (!isPlainObject(target) || !isPlainObject(source)) return target;

  // Use indexable views to allow writes without TS2862.
  const t = target as AnyRecord;
  const s = source as AnyRecord;

  for (const key of Object.keys(s)) {
    // Avoid prototype pollution keys
    if (key === "__proto__" || key === "constructor" || key === "prototype")
      continue;

    const sourceValue = s[key];
    const targetValue = t[key];

    if (isPlainObject(sourceValue) && isPlainObject(targetValue)) {
      deepMerge(targetValue, sourceValue);
    } else if (sourceValue !== undefined) {
      t[key] = sourceValue;
    }
  }

  return target;
}
