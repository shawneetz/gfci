import { PageHero } from "@/sections/home-page/page-hero";
import { Container } from "@/components/ui/container";
import { Card, CardBody } from "@/components/ui/card";
import { sermons } from "@/data/sermons";
import { formatDate } from "@/lib/utils";
import { Play } from "lucide-react";

export default function SermonsPage() {
  return (
    <>
      <PageHero
        eyebrow="Watch & Listen"
        title="Sermons"
        description="Catch up on past messages, organized by series."
      />
      <section className="section bg-tertiary">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sermons.map((sermon) => (
              <Card key={sermon.slug}>
                <div className="relative aspect-video bg-amber-600 flex items-center justify-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/90 text-primary">
                    <Play size={18} fill="currentColor" />
                  </span>
                </div>
                <CardBody>
                  <span className="eyebrow text-primary text-[11px] mb-2">
                    {sermon.series}
                  </span>
                  <h3 className="text-lg font-bold text-neutral-900">
                    {sermon.title}
                  </h3>
                  <p className="mt-2 text-sm text-neutral-500">
                    {sermon.speaker} &middot; {formatDate(sermon.date)}
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
