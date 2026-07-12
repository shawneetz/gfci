/**
 * Guards against schema.prisma's enums drifting from the hand-typed
 * TypeScript consts in src/types/index.ts.
 *
 * EVENT_CATEGORIES and PRAYER_CATEGORIES stay as hand-written `as const`
 * arrays rather than being derived from Prisma's generated enum, because
 * several places in the app rely on their literal-tuple type — e.g.
 * `["All", ...EVENT_CATEGORIES] as const` in events-hero.tsx needs a
 * real tuple type to build the EventsCategoryFilter union, which a
 * `string[]` derived at runtime from Object.values() can't provide
 * without extra casting. Checking both sources against each other here
 * is simpler than trying to derive one from the other.
 *
 * Run manually with `npm run check:enums`, or automatically before every
 * build via the `prebuild` script in package.json.
 */

import {
  EventCategory as PrismaEventCategory,
  PrayerCategory as PrismaPrayerCategory,
} from "../src/generated/prisma/client";
import { EVENT_CATEGORIES, PRAYER_CATEGORIES } from "../src/types";

function checkParity(
  label: string,
  prismaEnumName: string,
  tsConstName: string,
  prismaEnum: Record<string, string>,
  tsValues: readonly string[]
): boolean {
  const fromPrisma = Object.values(prismaEnum).sort();
  const fromTs = [...tsValues].sort();

  const matches =
    fromPrisma.length === fromTs.length &&
    fromPrisma.every((value, i) => value === fromTs[i]);

  if (!matches) {
    console.error(`❌ ${label} are out of sync between Prisma and TypeScript.`);
    console.error(`   schema.prisma "${prismaEnumName}" enum: [${fromPrisma.join(", ")}]`);
    console.error(`   src/types/index.ts "${tsConstName}":     [${fromTs.join(", ")}]`);
    console.error(`   Add the missing value to whichever side is behind, then re-run this check.`);
    return false;
  }

  console.log(`✅ ${label} match (${fromTs.length} values).`);
  return true;
}

const results = [
  checkParity(
    "Event categories",
    "EventCategory",
    "EVENT_CATEGORIES",
    PrismaEventCategory,
    EVENT_CATEGORIES
  ),
  checkParity(
    "Prayer categories",
    "PrayerCategory",
    "PRAYER_CATEGORIES",
    PrismaPrayerCategory,
    PRAYER_CATEGORIES
  ),
];

if (results.includes(false)) {
  process.exit(1);
}