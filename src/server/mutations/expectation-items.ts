"use server";

import { prisma } from "@/lib/prisma";
import type { MutationResult } from "./types";

export interface ExpectationItemInput {
  icon: string;
  title: string;
  description: string;
  order: number;
}

export async function createExpectationItem(data: ExpectationItemInput): Promise<MutationResult> {
  try {
    await prisma.expectationItem.create({ data });
    return { success: true };
  } catch (error) {
    console.error("createExpectationItem failed:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}

export async function updateExpectationItem(id: string, data: ExpectationItemInput): Promise<MutationResult> {
  try {
    await prisma.expectationItem.update({ where: { id }, data });
    return { success: true };
  } catch (error) {
    console.error("updateExpectationItem failed:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}

export async function deleteExpectationItem(id: string): Promise<MutationResult> {
  try {
    await prisma.expectationItem.delete({ where: { id } });
    return { success: true };
  } catch (error) {
    console.error("deleteExpectationItem failed:", error);
    return { success: false, error: "Could not delete this item." };
  }
}