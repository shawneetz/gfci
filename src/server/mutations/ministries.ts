"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { uniqueSlug } from "@/lib/slugify";
import { resolveImageUrl } from "./image";
import type { MutationResult } from "./types";

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
    const slug = await uniqueSlug(data.title, (s) => slugExists(s));
    const image = await resolveImageUrl(imageFile, "", "ministries");
    if (!image) return { success: false, error: "An image is required." };

    await prisma.ministry.create({ data: { ...data, slug, image } });
    revalidateMinistryPaths();
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
  currentImage: string
): Promise<MutationResult> {
  try {
    const existing = await prisma.ministry.findUnique({ where: { id } });
    const slug =
      existing && existing.title === data.title
        ? existing.slug
        : await uniqueSlug(data.title, (s) => slugExists(s, id));
    const image = await resolveImageUrl(imageFile, currentImage, "ministries");

    await prisma.ministry.update({ where: { id }, data: { ...data, slug, image } });
    revalidateMinistryPaths();
    return { success: true };
  } catch (error) {
    console.error("updateMinistry failed:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}

export async function deleteMinistry(id: string): Promise<MutationResult> {
  try {
    await prisma.ministry.delete({ where: { id } });
    revalidateMinistryPaths();
    return { success: true };
  } catch (error) {
    console.error("deleteMinistry failed:", error);
    return { success: false, error: "Could not delete this ministry." };
  }
}