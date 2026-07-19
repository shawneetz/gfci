import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Card, CardBody } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getRecentSermons } from "@/server/queries/sermons";
import { cn, formatDate, gridColsForCount } from "@/lib/utils";
import { latestSermon } from "@/content/home";

export async function LatestSermon() {
  const sermons = await getRecentSermons(3);

  if (sermons.length === 0) return null;

  return (
    <section className="section bg-surface-alt">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-section-title text-ink">{latestSermon.title}</h2>
          <ButtonLink
            href="/sermons"
            fill="inverse"
            text="ink"
            shadow="grey2"
            className="w-full sm:w-auto"
          >
            {latestSermon.viewAllLabel}
          </ButtonLink>
        </div>

        <div className={cn("mt-8 grid gap-6", gridColsForCount(sermons.length))}>
          {sermons.map((sermon, index) => (
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
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-surface/90 text-brand shadow-card transition-transform duration-200 group-hover:scale-110">
                      <Play size={20} fill="currentColor" />
                    </span>
                  </div>
                  {index === 0 && (
                    <Badge tone="brand" className="absolute left-3 top-3">
                      Latest
                    </Badge>
                  )}
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
  );
}