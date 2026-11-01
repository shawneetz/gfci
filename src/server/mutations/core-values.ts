"use server";

// Admin actions for the Core Values shown on the About page.
import { prisma } from "@/lib/prisma";
import { toErrorResult, type MutationResult } from "./types";
import { requireAdmin } from "@/server/auth";
import { revalidateSite } from "@/server/revalidate";
import { intInRange, required, validateIcon } from "@/server/validation";

export interface CoreValueInput {
  icon: string;
  title: string;
  description: string;
  order: number;
}

// Checks and trims every field. Throws ValidationError on bad input.
function cleanCoreValue(input: CoreValueInput): CoreValueInput {
  return {
    icon: validateIcon(input.icon),
    title: required(input.title, "Title", 120),
    description: required(input.description, "Description", 2000),
    order: intInRange(input.order, 0, 9999, "Display order"),
  };
}

export async function createCoreValue(input: CoreValueInput): Promise<MutationResult> {
  try {
    await requireAdmin();
    const data = cleanCoreValue(input);
    await prisma.coreValue.create({ data });
    revalidateSite();
    return { success: true };
  } catch (error) {
    return toErrorResult(error);
  }
}

export async function updateCoreValue(id: string, input: CoreValueInput): Promise<MutationResult> {
  try {
    await requireAdmin();
    const data = cleanCoreValue(input);
    await prisma.coreValue.update({ where: { id }, data });
    revalidateSite();
    return { success: true };
  } catch (error) {
    return toErrorResult(error);
  }
}

export async function deleteCoreValue(id: string): Promise<MutationResult> {
  try {
    await requireAdmin();
    await prisma.coreValue.delete({ where: { id } });
    revalidateSite();
    return { success: true };
  } catch (error) {
    return toErrorResult(error, "Could not delete this core value.");
  }
}
