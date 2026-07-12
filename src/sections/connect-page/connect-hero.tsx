import Image from "next/image";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HERO_OVERLAY } from "@/lib/overlays";
import { hero } from "@/content/connect";

export function ConnectHero() {
  return (
    <section className="relative overflow-hidden bg-surface-inverse pb-14 pt-32 text-ink-inverse md:pb-20 md:pt-40">
      <Image
        src="/images/home-page/hero-img.jpg"
        alt="Congregation gathering outside the church building"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className={cn("pointer-events-none absolute inset-0", HERO_OVERLAY)} />

      <Container className="relative z-10">
        <span className="eyebrow mb-4 text-ink-inverse-secondary">{hero.eyebrow}</span>
        <h1 className="max-w-2xl text-display">{hero.title}</h1>
        <p className="mt-4 max-w-xl text-body text-ink-inverse-secondary">{hero.description}</p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <ButtonLink href="#connect-form" fill="brand" text="inverse" border="brand" shadow="grey">
            {hero.connectLabel}
          </ButtonLink>
          <ButtonLink href="#what-to-expect" fill="transparent" text="inverse" border="inverse" shadow="transparent">
            {hero.expectLabel}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
