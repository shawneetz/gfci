"use server";

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

async function slugExists(slug: string, excludeId?: string): Promise<boolean> {
  const existing = await prisma.prayerTeam.findUnique({ where: { slug } });
  return !!existing && existing.id !== excludeId;
}
function validatePrayerTeam(data: PrayerTeamInput): PrayerTeamInput {
  return {
    name: required(data.name, "Name", 200),
    details: required(data.details, "Details", 5000),
    icon: validateIcon(data.icon),
    schedule: required(data.schedule, "Schedule", 300),
    order: intInRange(data.order, 0, 100000, "Order"),
  };
}

export async function createPrayerTeam(data: PrayerTeamInput): Promise<MutationResult> {
  try {
    await requireAdmin();
    data = validatePrayerTeam(data);
    const slug = await uniqueSlug(data.name, (s) => slugExists(s));
    await prisma.prayerTeam.create({ data: { ...data, slug } });
    revalidateSite();
    return { success: true };
  } catch (error) {
    return toErrorResult(error);
  }
}

export async function updatePrayerTeam(id: string, data: PrayerTeamInput): Promise<MutationResult> {
  try {
    await requireAdmin();
    data = validatePrayerTeam(data);
    const existing = await prisma.prayerTeam.findUnique({ where: { id } });
    const slug =
      existing && existing.name === data.name
        ? existing.slug
        : await uniqueSlug(data.name, (s) => slugExists(s, id));
    await prisma.prayerTeam.update({ where: { id }, data: { ...data, slug } });
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