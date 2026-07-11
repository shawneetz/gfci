import Link from "next/link";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { Card, CardBody } from "@/components/ui/card";
import { sermons } from "@/data/sermons";
import { formatDate } from "@/lib/utils";
import { Play } from "lucide-react";
import { hero } from "@/content/sermons";

export default function SermonsPage() {
  return (
    <>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} description={hero.description} />
      <section className="section bg-surface-alt">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sermons.map((sermon) => (
              <Link key={sermon.slug} href={`/sermons/${sermon.slug}`} className="group block">
                <Card>
                  <div className="relative aspect-video bg-surface-inverse flex items-center justify-center">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-surface/90 text-brand transition-transform duration-200 group-hover:scale-110">
                      <Play size={18} fill="currentColor" />
                    </span>
                  </div>
                  <CardBody>
                    <span className="eyebrow text-brand text-[11px] mb-2">{sermon.series}</span>
                    <h3 className="text-lg font-bold text-ink">{sermon.title}</h3>
                    <p className="mt-2 text-sm text-ink-muted">
                      {sermon.speaker} &middot; {formatDate(sermon.date)}
                    </p>
                  </CardBody>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
