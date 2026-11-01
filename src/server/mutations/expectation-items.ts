"use server";

import { prisma } from "@/lib/prisma";
import type { MutationResult } from "./types";
import { requireAdmin } from "@/server/auth";
import { revalidateSite } from "@/server/revalidate";

export interface ExpectationItemInput {
  icon: string;
  title: string;
  description: string;
  order: number;
}

export async function createExpectationItem(data: ExpectationItemInput): Promise<MutationResult> {
  try {
    await requireAdmin();
    await prisma.expectationItem.create({ data });
    revalidateSite();
    return { success: true };
  } catch (error) {
    console.error("createExpectationItem failed:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}

export async function updateExpectationItem(id: string, data: ExpectationItemInput): Promise<MutationResult> {
  try {
    await requireAdmin();
    await prisma.expectationItem.update({ where: { id }, data });
    revalidateSite();
    return { success: true };
  } catch (error) {
    console.error("updateExpectationItem failed:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}

export async function deleteExpectationItem(id: string): Promise<MutationResult> {
  try {
    await requireAdmin();
    await prisma.expectationItem.delete({ where: { id } });
    revalidateSite();
    return { success: true };
  } catch (error) {
    console.error("deleteExpectationItem failed:", error);
    return { success: false, error: "Could not delete this item." };
  }
}