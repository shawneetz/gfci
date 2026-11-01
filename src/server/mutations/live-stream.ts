"use server";

import { prisma } from "@/lib/prisma";
import { toErrorResult, type MutationResult } from "./types";
import { requireAdmin } from "@/server/auth";
import { revalidateSite } from "@/server/revalidate";
import { required, validHttpsUrl } from "@/server/validation";

export interface LiveStreamInput {
  title: string;
  schedule: string;
  location: string;
  videoUrl?: string;
}
function validateLiveStream(data: LiveStreamInput): LiveStreamInput {
  return {
    title: required(data.title, "Title", 200),
    schedule: required(data.schedule, "Schedule", 300),
    location: required(data.location, "Location", 300),
    videoUrl: validHttpsUrl(data.videoUrl, "Video URL"),
  };
}

export async function updateLiveStream(data: LiveStreamInput): Promise<MutationResult> {
  try {
    await requireAdmin();
    data = validateLiveStream(data);
    await prisma.liveStream.upsert({
      where: { id: "singleton" },
      update: data,
      create: { id: "singleton", ...data },
    });
    revalidateSite();
    return { success: true };
  } catch (error) {
    return toErrorResult(error);
  }
}