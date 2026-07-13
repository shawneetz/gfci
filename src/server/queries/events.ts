import "server-only";
import { prisma } from "@/lib/prisma";
import type { Event as PrismaEvent } from "@/generated/prisma/client";

export interface ChurchEvent extends Omit<PrismaEvent, "date"> {
  date: string;
}

function toChurchEvent(row: PrismaEvent): ChurchEvent {
  return { ...row, date: row.date.toISOString().slice(0, 10) };
}

export async function getAllEvents(): Promise<ChurchEvent[]> {
  const rows = await prisma.event.findMany({ orderBy: { date: "asc" } });
  return rows.map(toChurchEvent);
}

export async function getEventById(id: string): Promise<ChurchEvent | null> {
  const row = await prisma.event.findUnique({ where: { id } });
  return row ? toChurchEvent(row) : null;
}

export async function getFeaturedEvent(): Promise<ChurchEvent | null> {
  const row = await prisma.event.findFirst({ where: { featured: true } });
  return row ? toChurchEvent(row) : null;
}

export async function getUpcomingEventsPreview(limit = 2): Promise<ChurchEvent[]> {
  const rows = await prisma.event.findMany({
    where: { date: { gte: new Date() } },
    orderBy: { date: "asc" },
    take: limit,
  });
  return rows.map(toChurchEvent);
}