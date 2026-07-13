"use server";

import { prisma } from "@/lib/prisma";
import { resolveImageUrl } from "./image";
import type { MutationResult } from "./types";
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
    const image = await resolveImageUrl(imageFile, "", "events");
    if (!image) return { success: false, error: "An image is required." };

    await prisma.event.create({ data: { ...data, date: new Date(data.date), image } });
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
  currentImage: string
): Promise<MutationResult> {
  try {
    const image = await resolveImageUrl(imageFile, currentImage, "events");
    await prisma.event.update({ where: { id }, data: { ...data, date: new Date(data.date), image } });
    return { success: true };
  } catch (error) {
    if (isUniqueFeaturedViolation(error)) return { success: false, error: FEATURED_ERROR };
    console.error("updateEvent failed:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}

export async function deleteEvent(id: string): Promise<MutationResult> {
  try {
    await prisma.event.delete({ where: { id } });
    return { success: true };
  } catch (error) {
    console.error("deleteEvent failed:", error);
    return { success: false, error: "Could not delete this event." };
  }
}