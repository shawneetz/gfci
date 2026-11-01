"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { uniqueSlug } from "@/lib/slugify";
import { extractVideoUrl } from "@/lib/video";
import { resolveImageUrl } from "./image";
import { deleteImage } from "@/lib/storage";
import type { MutationResult } from "./types";
import { requireAdmin } from "@/server/auth";
import { revalidateSite } from "@/server/revalidate";

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

function revalidateSermonPaths() {
  revalidatePath("/sermons");
  revalidatePath("/sermons/[slug]", "page");
}

export async function createSermon(data: SermonInput, thumbnailFile: File | null): Promise<MutationResult> {
  try {
    await requireAdmin();
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
    revalidateSermonPaths();
    revalidateSite();
    return { success: true };
  } catch (error) {
    console.error("createSermon failed:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}

export async function updateSermon(
  id: string,
  data: SermonInput,
  thumbnailFile: File | null,
  _legacyCurrentThumbnail?: string
): Promise<MutationResult> {
  try {
    await requireAdmin();
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
    revalidateSermonPaths();
    revalidateSite();
    return { success: true };
  } catch (error) {
    console.error("updateSermon failed:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}

export async function deleteSermon(id: string): Promise<MutationResult> {
  try {
    await requireAdmin();
    const existing = await prisma.sermon.findUnique({ where: { id }, select: { thumbnail: true } });
    await prisma.sermon.delete({ where: { id } });
    await deleteImage(existing?.thumbnail);
    revalidateSermonPaths();
    revalidateSite();
    return { success: true };
  } catch (error) {
    console.error("deleteSermon failed:", error);
    return { success: false, error: "Could not delete this sermon." };
  }
}