// The fixed set of icons that database rows (core values, expectation items,
// prayer teams) may reference by name.
// The database only ever stores one of these keys, never an icon component,
// so this map is the single place that turns a stored string into an icon.
// To add an icon: import it here and add it to ICON_MAP. The admin dropdowns
// and the server-side validation both read from this list automatically.
import {
  Baby,
  BookOpen,
  Church,
  HandHeart,
  Heart,
  HeartHandshake,
  Music,
  Shirt,
  Users,
  type LucideIcon,
} from "lucide-react";

export const ICON_MAP = {
  Heart,
  HandHeart,
  Users,
  Shirt,
  Music,
  Baby,
  HeartHandshake,
  BookOpen,
  Church,
} satisfies Record<string, LucideIcon>;

export type IconKey = keyof typeof ICON_MAP;
export const ICON_KEYS = Object.keys(ICON_MAP) as IconKey[];

// Falls back to Heart for any stored key that is not recognized (for example an
// icon removed from ICON_MAP while old rows still use it), so a stale value
// shows something instead of crashing the page.
export function resolveIcon(key: string): LucideIcon {
  return ICON_MAP[key as IconKey] ?? Heart;
}
