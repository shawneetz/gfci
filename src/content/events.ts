import type { PageHeroCopy } from "@/content/types";

export const hero: PageHeroCopy & { tabs: { value: string; label: string }[] } = {
  title: "Events",
  description:
    "Connect, grow, and serve. Discover what's happening at Golden Faith this month.",
  tabs: [
    { value: "upcoming", label: "Upcoming" },
    { value: "today", label: "Today" },
    { value: "past", label: "Past" },
  ],
};

export const featured = {
  title: "Featured",
  badge: "Special Event",
  learnMoreLabel: "Learn More →",
};

export const list = {
  loadMoreLabel: "Load More Events",
  emptyState: "No events match these filters right now.",
};

export const moments = {
  title: "Moments",
  archiveLabel: "View Archive →",
  featured: {
    src: "/images/home-page/outreach.jpg",
    alt: "Congregation gathered outdoors for a community picnic",
  },
  secondary: [
    {
      src: "/images/home-page/connect-groups.jpg",
      alt: "Two people chatting over coffee at a connect group",
    },
    {
      src: "/images/home-page/youth-assemble.jpg",
      alt: "Volunteers greeting each other at a service event",
    },
  ],
};

export const archive: PageHeroCopy & { emptyState: string; backLabel: string } = {
  eyebrow: "Look Back",
  title: "Events Archive",
  description: "A record of what we've done together, month by month.",
  emptyState: "No past events yet — check back after our first one wraps up.",
  backLabel: "← Back to Upcoming Events",
};