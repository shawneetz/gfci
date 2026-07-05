import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { EventCard } from "@/components/ui/event-card";
import { upcomingEvents } from "@/data/events";

export function UpcomingEvents() {
  return (
    <section className="section bg-secondary">
      <Container>
        <h2 className="text-section-title text-primary mb-8">
          Upcoming Events
        </h2>

        <div className="grid gap-5 lg:grid-cols-3">
          {upcomingEvents.map((event) => (
            <EventCard
              key={event.id}
              id={event.id}
              month={event.month}
              day={event.day}
              title={event.title}
              time={event.time}
              location={event.location}
            />
          ))}
        </div>

        <div className="mt-8">
          <ButtonLink href="/events" variant="primary" className="w-full">
            View All Events
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}