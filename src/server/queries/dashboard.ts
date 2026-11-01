import "server-only";
import { prisma } from "@/lib/prisma";
export async function getContentCounts() {
  const since = new Date(Date.now() - 7 * 86400000);
  const [sermons, events, ministries, people, prayerTeams, testimonies, submissions, newSubmissions] = await prisma.$transaction([
    prisma.sermon.count(), prisma.event.count(), prisma.ministry.count(), prisma.person.count(),
    prisma.prayerTeam.count(), prisma.answeredPrayer.count(),
    prisma.prayerRequestSubmission.count(), prisma.prayerRequestSubmission.count({ where: { createdAt: { gte: since } } }),
  ]);
  return { sermons, events, ministries, people, prayerTeams, testimonies, submissions, newSubmissions };
}
