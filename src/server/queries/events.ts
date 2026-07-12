// Query layer for Event records. Server-only — call from Server
// Components or Server Actions, never from a "use client" file.

import "server-only";
import { prisma } from "@/lib/prisma";
import type { Event as PrismaEvent } from "@/generated/prisma/client";

// Mirrors the legacy src/types/index.ts ChurchEvent shape: `date` is a
// "YYYY-MM-DD" string, not a Date object, since every date formatter in
// lib/utils.ts (formatDate, formatWeekday, formatMonthShort, formatDay,
// getMonthKey) takes a string. Converting once here — instead of at every
// call site, or inside those formatters — keeps them untouched.
export interface ChurchEvent extends Omit<PrismaEvent, "date"> {
  date: string;
}

function toChurchEvent(row: PrismaEvent): ChurchEvent {
  return { ...row, date: row.date.toISOString().slice(0, 10) };
}

// Full list, oldest first. events/page.tsx and events/archive/page.tsx
// both need every event to run their own tab/category/month filtering in
// memory — same pattern the old src/data/events.ts array used, just
// sourced from the DB now. Category filtering deliberately stays
// in-memory rather than moving into the query: the page applies tab +
// category + month together, and the dataset is small enough that a
// narrower query per combination isn't worth the added complexity.
export async function getAllEvents(): Promise<ChurchEvent[]> {
  const rows = await prisma.event.findMany({ orderBy: { date: "asc" } });
  return rows.map(toChurchEvent);
}

// The single featured event shown above the Events list. At most one row
// should have featured: true — enforced by convention (see the comment
// on Event.featured in prisma/schema.prisma), not a DB constraint.
export async function getFeaturedEvent(): Promise<ChurchEvent | null> {
  const row = await prisma.event.findFirst({ where: { featured: true } });
  return row ? toChurchEvent(row) : null;
}

// Home page's "Upcoming Events" preview. Unlike the old
// `events.slice(0, 2)`, this filters on date >= now directly, so a past
// event can never appear in the preview just because of its position in
// a hardcoded array.
export async function getUpcomingEventsPreview(limit = 2): Promise<ChurchEvent[]> {
  const rows = await prisma.event.findMany({
    where: { date: { gte: new Date() } },
    orderBy: { date: "asc" },
    take: limit,
  });
  return rows.map(toChurchEvent);
}