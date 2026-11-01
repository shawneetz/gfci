"use server";

// Admin actions for prayer teams: create, update, delete.
// The slug is created once and never changes after that.
import { prisma } from "@/lib/prisma";
import { uniqueSlug } from "@/lib/slugify";
import { toErrorResult, type MutationResult } from "./types";
import { requireAdmin } from "@/server/auth";
import { revalidateSite } from "@/server/revalidate";
import { intInRange, required, validateIcon } from "@/server/validation";

export interface PrayerTeamInput {
  name: string;
  details: string;
  icon: string;
  schedule: string;
  order: number;
}

// Checks and trims every field. Throws ValidationError on bad input.
function cleanPrayerTeam(input: PrayerTeamInput): PrayerTeamInput {
  return {
    name: required(input.name, "Name", 120),
    details: required(input.details, "Details", 2000),
    icon: validateIcon(input.icon),
    schedule: required(input.schedule, "Schedule", 200),
    order: intInRange(input.order, 0, 9999, "Display order"),
  };
}

async function slugExists(slug: string): Promise<boolean> {
  const existing = await prisma.prayerTeam.findUnique({ where: { slug } });
  return !!existing;
}

export async function createPrayerTeam(input: PrayerTeamInput): Promise<MutationResult> {
  try {
    await requireAdmin();
    const data = cleanPrayerTeam(input);
    // The slug is only generated here, so renaming later keeps it the same.
    const slug = await uniqueSlug(data.name, slugExists);
    await prisma.prayerTeam.create({ data: { ...data, slug } });
    revalidateSite();
    return { success: true };
  } catch (error) {
    return toErrorResult(error);
  }
}

export async function updatePrayerTeam(id: string, input: PrayerTeamInput): Promise<MutationResult> {
  try {
    await requireAdmin();
    const data = cleanPrayerTeam(input);
    // No slug here on purpose: it stays the same after creation.
    await prisma.prayerTeam.update({ where: { id }, data });
    revalidateSite();
    return { success: true };
  } catch (error) {
    return toErrorResult(error);
  }
}

export async function deletePrayerTeam(id: string): Promise<MutationResult> {
  try {
    await requireAdmin();
    await prisma.prayerTeam.delete({ where: { id } });
    revalidateSite();
    return { success: true };
  } catch (error) {
    return toErrorResult(error, "Could not delete this prayer team.");
  }
}
