// Query layer for Person records. Server-only — call from Server
// Components or Server Actions, never from a "use client" file.

import "server-only";
import { prisma } from "@/lib/prisma";
import type { Person } from "@/generated/prisma/client";

export type { Person };

// About > Leadership's grid. Ordered by leadershipOrder so the seed's
// explicit 1/2 ordering (Sarah Jenkins, then David Chen — see
// prisma/seed.ts) is preserved without the page needing to know the field
// exists; anyone with isLeadershipTeam: false is excluded entirely.
export function getLeadershipTeam(): Promise<Person[]> {
  return prisma.person.findMany({
    where: { isLeadershipTeam: true },
    orderBy: { leadershipOrder: "asc" },
  });
}

// Not consumed by any page yet, but a natural lookup once something needs
// a single Person outside a Ministry/Sermon relation (e.g. a future staff
// bio page).
export function getPersonById(id: string): Promise<Person | null> {
  return prisma.person.findUnique({ where: { id } });
}