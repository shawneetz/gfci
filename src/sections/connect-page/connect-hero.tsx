import Image from "next/image";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";

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
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-surface-inverse/80 via-surface-inverse/40 to-transparent" />

      <Container className="relative z-10">
        <span className="eyebrow mb-4 text-ink-inverse-secondary">
          Plan a Visit
        </span>
        <h1 className="max-w-2xl text-display">Welcome Home.</h1>
        <p className="mt-4 max-w-xl text-body text-ink-inverse-secondary">
          We can&apos;t wait to host you this weekend. Let us know
          you&apos;re coming so we can roll out the red carpet.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <ButtonLink href="#connect-form" fill="brand" text="inverse" border="brand" shadow="grey">
            Get Connected
          </ButtonLink>
          <ButtonLink href="#what-to-expect" fill="transparent" text="inverse" border="inverse" shadow="transparent">
            What to Expect
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}