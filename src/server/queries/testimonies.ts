// Query layer for AnsweredPrayer records. Server-only — call from Server
// Components or Server Actions, never from a "use client" file.

import "server-only";
import { prisma } from "@/lib/prisma";
import type { AnsweredPrayer } from "@/generated/prisma/client";

export type { AnsweredPrayer };

// "Answered Prayers" grid on /prayer-requests. Ordered oldest-first to
// match the fixed order the old src/data/testimonies.ts array rendered
// in — switch to `orderBy: { createdAt: "desc" }` once new testimonies
// are meant to surface above older ones.
export function getAnsweredPrayers(): Promise<AnsweredPrayer[]> {
  return prisma.answeredPrayer.findMany({ orderBy: { createdAt: "asc" } });
}