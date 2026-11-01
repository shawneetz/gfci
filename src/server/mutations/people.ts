"use server";

// Admin actions for people (staff, speakers, ministry leaders).
// The photo is optional: a person without one shows an icon on the site.
import { prisma } from "@/lib/prisma";
import { deleteImage } from "@/lib/storage";
import { resolveImageUrl } from "./image";
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

// Checks and trims every field. Throws ValidationError on bad input.
function cleanPerson(input: PersonInput) {
  // Email is optional, but must be valid when filled in.
  const email = optionalText(input.email, "Email", 254);
  if (email) validateEmail(email);

  return {
    name: required(input.name, "Name", 120),
    title: required(input.title, "Title", 120),
    displayName: required(input.displayName, "Display name", 120),
    email: email || null,
    isLeadershipTeam: input.isLeadershipTeam === true,
    leadershipOrder:
      input.leadershipOrder === null
        ? null
        : intInRange(input.leadershipOrder, 0, 9999, "Leadership order"),
  };
}

export async function createPerson(input: PersonInput, imageFile: File | null): Promise<MutationResult> {
  try {
    await requireAdmin();
    const data = cleanPerson(input);
    // An empty result means "no photo", which is stored as null.
    const imageUrl = await resolveImageUrl(imageFile, "", "people");

    await prisma.person.create({ data: { ...data, imageUrl: imageUrl || null } });

    revalidateSite();
    return { success: true };
  } catch (error) {
    return toErrorResult(error);
  }
}

export async function updatePerson(
  id: string,
  input: PersonInput,
  imageFile: File | null
): Promise<MutationResult> {
  try {
    await requireAdmin();
    const data = cleanPerson(input);
    // Read the current photo from the database, never from the browser.
    const existing = await prisma.person.findUnique({ where: { id }, select: { imageUrl: true } });
    const imageUrl = await resolveImageUrl(imageFile, existing?.imageUrl ?? "", "people");

    await prisma.person.update({ where: { id }, data: { ...data, imageUrl: imageUrl || null } });

    // Remove the old photo only after the database write succeeded.
    if (existing?.imageUrl && existing.imageUrl !== imageUrl) await deleteImage(existing.imageUrl);

    revalidateSite();
    return { success: true };
  } catch (error) {
    // P2003 = a ministry or sermon still points at this person. Give a specific message.
    return toErrorResult(error);
  }
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
    if ((error as { code?: string } | null)?.code === "P2003") {
      return {
        success: false,
        error: "This person still leads a ministry or is credited on a sermon. Reassign those first.",
      };
    }
    return toErrorResult(error, "Could not delete this person.");
  }
}
