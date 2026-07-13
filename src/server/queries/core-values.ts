import "server-only";
import { prisma } from "@/lib/prisma";
import type { CoreValue } from "@/generated/prisma/client";

export type { CoreValue };

export function getCoreValues(): Promise<CoreValue[]> {
  return prisma.coreValue.findMany({ orderBy: { order: "asc" } });
}

export function getCoreValueById(id: string): Promise<CoreValue | null> {
  return prisma.coreValue.findUnique({ where: { id } });
}