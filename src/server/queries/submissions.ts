import "server-only";
import { prisma } from "@/lib/prisma";
import type {
  PrayerRequestSubmission,
  GivingIntent,
  ConnectRegistration,
} from "@/generated/prisma/client";
import type { Paged } from "./types";

export type { PrayerRequestSubmission, GivingIntent, ConnectRegistration };

export function getPrayerRequestSubmissions(): Promise<PrayerRequestSubmission[]> {
  return prisma.prayerRequestSubmission.findMany({ orderBy: { createdAt: "desc" } });
}

export function getGivingIntents(): Promise<GivingIntent[]> {
  return prisma.givingIntent.findMany({ orderBy: { createdAt: "desc" } });
}

export function getConnectRegistrations(): Promise<ConnectRegistration[]> {
  return prisma.connectRegistration.findMany({ orderBy: { createdAt: "desc" } });
}

const pageSize = 20;
export async function getPrayerRequestSubmissionsPage(page = 1): Promise<Paged<PrayerRequestSubmission>> {
  page = Math.max(1, page); const [rows, total] = await prisma.$transaction([
    prisma.prayerRequestSubmission.findMany({ orderBy: { createdAt: "desc" }, skip: (page - 1) * pageSize, take: pageSize }),
    prisma.prayerRequestSubmission.count(),
  ]); return { rows, total, page, pageCount: Math.max(1, Math.ceil(total / pageSize)) };
}
export async function getGivingIntentsPage(page = 1): Promise<Paged<GivingIntent>> {
  page = Math.max(1, page); const [rows, total] = await prisma.$transaction([
    prisma.givingIntent.findMany({ orderBy: { createdAt: "desc" }, skip: (page - 1) * pageSize, take: pageSize }), prisma.givingIntent.count(),
  ]); return { rows, total, page, pageCount: Math.max(1, Math.ceil(total / pageSize)) };
}
export async function getConnectRegistrationsPage(page = 1): Promise<Paged<ConnectRegistration>> {
  page = Math.max(1, page); const [rows, total] = await prisma.$transaction([
    prisma.connectRegistration.findMany({ orderBy: { createdAt: "desc" }, skip: (page - 1) * pageSize, take: pageSize }), prisma.connectRegistration.count(),
  ]); return { rows, total, page, pageCount: Math.max(1, Math.ceil(total / pageSize)) };
}