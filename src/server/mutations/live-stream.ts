"use server";

// Admin action for the single Live Stream row shown on /live.
import { prisma } from "@/lib/prisma";
import { extractVideoUrl } from "@/lib/video";
import { toErrorResult, type MutationResult } from "./types";
import { requireAdmin } from "@/server/auth";
import { revalidateSite } from "@/server/revalidate";
import { optionalText, required } from "@/server/validation";

export interface LiveStreamInput {
  title: string;
  schedule: string;
  location: string;
  // Optional: the admin form only sends it once the video field exists (Phase 19).
  videoUrl?: string;
}

export async function updateLiveStream(input: LiveStreamInput): Promise<MutationResult> {
  try {
    await requireAdmin();

    const data: {
      title: string;
      schedule: string;
      location: string;
      videoUrl?: string | null;
    } = {
      title: required(input.title, "Title", 200),
      schedule: required(input.schedule, "Schedule", 200),
      location: required(input.location, "Location", 200),
    };

    // Only touch videoUrl when the form sent it, so older forms never wipe it.
    if (input.videoUrl !== undefined) {
      // Accepts a plain link or a pasted <iframe> snippet; stores a clean link (or null).
      const rawVideo = optionalText(input.videoUrl, "Stream URL", 1000);
      data.videoUrl = rawVideo ? extractVideoUrl(rawVideo) : null;
    }

    // There is only ever one row, with the fixed id "singleton".
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
