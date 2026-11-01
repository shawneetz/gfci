"use server";

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
function validateCoreValue(data: CoreValueInput): CoreValueInput {
  return {
    icon: validateIcon(data.icon),
    title: required(data.title, "Title", 200),
    description: required(data.description, "Description", 5000),
    order: intInRange(data.order, 0, 100000, "Order"),
  };
}

export async function createCoreValue(data: CoreValueInput): Promise<MutationResult> {
  try {
    await requireAdmin();
    data = validateCoreValue(data);
    await prisma.coreValue.create({ data });
    revalidateSite();
    return { success: true };
  } catch (error) {
    return toErrorResult(error);
  }
}

export async function updateCoreValue(id: string, data: CoreValueInput): Promise<MutationResult> {
  try {
    await requireAdmin();
    data = validateCoreValue(data);
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