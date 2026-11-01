"use server";

// Admin action for the single Site Settings row:
// contact details, social links and giving instructions.
import { prisma } from "@/lib/prisma";
import { toErrorResult, type MutationResult } from "./types";
import { requireAdmin } from "@/server/auth";
import { revalidateSite } from "@/server/revalidate";
import { optionalText, required, validateEmail, validHttpsUrl } from "@/server/validation";

export interface SiteSettingInput {
  address: string;
  phone: string;
  email: string;
  facebookUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  givingInstructions?: string;
}

export async function updateSiteSetting(input: SiteSettingInput): Promise<MutationResult> {
  try {
    await requireAdmin();

    // Checks and trims every field. Throws ValidationError on bad input.
    const data = {
      address: required(input.address, "Address", 500),
      phone: required(input.phone, "Phone", 50),
      email: validateEmail(input.email),
      facebookUrl: validHttpsUrl(input.facebookUrl, "Facebook URL"),
      instagramUrl: validHttpsUrl(input.instagramUrl, "Instagram URL"),
      youtubeUrl: validHttpsUrl(input.youtubeUrl, "YouTube URL"),
      givingInstructions: optionalText(input.givingInstructions, "Giving instructions", 2000),
    };

    // There is only ever one row, with the fixed id "singleton".
    await prisma.siteSetting.upsert({
      where: { id: "singleton" },
      update: data,
      create: { id: "singleton", ...data },
    });

    revalidateSite();
    return { success: true };
  } catch (error) {
    return toErrorResult(error, "Could not save settings.");
  }
}
