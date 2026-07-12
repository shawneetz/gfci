// Query layer for Ministry records. Server-only — call from Server
// Components or Server Actions, never from a "use client" file. Several
// current consumers (GivingForm, KidsForm, YouthForm, AdultsForm) are
// client components that import `@/data/ministries` directly today; in
// Phase 6 they'll receive ministry data as props from their nearest
// Server Component ancestor instead.

import "server-only";
import { prisma } from "@/lib/prisma";
import type { Ministry as PrismaMinistry } from "@/generated/prisma/client";

// The shape every Ministry-consuming component already expects (mirrors
// the legacy src/types/index.ts Ministry interface): a flat `leader`
// display-name string alongside the raw `leaderId`, not a nested Person
// relation object. Flattening here — once, in the query layer — keeps
// Phase 6 rewiring an import swap instead of a template rewrite in every
// consuming component.
export interface MinistryWithLeader extends PrismaMinistry {
  leader: string;
}

// Selecting only displayName (rather than a bare `include: { leader:
// true }`) keeps the join from pulling a whole Person row per ministry
// when all that's ever displayed is the one string.
const leaderInclude = { leader: { select: { displayName: true } } } as const;

// Full list, ordered for /ministries, the home preview grid, and the
// Giving form's fund dropdown — all three previously relied on
// src/data/ministries.ts's array position matching intent; `order` makes
// that explicit and admin-editable instead of implicit in array order.
export async function getAllMinistries(): Promise<MinistryWithLeader[]> {
  const rows = await prisma.ministry.findMany({
    orderBy: { order: "asc" },
    include: leaderInclude,
  });
  return rows.map((row) => ({ ...row, leader: row.leader.displayName }));
}

export async function getMinistryBySlug(slug: string): Promise<MinistryWithLeader | null> {
  const row = await prisma.ministry.findUnique({
    where: { slug },
    include: leaderInclude,
  });
  return row ? { ...row, leader: row.leader.displayName } : null;
}

// generateStaticParams only needs the slug column — avoid pulling every
// field (and the leader join) just to build the static route list.
export async function getMinistrySlugs(): Promise<string[]> {
  const rows = await prisma.ministry.findMany({ select: { slug: true } });
  return rows.map((row) => row.slug);
}