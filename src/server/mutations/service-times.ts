"use server";

// Admin actions for service times (e.g. "Sundays" / "9:00 AM & 11:00 AM").
// They show on the About and Connect pages.
import { prisma } from "@/lib/prisma";
import { toErrorResult, type MutationResult } from "./types";
import { requireAdmin } from "@/server/auth";
import { revalidateSite } from "@/server/revalidate";
import { intInRange, required } from "@/server/validation";

export interface ServiceTimeInput {
  label: string;
  time: string;
  order: number;
}

// Checks and trims every field. Throws ValidationError on bad input.
function cleanServiceTime(input: ServiceTimeInput): ServiceTimeInput {
  return {
    label: required(input.label, "Label", 100),
    time: required(input.time, "Time", 100),
    order: intInRange(input.order, 0, 9999, "Display order"),
  };
}

export async function createServiceTime(input: ServiceTimeInput): Promise<MutationResult> {
  try {
    await requireAdmin();
    const data = cleanServiceTime(input);
    await prisma.serviceTime.create({ data });
    revalidateSite();
    return { success: true };
  } catch (error) {
    return toErrorResult(error, "Could not save service time.");
  }
}

export async function updateServiceTime(id: string, input: ServiceTimeInput): Promise<MutationResult> {
  try {
    await requireAdmin();
    const data = cleanServiceTime(input);
    await prisma.serviceTime.update({ where: { id }, data });
    revalidateSite();
    return { success: true };
  } catch (error) {
    return toErrorResult(error, "Could not save service time.");
  }
}

export async function deleteServiceTime(id: string): Promise<MutationResult> {
  try {
    await requireAdmin();
    await prisma.serviceTime.delete({ where: { id } });
    revalidateSite();
    return { success: true };
  } catch (error) {
    return toErrorResult(error, "Could not delete service time.");
  }
}
