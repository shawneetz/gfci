import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return ["", "/about", "/connect", "/events", "/giving", "/live", "/ministries", "/prayer-requests", "/sermons"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));
}
