import { PageHero } from "@/sections/home-page/page-hero";
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
      <section className="section bg-secondary">
        <Container className="max-w-xl">
          <h2 className="text-2xl font-extrabold text-primary mb-4">
            Give an Offering
          </h2>
          <p className="text-neutral-500 mb-6">
            Giving form / payment options go here.
          </p>
          <ButtonLink href="#" variant="primary">
            Give Now →
          </ButtonLink>
        </Container>
      </section>
      <section className="section bg-tertiary">
        <Container className="max-w-xl">
          <h2 className="text-2xl font-extrabold text-primary mb-4">
            Why We Give
          </h2>
          <p className="text-neutral-500">
            A short scripture-based explanation of generosity goes here.
          </p>
        </Container>
      </section>
    </>
  );
}
