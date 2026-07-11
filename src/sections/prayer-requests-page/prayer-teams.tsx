import { Baby, Users, HeartHandshake } from "lucide-react";
import { Container } from "@/components/ui/container";
import { FeatureItem } from "@/components/ui/feature-item";
import { prayerTeams } from "@/data/prayer-teams";
import { CONTENT_MAX_WIDTH } from "@/lib/layout";

// Maps each team's slug to an icon. Falls back to Users for anything new.
const iconBySlug = {
  kids: Baby,
  youth: Users,
  adults: HeartHandshake,
} as const;

export function PrayerTeams() {
  return (
    <section className="section bg-surface-alt">
      <Container className={CONTENT_MAX_WIDTH}>
        <h2 className="mb-8 text-section-title text-ink">
          Join a Prayer Team
        </h2>
        <div>
          {prayerTeams.map((team, index) => (
            <FeatureItem
              key={team.slug}
              icon={iconBySlug[team.slug as keyof typeof iconBySlug] ?? Users}
              title={team.name}
              divider={index < prayerTeams.length - 1}
            >
              {team.details}
              <span className="mt-1 block text-caption text-ink-muted">
                Meets {team.schedule}
              </span>
            </FeatureItem>
          ))}
        </div>
      </Container>
    </section>
  );
}