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
  ];

  return (
    <div>
      <AdminPageHeader
        title="Overview"
        description="Read-only for now — Phase 15 adds create/edit/delete on top of these same lists. Pick a content type below to see what's currently live."
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