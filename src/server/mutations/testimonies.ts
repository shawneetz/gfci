"use server";

import { prisma } from "@/lib/prisma";
import type { MutationResult } from "./types";
import type { PrayerCategory } from "@/generated/prisma/client";

export interface TestimonyInput {
  quote: string;
  name: string;
  category: PrayerCategory;
}

export async function createTestimony(data: TestimonyInput): Promise<MutationResult> {
  try {
    await prisma.answeredPrayer.create({ data });
    return { success: true };
  } catch (error) {
    console.error("createTestimony failed:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}

export async function updateTestimony(id: string, data: TestimonyInput): Promise<MutationResult> {
  try {
    await prisma.answeredPrayer.update({ where: { id }, data });
    return { success: true };
  } catch (error) {
    console.error("updateTestimony failed:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}

export async function deleteTestimony(id: string): Promise<MutationResult> {
  try {
    await prisma.answeredPrayer.delete({ where: { id } });
    return { success: true };
  } catch (error) {
    console.error("deleteTestimony failed:", error);
    return { success: false, error: "Could not delete this testimony." };
  }
}