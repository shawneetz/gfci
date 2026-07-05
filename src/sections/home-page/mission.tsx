import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";

export function Mission() {
  return (
    <section className="section bg-secondary">
      <Container className="max-w-2xl">
        <h2 className="text-section-title text-primary">
          Our Mission
        </h2>
        <p className="mt-5 text-body-lg text-neutral-600">
          To cultivate a dynamic community where authentic faith meets
          everyday action. We are committed to spreading hope, fostering deep
          connections, and experiencing the transformative power of God&apos;s
          love together.
        </p>
        <ButtonLink href="/about" variant="primary" className="mt-7 w-full">
          Know More →
        </ButtonLink>
      </Container>
    </section>
  );
}
