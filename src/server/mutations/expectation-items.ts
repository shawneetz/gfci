"use server";

// Admin actions for the "What to Expect" items shown on the Connect page.
import { prisma } from "@/lib/prisma";
import { toErrorResult, type MutationResult } from "./types";
import { requireAdmin } from "@/server/auth";
import { revalidateSite } from "@/server/revalidate";
import { intInRange, required, validateIcon } from "@/server/validation";

export interface ExpectationItemInput {
  icon: string;
  title: string;
  description: string;
  order: number;
}

// Checks and trims every field. Throws ValidationError on bad input.
function cleanExpectationItem(input: ExpectationItemInput): ExpectationItemInput {
  return {
    icon: validateIcon(input.icon),
    title: required(input.title, "Title", 120),
    description: required(input.description, "Description", 2000),
    order: intInRange(input.order, 0, 9999, "Display order"),
  };
}

export async function createExpectationItem(input: ExpectationItemInput): Promise<MutationResult> {
  try {
    await requireAdmin();
    const data = cleanExpectationItem(input);
    await prisma.expectationItem.create({ data });
    revalidateSite();
    return { success: true };
  } catch (error) {
    return toErrorResult(error);
  }
}

export async function updateExpectationItem(
  id: string,
  input: ExpectationItemInput
): Promise<MutationResult> {
  try {
    await requireAdmin();
    const data = cleanExpectationItem(input);
    await prisma.expectationItem.update({ where: { id }, data });
    revalidateSite();
    return { success: true };
  } catch (error) {
    return toErrorResult(error);
  }
}

export async function deleteExpectationItem(id: string): Promise<MutationResult> {
  try {
    await requireAdmin();
    await prisma.expectationItem.delete({ where: { id } });
    revalidateSite();
    return { success: true };
  } catch (error) {
    return toErrorResult(error, "Could not delete this item.");
  }
}
