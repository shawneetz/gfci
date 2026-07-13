"use server";

import { prisma } from "@/lib/prisma";
import type { MutationResult } from "./types";

export interface LiveStreamInput {
  title: string;
  schedule: string;
  location: string;
}

export async function updateLiveStream(data: LiveStreamInput): Promise<MutationResult> {
  try {
    await prisma.liveStream.upsert({
      where: { id: "singleton" },
      update: data,
      create: { id: "singleton", ...data },
    });
    return { success: true };
  } catch (error) {
    console.error("updateLiveStream failed:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}