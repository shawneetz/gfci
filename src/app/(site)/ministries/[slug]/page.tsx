import Image from "next/image";
import { notFound } from "next/navigation";
import { Clock, Mail, MapPin, UserRound, Users } from "lucide-react";

import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { IconInfoRow } from "@/components/ui/icon-info-row";
import { ButtonLink } from "@/components/ui/button";
import { ArrowLink } from "@/components/ui/arrow-link";
import { ministries } from "@/data/ministries";

interface MinistryPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return ministries.map((ministry) => ({ slug: ministry.slug }));
}

export async function generateMetadata({ params }: MinistryPageProps) {
  const { slug } = await params;
  const ministry = ministries.find((m) => m.slug === slug);

  if (!ministry) return {};

  return {
    title: ministry.title,
    description: ministry.tagline,
  };
}

export default async function MinistryPage({ params }: MinistryPageProps) {
  const { slug } = await params;
  const ministry = ministries.find((m) => m.slug === slug);

  if (!ministry) notFound();

  const otherMinistries = ministries.filter((m) => m.slug !== ministry.slug);

  return (
    <>
      <PageHero
        tone="light"
        eyebrow="Ministry"
        title={ministry.title}
        description={ministry.tagline}
      />

      <section className="section bg-surface">
        <Container className="max-w-3xl">
          <div className="relative aspect-video overflow-hidden border-2 border-ink">
            <Image
              src={ministry.image}
              alt={ministry.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>

          <p className="mt-8 text-body-lg text-ink-secondary">
            {ministry.overview}
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <IconInfoRow icon={Users} title="Who It's For">
              {ministry.audience}
            </IconInfoRow>
            <IconInfoRow icon={Clock} title="When We Meet">
              {ministry.schedule}
            </IconInfoRow>
            <IconInfoRow icon={MapPin} title="Where">
              {ministry.location}
            </IconInfoRow>
            <IconInfoRow icon={UserRound} title="Ministry Leader">
              {ministry.leader}
            </IconInfoRow>
          </div>

          <ButtonLink
            href={`mailto:${ministry.contactEmail}`}
            fill="brand"
            text="inverse"
            border="brand"
            shadow="grey"
            className="mt-8 w-full sm:w-auto"
          >
            <Mail size={16} />
            Get In Touch
          </ButtonLink>

          <div className="mt-8">
            <ArrowLink href="/ministries">← All Ministries</ArrowLink>
          </div>
        </Container>
      </section>

      {otherMinistries.length > 0 && (
        <section className="section bg-surface-alt">
          <Container className="max-w-3xl">
            <h2 className="mb-6 text-section-title text-ink">
              Other Ministries
            </h2>

            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {otherMinistries.map((item) => (
                <ArrowLink key={item.slug} href={`/ministries/${item.slug}`}>
                  {item.title} →
                </ArrowLink>
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}