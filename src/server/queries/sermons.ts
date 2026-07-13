import "server-only";
import { prisma } from "@/lib/prisma";
import type { Sermon as PrismaSermon } from "@/generated/prisma/client";

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

export async function getSermonById(id: string): Promise<SermonWithSpeaker | null> {
  const row = await prisma.sermon.findUnique({
    where: { id },
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