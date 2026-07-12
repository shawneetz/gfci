import { PageHero } from "@/components/ui/page-hero";
import { PrayerRequestForm } from "@/sections/prayer-requests-page/prayer-request-form";
import { PrayerTeams } from "@/sections/prayer-requests-page/prayer-teams";
import { AnsweredPrayers } from "@/sections/prayer-requests-page/answered-prayers";
import { UrgentPrayerLine } from "@/sections/prayer-requests-page/urgent-prayer-line";
import { hero } from "@/content/prayer-requests";

export const dynamic = "force-dynamic";

export default function PrayerRequestsPage() {
  return (
    <>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} description={hero.description} />
      <UrgentPrayerLine />
      <PrayerRequestForm />
      <PrayerTeams />
      <AnsweredPrayers />
    </>
  );
}