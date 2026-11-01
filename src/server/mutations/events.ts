"use server";

import { prisma } from "@/lib/prisma";
import { resolveImageUrl } from "./image";
import { deleteImage } from "@/lib/storage";
import type { MutationResult } from "./types";
import { requireAdmin } from "@/server/auth";
import { revalidateSite } from "@/server/revalidate";
import type { EventCategory } from "@/generated/prisma/client";

export interface EventInput {
  title: string;
  date: string;
  time: string;
  category: EventCategory;
  location: string;
  description: string;
  featured: boolean;
}

function isUniqueFeaturedViolation(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: string }).code === "P2002"
  );
}

const FEATURED_ERROR =
  "Only one event can be featured at a time. Un-feature the current event first.";

export async function createEvent(data: EventInput, imageFile: File | null): Promise<MutationResult> {
  try {
    await requireAdmin();
    const image = await resolveImageUrl(imageFile, "", "events");
    if (!image) return { success: false, error: "An image is required." };

    await prisma.$transaction(async (tx) => {
      if (data.featured) await tx.event.updateMany({ where: { featured: true }, data: { featured: false } });
      await tx.event.create({ data: { ...data, date: new Date(data.date), image } });
    });
    revalidateSite();
    return { success: true };
  } catch (error) {
    if (isUniqueFeaturedViolation(error)) return { success: false, error: FEATURED_ERROR };
    console.error("createEvent failed:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}

export async function updateEvent(
  id: string,
  data: EventInput,
  imageFile: File | null,
  _legacyCurrentImage?: string
): Promise<MutationResult> {
  try {
    await requireAdmin();
    const existing = await prisma.event.findUnique({ where: { id }, select: { image: true } });
    const image = await resolveImageUrl(imageFile, existing?.image ?? "", "events");
    await prisma.$transaction(async (tx) => {
      if (data.featured) await tx.event.updateMany({ where: { featured: true, id: { not: id } }, data: { featured: false } });
      await tx.event.update({ where: { id }, data: { ...data, date: new Date(data.date), image } });
    });
    if (imageFile && existing?.image !== image) await deleteImage(existing?.image);
    revalidateSite();
    return { success: true };
  } catch (error) {
    if (isUniqueFeaturedViolation(error)) return { success: false, error: FEATURED_ERROR };
    console.error("updateEvent failed:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}

export async function deleteEvent(id: string): Promise<MutationResult> {
  try {
    await requireAdmin();
    const existing = await prisma.event.findUnique({ where: { id }, select: { image: true } });
    await prisma.event.delete({ where: { id } });
    await deleteImage(existing?.image);
    revalidateSite();
    return { success: true };
  } catch (error) {
    console.error("deleteEvent failed:", error);
    return { success: false, error: "Could not delete this event." };
  }
}