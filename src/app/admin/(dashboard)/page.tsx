import { TiltCard } from "@/components/ui/tilt-card";
import { getAllSermons } from "@/server/queries/sermons";
import { getAllEvents } from "@/server/queries/events";
import { getAllMinistries } from "@/server/queries/ministries";
import { getPrayerTeams } from "@/server/queries/prayer-teams";
import { getAnsweredPrayers } from "@/server/queries/testimonies";
import { getAllPeople } from "@/server/queries/people";
import { getLiveStream } from "@/server/queries/live-stream";
import { getCoreValues } from "@/server/queries/core-values";
import { getExpectationItems } from "@/server/queries/expectation-items";
import {
  getPrayerRequestSubmissions,
  getGivingIntents,
  getConnectRegistrations,
} from "@/server/queries/submissions";
import { AdminPageHeader } from "./_components/admin-page-header";

export default async function AdminOverviewPage() {
  const [
    sermons,
    events,
    ministries,
    prayerTeams,
    testimonies,
    people,
    liveStream,
    coreValues,
    expectationItems,
    prayerSubmissions,
    givingSubmissions,
    connectSubmissions,
  ] = await Promise.all([
    getAllSermons(),
    getAllEvents(),
    getAllMinistries(),
    getPrayerTeams(),
    getAnsweredPrayers(),
    getAllPeople(),
    getLiveStream(),
    getCoreValues(),
    getExpectationItems(),
    getPrayerRequestSubmissions(),
    getGivingIntents(),
    getConnectRegistrations(),
  ]);

  const tiles = [
    { label: "Sermons", href: "/admin/sermons", count: sermons.length },
    { label: "Events", href: "/admin/events", count: events.length },
    { label: "Ministries", href: "/admin/ministries", count: ministries.length },
    { label: "Prayer Teams", href: "/admin/prayer-teams", count: prayerTeams.length },
    { label: "Testimonies", href: "/admin/testimonies", count: testimonies.length },
    { label: "People", href: "/admin/people", count: people.length },
    { label: "Live Stream", href: "/admin/live-stream", count: liveStream ? 1 : 0 },
    { label: "Core Values", href: "/admin/core-values", count: coreValues.length },
    { label: "What to Expect", href: "/admin/expectation-items", count: expectationItems.length },
    { label: "Prayer Submissions", href: "/admin/prayer-submissions", count: prayerSubmissions.length },
    { label: "Giving Submissions", href: "/admin/giving-submissions", count: givingSubmissions.length },
    { label: "Connect Submissions", href: "/admin/connect-submissions", count: connectSubmissions.length },
  ];

  return (
    <div>
      <AdminPageHeader
        title="Overview"
        description="Pick a content type below to see what's currently live, or check the Submissions tiles for new form activity from the public site."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map((tile) => (
          <TiltCard
            key={tile.href}
            href={tile.href}
            className="flex items-center justify-between bg-surface p-5"
          >
            <span className="text-lg font-bold text-ink">{tile.label}</span>
            <span className="font-headline text-3xl font-extrabold text-ink-muted">
              {tile.count}
            </span>
          </TiltCard>
        ))}
      </div>
    </div>
  );
}