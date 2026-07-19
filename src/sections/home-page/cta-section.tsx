// src/sections/home-page/cta-section.tsx
import { Container } from "@/components/ui/container";
import { CtaCard } from "@/components/ui/cta-card";
import { cta } from "@/content/home";

const GivingIcon = cta.giving.icon;
const PrayerIcon = cta.prayer.icon;

export function CtaSection() {
  return (
    <section className="section bg-surface">
      <Container>
        <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch">
          <CtaCard
            icon={<GivingIcon size={24} />}
            label={cta.giving.label}
            title={cta.giving.title}
            description={cta.giving.description}
            buttonText={cta.giving.buttonText}
            buttonHref="/giving"
            fill="grey2"
            text="inverse"
            border="ink"
            buttonFill="inverse"
            buttonTextColor="ink"
            buttonBorder="ink"
            buttonShadow="grey"
          />

          <CtaCard
            icon={<PrayerIcon size={24} />}
            label={cta.prayer.label}
            title={cta.prayer.title}
            description={cta.prayer.description}
            buttonText={cta.prayer.buttonText}
            buttonHref="/prayer-requests"
            fill="grey"
            text="ink"
            border="ink"
            buttonFill="ink"
            buttonTextColor="inverse"
            buttonBorder="inverse"
            buttonShadow="grey2"
          />
        </div>
      </Container>
    </section>
  );
}