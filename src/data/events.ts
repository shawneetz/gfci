import { ChurchEvent } from "@/types";

export const events: ChurchEvent[] = [
  {
    id: "1",
    title: "Youth Night Worship",
    date: "2026-10-15",
    time: "7:00 PM",
    category: "Worship",
    location: "Main Sanctuary",
    image: "/images/event-youth-night.jpg",
    description:
      "Join us for an extended evening of uninterrupted worship and prayer as we seek renewal.",
    featured: true,
  },
  {
    id: "2",
    title: "Sunday Gathering",
    date: "2026-10-20",
    time: "9:00 AM & 11:00 AM",
    category: "Worship",
    location: "Main Sanctuary",
    image: "/images/event-sunday-gathering.jpg",
    description:
      "Weekly worship service featuring modern worship music and a practical, Scripture-based message.",
  },
  {
    id: "3",
    title: "GF Youth Night",
    date: "2026-10-23",
    time: "6:30 PM",
    category: "Youth",
    location: "Youth Hall",
    image: "/images/event-youth-night-gf.jpg",
    description:
      "Middle and High School students gather for games, community, and teaching.",
  },
  {
    id: "4",
    title: "City Serve Day",
    date: "2026-10-26",
    time: "8:00 AM",
    category: "Outreach",
    location: "Various Sites",
    image: "/images/event-city-serve-day.jpg",
    description:
      "Partnering with local organizations to serve our city through various volunteer projects.",
  },
];

export const upcomingEvents = events.slice(0, 2);