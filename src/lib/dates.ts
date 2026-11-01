export const SITE_TIMEZONE = "Asia/Manila";
export function todayKey(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: SITE_TIMEZONE }).format(new Date());
}
