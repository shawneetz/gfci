"use server";

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
function validateExpectationItem(data: ExpectationItemInput): ExpectationItemInput {
  return {
    icon: validateIcon(data.icon),
    title: required(data.title, "Title", 200),
    description: required(data.description, "Description", 5000),
    order: intInRange(data.order, 0, 100000, "Order"),
  };
}

export async function createExpectationItem(data: ExpectationItemInput): Promise<MutationResult> {
  try {
    await requireAdmin();
    data = validateExpectationItem(data);
    await prisma.expectationItem.create({ data });
    revalidateSite();
    return { success: true };
  } catch (error) {
    return toErrorResult(error);
  }
}

export async function updateExpectationItem(id: string, data: ExpectationItemInput): Promise<MutationResult> {
  try {
    await requireAdmin();
    data = validateExpectationItem(data);
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