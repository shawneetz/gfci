"use server";

import { prisma } from "@/lib/prisma";
import { toErrorResult, type MutationResult } from "./types";
import { requireAdmin } from "@/server/auth";
import { revalidateSite } from "@/server/revalidate";
import type { PrayerCategory } from "@/generated/prisma/client";
import { required, validatePrayerCategory } from "@/server/validation";

export interface TestimonyInput {
  quote: string;
  name: string;
  category: PrayerCategory;
}
function validateTestimony(data: TestimonyInput): TestimonyInput {
  return {
    quote: required(data.quote, "Quote", 5000),
    name: required(data.name, "Name", 200),
    category: validatePrayerCategory(data.category) as PrayerCategory,
  };
}

export async function createTestimony(data: TestimonyInput): Promise<MutationResult> {
  try {
    await requireAdmin();
    data = validateTestimony(data);
    await prisma.answeredPrayer.create({ data });
    revalidateSite();
    return { success: true };
  } catch (error) {
    return toErrorResult(error);
  }
}

export async function updateTestimony(id: string, data: TestimonyInput): Promise<MutationResult> {
  try {
    await requireAdmin();
    data = validateTestimony(data);
    await prisma.answeredPrayer.update({ where: { id }, data });
    revalidateSite();
    return { success: true };
  } catch (error) {
    return toErrorResult(error);
  }
}

export async function deleteTestimony(id: string): Promise<MutationResult> {
  try {
    await requireAdmin();
    await prisma.answeredPrayer.delete({ where: { id } });
    revalidateSite();
    return { success: true };
  } catch (error) {
    return toErrorResult(error, "Could not delete this testimony.");
  }
}