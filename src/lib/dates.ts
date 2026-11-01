// Date helpers that always use the church's timezone.
// The server runs in UTC, so plain `new Date()` gives the wrong "today" in the evening Manila time.
export const SITE_TIMEZONE = "Asia/Manila";

// Today's date in Manila as "YYYY-MM-DD".
// Date keys in this format can be compared directly as strings.
export function todayKey(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: SITE_TIMEZONE }).format(new Date());
}
