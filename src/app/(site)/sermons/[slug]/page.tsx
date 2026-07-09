import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, Mic2, Play } from "lucide-react";

import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { Card, CardBody } from "@/components/ui/card";
import { MetaRow } from "@/components/ui/meta-row";
import { ArrowLink } from "@/components/ui/arrow-link";
import { sermons } from "@/data/sermons";
import { formatDate } from "@/lib/utils";

interface SermonPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return sermons.map((sermon) => ({ slug: sermon.slug }));
}

export async function generateMetadata({ params }: SermonPageProps) {
  const { slug } = await params;
  const sermon = sermons.find((s) => s.slug === slug);

  if (!sermon) return {};

  return {
    title: sermon.title,
    description: sermon.summary,
  };
}

export default async function SermonPage({ params }: SermonPageProps) {
  const { slug } = await params;
  const sermon = sermons.find((s) => s.slug === slug);

  if (!sermon) notFound();

  const moreInSeries = sermons.filter(
    (item) => item.series === sermon.series && item.slug !== sermon.slug
  );

  return (
    <>
      <PageHero eyebrow={`Series: ${sermon.series}`} title={sermon.title}>
        <MetaRow
          className="mt-4 text-ink-inverse-secondary"
          items={[
            { icon: Mic2, label: sermon.speaker },
            { icon: CalendarDays, label: formatDate(sermon.date) },
          ]}
        />
      </PageHero>

      <section className="section bg-surface">
        <Container className="max-w-3xl">
          <div className="relative aspect-video overflow-hidden border-2 border-ink bg-surface-inverse flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-surface/90 text-brand">
              <Play size={24} fill="currentColor" />
            </span>
          </div>

          {sermon.summary && (
            <p className="mt-8 text-body-lg text-ink-secondary">
              {sermon.summary}
            </p>
          )}

          <div className="mt-8">
            <ArrowLink href="/sermons">← All Sermons</ArrowLink>
          </div>
        </Container>
      </section>

      {moreInSeries.length > 0 && (
        <section className="section bg-surface-alt">
          <Container className="max-w-3xl">
            <h2 className="mb-6 text-section-title text-ink">
              More from {sermon.series}
            </h2>

            <div className="grid gap-6 sm:grid-cols-2">
              {moreInSeries.map((item) => (
                <Link
                  key={item.slug}
                  href={`/sermons/${item.slug}`}
                  className="group block"
                >
                  <Card>
                    <div className="relative aspect-video bg-surface-inverse flex items-center justify-center">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-surface/90 text-brand transition-transform duration-200 group-hover:scale-110">
                        <Play size={18} fill="currentColor" />
                      </span>
                    </div>
                    <CardBody>
                      <h3 className="text-lg font-bold text-ink">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm text-ink-muted">
                        {item.speaker} &middot; {formatDate(item.date)}
                      </p>
                    </CardBody>
                  </Card>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}