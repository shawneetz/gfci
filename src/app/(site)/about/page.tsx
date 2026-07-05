import { PageHero } from "@/sections/home-page/page-hero";
import { Container } from "@/components/ui/container";

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="About Golden Faith"
        description="Who we are, what we believe, and the people leading our community."
      />
      <section className="section bg-secondary">
        <Container>
          <p className="text-neutral-500 max-w-xl">
            Poster section, Core Values, and Meet Our Leaders go here — built
            with the same Card component used across the site.
          </p>
        </Container>
      </section>
    </>
  );
}
