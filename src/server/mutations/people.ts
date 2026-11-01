"use server";

import { prisma } from "@/lib/prisma";
import { resolveImageUrl } from "./image";
import { deleteImage } from "@/lib/storage";
import { toErrorResult, type MutationResult } from "./types";
import { requireAdmin } from "@/server/auth";
import { revalidateSite } from "@/server/revalidate";
import { intInRange, optionalText, required, validateEmail } from "@/server/validation";

export interface PersonInput {
  name: string;
  title: string;
  displayName: string;
  email: string;
  isLeadershipTeam: boolean;
  leadershipOrder: number | null;
}

function validatePerson(data: PersonInput): PersonInput {
  return {
    name: required(data.name, "Name", 200),
    title: required(data.title, "Title", 200),
    displayName: required(data.displayName, "Display name", 200),
    email: optionalText(data.email, "Email", 254) ? validateEmail(data.email, "Email") : "",
    isLeadershipTeam: data.isLeadershipTeam === true,
    leadershipOrder: data.leadershipOrder === null
      ? null
      : intInRange(data.leadershipOrder, 0, 100000, "Leadership order"),
  };
}

// Unlike Ministry.image / Sermon.thumbnail / Event.image, Person.imageUrl
// is nullable — a leader/speaker without a photo is a normal, supported
// state (PersonCard falls back to a UserRound icon). So imageFile is
// optional here, and an empty upload result is stored as null rather
// than "".
export async function createPerson(data: PersonInput, imageFile: File | null): Promise<MutationResult> {
  try {
    await requireAdmin();
    data = validatePerson(data);
    const imageUrl = await resolveImageUrl(imageFile, "", "people");
    await prisma.person.create({
      data: { ...data, email: data.email || null, imageUrl: imageUrl || null },
    });
    revalidateSite();
    return { success: true };
  } catch (error) {
    return toErrorResult(error);
  }
}

export async function updatePerson(
  id: string,
  data: PersonInput,
  imageFile: File | null
): Promise<MutationResult> {
  try {
    await requireAdmin();
    data = validatePerson(data);
    const existing = await prisma.person.findUnique({ where: { id }, select: { imageUrl: true } });
    const imageUrl = await resolveImageUrl(imageFile, existing?.imageUrl ?? "", "people");
    await prisma.person.update({
      where: { id },
      data: { ...data, email: data.email || null, imageUrl: imageUrl || null },
    });
    if (imageFile && existing?.imageUrl !== imageUrl) await deleteImage(existing?.imageUrl);
    revalidateSite();
    return { success: true };
  } catch (error) {
    return toErrorResult(error);
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
    await requireAdmin();
    const existing = await prisma.person.findUnique({ where: { id }, select: { imageUrl: true } });
    await prisma.person.delete({ where: { id } });
    await deleteImage(existing?.imageUrl);
    revalidateSite();
    return { success: true };
  } catch (error) {
    if (isForeignKeyViolation(error)) {
      return {
        success: false,
        error: "This person still leads a ministry or is credited on a sermon. Reassign those first.",
      };
    }
    return toErrorResult(error, "Could not delete this person.");
  }
}