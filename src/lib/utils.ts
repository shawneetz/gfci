import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export function gridColsForCount(count: number, max: 2 | 3 = 3): string {
  const columns = Math.max(1, Math.min(count, max));

  if (max === 2) {
    return columns >= 2 ? "sm:grid-cols-2" : "grid-cols-1";
  }

  if (columns >= 3) return "sm:grid-cols-2 lg:grid-cols-3";
  if (columns === 2) return "sm:grid-cols-2";
  return "grid-cols-1";
}

export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatWeekday(dateString: string) {
  return new Date(dateString)
    .toLocaleDateString("en-US", { weekday: "short" })
    .toUpperCase();
}

export function formatMonthShort(dateString: string) {
  return new Date(dateString)
    .toLocaleDateString("en-US", { month: "short" })
    .toUpperCase();
}

export function formatDay(dateString: string) {
  return new Date(dateString).getDate().toString();
}

// Returns a stable "YYYY-MM" grouping key for a given ISO date string — used
// to group events by month for the Events page's month-nav paging and the
// events archive.
export function getMonthKey(dateString: string) {
  return dateString.slice(0, 7); // "YYYY-MM-DD" -> "YYYY-MM"
}

// Renders a "YYYY-MM" key as a human label, e.g. "2026-10" -> "October 2026".
export function formatMonthLabel(monthKey: string) {
  return new Date(`${monthKey}-01`).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}