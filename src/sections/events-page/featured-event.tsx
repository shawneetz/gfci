import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Card, CardBody } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MetaRow } from "@/components/ui/meta-row";
import { ChurchEvent } from "@/types";

interface FeaturedEventProps {
  event: ChurchEvent;
}

export function FeaturedEvent({ event }: FeaturedEventProps) {
  return (
    <section className="section bg-surface-alt">
      <Container className="max-w-md">
        <h2 className="mb-6 text-section-title text-ink">Featured</h2>

        <Link href={`/events#${event.id}`} className="block">
          <Card>
            <div className="relative aspect-video">
              <Image
                src={event.image}
                alt={event.title}
                fill
                sizes="(max-width: 768px) 100vw, 448px"
                className="object-cover"
              />
              <Badge tone="brand" className="absolute left-3 top-3">
                Special Event
              </Badge>
            </div>

            <CardBody>
              <h3 className="text-card-title text-ink">{event.title}</h3>
              <MetaRow
                className="mt-2"
                items={[
                  { icon: Clock, label: event.time },
                  { icon: MapPin, label: event.location },
                ]}
              />
              <p className="mt-3 text-body-sm text-ink-secondary">
                {event.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand underline decoration-dotted underline-offset-4">
                Learn More →
              </span>
            </CardBody>
          </Card>
        </Link>
      </Container>
    </section>
  );
}