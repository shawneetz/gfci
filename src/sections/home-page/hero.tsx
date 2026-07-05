import { Play } from "lucide-react";

import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";

export function Hero() {
  return (
    <section
      className="
        relative
        flex
        min-h-dvh
        items-end
        overflow-hidden
        bg-neutral
        bg-cover
        bg-center
        bg-fixed
        text-secondary
      "
      style={{
        backgroundImage: "url('/images/home-page/hero-img.jpg')",
      }}
    >
      {/* Content Gradient Overlay */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-linear-to-t
          from-primary/60
          via-primary/25
          to-transparent
        "
      />
      {/* Content */}
      <Container className="relative z-10 w-full pb-14 pt-32 md:pb-20">
        <span className="eyebrow mb-5 text-secondary/90 [&::before]:bg-primary-300">
          Sunday Services
        </span>

        <h1 className="max-w-3xl whitespace-pre-line text-display text-secondary">
          {`EXPERIENCE
            FAITH IN
            MOTION`}
        </h1>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <ButtonLink
            href="/live"
            variant="secondary"
            className="border-0"
          >
            <Play size={16} fill="currentColor" />
            Watch Live
          </ButtonLink>

          <ButtonLink href="/connect" variant="outlined">
            New Here?
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}