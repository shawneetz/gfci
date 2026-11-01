"use server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/server/auth";
import { revalidateSite } from "@/server/revalidate";
import { optionalText, validateEmail, validHttpsUrl, required } from "@/server/validation";
import { toErrorResult, type MutationResult } from "./types";
export interface SiteSettingInput { address: string; phone: string; email: string; facebookUrl?: string; instagramUrl?: string; youtubeUrl?: string; givingInstructions?: string; }
function validateSiteSettings(data: SiteSettingInput): SiteSettingInput {
  return {
    address: required(data.address, "Address", 500),
    phone: required(data.phone, "Phone", 100),
    email: validateEmail(data.email),
    facebookUrl: validHttpsUrl(data.facebookUrl, "Facebook URL"),
    instagramUrl: validHttpsUrl(data.instagramUrl, "Instagram URL"),
    youtubeUrl: validHttpsUrl(data.youtubeUrl, "YouTube URL"),
    givingInstructions: optionalText(data.givingInstructions, "Giving instructions", 5000),
  };
}
export async function updateSiteSetting(data: SiteSettingInput): Promise<MutationResult> {
  try {
    await requireAdmin();
    data = validateSiteSettings(data);
    await prisma.siteSetting.upsert({ where: { id: "singleton" }, update: data, create: { id: "singleton", ...data } });
    revalidateSite();
    return { success: true };
  } catch (error) { return toErrorResult(error, "Could not save settings."); }
}
