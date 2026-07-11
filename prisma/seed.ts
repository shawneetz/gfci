// prisma/seed.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DIRECT_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  // 1. People first — Ministries and Sermons reference these by id.
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
    where: { id: "david-chen" },
    update: {},
    create: {
      id: "david-chen",
      name: "David Chen",
      title: "Executive Pastor",
      displayName: "Pastor David Chen",
      email: "connect@goldenfaith.church",
      isLeadershipTeam: true,
      leadershipOrder: 2,
    },
  });

  // ... repeat for the rest of src/data/people.ts ...
  // ... then Ministry, Sermon, Event, PrayerTeam, AnsweredPrayer ...

  // 2. The one LiveStream row — id must stay "singleton"
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

  console.log("Seed complete.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });