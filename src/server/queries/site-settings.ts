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
  // The default address is a multi-line template string, so each line carries
  // leading spaces from the source code. Trim every line and drop empty ones.
  const address = contact.address
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .join("\n");

  return {
    id: "singleton",
    address,
    phone: contact.phone,
    email: contact.email,
    facebookUrl: contact.facebook,
    instagramUrl: contact.instagram,
    youtubeUrl: contact.youtube,
    givingInstructions: "",
    updatedAt: new Date(0),
  };
});
