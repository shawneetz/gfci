// Service times (e.g. "Sundays" / "9:00 AM & 11:00 AM") for the About and Connect pages.
import "server-only";
import { prisma } from "@/lib/prisma";
import { siteConfig } from "@/config/site";
import type { ServiceTime } from "@/generated/prisma/client";

// Returns the saved service times, or the defaults from siteConfig when none exist yet.
export async function getServiceTimes(): Promise<ServiceTime[]> {
  const rows = await prisma.serviceTime.findMany({
    orderBy: [{ order: "asc" }, { id: "asc" }],
  });

  if (rows.length > 0) return rows;

  // Fallback: shaped like database rows so callers don't need to care where they came from.
  return siteConfig.serviceTimes.map((item, order) => ({
    id: `default-${order}`,
    label: item.label,
    time: item.time,
    order,
  }));
}

export function getServiceTimeById(id: string): Promise<ServiceTime | null> {
  return prisma.serviceTime.findUnique({ where: { id } });
}
