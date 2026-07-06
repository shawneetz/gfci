import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { Card, CardBody } from "@/components/ui/card";
import { prayerRequests } from "@/data/prayer-requests";

export default function MinistriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Get Involved"
        title="Ministries"
        description="Discover how you can get involved and make a difference in our community."
      />
      <section className="section bg-surface-alt">
        <Container>
          <div className="grid gap-6 sm:grid-cols-3">
            {prayerRequests.map((request) => (
              <Card key={request.slug}>
                <div className="aspect-[4/3] bg-border" />
                <CardBody>
                  <span className="text-xs font-semibold tracking-wide text-brand uppercase">
                    {request.schedule}
                  </span>
                  <h3 className="mt-1 text-xl font-bold text-ink">
                    {request.name}
                  </h3>
                  <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                    {request.details}
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