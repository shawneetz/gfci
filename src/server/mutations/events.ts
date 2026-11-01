"use server";

// Admin actions for events: create, update, delete.
// Each action: check admin -> validate -> write -> refresh the site.
import { prisma } from "@/lib/prisma";
import { deleteImage } from "@/lib/storage";
import { resolveImageUrl } from "./image";
import { toErrorResult, type MutationResult } from "./types";
import { requireAdmin } from "@/server/auth";
import { revalidateSite } from "@/server/revalidate";
import {
  ValidationError,
  isValidDate,
  required,
  validateEventCategory,
} from "@/server/validation";
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

// Checks and trims every field. Throws ValidationError on bad input.
function cleanEvent(input: EventInput): EventInput {
  if (!isValidDate(input.date)) {
    throw new ValidationError("Date is not valid.");
  }

  return {
    title: required(input.title, "Title", 120),
    date: input.date,
    time: required(input.time, "Time", 40),
    category: validateEventCategory(input.category),
    location: required(input.location, "Location", 200),
    description: required(input.description, "Description", 2000),
    featured: input.featured === true,
  };
}

export async function createEvent(input: EventInput, imageFile: File | null): Promise<MutationResult> {
  try {
    await requireAdmin();
    const data = cleanEvent(input);
    const image = await resolveImageUrl(imageFile, "", "events");
    if (!image) return { success: false, error: "An image is required." };

    // Only one event can be featured, so un-feature the others first (same transaction).
    await prisma.$transaction(async (tx) => {
      if (data.featured) {
        await tx.event.updateMany({ where: { featured: true }, data: { featured: false } });
      }
      await tx.event.create({ data: { ...data, date: new Date(data.date), image } });
    });

    revalidateSite();
    return { success: true };
  } catch (error) {
    return toErrorResult(error);
  }
}

export async function updateEvent(
  id: string,
  input: EventInput,
  imageFile: File | null
): Promise<MutationResult> {
  try {
    await requireAdmin();
    const data = cleanEvent(input);
    // Read the current image from the database, never from the browser.
    const existing = await prisma.event.findUnique({ where: { id }, select: { image: true } });
    const image = await resolveImageUrl(imageFile, existing?.image ?? "", "events");

    await prisma.$transaction(async (tx) => {
      if (data.featured) {
        await tx.event.updateMany({
          where: { featured: true, id: { not: id } },
          data: { featured: false },
        });
      }
      await tx.event.update({ where: { id }, data: { ...data, date: new Date(data.date), image } });
    });

    // Remove the old image only after the database write succeeded.
    if (existing && existing.image !== image) await deleteImage(existing.image);

    revalidateSite();
    return { success: true };
  } catch (error) {
    return toErrorResult(error);
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
    return toErrorResult(error, "Could not delete this event.");
  }
}
