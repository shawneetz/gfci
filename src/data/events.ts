import { ChurchEvent } from "@/types";

export const events: ChurchEvent[] = [
  {
    id: "1",
    title: "Youth Night Worship",
    date: "October 15, 2026",
    time: "7:00 PM",
    month: "OCT",
    day: "15",
    location: "Main Sanctuary",
    image: "/images/event-youth-night.jpg",
    description:
      "Join us for an evening of acoustic worship, community, and teaching.",
    featured: true,
  },
  {
    id: "2",
    title: "Foundations Class",
    date: "October 18, 2026",
    time: "9:00 AM",
    month: "OCT",
    day: "18",
    location: "Room 204",
    image: "/images/event-foundations-class.jpg",
    description:
      "A 6-week intensive exploring the core doctrines of our faith, designed for new believers.",
  },
  {
    id: "3",
    title: "Baptism Sunday",
    date: "July 26, 2026",
    time: "11:00 AM",
    month: "JUL",
    day: "26",
    location: "Main Sanctuary",
    image: "/images/event-baptism.jpg",
    description:
      "Celebrate with new believers as they take their next step in faith.",
  },
];

export const upcomingEvents = events.slice(0, 2);
