import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Card, CardBody } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";
import { getLatestSermon } from "@/server/queries/sermons";
import { formatDate } from "@/lib/utils";
import { latestSermon } from "@/content/home";

export async function LatestSermon() {
  const latestSermonData = await getLatestSermon();

  if (!latestSermonData) return null;

  return (
    <section className="section bg-surface-alt">
      <Container>
        <h2 className="text-section-title text-ink mb-8">{latestSermon.title}</h2>

        <Link href={`/sermons/${latestSermonData.slug}`} className="group block max-w-md">
          <Card>
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={latestSermonData.thumbnail}
                alt={latestSermonData.title}
                fill
                sizes="(max-width: 768px) 100vw, 448px"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-surface-inverse/25" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-surface/90 text-brand shadow-card transition-transform duration-200 group-hover:scale-110">
                  <Play size={20} fill="currentColor" />
                </span>
              </div>
            </div>

            <CardBody>
              <span className="eyebrow mb-2 text-[11px] text-brand">
                Series: {latestSermonData.series}
              </span>
              <h3 className="text-card-title text-ink">{latestSermonData.title}</h3>
              <p className="mt-2 text-body text-ink-muted">
                {latestSermonData.speaker} &middot; {formatDate(latestSermonData.date)}
              </p>
            </CardBody>
          </Card>
        </Link>

        <div className="mt-8">
          <ButtonLink href="/sermons" fill="inverse" text="ink" shadow="grey2" className="w-full">
            {latestSermon.viewAllLabel}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}