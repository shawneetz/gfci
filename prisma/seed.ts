// Minimal dev/CI fixture data — NOT production content.
//
// Phase 17 split seeding into two concerns:
//   - prisma/seed.ts (this file): just enough rows to exercise every
//     code path (both isLeadershipTeam branches, a sermon series with
//     more than one entry, a featured event AND a past event, etc.).
//     Safe to wipe and re-run against a throwaway dev/CI database at
//     any time.
//   - scripts/bootstrap-production.ts: the original hand-written
//     starter content, run once against a fresh production database.
//     Real content after that point is entered through /admin, not
//     hand-synced here.
//
// Three rows below reference images that were never added to
// public/images (Sermon "Faith That Moves", Event "City Serve Day",
// PrayerTeam "Kids Prayer Team") — see scripts/seed-image-urls.ts for
// where those Blob URLs get filled in once uploaded, and
// scripts/sync-seed-images.ts for patching rows already seeded before
// that happened.
//
// Run with `npm run db:seed`.

import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { SEED_IMAGE_URLS } from "../scripts/seed-image-urls";

const adapter = new PrismaPg({ connectionString: process.env.DIRECT_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  // People — one leadership-team member (also the ministry leader) and
  // one non-leadership sermon speaker, so both isLeadershipTeam branches
  // are exercised.
  await prisma.person.upsert({
    where: { id: "sarah-jenkins" },
    update: {},
    create: {
      id: "sarah-jenkins",
      name: "Sarah Jenkins",
      title: "Lead Pastor",
      displayName: "Pastor Sarah Jenkins",
      isLeadershipTeam: true,
      leadershipOrder: 1,
    },
  });

  await prisma.person.upsert({
    where: { id: "noel-gonzales" },
    update: {},
    create: {
      id: "noel-gonzales",
      name: "Noel Gonzales",
      title: "Bishop",
      displayName: "Bishop Noel Gonzales",
    },
  });

  console.log("Seeded 2 people.");

  await prisma.ministry.upsert({
    where: { slug: "golden-kids" },
    update: {},
    create: {
      id: "golden-kids",
      slug: "golden-kids",
      title: "Golden Kids",
      tagline: "Safe, fun, and engaging environments for children to learn about faith.",
      overview:
        "Golden Kids exists to partner with parents in raising children who love Jesus.",
      image: "/images/home-page/kids-ministry.jpg",
      imageAlt: "Children playing and learning together at Golden Kids",
      audience: "Birth – 5th Grade",
      schedule: "Sundays, 9:00 AM & 11:00 AM",
      location: "Kids Wing, Ground Floor",
      contactEmail: "kids@goldenfaith.church",
      order: 0,
      leaderId: "sarah-jenkins",
    },
  });

  console.log("Seeded 1 ministry.");

  // Same series, same speaker — exercises getMoreInSeries().
  await prisma.sermon.upsert({
    where: { slug: "building-on-solid-ground" },
    update: {},
    create: {
      id: "building-on-solid-ground",
      slug: "building-on-solid-ground",
      title: "Building on Solid Ground",
      series: "Foundations",
      date: new Date("2026-07-05"),
      thumbnail: "/images/home-page/latest-sermon-img.jpg",
      summary: "A message on rooting your life in something that cannot be shaken.",
      speakerId: "noel-gonzales",
    },
  });

  await prisma.sermon.upsert({
    where: { slug: "faith-that-moves" },
    update: {},
    create: {
      id: "faith-that-moves",
      slug: "faith-that-moves",
      title: "Faith That Moves",
      series: "Foundations",
      date: new Date("2026-06-21"),
      // Not shipped under public/images — see scripts/seed-image-urls.ts.
      thumbnail: SEED_IMAGE_URLS.sermonFaithThatMoves || "/images/sermon-3.jpg",
      summary: "Faith isn't static — it's meant to move us toward action.",
      speakerId: "noel-gonzales",
    },
  });

  console.log("Seeded 2 sermons.");

  // One featured/upcoming, one non-featured/past — exercises
  // getFeaturedEvent(), getUpcomingEventsPreview(), and the archive's
  // past-date filter in one shot.
  await prisma.event.upsert({
    where: { id: "1" },
    update: {},
    create: {
      id: "1",
      title: "Youth Night Worship",
      date: new Date("2026-10-15"),
      time: "7:00 PM",
      category: "Worship",
      location: "Main Sanctuary",
      // Not shipped under public/images — see scripts/seed-image-urls.ts.
      image: SEED_IMAGE_URLS.eventYouthNightWorship || "/images/event-youth-night.jpg",
      description: "An extended evening of uninterrupted worship and prayer.",
      featured: true,
    },
  });

  await prisma.event.upsert({
    where: { id: "2" },
    update: {},
    create: {
      id: "2",
      title: "City Serve Day",
      date: new Date("2026-01-10"),
      time: "8:00 AM",
      category: "Outreach",
      location: "Various Sites",
      // Not shipped under public/images — see scripts/seed-image-urls.ts.
      image: SEED_IMAGE_URLS.eventCityServeDay || "/images/event-city-serve-day.jpg",
      description: "Partnering with local organizations to serve our city.",
    },
  });

  console.log("Seeded 2 events.");

  await prisma.prayerTeam.upsert({
    where: { slug: "kids" },
    update: {},
    create: {
      id: "prayer-team-kids",
      slug: "kids",
      name: "Kids Prayer Team",
      details: "Praying for children and families as they grow in faith and community.",
      // Not shipped under public/images — see scripts/seed-image-urls.ts.
      image: SEED_IMAGE_URLS.prayerTeamKids || "/images/ministry-kids.jpg",
      schedule: "Sundays, 9:00 AM & 11:00 AM",
      order: 0,
    },
  });

  console.log("Seeded 1 prayer team.");

  await prisma.answeredPrayer.upsert({
    where: { id: "answered-prayer-1" },
    update: {},
    create: {
      id: "answered-prayer-1",
      quote:
        "After months of uncertainty, my husband found a job just two weeks after our group prayed for us.",
      name: "Grace M.",
      category: "Thanksgiving",
    },
  });

  console.log("Seeded 1 answered prayer.");

  await prisma.coreValue.upsert({
    where: { id: "core-value-authentic-faith" },
    update: {},
    create: {
      id: "core-value-authentic-faith",
      icon: "Heart",
      title: "Authentic Faith",
      description: "We embrace honest questions and a genuine pursuit of truth.",
      order: 0,
    },
  });

  await prisma.coreValue.upsert({
    where: { id: "core-value-bold-love" },
    update: {},
    create: {
      id: "core-value-bold-love",
      icon: "HandHeart",
      title: "Bold Love",
      description: "We strive to love fiercely, inclusively, and without condition.",
      order: 1,
    },
  });

  console.log("Seeded 2 core values.");

  await prisma.expectationItem.upsert({
    where: { id: "expectation-warm-community" },
    update: {},
    create: {
      id: "expectation-warm-community",
      icon: "Users",
      title: "Warm Community",
      description: "Greeters and hosts are there to welcome you and help you feel at home.",
      order: 0,
    },
  });

  await prisma.expectationItem.upsert({
    where: { id: "expectation-come-as-you-are" },
    update: {},
    create: {
      id: "expectation-come-as-you-are",
      icon: "Shirt",
      title: "Come As You Are",
      description: "Wear whatever makes you comfortable — you belong here.",
      order: 1,
    },
  });

  console.log("Seeded 2 expectation items.");

  await prisma.liveStream.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      title: "Title Here",
      schedule: "Sundays, 9:00 AM & 11:00 AM",
      location: "Main Sanctuary",
    },
  });

  console.log("Seeded live stream singleton.");
  console.log("Seed complete (dev fixture data).");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });