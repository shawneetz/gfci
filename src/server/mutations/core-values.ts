"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import type { MutationResult } from "./types";
import { requireAdmin } from "@/server/auth";
import { revalidateSite } from "@/server/revalidate";

export interface CoreValueInput {
  icon: string;
  title: string;
  description: string;
  order: number;
}

export async function createCoreValue(data: CoreValueInput): Promise<MutationResult> {
  try {
    await requireAdmin();
    await prisma.coreValue.create({ data });
    revalidatePath("/about");
    revalidateSite();
    return { success: true };
  } catch (error) {
    console.error("createCoreValue failed:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}

export async function updateCoreValue(id: string, data: CoreValueInput): Promise<MutationResult> {
  try {
    await requireAdmin();
    await prisma.coreValue.update({ where: { id }, data });
    revalidatePath("/about");
    revalidateSite();
    return { success: true };
  } catch (error) {
    console.error("updateCoreValue failed:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}

export async function deleteCoreValue(id: string): Promise<MutationResult> {
  try {
    await requireAdmin();
    await prisma.coreValue.delete({ where: { id } });
    revalidatePath("/about");
    revalidateSite();
    return { success: true };
  } catch (error) {
    console.error("deleteCoreValue failed:", error);
    return { success: false, error: "Could not delete this core value." };
  }
}