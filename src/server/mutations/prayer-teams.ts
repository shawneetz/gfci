"use server";

import { prisma } from "@/lib/prisma";
import { uniqueSlug } from "@/lib/slugify";
import type { MutationResult } from "./types";

export interface PrayerTeamInput {
  name: string;
  details: string;
  image: string;
  schedule: string;
  order: number;
}

async function slugExists(slug: string, excludeId?: string): Promise<boolean> {
  const existing = await prisma.prayerTeam.findUnique({ where: { slug } });
  return !!existing && existing.id !== excludeId;
}

export async function createPrayerTeam(data: PrayerTeamInput): Promise<MutationResult> {
  try {
    const slug = await uniqueSlug(data.name, (s) => slugExists(s));
    await prisma.prayerTeam.create({ data: { ...data, slug } });
    return { success: true };
  } catch (error) {
    console.error("createPrayerTeam failed:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}

export async function updatePrayerTeam(id: string, data: PrayerTeamInput): Promise<MutationResult> {
  try {
    const existing = await prisma.prayerTeam.findUnique({ where: { id } });
    const slug =
      existing && existing.name === data.name
        ? existing.slug
        : await uniqueSlug(data.name, (s) => slugExists(s, id));
    await prisma.prayerTeam.update({ where: { id }, data: { ...data, slug } });
    return { success: true };
  } catch (error) {
    console.error("updatePrayerTeam failed:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}

export async function deletePrayerTeam(id: string): Promise<MutationResult> {
  try {
    await prisma.prayerTeam.delete({ where: { id } });
    return { success: true };
  } catch (error) {
    console.error("deletePrayerTeam failed:", error);
    return { success: false, error: "Could not delete this prayer team." };
  }
}