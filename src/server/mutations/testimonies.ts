"use server";

// Admin actions for answered-prayer testimonies: create, update, delete.
import { prisma } from "@/lib/prisma";
import { toErrorResult, type MutationResult } from "./types";
import { requireAdmin } from "@/server/auth";
import { revalidateSite } from "@/server/revalidate";
import { required, validatePrayerCategory } from "@/server/validation";
import type { PrayerCategory } from "@/generated/prisma/client";

export interface TestimonyInput {
  quote: string;
  name: string;
  category: PrayerCategory;
}

// Checks and trims every field. Throws ValidationError on bad input.
function cleanTestimony(input: TestimonyInput): TestimonyInput {
  return {
    quote: required(input.quote, "Quote", 2000),
    name: required(input.name, "Name", 100),
    category: validatePrayerCategory(input.category),
  };
}

export async function createTestimony(input: TestimonyInput): Promise<MutationResult> {
  try {
    await requireAdmin();
    const data = cleanTestimony(input);
    await prisma.answeredPrayer.create({ data });
    revalidateSite();
    return { success: true };
  } catch (error) {
    return toErrorResult(error);
  }
}

export async function updateTestimony(id: string, input: TestimonyInput): Promise<MutationResult> {
  try {
    await requireAdmin();
    const data = cleanTestimony(input);
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
