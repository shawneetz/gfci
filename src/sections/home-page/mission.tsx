// src/sections/home-page/mission.tsx
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { mission } from "@/content/home";

export function Mission() {
  return (
    <section className="section bg-surface">
      <Container>
        {/* Single column on mobile (text, then image); side by side from
            lg up, so the section no longer reads as a lonely paragraph
            floating in a wide, mostly-empty row. */}
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-2xl">
            <h2 className="text-section-title text-ink">{mission.title}</h2>
            <p className="mt-5 text-body-lg text-ink-secondary">{mission.body}</p>
            <ButtonLink
              href="/about"
              fill="grey"
              text="ink"
              border="ink"
              shadow="grey2"
              className="mt-7 w-full sm:w-auto"
            >
              {mission.ctaLabel}
            </ButtonLink>
          </div>

          <div className="relative aspect-4/3 overflow-hidden border-2 border-ink lg:aspect-square">
            <Image
              src="/images/home-page/connect-groups.jpg"
              alt="Church members gathered together in fellowship"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}