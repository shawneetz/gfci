// One-off fixer for rows that were already inserted by `npm run db:seed`
// and/or `npm run bootstrap:production` before their image/thumbnail URLs
// were known. Both of those scripts write with upsert(...) and an EMPTY
// `update: {}` (deliberately — see the comment atop
// scripts/bootstrap-production.ts), so simply re-running them after
// filling in scripts/seed-image-urls.ts will NOT touch rows that already
// exist. This script is what does.
//
// Matches on id AND title/name together (not id alone), because Event id
// "2" means two different things depending on which script created it —
// "City Serve Day" in prisma/seed.ts (dev/CI) vs. "Sunday Gathering" in
// scripts/bootstrap-production.ts (production). A given database only
// ever has rows from one of those two scripts, so most entries below are
// simply no-ops against whichever database you point this at — that's
// expected, not an error.
//
// Usage (after filling in at least one value in scripts/seed-image-urls.ts):
//   npm run sync:seed-images

import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { SEED_IMAGE_URLS } from "./seed-image-urls";

const adapter = new PrismaPg({ connectionString: process.env.DIRECT_URL });
const prisma = new PrismaClient({ adapter });

const SERMON_UPDATES = [
  { id: "faith-that-moves", title: "Faith That Moves", thumbnail: SEED_IMAGE_URLS.sermonFaithThatMoves },
  { id: "the-weight-of-grace", title: "The Weight of Grace", thumbnail: SEED_IMAGE_URLS.sermonTheWeightOfGrace },
];

const EVENT_UPDATES = [
  { id: "1", title: "Youth Night Worship", image: SEED_IMAGE_URLS.eventYouthNightWorship },
  { id: "2", title: "City Serve Day", image: SEED_IMAGE_URLS.eventCityServeDay }, // seed.ts
  { id: "4", title: "City Serve Day", image: SEED_IMAGE_URLS.eventCityServeDay }, // bootstrap-production.ts
  { id: "2", title: "Sunday Gathering", image: SEED_IMAGE_URLS.eventSundayGathering }, // bootstrap-production.ts
  { id: "3", title: "GF Youth Night", image: SEED_IMAGE_URLS.eventGfYouthNight }, // bootstrap-production.ts
];

async function main() {
  const updated: string[] = [];
  const skipped: string[] = [];
  const notFound: string[] = [];

  for (const { id, title, thumbnail } of SERMON_UPDATES) {
    if (!thumbnail) {
      skipped.push(`Sermon "${title}" (${id})`);
      continue;
    }
    const { count } = await prisma.sermon.updateMany({ where: { id, title }, data: { thumbnail } });
    (count > 0 ? updated : notFound).push(`Sermon "${title}" (${id})`);
  }

  for (const { id, title, image } of EVENT_UPDATES) {
    if (!image) {
      skipped.push(`Event "${title}" (${id})`);
      continue;
    }
    const { count } = await prisma.event.updateMany({ where: { id, title }, data: { image } });
    (count > 0 ? updated : notFound).push(`Event "${title}" (${id})`);
  }


  console.log(`✓ Updated ${updated.length} row(s):`);
  for (const row of updated) console.log(`  - ${row}`);

  if (skipped.length > 0) {
    console.log(`\n⚠ Skipped ${skipped.length} row(s) — no URL set yet in scripts/seed-image-urls.ts:`);
    for (const row of skipped) console.log(`  - ${row}`);
  }

  if (notFound.length > 0) {
    console.log(`\n· ${notFound.length} row(s) had a URL set but didn't match this database (expected if it belongs to the other environment):`);
    for (const row of notFound) console.log(`  - ${row}`);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });