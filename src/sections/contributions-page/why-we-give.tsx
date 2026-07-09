import Image from "next/image";
import { Container } from "@/components/ui/container";

export function WhyWeGive() {
  return (
    <section className="section bg-surface-alt">
      <Container className="max-w-xl">
        <div className="relative aspect-4/3 overflow-hidden border-2 border-ink sm:aspect-video">
          <Image
            src="/images/home-page/outreach.jpg"
            alt="Congregation gathered together in worship and service"
            fill
            sizes="(max-width: 768px) 100vw, 576px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-surface-inverse/90 via-surface-inverse/40 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
            <h2 className="text-card-title text-ink-inverse">Why We Give</h2>
            <p className="mt-2 max-w-sm text-body-sm text-ink-inverse-secondary">
              Giving is an act of worship. It&apos;s how we partner together
              to impact our city and world.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}