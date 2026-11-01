import { EVENT_CATEGORIES, PRAYER_CATEGORIES } from "@/types";
import { ICON_KEYS } from "@/lib/icon-map";

// Error type whose message can be shown directly to the user.
export class ValidationError extends Error {}

// Returns true for a basic "name@domain.tld" shape (no throw).
export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

// Returns true for a real calendar date written as YYYY-MM-DD (no throw).
export function isValidDate(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    !Number.isNaN(new Date(`${value}T00:00:00Z`).getTime());
}

// Throws if the value is not a non-empty string of at most `max` characters.
// Returns the trimmed text.
export function required(value: unknown, label: string, max = 5000): string {
  if (typeof value !== "string" || !value.trim()) {
    throw new ValidationError(`${label} is required.`);
  }
  const text = value.trim();
  if (text.length > max) {
    throw new ValidationError(`${label} must be ${max} characters or fewer.`);
  }
  return text;
}

// Throws if the value is longer than `max`. An empty or missing value is allowed.
// Returns the trimmed text (possibly "").
export function optionalText(value: unknown, label: string, max: number): string {
  if (value === undefined || value === null) return "";
  if (typeof value !== "string") throw new ValidationError(`${label} is not valid.`);
  const text = value.trim();
  if (text.length > max) throw new ValidationError(`${label} must be ${max} characters or fewer.`);
  return text;
}

// Throws unless the value is a whole number between min and max (inclusive).
export function intInRange(value: unknown, min: number, max: number, label: string): number {
  if (typeof value !== "number" || !Number.isInteger(value) || value < min || value > max) {
    throw new ValidationError(`${label} must be a whole number from ${min} to ${max}.`);
  }
  return value;
}

// Throws unless the value is empty or an https:// link of at most 500 characters.
// Returns "" for an empty value.
export function validHttpsUrl(value: unknown, label: string): string {
  const text = optionalText(value, label, 500);
  if (text && !text.startsWith("https://")) {
    throw new ValidationError(`${label} must start with https://`);
  }
  return text;
}

// Throws unless the value is one of the allowed options (enums, icon keys).
export function oneOf<T extends string>(value: unknown, values: readonly T[], label: string): T {
  if (typeof value !== "string" || !values.includes(value as T)) {
    throw new ValidationError(`Invalid ${label}.`);
  }
  return value as T;
}

// Throws unless the value is a valid email address. Returns the trimmed email.
export function validateEmail(value: unknown, label = "Email"): string {
  if (typeof value !== "string" || !isValidEmail(value.trim())) {
    throw new ValidationError(`${label} is not a valid email address.`);
  }
  return value.trim();
}

// Shortcuts for the fixed lists used across the app.
export const validateEventCategory = (value: unknown) =>
  oneOf(value, EVENT_CATEGORIES, "category");
export const validatePrayerCategory = (value: unknown) =>
  oneOf(value, PRAYER_CATEGORIES, "category");
export const validateIcon = (value: unknown) => oneOf(value, ICON_KEYS, "icon");
