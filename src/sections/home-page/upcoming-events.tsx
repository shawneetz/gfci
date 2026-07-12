import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { EventCard } from "@/components/ui/event-card";
import { getUpcomingEventsPreview } from "@/server/queries/events";
import { formatMonthShort, formatDay } from "@/lib/utils";
import { upcomingEvents } from "@/content/home";

export async function UpcomingEvents() {
  const upcomingEventsData = await getUpcomingEventsPreview();

  return (
    <section className="section bg-surface">
      <Container>
        <h2 className="text-section-title text-ink mb-8">{upcomingEvents.title}</h2>

        <div className="grid gap-5 lg:grid-cols-3">
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
          <ButtonLink href="/events" text="ink" fill="grey" shadow="ink" className="w-full">
            {upcomingEvents.viewAllLabel}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}