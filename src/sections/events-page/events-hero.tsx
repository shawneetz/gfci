import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Pill } from "@/components/ui/pill";
import { EVENT_CATEGORIES } from "@/types";
import { cn } from "@/lib/utils";
import { HERO_OVERLAY } from "@/lib/overlays";
import { hero } from "@/content/events";

const CATEGORY_FILTERS = ["All", ...EVENT_CATEGORIES] as const;

interface EventsHeroProps {
  activeTab: string;
  activeCategory: string;
}

export function EventsHero({ activeTab, activeCategory }: EventsHeroProps) {
  return (
    <section className="relative overflow-hidden bg-surface-inverse pb-8 pt-32 text-ink-inverse md:pt-40">
      <Image
        src="/images/home-page/hero-img.jpg"
        alt="Congregation worshipping together"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className={cn("pointer-events-none absolute inset-0", HERO_OVERLAY)} />

      <Container className="relative z-10">
        <h1 className="text-display">{hero.title}</h1>
        <p className="mt-4 max-w-md text-body text-ink-inverse-secondary">{hero.description}</p>

        <div className="mt-8 flex flex-wrap gap-2">
          {hero.tabs.map((tab) => (
            <Pill
              key={tab.value}
              href={{ pathname: "/events", query: { tab: tab.value, category: activeCategory } }}
              active={activeTab === tab.value}
            >
              {tab.label}
            </Pill>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {CATEGORY_FILTERS.map((category) => (
            <Pill
              key={category}
              href={{ pathname: "/events", query: { tab: activeTab, category } }}
              size="sm"
              active={activeCategory === category}
            >
              {category}
            </Pill>
          ))}
        </div>
      </Container>
    </section>
  );
}
