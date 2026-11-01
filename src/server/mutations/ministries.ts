"use server";

import { prisma } from "@/lib/prisma";
import { uniqueSlug } from "@/lib/slugify";
import { resolveImageUrl } from "./image";
import { deleteImage } from "@/lib/storage";
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

async function slugExists(slug: string, excludeId?: string): Promise<boolean> {
  const existing = await prisma.ministry.findUnique({ where: { slug } });
  return !!existing && existing.id !== excludeId;
}

function validateMinistry(data: MinistryInput): MinistryInput {
  return {
    title: required(data.title, "Title", 200),
    tagline: required(data.tagline, "Tagline", 500),
    overview: required(data.overview, "Overview", 5000),
    imageAlt: required(data.imageAlt, "Image alt text", 300),
    audience: required(data.audience, "Audience", 300),
    schedule: required(data.schedule, "Schedule", 300),
    location: required(data.location, "Location", 300),
    contactEmail: validateEmail(data.contactEmail, "Contact email"),
    order: intInRange(data.order, 0, 100000, "Order"),
    leaderId: required(data.leaderId, "Leader", 100),
  };
}

export async function createMinistry(data: MinistryInput, imageFile: File | null): Promise<MutationResult> {
  try {
    await requireAdmin();
    data = validateMinistry(data);
    const slug = await uniqueSlug(data.title, (s) => slugExists(s));
    const image = await resolveImageUrl(imageFile, "", "ministries");
    if (!image) return { success: false, error: "An image is required." };

    await prisma.ministry.create({ data: { ...data, slug, image } });
    revalidateSite();
    return { success: true };
  } catch (error) {
    return toErrorResult(error);
  }
}

export async function updateMinistry(
  id: string,
  data: MinistryInput,
  imageFile: File | null
): Promise<MutationResult> {
  try {
    await requireAdmin();
    data = validateMinistry(data);
    const existing = await prisma.ministry.findUnique({ where: { id } });
    const slug =
      existing && existing.title === data.title
        ? existing.slug
        : await uniqueSlug(data.title, (s) => slugExists(s, id));
    const image = await resolveImageUrl(imageFile, existing?.image ?? "", "ministries");

    await prisma.ministry.update({ where: { id }, data: { ...data, slug, image } });
    if (imageFile && existing?.image !== image) await deleteImage(existing?.image);
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