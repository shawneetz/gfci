import { PageHero } from "@/sections/home-page/page-hero";
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
      <section className="section bg-tertiary">
        <Container>
          <div className="grid gap-6 sm:grid-cols-3">
            {events.map((event) => (
              <Card key={event.id}>
                <div className="aspect-[4/3] bg-[radial-gradient(80%_80%_at_30%_20%,#33977F_0%,#052F27_75%)]" />
                <CardBody>
                  <span className="text-xs font-semibold tracking-wide text-primary-400 uppercase">
                    {event.month}
                  </span>
                  <h3 className="mt-1 text-lg font-bold text-neutral-900">
                    {event.title}
                  </h3>
                  <p className="mt-2 text-sm text-neutral-500">
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
