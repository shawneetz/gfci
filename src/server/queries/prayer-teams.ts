import "server-only";
import { prisma } from "@/lib/prisma";
import type { PrayerTeam } from "@/generated/prisma/client";

export type { PrayerTeam };

export function getPrayerTeams(): Promise<PrayerTeam[]> {
  return prisma.prayerTeam.findMany({ orderBy: { order: "asc" } });
}

export function getPrayerTeamById(id: string): Promise<PrayerTeam | null> {
  return prisma.prayerTeam.findUnique({ where: { id } });
}