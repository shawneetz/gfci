"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/server/auth";
import { revalidateSite } from "@/server/revalidate";
import { isValidEmail } from "@/server/validation";
import type { MutationResult } from "./types";
export interface SiteSettingInput { address: string; phone: string; email: string; facebookUrl?: string; instagramUrl?: string; youtubeUrl?: string; givingInstructions?: string; }
export async function updateSiteSetting(data: SiteSettingInput): Promise<MutationResult> {
  try {
    await requireAdmin();
    if (!isValidEmail(data.email) || [data.facebookUrl, data.instagramUrl, data.youtubeUrl].some(v => v && !v.startsWith("https://"))) return { success: false, error: "Please enter valid contact details." };
    await prisma.siteSetting.upsert({ where: { id: "singleton" }, update: data, create: { id: "singleton", ...data } });
    revalidatePath("/", "layout"); revalidateSite();
    return { success: true };
  } catch (error) { console.error(error); return { success: false, error: "Could not save settings." }; }
}
