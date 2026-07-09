import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { ArrowLink } from "@/components/ui/arrow-link";
import { EventListItem } from "@/sections/events-page/event-list-item";
import { events } from "@/data/events";
import { getMonthKey, formatMonthLabel } from "@/lib/utils";

export const metadata = {
  title: "Events Archive",
  description: "Past events at Golden Faith, organized by month.",
};

export default function EventsArchivePage() {
  const today = new Date();

  const pastEvents = events
    .filter((event) => new Date(event.date) < today)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const monthKeys = Array.from(
    new Set(pastEvents.map((event) => getMonthKey(event.date)))
  );

  return (
    <>
      <PageHero
        tone="light"
        eyebrow="Look Back"
        title="Events Archive"
        description="A record of what we've done together, month by month."
      />

      <section className="section bg-surface">
        <Container className="max-w-2xl">
          {monthKeys.length > 0 ? (
            monthKeys.map((monthKey) => {
              const monthEvents = pastEvents.filter(
                (event) => getMonthKey(event.date) === monthKey
              );

              return (
                <div key={monthKey} className="mb-10 last:mb-0">
                  <h2 className="mb-4 text-section-title text-ink">
                    {formatMonthLabel(monthKey)}
                  </h2>
                  <div>
                    {monthEvents.map((event) => (
                      <EventListItem key={event.id} event={event} />
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="py-10 text-center text-body text-ink-muted">
              No past events yet — check back after our first one wraps up.
            </p>
          )}

          <div className="mt-4">
            <ArrowLink href="/events">← Back to Upcoming Events</ArrowLink>
          </div>
        </Container>
      </section>
    </>
  );
}