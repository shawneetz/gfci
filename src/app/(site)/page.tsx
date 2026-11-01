import { Hero } from "@/sections/home-page/hero";
import { Mission } from "@/sections/home-page/mission";
import { LatestSermon } from "@/sections/home-page/latest-sermon";
import { CtaSection } from "@/sections/home-page/cta-section";
import { UpcomingEvents } from "@/sections/home-page/upcoming-events";
import { Ministries } from "@/sections/home-page/ministries";

export const revalidate = 300;

export default function HomePage() {
  return (
    <>
      <Hero />
      <Mission />
      <LatestSermon />
      <UpcomingEvents />
      <Ministries />
      <CtaSection />
    </>
  );
}