import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";

export default function GivingPage() {
  return (
    <>
      <PageHero
        eyebrow="Give"
        title="Giving"
        description="Every gift helps us reach more people and serve our community well."
      />
      <section className="section bg-surface">
        <Container className="max-w-xl">
          <h2 className="text-2xl font-extrabold text-ink mb-4">
            Give an Offering
          </h2>
          <p className="text-ink-muted mb-6">
            Giving form / payment options go here.
          </p>
          <ButtonLink href="#">
            Give Now →
          </ButtonLink>
        </Container>
      </section>
      <section className="section bg-surface-alt">
        <Container className="max-w-xl">
          <h2 className="text-2xl font-extrabold text-ink mb-4">
            Why We Give
          </h2>
          <p className="text-ink-muted">
            A short scripture-based explanation of generosity goes here.
          </p>
        </Container>
      </section>
    </>
  );
}