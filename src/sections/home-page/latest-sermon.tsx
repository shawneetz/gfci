import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Card, CardBody } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";
import { latestSermon } from "@/data/sermons";
import { formatDate } from "@/lib/utils";

export function LatestSermon() {
  return (
    <section className="section bg-tertiary">
      <Container>
        <h2 className="text-section-title text-primary mb-8">
          Latest Message
        </h2>

        <Link
          href={`/sermons/${latestSermon.slug}`}
          className="group block max-w-md"
        >
          <Card>
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={latestSermon.thumbnail}
                alt={latestSermon.title}
                fill
                sizes="(max-width: 768px) 100vw, 448px"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/25" />

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-primary shadow-card transition-transform duration-200 group-hover:scale-110">
                  <Play size={20} fill="currentColor" />
                </span>
              </div>
            </div>

            <CardBody>
              <span className="eyebrow mb-2 text-[11px] text-primary">
                Series: {latestSermon.series}
              </span>

              <h3 className="text-card-title text-neutral-900">
                {latestSermon.title}
              </h3>

              <p className="mt-2 text-body text-neutral-500">
                {latestSermon.speaker} &middot;{" "}
                {formatDate(latestSermon.date)}
              </p>
            </CardBody>
          </Card>
        </Link>

        <div className="mt-8">
          <ButtonLink href="/sermons" variant="secondary" className="w-full">
            View All Sermons
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}