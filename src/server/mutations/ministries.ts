"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { uniqueSlug } from "@/lib/slugify";
import { resolveImageUrl } from "./image";
import { deleteImage } from "@/lib/storage";
import type { MutationResult } from "./types";
import { requireAdmin } from "@/server/auth";
import { revalidateSite } from "@/server/revalidate";

export interface MinistryInput {
  title: string;
  tagline: string;
  overview: string;
  imageAlt: string;
  audience: string;
  schedule: string;
  location: string;
  contactEmail: string;
  order: number;
  leaderId: string;
}

async function slugExists(slug: string, excludeId?: string): Promise<boolean> {
  const existing = await prisma.ministry.findUnique({ where: { slug } });
  return !!existing && existing.id !== excludeId;
}

function revalidateMinistryPaths() {
  revalidatePath("/ministries");
  revalidatePath("/ministries/[slug]", "page");
}

export async function createMinistry(data: MinistryInput, imageFile: File | null): Promise<MutationResult> {
  try {
    await requireAdmin();
    const slug = await uniqueSlug(data.title, (s) => slugExists(s));
    const image = await resolveImageUrl(imageFile, "", "ministries");
    if (!image) return { success: false, error: "An image is required." };

    await prisma.ministry.create({ data: { ...data, slug, image } });
    revalidateMinistryPaths();
    revalidateSite();
    return { success: true };
  } catch (error) {
    console.error("createMinistry failed:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}

export async function updateMinistry(
  id: string,
  data: MinistryInput,
  imageFile: File | null,
  _legacyCurrentImage?: string
): Promise<MutationResult> {
  try {
    await requireAdmin();
    const existing = await prisma.ministry.findUnique({ where: { id } });
    const slug =
      existing && existing.title === data.title
        ? existing.slug
        : await uniqueSlug(data.title, (s) => slugExists(s, id));
    const image = await resolveImageUrl(imageFile, existing?.image ?? "", "ministries");

    await prisma.ministry.update({ where: { id }, data: { ...data, slug, image } });
    if (imageFile && existing?.image !== image) await deleteImage(existing?.image);
    revalidateMinistryPaths();
    revalidateSite();
    return { success: true };
  } catch (error) {
    console.error("updateMinistry failed:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}

export async function deleteMinistry(id: string): Promise<MutationResult> {
  try {
    await requireAdmin();
    const existing = await prisma.ministry.findUnique({ where: { id }, select: { image: true } });
    await prisma.ministry.delete({ where: { id } });
    await deleteImage(existing?.image);
    revalidateMinistryPaths();
    revalidateSite();
    return { success: true };
  } catch (error) {
    console.error("deleteMinistry failed:", error);
    return { success: false, error: "Could not delete this ministry." };
  }
}