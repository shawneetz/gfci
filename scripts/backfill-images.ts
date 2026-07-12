// One-off migration script: uploads every image currently referenced by
// a local /public path (Ministry.image, Sermon.thumbnail, Event.image,
// PrayerTeam.image) to Blob storage via src/lib/storage.ts's
// uploadImage(), then updates the corresponding DB row to point at the
// new URL.
//
// Run once, by hand, after Phase 12's storage provider is configured:
//   npm run backfill:images
//
// Safe to re-run — the queries below only select rows still pointing at
// a local "/images/..." path, so anything already migrated (or seeded
// directly with a Blob URL) is left untouched.

import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import { existsSync } from "node:fs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { uploadImage } from "../src/lib/storage";

const adapter = new PrismaPg({ connectionString: process.env.DIRECT_URL });
const prisma = new PrismaClient({ adapter });

const PUBLIC_DIR = path.join(process.cwd(), "public");

async function migrateOne(localPath: string): Promise<string | null> {
  const diskPath = path.join(PUBLIC_DIR, localPath);

  if (!existsSync(diskPath)) {
    // Several seed rows reference files that were never actually added
    // to public/images (e.g. event-youth-night.jpg, sermon-2.jpg) — this
    // is exactly the case the Phase 12 checklist item asked to confirm.
    // Log and skip instead of crashing the whole backfill over one
    // missing placeholder image.
    console.warn(`  ⚠ missing on disk, skipped: ${localPath}`);
    return null;
  }

  const buffer = await fs.readFile(diskPath);
  const filename = path.basename(localPath);
  return uploadImage(buffer, filename, { folder: "backfill" });
}

async function backfillMinistries() {
  const rows = await prisma.ministry.findMany({ where: { image: { startsWith: "/images/" } } });
  for (const row of rows) {
    const url = await migrateOne(row.image);
    if (!url) continue;
    await prisma.ministry.update({ where: { id: row.id }, data: { image: url } });
    console.log(`  ✓ Ministry "${row.title}" → ${url}`);
  }
}

async function backfillSermons() {
  const rows = await prisma.sermon.findMany({ where: { thumbnail: { startsWith: "/images/" } } });
  for (const row of rows) {
    const url = await migrateOne(row.thumbnail);
    if (!url) continue;
    await prisma.sermon.update({ where: { id: row.id }, data: { thumbnail: url } });
    console.log(`  ✓ Sermon "${row.title}" → ${url}`);
  }
}

async function backfillEvents() {
  const rows = await prisma.event.findMany({ where: { image: { startsWith: "/images/" } } });
  for (const row of rows) {
    const url = await migrateOne(row.image);
    if (!url) continue;
    await prisma.event.update({ where: { id: row.id }, data: { image: url } });
    console.log(`  ✓ Event "${row.title}" → ${url}`);
  }
}

async function backfillPrayerTeams() {
  const rows = await prisma.prayerTeam.findMany({ where: { image: { startsWith: "/images/" } } });
  for (const row of rows) {
    const url = await migrateOne(row.image);
    if (!url) continue;
    await prisma.prayerTeam.update({ where: { id: row.id }, data: { image: url } });
    console.log(`  ✓ PrayerTeam "${row.name}" → ${url}`);
  }
}

async function main() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error(
      "BLOB_READ_WRITE_TOKEN is not set — connect Vercel Blob (or run `vercel env pull`) before backfilling."
    );
  }

  console.log("Backfilling ministries...");
  await backfillMinistries();

  console.log("Backfilling sermons...");
  await backfillSermons();

  console.log("Backfilling events...");
  await backfillEvents();

  console.log("Backfilling prayer teams...");
  await backfillPrayerTeams();

  console.log("Backfill complete.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });