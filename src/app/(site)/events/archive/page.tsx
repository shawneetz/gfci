import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { ArrowLink } from "@/components/ui/arrow-link";
import { EventListItem } from "@/sections/events-page/event-list-item";
import { getAllEvents } from "@/server/queries/events";
import { getMonthKey, formatMonthLabel } from "@/lib/utils";
import { CONTENT_MAX_WIDTH } from "@/lib/layout";
import { archive } from "@/content/events";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Events Archive",
  description: "Past events at Golden Faith, organized by month.",
};

export default async function EventsArchivePage() {
  const events = await getAllEvents();
  const today = new Date();

  const pastEvents = events
    .filter((event) => new Date(event.date) < today)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const monthKeys = Array.from(new Set(pastEvents.map((event) => getMonthKey(event.date))));

  return (
    <>
      <PageHero eyebrow={archive.eyebrow} title={archive.title} description={archive.description} />

      <section className="section bg-surface">
        <Container className={CONTENT_MAX_WIDTH}>
          {monthKeys.length > 0 ? (
            monthKeys.map((monthKey) => {
              const monthEvents = pastEvents.filter((event) => getMonthKey(event.date) === monthKey);

              return (
                <div key={monthKey} className="mb-10 last:mb-0">
                  <h2 className="mb-4 text-section-title text-ink">{formatMonthLabel(monthKey)}</h2>
                  <div>
                    {monthEvents.map((event) => (
                      <EventListItem key={event.id} event={event} />
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="py-10 text-center text-body text-ink-muted">{archive.emptyState}</p>
          )}

          <div className="mt-4">
            <ArrowLink href="/events">{archive.backLabel}</ArrowLink>
          </div>
        </Container>
      </section>
    </>
  );
}