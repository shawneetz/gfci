// Contact details, social links and giving instructions (a single row).
import "server-only";
import { cache } from "react";
import { prisma } from "@/lib/prisma";
import { siteConfig } from "@/config/site";
import type { SiteSetting } from "@/generated/prisma/client";

// cache() makes repeated calls during one page render share a single database read.
export const getSiteSettings = cache(async (): Promise<SiteSetting> => {
  const row = await prisma.siteSetting.findUnique({ where: { id: "singleton" } });
  if (row) return row;

  // Fallback: no row saved yet, so use the defaults from siteConfig.
  const contact = siteConfig.contact;
  return {
    id: "singleton",
    address: contact.address.trim(),
    phone: contact.phone,
    email: contact.email,
    facebookUrl: contact.facebook,
    instagramUrl: contact.instagram,
    youtubeUrl: contact.youtube,
    givingInstructions: "",
    updatedAt: new Date(0),
  };
});
