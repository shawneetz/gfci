import { PageHero } from "@/components/ui/page-hero";
import { PrayerRequestForm } from "@/sections/prayer-requests-page/prayer-request-form";
import { PrayerTeams } from "@/sections/prayer-requests-page/prayer-teams";
import { AnsweredPrayers } from "@/sections/prayer-requests-page/answered-prayers";
import { UrgentPrayerLine } from "@/sections/prayer-requests-page/urgent-prayer-line";

export default function PrayerRequestsPage() {
  return (
    <>
      <PageHero
        tone="light"
        title="Prayer Requests"
        description="Whatever you're carrying, you don't have to carry it alone. Share your request and our prayer team will stand with you in faith."
      />
      <UrgentPrayerLine />
      <PrayerRequestForm />
      <PrayerTeams />
      <AnsweredPrayers />
    </>
  );
}