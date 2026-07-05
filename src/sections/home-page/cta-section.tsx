import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { BookOpen, HandHeart } from "lucide-react";

export function CtaSection() {
  return (
    <section className="section bg-secondary">
      <Container>
        <div className="space-y-6">
          {/* Giving */}
          <div className="rounded-lg bg-primary p-8 text-secondary md:p-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-secondary/10">
              <HandHeart size={24} />
            </div>

            <p className="mt-8 text-label text-secondary/80">Giving</p>

            <h2 className="mt-3 text-section-title">
              Partner With Us
            </h2>

            <p className="mt-4 max-w-md text-body text-secondary/85">
              Make a difference in our church, our community, and beyond
              through your generous giving.
            </p>

            <ButtonLink
              href="/giving"
              variant="secondary"
              className="mt-8 w-full sm:w-auto"
            >
              Give Now
            </ButtonLink>
          </div>

          {/* Prayer */}
          <div className="rounded-lg border border-primary/15 bg-white p-8 md:p-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary-50 text-primary">
              <BookOpen size={24} />
            </div>

            <p className="mt-8 text-label text-primary">
              Prayer
            </p>

            <h2 className="mt-3 text-section-title text-primary">
              Let Us Pray For You
            </h2>

            <p className="mt-4 max-w-md text-body text-neutral-600">
              Share your prayer intentions with us. Our prayer ministry
              faithfully prays for every request received.
            </p>

            <ButtonLink
              href="/prayer-requests"
              variant="outlined"
              className="mt-8 w-full border-primary text-primary hover:bg-primary/5 sm:w-auto"
            >
              Request Prayer
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}