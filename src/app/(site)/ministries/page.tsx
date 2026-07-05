import { PageHero } from "@/sections/home-page/page-hero";
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
      <section className="section bg-tertiary">
        <Container>
          <div className="grid gap-6 sm:grid-cols-3">
            {prayerRequests.map((request) => (
              <Card key={request.slug}>
                <div
                  className="aspect-[4/3]"
                  style={{
                    background: ` ${
                      request.slug === "kids"
                        ? "#F4D35E"
                        : request.slug === "youth"
                        ? "#66B19F"
                        : "#33977F"
                    } 0%, #052F27 75%)`,
                  }}
                />
                <CardBody>
                  <span className="text-xs font-semibold tracking-wide text-primary-400 uppercase">
                    {request.schedule}
                  </span>
                  <h3 className="mt-1 text-xl font-bold text-neutral-900">
                    {request.name}
                  </h3>
                  <p className="mt-2 text-sm text-neutral-500 leading-relaxed">
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
