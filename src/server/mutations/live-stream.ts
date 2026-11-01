"use server";

import { prisma } from "@/lib/prisma";
import type { MutationResult } from "./types";
import { requireAdmin } from "@/server/auth";
import { revalidateSite } from "@/server/revalidate";

export interface LiveStreamInput {
  title: string;
  schedule: string;
  location: string;
  videoUrl?: string;
}

export async function updateLiveStream(data: LiveStreamInput): Promise<MutationResult> {
  try {
    await requireAdmin();
    await prisma.liveStream.upsert({
      where: { id: "singleton" },
      update: data,
      create: { id: "singleton", ...data },
    });
    revalidateSite();
    return { success: true };
  } catch (error) {
    console.error("updateLiveStream failed:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}