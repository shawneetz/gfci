"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { resolveImageUrl } from "./image";
import type { MutationResult } from "./types";

export interface PersonInput {
  name: string;
  title: string;
  displayName: string;
  email: string;
  isLeadershipTeam: boolean;
  leadershipOrder: number | null;
}

function revalidatePersonDependentPaths() {
  revalidatePath("/about");
  revalidatePath("/ministries/[slug]", "page");
  revalidatePath("/sermons");
  revalidatePath("/sermons/[slug]", "page");
}

// Unlike Ministry.image / Sermon.thumbnail / Event.image, Person.imageUrl
// is nullable — a leader/speaker without a photo is a normal, supported
// state (PersonCard falls back to a UserRound icon). So imageFile is
// optional here, and an empty upload result is stored as null rather
// than "".
export async function createPerson(data: PersonInput, imageFile: File | null): Promise<MutationResult> {
  try {
    const imageUrl = await resolveImageUrl(imageFile, "", "people");
    await prisma.person.create({
      data: { ...data, email: data.email || null, imageUrl: imageUrl || null },
    });
    revalidatePersonDependentPaths();
    return { success: true };
  } catch (error) {
    console.error("createPerson failed:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}

export async function updatePerson(
  id: string,
  data: PersonInput,
  imageFile: File | null,
  currentImageUrl: string | null
): Promise<MutationResult> {
  try {
    const imageUrl = await resolveImageUrl(imageFile, currentImageUrl ?? "", "people");
    await prisma.person.update({
      where: { id },
      data: { ...data, email: data.email || null, imageUrl: imageUrl || null },
    });
    revalidatePersonDependentPaths();
    return { success: true };
  } catch (error) {
    console.error("updatePerson failed:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}

function isForeignKeyViolation(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: string }).code === "P2003"
  );
}

export async function deletePerson(id: string): Promise<MutationResult> {
  try {
    await prisma.person.delete({ where: { id } });
    revalidatePersonDependentPaths();
    return { success: true };
  } catch (error) {
    if (isForeignKeyViolation(error)) {
      return {
        success: false,
        error: "This person still leads a ministry or is credited on a sermon. Reassign those first.",
      };
    }
    console.error("deletePerson failed:", error);
    return { success: false, error: "Could not delete this person." };
  }
}