import "server-only";
import { prisma } from "@/lib/prisma";
import type { Sermon as PrismaSermon } from "@/generated/prisma/client";

// Mirrors the legacy src/types/index.ts Sermon interface: a flat `speaker`
// display-name string (not a nested Person relation — same reasoning as
// MinistryWithLeader in queries/ministries.ts), and `date` as a
// "YYYY-MM-DD" string so it slots straight into formatDate/formatWeekday
// in lib/utils.ts, which both take a string. Matches the date handling
// queries/events.ts already does; this file previously left `date` as a
// raw Date, which would have broken every template calling formatDate().
export interface SermonWithSpeaker extends Omit<PrismaSermon, "date"> {
  date: string;
  speaker: string;
}

const speakerInclude = { speaker: { select: { displayName: true } } } as const;

type SermonRow = PrismaSermon & { speaker: { displayName: string } };

function toSermonWithSpeaker(row: SermonRow): SermonWithSpeaker {
  return {
    ...row,
    date: row.date.toISOString().slice(0, 10),
    speaker: row.speaker.displayName,
  };
}

export async function getAllSermons(): Promise<SermonWithSpeaker[]> {
  const rows = await prisma.sermon.findMany({
    orderBy: { date: "desc" },
    include: speakerInclude,
  });
  return rows.map(toSermonWithSpeaker);
}

export async function getLatestSermon(): Promise<SermonWithSpeaker | null> {
  const row = await prisma.sermon.findFirst({
    orderBy: { date: "desc" },
    include: speakerInclude,
  });
  return row ? toSermonWithSpeaker(row) : null;
}

export async function getSermonBySlug(slug: string): Promise<SermonWithSpeaker | null> {
  const row = await prisma.sermon.findUnique({
    where: { slug },
    include: speakerInclude,
  });
  return row ? toSermonWithSpeaker(row) : null;
}

export async function getSermonSlugs(): Promise<string[]> {
  const rows = await prisma.sermon.findMany({ select: { slug: true } });
  return rows.map((row) => row.slug);
}

export async function getMoreInSeries(
  series: string,
  excludeSlug: string
): Promise<SermonWithSpeaker[]> {
  const rows = await prisma.sermon.findMany({
    where: { series, slug: { not: excludeSlug } },
    orderBy: { date: "desc" },
    include: speakerInclude,
  });
  return rows.map(toSermonWithSpeaker);
}