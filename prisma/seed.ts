import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DIRECT_URL });
const prisma = new PrismaClient({ adapter });

async function main() {

  await prisma.person.upsert({
    where: { id: "sarah-jenkins" },
    update: {},
    create: {
      id: "sarah-jenkins",
      name: "Sarah Jenkins",
      title: "Lead Pastor",
      displayName: "Pastor Sarah Jenkins",
      isLeadershipTeam: true,
      leadershipOrder: 1,
    },
  });

  await prisma.person.upsert({
    where: { id: "david-chen" },
    update: {},
    create: {
      id: "david-chen",
      name: "David Chen",
      title: "Executive Pastor",
      displayName: "Pastor David Chen",
      email: "connect@goldenfaith.church",
      isLeadershipTeam: true,
      leadershipOrder: 2,
    },
  });

  await prisma.person.upsert({
    where: { id: "noel-gonzales" },
    update: {},
    create: {
      id: "noel-gonzales",
      name: "Noel Gonzales",
      title: "Bishop",
      displayName: "Bishop Noel Gonzales",
    },
  });

  await prisma.person.upsert({
    where: { id: "anna-reyes" },
    update: {},
    create: {
      id: "anna-reyes",
      name: "Anna Reyes",
      title: "Pastor",
      displayName: "Pastor Anna Reyes",
    },
  });

  await prisma.person.upsert({
    where: { id: "maricel-santos" },
    update: {},
    create: {
      id: "maricel-santos",
      name: "Maricel Santos",
      title: "Kids Ministry Leader",
      displayName: "Pastor Maricel Santos",
      email: "kids@goldenfaith.church",
    },
  });

  await prisma.person.upsert({
    where: { id: "jomar-villanueva" },
    update: {},
    create: {
      id: "jomar-villanueva",
      name: "Jomar Villanueva",
      title: "Youth Pastor",
      displayName: "Pastor Jomar Villanueva",
      email: "youth@goldenfaith.church",
    },
  });

  console.log("Seeded 6 people.");

  await prisma.ministry.upsert({
    where: { slug: "golden-kids" },
    update: {},
    create: {
      id: "golden-kids",
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
      contactEmail: "kids@goldenfaith.church",
      order: 0,
      leaderId: "maricel-santos",
    },
  });

  await prisma.ministry.upsert({
    where: { slug: "faith-youth" },
    update: {},
    create: {
      id: "faith-youth",
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
      contactEmail: "youth@goldenfaith.church",
      order: 1,
      leaderId: "jomar-villanueva",
    },
  });

  await prisma.ministry.upsert({
    where: { slug: "connect-groups" },
    update: {},
    create: {
      id: "connect-groups",
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
      contactEmail: "connect@goldenfaith.church",
      order: 2,
      leaderId: "david-chen",
    },
  });

  console.log("Seeded 3 ministries.");

  await prisma.sermon.upsert({
    where: { slug: "building-on-solid-ground" },
    update: {},
    create: {
      id: "building-on-solid-ground",
      slug: "building-on-solid-ground",
      title: "Building on Solid Ground",
      series: "Foundations",
      date: new Date("2026-07-05"),
      thumbnail: "/images/home-page/latest-sermon-img.jpg",
      summary:
        "A message on what it means to root your life in something that cannot be shaken.",
      speakerId: "noel-gonzales",
    },
  });

  await prisma.sermon.upsert({
    where: { slug: "the-weight-of-grace" },
    update: {},
    create: {
      id: "the-weight-of-grace",
      slug: "the-weight-of-grace",
      title: "The Weight of Grace",
      series: "Foundations",
      date: new Date("2026-06-28"),
      thumbnail: "/images/home-page/sermon-2.jpg",
      summary: "Understanding grace not as a concept, but as a daily practice.",
      speakerId: "anna-reyes",
    },
  });

  await prisma.sermon.upsert({
    where: { slug: "faith-that-moves" },
    update: {},
    create: {
      id: "faith-that-moves",
      slug: "faith-that-moves",
      title: "Faith That Moves",
      series: "Foundations",
      date: new Date("2026-06-21"),
      thumbnail: "/images/sermon-3.jpg",
      summary: "Faith isn't static — it's meant to move us toward action.",
      speakerId: "noel-gonzales",
    },
  });

  console.log("Seeded 3 sermons.");

  await prisma.event.upsert({
    where: { id: "1" },
    update: {},
    create: {
      id: "1",
      title: "Youth Night Worship",
      date: new Date("2026-10-15"),
      time: "7:00 PM",
      category: "Worship",
      location: "Main Sanctuary",
      image: "/images/event-youth-night.jpg",
      description:
        "Join us for an extended evening of uninterrupted worship and prayer as we seek renewal.",
      featured: true,
    },
  });

  await prisma.event.upsert({
    where: { id: "2" },
    update: {},
    create: {
      id: "2",
      title: "Sunday Gathering",
      date: new Date("2026-10-20"),
      time: "9:00 AM & 11:00 AM",
      category: "Worship",
      location: "Main Sanctuary",
      image: "/images/event-sunday-gathering.jpg",
      description:
        "Weekly worship service featuring modern worship music and a practical, Scripture-based message.",
    },
  });

  await prisma.event.upsert({
    where: { id: "3" },
    update: {},
    create: {
      id: "3",
      title: "GF Youth Night",
      date: new Date("2026-10-23"),
      time: "6:30 PM",
      category: "Youth",
      location: "Youth Hall",
      image: "/images/event-youth-night-gf.jpg",
      description:
        "Middle and High School students gather for games, community, and teaching.",
    },
  });

  await prisma.event.upsert({
    where: { id: "4" },
    update: {},
    create: {
      id: "4",
      title: "City Serve Day",
      date: new Date("2026-10-26"),
      time: "8:00 AM",
      category: "Outreach",
      location: "Various Sites",
      image: "/images/event-city-serve-day.jpg",
      description:
        "Partnering with local organizations to serve our city through various volunteer projects.",
    },
  });

  console.log("Seeded 4 events.");

  await prisma.prayerTeam.upsert({
    where: { slug: "kids" },
    update: {},
    create: {
      id: "prayer-team-kids",
      slug: "kids",
      name: "Kids Prayer Team",
      details: "Praying for children and families as they grow in faith and community.",
      image: "/images/ministry-kids.jpg",
      schedule: "Sundays, 9:00 AM & 11:00 AM",
      order: 0,
    },
  });

  await prisma.prayerTeam.upsert({
    where: { slug: "youth" },
    update: {},
    create: {
      id: "prayer-team-youth",
      slug: "youth",
      name: "Youth Prayer Circle",
      details: "Standing with young people through prayer, support, and encouragement.",
      image: "/images/ministry-youth.jpg",
      schedule: "Fridays, 6:30 PM",
      order: 1,
    },
  });

  await prisma.prayerTeam.upsert({
    where: { slug: "adults" },
    update: {},
    create: {
      id: "prayer-team-adults",
      slug: "adults",
      name: "Adult Prayer Group",
      details: "Coming together to pray for our church, city, and world.",
      image: "/images/ministry-adults.jpg",
      schedule: "Sundays, 11:00 AM",
      order: 2,
    },
  });

  console.log("Seeded 3 prayer teams.");

  await prisma.answeredPrayer.upsert({
    where: { id: "answered-prayer-1" },
    update: {},
    create: {
      id: "answered-prayer-1",
      quote:
        "After months of uncertainty, my husband found a job just two weeks after our group prayed for us. We felt so seen and supported.",
      name: "Grace M.",
      category: "Thanksgiving",
    },
  });

  await prisma.answeredPrayer.upsert({
    where: { id: "answered-prayer-2" },
    update: {},
    create: {
      id: "answered-prayer-2",
      quote:
        "My mother's recovery from surgery went better than the doctors expected. Thank you to everyone who lifted her up in prayer.",
      name: "Daniel R.",
      category: "Healing",
    },
  });

  await prisma.answeredPrayer.upsert({
    where: { id: "answered-prayer-3" },
    update: {},
    create: {
      id: "answered-prayer-3",
      quote:
        "I was praying for clarity about a big decision, and through this community's prayers I found peace and direction I didn't expect.",
      name: "Anonymous",
      category: "Guidance",
    },
  });

  console.log("Seeded 3 answered prayers.");

  // Core Values (About page) — see schema.prisma's CoreValue model for
  // why this moved out of src/content/about.ts.
  await prisma.coreValue.upsert({
    where: { id: "core-value-authentic-faith" },
    update: {},
    create: {
      id: "core-value-authentic-faith",
      icon: "Heart",
      title: "Authentic Faith",
      description:
        "We don't pretend to have it all together. We embrace honest questions, real struggles, and a genuine pursuit of truth in our daily walk.",
      order: 0,
    },
  });

  await prisma.coreValue.upsert({
    where: { id: "core-value-bold-love" },
    update: {},
    create: {
      id: "core-value-bold-love",
      icon: "HandHeart",
      title: "Bold Love",
      description:
        "Love is an action verb. We strive to love fiercely, inclusively, and without condition, reflecting the heart of our Creator to our city.",
      order: 1,
    },
  });

  await prisma.coreValue.upsert({
    where: { id: "core-value-active-service" },
    update: {},
    create: {
      id: "core-value-active-service",
      icon: "Users",
      title: "Active Service",
      description:
        "Faith without works is dead. We are mobilized to serve our neighbors, care for the vulnerable, and bring tangible hope to the world.",
      order: 2,
    },
  });

  console.log("Seeded 3 core values.");

  // Expectation Items (Connect page) — see schema.prisma's
  // ExpectationItem model for why this moved out of src/content/connect.ts.
  await prisma.expectationItem.upsert({
    where: { id: "expectation-warm-community" },
    update: {},
    create: {
      id: "expectation-warm-community",
      icon: "Users",
      title: "Warm Community",
      description:
        "From the moment you walk in, our greeters and hosts are there to welcome you, answer questions, and help you feel right at home.",
      order: 0,
    },
  });

  await prisma.expectationItem.upsert({
    where: { id: "expectation-come-as-you-are" },
    update: {},
    create: {
      id: "expectation-come-as-you-are",
      icon: "Shirt",
      title: "Come As You Are",
      description:
        "You'll find everything from jeans and t-shirts to suits and ties. Wear whatever makes you comfortable — you belong here.",
      order: 1,
    },
  });

  await prisma.expectationItem.upsert({
    where: { id: "expectation-engaging-service" },
    update: {},
    create: {
      id: "expectation-engaging-service",
      icon: "Music",
      title: "Engaging Service",
      description:
        "Expect a 75-minute service with high-energy worship music and a practical, inspiring message based on the Bible.",
      order: 2,
    },
  });

  console.log("Seeded 3 expectation items.");

  await prisma.liveStream.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      title: "Title Here",
      schedule: "Sundays, 9:00 AM & 11:00 AM",
      location: "Main Sanctuary",
    },
  });

  console.log("Seeded live stream singleton.");
  console.log("Seed complete.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });