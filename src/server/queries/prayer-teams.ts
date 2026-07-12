// Query layer for PrayerTeam records. Server-only — call from Server
// Components or Server Actions, never from a "use client" file.

import "server-only";
import { prisma } from "@/lib/prisma";
import type { PrayerTeam } from "@/generated/prisma/client";

export type { PrayerTeam };

// "Join a Prayer Team" list on /prayer-requests, ordered the same way the
// old src/data/prayer-teams.ts array was (Kids, Youth, Adults).
export function getPrayerTeams(): Promise<PrayerTeam[]> {
  return prisma.prayerTeam.findMany({ orderBy: { order: "asc" } });
}