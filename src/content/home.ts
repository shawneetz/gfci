// src/content/home.ts
import { HandHeart, BookOpen } from "lucide-react";
import type { PageHeroCopy } from "@/content/types";

export const hero: PageHeroCopy & { watchLiveLabel: string; newHereLabel: string } = {
  eyebrow: "Sunday Services",
  title: "EXPERIENCE\nFAITH IN\nMOTION",
  watchLiveLabel: "Watch Live",
  newHereLabel: "New Here?",
};

export const mission = {
  title: "Our Mission",
  body: "To cultivate a dynamic community where authentic faith meets everyday action. We are committed to spreading hope, fostering deep connections, and experiencing the transformative power of God's love together.",
  ctaLabel: "Know More →",
};

export const latestSermon = {
  title: "Latest Message",
  viewAllLabel: "View All Sermons",
};

export const upcomingEvents = {
  title: "Upcoming Events",
  viewAllLabel: "View All Events",
};

export const ministries = {
  title: "Ministries",
  body: "We believe growth happens in community.\nDiscover a ministry where you can belong and serve.",
  ctaLabel: "Explore All Ministries",
};

export const cta = {
  giving: {
    icon: HandHeart,
    label: "Giving",
    title: "Partner With Us",
    description:
      "Make a difference in our church, our community, and beyond through your generous giving.",
    buttonText: "Give Now",
  },
  prayer: {
    icon: BookOpen,
    label: "Prayer",
    title: "Let Us Pray For You",
    description:
      "Share your prayer intentions with us. Our prayer ministry faithfully prays for every request received.",
    buttonText: "Request Prayer",
  },
};