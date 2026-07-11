import { PageHero } from "@/components/ui/page-hero";
import { MissionStatement } from "@/sections/about-page/mission-statement";
import { CoreValues } from "@/sections/about-page/core-values";
import { Leadership } from "@/sections/about-page/leadership";
import { hero } from "@/content/about";

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} description={hero.description} />
      <MissionStatement />
      <CoreValues />
      <Leadership />
    </>
  );
}