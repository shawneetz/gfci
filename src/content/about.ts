// src/content/about.ts
import type { PageHeroCopy } from "@/content/types";

export const hero: PageHeroCopy = {
  eyebrow: "About Us",
  title: "Our Story",
  description:
    "We started with a simple belief: that faith should be active, community should be authentic, and worship should be a transformative experience. Welcome to a place where you belong before you believe.",
};

export const mission = {
  eyebrow: "Our Mission",
  quote:
    "To cultivate a dynamic community where authentic faith meets everyday action. We are committed to spreading hope, fostering deep connections, and experiencing the transformative power of God's love together.",
};

// The row data (icon/title/description per value) now lives in the
// CoreValue table — see src/server/queries/core-values.ts — per the
// Phase 11 content-governance audit. Only the fixed section heading
// stays here, since that doesn't vary per row.
export const coreValuesSection = {
  title: "Core Values",
};

export const leadership = {
  title: "Meet Our Leaders",
  campusTitle: "Our Campus",
  serviceTimesTitle: "Service Times",
  ctaLabel: "Plan a Visit",
};