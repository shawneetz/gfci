// Query layer for the LiveStream singleton. Server-only — call from
// Server Components or Server Actions, never from a "use client" file.

import "server-only";
import { prisma } from "@/lib/prisma";
import type { LiveStream } from "@/generated/prisma/client";

export type { LiveStream };

// Always exactly one row, fixed id "singleton" (see prisma/schema.prisma
// and prisma/seed.ts). Returns null only if that row was never seeded —
// callers should fall back to the placeholder copy in src/content/live.ts
// in that case rather than crashing the page.
export function getLiveStream(): Promise<LiveStream | null> {
  return prisma.liveStream.findUnique({ where: { id: "singleton" } });
}