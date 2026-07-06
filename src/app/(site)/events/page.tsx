import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { Card, CardBody } from "@/components/ui/card";
import { events } from "@/data/events";

export default function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="What's Happening"
        title="Events"
        description="Stay in the loop with what's coming up at Golden Faith."
      />
      <section className="section bg-surface-alt">
        <Container>
          <div className="grid gap-6 sm:grid-cols-3">
            {events.map((event) => (
              <Card key={event.id}>
                <div className="aspect-[4/3] bg-border" />
                <CardBody>
                  <span className="text-xs font-semibold tracking-wide text-brand uppercase">
                    {event.month}
                  </span>
                  <h3 className="mt-1 text-lg font-bold text-ink">
                    {event.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink-muted">
                    {event.date} &middot; {event.location}
                  </p>
                </CardBody>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}