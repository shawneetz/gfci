import "server-only";
import { prisma } from "@/lib/prisma";
import type { AnsweredPrayer } from "@/generated/prisma/client";

export type { AnsweredPrayer };

export function getAnsweredPrayers(): Promise<AnsweredPrayer[]> {
  return prisma.answeredPrayer.findMany({ orderBy: { createdAt: "asc" } });
}

export function getAnsweredPrayerById(id: string): Promise<AnsweredPrayer | null> {
  return prisma.answeredPrayer.findUnique({ where: { id } });
}