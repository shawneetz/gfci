// src/sections/home-page/mission.tsx
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { mission } from "@/content/home";

export function Mission() {
  return (
    <section className="section bg-surface">
      <Container className="max-w-2xl">
        <h2 className="text-section-title text-ink">{mission.title}</h2>
        <p className="mt-5 text-body-lg text-ink-secondary">{mission.body}</p>
        <ButtonLink href="/about" fill="grey" text="ink" border="ink" shadow="grey2" className="mt-7 w-full">
          {mission.ctaLabel}
        </ButtonLink>
      </Container>
    </section>
  );
}