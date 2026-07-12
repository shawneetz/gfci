// Query layer for ExpectationItem records. Server-only — call from
// Server Components or Server Actions, never from a "use client" file.

import "server-only";
import { prisma } from "@/lib/prisma";
import type { ExpectationItem } from "@/generated/prisma/client";

export type { ExpectationItem };

// Connect page's "What to Expect" grid, in display order.
export function getExpectationItems(): Promise<ExpectationItem[]> {
  return prisma.expectationItem.findMany({ orderBy: { order: "asc" } });
}