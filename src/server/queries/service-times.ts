import "server-only";
import { prisma } from "@/lib/prisma";
import { siteConfig } from "@/config/site";
export function getServiceTimes() {
  return prisma.serviceTime.findMany({ orderBy: [{ order: "asc" }, { id: "asc" }] }).then(rows => rows.length ? rows : siteConfig.serviceTimes.map((x, order) => ({ id: `default-${order}`, label: x.label, time: x.time, order })));
}
export function getServiceTimeById(id: string) { return prisma.serviceTime.findUnique({ where: { id } }); }
