import { Heart, HandHeart, Users, Shirt, Music, type LucideIcon } from "lucide-react";

// Fixed set of icons a CoreValue/ExpectationItem row is allowed to
// reference by name. The DB only ever stores one of these keys (see
// CoreValue.icon / ExpectationItem.icon in schema.prisma) — never a
// Lucide component itself — so this map is the single place that
// translates a stored string into the icon to render. Extend this list
// (and only this list) when a new icon is needed; the Phase 15 admin
// form should offer exactly these keys in a dropdown, not free text.
export const ICON_MAP = {
  Heart,
  HandHeart,
  Users,
  Shirt,
  Music,
} satisfies Record<string, LucideIcon>;

export type IconKey = keyof typeof ICON_MAP;

// Falls back to Heart for any stored key that isn't recognized (e.g. an
// icon later removed from ICON_MAP while old rows still reference it),
// so a bad/stale value renders *something* instead of crashing the page.
export function resolveIcon(key: string): LucideIcon {
  return ICON_MAP[key as IconKey] ?? Heart;
}