import "server-only";
import { prisma } from "@/lib/prisma";
import type { ExpectationItem } from "@/generated/prisma/client";

export type { ExpectationItem };

export function getExpectationItems(): Promise<ExpectationItem[]> {
  return prisma.expectationItem.findMany({ orderBy: { order: "asc" } });
}

export function getExpectationItemById(id: string): Promise<ExpectationItem | null> {
  return prisma.expectationItem.findUnique({ where: { id } });
}