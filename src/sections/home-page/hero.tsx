import { Play } from "lucide-react";

import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HERO_OVERLAY } from "@/lib/overlays";

export function Hero() {
  return (
    <section
      className="
        relative
        flex
        min-h-dvh
        items-end
        overflow-hidden
        bg-surface-inverse
        bg-cover
        bg-center
        bg-fixed
        text-ink-inverse
      "
      style={{
        backgroundImage: "url('/images/home-page/hero-img.jpg')",
      }}
    >
      {/* Content Gradient Overlay */}
      <div className={cn("pointer-events-none absolute inset-0", HERO_OVERLAY)} />

      {/* Content */}
      <Container className="relative z-10 w-full pb-14 pt-32 md:pb-20">
        <span className="eyebrow mb-5 text-ink-inverse-secondary">
          Sunday Services
        </span>

        <h1 className="max-w-3xl whitespace-pre-line text-display text-ink-inverse">
          {`EXPERIENCE
            FAITH IN
            MOTION`}
        </h1>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <ButtonLink
            href="/live"
            fill="grey"
            text="ink"
            shadow="transparent"
            className="border-0"
          >
            <Play size={16} fill="currentColor" />
            Watch Live
          </ButtonLink>

          <ButtonLink href="/connect" fill="transparent" text="inverse" border="inverse" shadow="transparent">
            New Here?
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}