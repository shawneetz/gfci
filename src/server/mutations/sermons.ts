"use server";

import { prisma } from "@/lib/prisma";
import { uniqueSlug } from "@/lib/slugify";
import { extractVideoUrl } from "@/lib/video";
import { deleteImage } from "@/lib/storage";
import { resolveImageUrl } from "./image";
import { toErrorResult, type MutationResult } from "./types";
import { requireAdmin } from "@/server/auth";
import { revalidateSite } from "@/server/revalidate";
import { ValidationError, isValidDate, optionalText, required } from "@/server/validation";

export interface SermonInput {
  title: string;
  series: string;
  date: string;
  videoUrl: string;
  summary: string;
  speakerId: string;
}

function cleanSermon(input: SermonInput) {
  if (!isValidDate(input.date)) {
    throw new ValidationError("Date is not valid.");
  }

  const rawVideo = optionalText(input.videoUrl, "Video URL", 1000);

  return {
    title: required(input.title, "Title", 120),
    series: required(input.series, "Series", 120),
    date: new Date(input.date),
    videoUrl: rawVideo ? extractVideoUrl(rawVideo) : null,
    summary: optionalText(input.summary, "Summary", 2000) || null,
    speakerId: required(input.speakerId, "Speaker", 100),
  };
}

async function slugExists(slug: string): Promise<boolean> {
  const existing = await prisma.sermon.findUnique({ where: { slug } });
  return !!existing;
}

export async function createSermon(input: SermonInput, thumbnailFile: File | null): Promise<MutationResult> {
  try {
    await requireAdmin();
    const data = cleanSermon(input);
    const thumbnail = await resolveImageUrl(thumbnailFile, "", "sermons");
    if (!thumbnail) return { success: false, error: "A thumbnail image is required." };
    const slug = await uniqueSlug(data.title, slugExists);

    await prisma.sermon.create({ data: { ...data, slug, thumbnail } });

    revalidateSite();
    return { success: true };
  } catch (error) {
    return toErrorResult(error);
  }
}

export async function updateSermon(
  id: string,
  input: SermonInput,
  thumbnailFile: File | null
): Promise<MutationResult> {
  try {
    await requireAdmin();
    const data = cleanSermon(input);
    const existing = await prisma.sermon.findUnique({ where: { id }, select: { thumbnail: true } });
    const thumbnail = await resolveImageUrl(thumbnailFile, existing?.thumbnail ?? "", "sermons");

    await prisma.sermon.update({ where: { id }, data: { ...data, thumbnail } });

    if (existing && existing.thumbnail !== thumbnail) await deleteImage(existing.thumbnail);

    revalidateSite();
    return { success: true };
  } catch (error) {
    return toErrorResult(error);
  }
}

export async function deleteSermon(id: string): Promise<MutationResult> {
  try {
    await requireAdmin();
    const existing = await prisma.sermon.findUnique({ where: { id }, select: { thumbnail: true } });
    await prisma.sermon.delete({ where: { id } });
    await deleteImage(existing?.thumbnail);

    revalidateSite();
    return { success: true };
  } catch (error) {
    return toErrorResult(error, "Could not delete this sermon.");
  }
}
