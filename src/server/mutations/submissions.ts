"use server";

import { prisma } from "@/lib/prisma";
import { toErrorResult, type MutationResult } from "./types";
import { requireAdmin } from "@/server/auth";
import { revalidateSite } from "@/server/revalidate";

export async function deletePrayerRequestSubmission(id: string): Promise<MutationResult> {
  try {
    await requireAdmin();
    await prisma.prayerRequestSubmission.delete({ where: { id } });
    revalidateSite();
    return { success: true };
  } catch (error) {
    return toErrorResult(error, "Could not delete this submission.");
  }
}

export async function deleteGivingIntent(id: string): Promise<MutationResult> {
  try {
    await requireAdmin();
    await prisma.givingIntent.delete({ where: { id } });
    revalidateSite();
    return { success: true };
  } catch (error) {
    return toErrorResult(error, "Could not delete this submission.");
  }
}

export async function deleteConnectRegistration(id: string): Promise<MutationResult> {
  try {
    await requireAdmin();
    await prisma.connectRegistration.delete({ where: { id } });
    revalidateSite();
    return { success: true };
  } catch (error) {
    return toErrorResult(error, "Could not delete this submission.");
  }
}