import "server-only";
import { prisma } from "@/lib/prisma";
import type {
  PrayerRequestSubmission,
  GivingIntent,
  ConnectRegistration,
} from "@/generated/prisma/client";

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