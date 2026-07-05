import { PrayerRequest } from "@/types";

export const prayerRequests: PrayerRequest[] = [
  {
    slug: "kids",
    name: "Kids Prayer Team",
    details: "Praying for children and families as they grow in faith and community.",
    image: "/images/ministry-kids.jpg",
    schedule: "Sundays, 9:00 AM & 11:00 AM",
  },
  {
    slug: "youth",
    name: "Youth Prayer Circle",
    details: "Standing with young people through prayer, support, and encouragement.",
    image: "/images/ministry-youth.jpg",
    schedule: "Fridays, 6:30 PM",
  },
  {
    slug: "adults",
    name: "Adult Prayer Group",
    details: "Coming together to pray for our church, city, and world.",
    image: "/images/ministry-adults.jpg",
    schedule: "Sundays, 11:00 AM",
  },
];
