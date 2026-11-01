// Counts for the admin overview tiles. Only counts are loaded, never full tables.
import "server-only";
import { prisma } from "@/lib/prisma";

export async function getContentCounts() {
  // Anything created in the last 7 days counts as "new".
  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  // One transaction = one round trip to the database for all counts.
  const [
    sermons,
    events,
    ministries,
    people,
    prayerTeams,
    testimonies,
    submissions,
    newSubmissions,
  ] = await prisma.$transaction([
    prisma.sermon.count(),
    prisma.event.count(),
    prisma.ministry.count(),
    prisma.person.count(),
    prisma.prayerTeam.count(),
    prisma.answeredPrayer.count(),
    prisma.prayerRequestSubmission.count(),
    prisma.prayerRequestSubmission.count({ where: { createdAt: { gte: since } } }),
  ]);

  return {
    sermons,
    events,
    ministries,
    people,
    prayerTeams,
    testimonies,
    submissions,
    newSubmissions,
  };
}
