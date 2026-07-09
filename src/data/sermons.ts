import { Sermon } from "@/types";
import { people } from "@/data/people";

export const sermons: Sermon[] = [
  {
    slug: "building-on-solid-ground",
    title: "Building on Solid Ground",
    series: "Foundations",
    speaker: people.noelGonzales.displayName,
    date: "2026-07-05",
    thumbnail: "/images/home-page/latest-sermon-img.jpg",
    summary:
      "A message on what it means to root your life in something that cannot be shaken.",
  },
  {
    slug: "the-weight-of-grace",
    title: "The Weight of Grace",
    series: "Foundations",
    speaker: people.annaReyes.displayName,
    date: "2026-06-28",
    thumbnail: "/images/home-page/sermon-2.jpg",
    summary: "Understanding grace not as a concept, but as a daily practice.",
  },
  {
    slug: "faith-that-moves",
    title: "Faith That Moves",
    series: "Foundations",
    speaker: people.noelGonzales.displayName,
    date: "2026-06-21",
    thumbnail: "/images/sermon-3.jpg",
    summary: "Faith isn't static — it's meant to move us toward action.",
  },
];

export const latestSermon = sermons[0];