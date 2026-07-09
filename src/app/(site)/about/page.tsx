import { PageHero } from "@/components/ui/page-hero";
import { MissionStatement } from "@/sections/about-page/mission-statement";
import { CoreValues } from "@/sections/about-page/core-values";
import { Leadership } from "@/sections/about-page/leadership";

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Our Story"
        description="We started with a simple belief: that faith should be active, community should be authentic, and worship should be a transformative experience. Welcome to a place where you belong before you believe."
      />
      <MissionStatement />
      <CoreValues />
      <Leadership />
    </>
  );
}