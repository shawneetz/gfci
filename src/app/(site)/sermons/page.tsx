import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { Card, CardBody } from "@/components/ui/card";
import { getAllSermons } from "@/server/queries/sermons";
import { formatDate } from "@/lib/utils";
import { Play } from "lucide-react";
import { hero } from "@/content/sermons";

export const revalidate = 300;

export default async function SermonsPage() {
  const sermons = await getAllSermons();

  return (
    <>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} description={hero.description} />
      <section className="section bg-surface-alt">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sermons.map((sermon) => (
              <Link key={sermon.slug} href={`/sermons/${sermon.slug}`} className="group block">
                <Card>
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={sermon.thumbnail}
                      alt={sermon.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-200 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-surface-inverse/25" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-surface/90 text-brand transition-transform duration-200 group-hover:scale-110">
                        <Play size={18} fill="currentColor" />
                      </span>
                    </div>
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