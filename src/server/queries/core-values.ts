// Query layer for CoreValue records. Server-only — call from Server
// Components or Server Actions, never from a "use client" file.

import "server-only";
import { prisma } from "@/lib/prisma";
import type { CoreValue } from "@/generated/prisma/client";

export type { CoreValue };

// About page's "Core Values" grid, in display order.
export function getCoreValues(): Promise<CoreValue[]> {
  return prisma.coreValue.findMany({ orderBy: { order: "asc" } });
}