import "server-only";
import { cache } from "react";
import { prisma } from "@/lib/prisma";
import { siteConfig } from "@/config/site";

export const getSiteSettings = cache(async () => {
  const row = await prisma.siteSetting.findUnique({ where: { id: "singleton" } });
  if (row) return row;
  const c = siteConfig.contact;
  return { id: "singleton", address: c.address.trim(), phone: c.phone, email: c.email, facebookUrl: c.facebook, instagramUrl: c.instagram, youtubeUrl: c.youtube, givingInstructions: "", updatedAt: new Date(0) };
});
