// src/content/about.ts
import { Heart, HandHeart, Users } from "lucide-react";
import type { FeatureCopy, PageHeroCopy } from "@/content/types";

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

export const coreValues: { title: string; values: FeatureCopy[] } = {
  title: "Core Values",
  values: [
    {
      icon: Heart,
      title: "Authentic Faith",
      description:
        "We don't pretend to have it all together. We embrace honest questions, real struggles, and a genuine pursuit of truth in our daily walk.",
    },
    {
      icon: HandHeart,
      title: "Bold Love",
      description:
        "Love is an action verb. We strive to love fiercely, inclusively, and without condition, reflecting the heart of our Creator to our city.",
    },
    {
      icon: Users,
      title: "Active Service",
      description:
        "Faith without works is dead. We are mobilized to serve our neighbors, care for the vulnerable, and bring tangible hope to the world.",
    },
  ],
};

export const leadership = {
  title: "Meet Our Leaders",
  campusTitle: "Our Campus",
  serviceTimesTitle: "Service Times",
  ctaLabel: "Plan a Visit",
};