"use server";

import { prisma } from "@/lib/prisma";
import { uniqueSlug } from "@/lib/slugify";
import { extractVideoUrl } from "@/lib/video";
import { resolveImageUrl } from "./image";
import { deleteImage } from "@/lib/storage";
import { toErrorResult, type MutationResult } from "./types";
import { requireAdmin } from "@/server/auth";
import { revalidateSite } from "@/server/revalidate";
import { isValidDate, optionalText, required, ValidationError } from "@/server/validation";

export interface SermonInput {
  title: string;
  series: string;
  date: string;
  videoUrl: string;
  summary: string;
  speakerId: string;
}

async function slugExists(slug: string, excludeId?: string): Promise<boolean> {
  const existing = await prisma.sermon.findUnique({ where: { slug } });
  return !!existing && existing.id !== excludeId;
}

function validateSermon(data: SermonInput): SermonInput {
  const date = required(data.date, "Date", 10);
  if (!isValidDate(date)) throw new ValidationError("Date must be a valid date.");
  return {
    title: required(data.title, "Title", 200),
    series: required(data.series, "Series", 200),
    date,
    videoUrl: optionalText(data.videoUrl, "Video URL", 500),
    summary: optionalText(data.summary, "Summary", 5000),
    speakerId: required(data.speakerId, "Speaker", 100),
  };
}

export async function createSermon(data: SermonInput, thumbnailFile: File | null): Promise<MutationResult> {
  try {
    await requireAdmin();
    data = validateSermon(data);
    const slug = await uniqueSlug(data.title, (s) => slugExists(s));
    const thumbnail = await resolveImageUrl(thumbnailFile, "", "sermons");
    if (!thumbnail) return { success: false, error: "A thumbnail image is required." };

    await prisma.sermon.create({
      data: {
        slug,
        title: data.title,
        series: data.series,
        date: new Date(data.date),
        thumbnail,
        // Accepts a plain link OR a pasted <iframe> embed snippet —
        // this normalizes either input down to a clean video URL before
        // it's stored, so the admin form shows a tidy link on re-edit.
        videoUrl: data.videoUrl ? extractVideoUrl(data.videoUrl) : null,
        summary: data.summary || null,
        speakerId: data.speakerId,
      },
    });
    revalidateSite();
    return { success: true };
  } catch (error) {
    return toErrorResult(error);
  }
}

export async function updateSermon(
  id: string,
  data: SermonInput,
  thumbnailFile: File | null
): Promise<MutationResult> {
  try {
    await requireAdmin();
    data = validateSermon(data);
    const existing = await prisma.sermon.findUnique({ where: { id } });
    const slug =
      existing && existing.title === data.title
        ? existing.slug
        : await uniqueSlug(data.title, (s) => slugExists(s, id));
    const thumbnail = await resolveImageUrl(thumbnailFile, existing?.thumbnail ?? "", "sermons");

    await prisma.sermon.update({
      where: { id },
      data: {
        slug,
        title: data.title,
        series: data.series,
        date: new Date(data.date),
        thumbnail,
        videoUrl: data.videoUrl ? extractVideoUrl(data.videoUrl) : null,
        summary: data.summary || null,
        speakerId: data.speakerId,
      },
    });
    if (thumbnailFile && existing?.thumbnail !== thumbnail) await deleteImage(existing?.thumbnail);
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