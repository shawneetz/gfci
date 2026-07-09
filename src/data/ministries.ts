import { Ministry } from "@/types";
import { people } from "@/data/people";

export const ministries: Ministry[] = [
  {
    slug: "golden-kids",
    title: "Golden Kids",
    tagline:
      "Safe, fun, and engaging environments for children from birth to 5th grade to learn about faith.",
    overview:
      "Golden Kids exists to partner with parents in raising children who love Jesus. Through age-appropriate teaching, worship, and games, kids build a strong foundation of faith in a safe, welcoming environment every week.",
    image: "/images/home-page/kids-ministry.jpg",
    imageAlt: "Children playing and learning together at Golden Kids",
    audience: "Birth – 5th Grade",
    schedule: "Sundays, 9:00 AM & 11:00 AM",
    location: "Kids Wing, Ground Floor",
    leader: people.maricelSantos.displayName,
    contactEmail: people.maricelSantos.email!,
  },
  {
    slug: "faith-youth",
    title: "Faith Youth",
    tagline:
      "A passionate community for middle and high school students finding their purpose and identity.",
    overview:
      "Faith Youth is a high-energy community where students wrestle with real questions, build lasting friendships, and discover who God made them to be. Every gathering blends worship, teaching, and small-group discussion built for the teenage years.",
    image: "/images/home-page/youth-assemble.jpg",
    imageAlt: "Students worshipping together at a Faith Youth gathering",
    audience: "Grades 6 – 12",
    schedule: "Fridays, 6:30 PM",
    location: "Youth Hall",
    leader: people.jomarVillanueva.displayName,
    contactEmail: people.jomarVillanueva.email!,
  },
  {
    slug: "connect-groups",
    title: "Connect Groups",
    tagline:
      "Small groups meeting weekly across the city to build relationships and do life together.",
    overview:
      "Connect Groups are the heartbeat of our community outside of Sunday. Hosted in homes across the city, these small groups gather weekly to study Scripture, pray for one another, and share meals — because faith grows best in relationship.",
    image: "/images/home-page/connect-groups.jpg",
    imageAlt: "A small group gathered around a table for a connect group",
    audience: "All Adults",
    schedule: "Weeknights — times vary by group",
    location: "Various Homes Across the City",
    // Same David Chen who leads as Executive Pastor on the About page —
    // sourced from `people` so the name/title can't drift between the two.
    leader: people.davidChen.displayName,
    contactEmail: people.davidChen.email!,
  },
];