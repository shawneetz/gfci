import "server-only";
import { prisma } from "@/lib/prisma";
import type { Ministry as PrismaMinistry } from "@/generated/prisma/client";

export interface MinistryWithLeader extends PrismaMinistry {
  leader: string;
}

const leaderInclude = { leader: { select: { displayName: true } } } as const;

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

export async function getMinistryById(id: string): Promise<MinistryWithLeader | null> {
  const row = await prisma.ministry.findUnique({
    where: { id },
    include: leaderInclude,
  });
  return row ? { ...row, leader: row.leader.displayName } : null;
}

export async function getMinistrySlugs(): Promise<string[]> {
  const rows = await prisma.ministry.findMany({ select: { slug: true } });
  return rows.map((row) => row.slug);
}