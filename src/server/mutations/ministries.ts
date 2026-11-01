"use server";

import { prisma } from "@/lib/prisma";
import { uniqueSlug } from "@/lib/slugify";
import { deleteImage } from "@/lib/storage";
import { resolveImageUrl } from "./image";
import { toErrorResult, type MutationResult } from "./types";
import { requireAdmin } from "@/server/auth";
import { revalidateSite } from "@/server/revalidate";
import { intInRange, required, validateEmail } from "@/server/validation";

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

function cleanMinistry(input: MinistryInput): MinistryInput {
  return {
    title: required(input.title, "Title", 120),
    tagline: required(input.tagline, "Tagline", 200),
    overview: required(input.overview, "Overview", 2000),
    imageAlt: required(input.imageAlt, "Image alt text", 200),
    audience: required(input.audience, "Audience", 200),
    schedule: required(input.schedule, "Schedule", 200),
    location: required(input.location, "Location", 200),
    contactEmail: validateEmail(input.contactEmail, "Contact email"),
    order: intInRange(input.order, 0, 9999, "Display order"),
    leaderId: required(input.leaderId, "Leader", 100),
  };
}

async function slugExists(slug: string): Promise<boolean> {
  const existing = await prisma.ministry.findUnique({ where: { slug } });
  return !!existing;
}

export async function createMinistry(input: MinistryInput, imageFile: File | null): Promise<MutationResult> {
  try {
    await requireAdmin();
    const data = cleanMinistry(input);
    const image = await resolveImageUrl(imageFile, "", "ministries");
    if (!image) return { success: false, error: "An image is required." };
    const slug = await uniqueSlug(data.title, slugExists);

    await prisma.ministry.create({ data: { ...data, slug, image } });

    revalidateSite();
    return { success: true };
  } catch (error) {
    return toErrorResult(error);
  }
}

export async function updateMinistry(
  id: string,
  input: MinistryInput,
  imageFile: File | null
): Promise<MutationResult> {
  try {
    await requireAdmin();
    const data = cleanMinistry(input);
    const existing = await prisma.ministry.findUnique({ where: { id }, select: { image: true } });
    const image = await resolveImageUrl(imageFile, existing?.image ?? "", "ministries");

    await prisma.ministry.update({ where: { id }, data: { ...data, image } });

    if (existing && existing.image !== image) await deleteImage(existing.image);

    revalidateSite();
    return { success: true };
  } catch (error) {
    return toErrorResult(error);
  }
}

export async function deleteMinistry(id: string): Promise<MutationResult> {
  try {
    await requireAdmin();
    const existing = await prisma.ministry.findUnique({ where: { id }, select: { image: true } });
    await prisma.ministry.delete({ where: { id } });
    await deleteImage(existing?.image);

    revalidateSite();
    return { success: true };
  } catch (error) {
    return toErrorResult(error, "Could not delete this ministry.");
  }
}
