import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { EventCard } from "@/components/ui/event-card";
import { getUpcomingEventsPreview } from "@/server/queries/events";
import { cn, formatMonthShort, formatDay, gridColsForCount } from "@/lib/utils";
import { upcomingEvents } from "@/content/home";

export async function UpcomingEvents() {
  // Matches the grid's max of 3 columns below — previously defaulted to
  // 2, which left an empty third column on desktop instead of a filled row.
  const upcomingEventsData = await getUpcomingEventsPreview(3);

  return (
    <section className="section bg-surface">
      <Container>
        <h2 className="text-section-title text-ink mb-8">{upcomingEvents.title}</h2>

        <div className={cn("grid gap-5", gridColsForCount(upcomingEventsData.length))}>
          {upcomingEventsData.map((event) => (
            <EventCard
              key={event.id}
              id={event.id}
              month={formatMonthShort(event.date)}
              day={formatDay(event.date)}
              title={event.title}
              time={event.time}
              location={event.location}
            />
          ))}
        </div>

        <div className="mt-8">
          <ButtonLink href="/events" text="ink" fill="grey" shadow="ink" className="w-full sm:w-auto">
            {upcomingEvents.viewAllLabel}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}