import { EVENT_CATEGORIES, PRAYER_CATEGORIES } from "@/types";
import { ICON_KEYS } from "@/lib/icon-map";

export class ValidationError extends Error {}
export const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
export const isValidDate = (value: string) => /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(new Date(`${value}T00:00:00Z`).getTime());
export function required(value: unknown, name: string, max = 5000): string {
  if (typeof value !== "string" || !value.trim() || value.length > max) throw new ValidationError(`${name} is required.`);
  return value.trim();
}
export function oneOf<T extends string>(value: unknown, values: readonly T[], name: string): T {
  if (typeof value !== "string" || !values.includes(value as T)) throw new ValidationError(`Invalid ${name}.`);
  return value as T;
}
export const validateEmail = (value: unknown, name = "email") => {
  if (typeof value !== "string" || !isValidEmail(value)) throw new ValidationError(`Invalid ${name}.`);
  return value.trim();
};
export const validateEventCategory = (value: unknown) => oneOf(value, EVENT_CATEGORIES, "category");
export const validatePrayerCategory = (value: unknown) => oneOf(value, PRAYER_CATEGORIES, "category");
export const validateIcon = (value: unknown) => oneOf(value, ICON_KEYS, "icon");
