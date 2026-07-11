import { MapPin, Clock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Panel } from "@/components/ui/panel";
import { IconInfoRow } from "@/components/ui/icon-info-row";
import { PersonCard } from "@/components/ui/person-card";
import { ButtonLink } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { people } from "@/data/people";
import { CONTENT_MAX_WIDTH } from "@/lib/layout";
import { leadership } from "@/content/about";

interface Leader {
  name: string;
  role: string;
  image?: string;
}

const leaders: Leader[] = [
  { name: people.sarahJenkins.displayName, role: people.sarahJenkins.title },
  { name: people.davidChen.displayName, role: people.davidChen.title },
];

export function Leadership() {
  return (
    <section className="section bg-surface-alt">
      <Container className={CONTENT_MAX_WIDTH}>
        <h2 className="mb-8 text-section-title text-ink">{leadership.title}</h2>

        <div className="grid grid-cols-2 gap-6">
          {leaders.map((leader) => (
            <PersonCard key={leader.name} name={leader.name} role={leader.role} image={leader.image} />
          ))}
        </div>

        <Panel className="mt-12" shadow={false}>
          <div className="space-y-6">
            <IconInfoRow icon={MapPin} title={leadership.campusTitle}>
              <p className="whitespace-pre-line">{siteConfig.contact.address}</p>
            </IconInfoRow>

            <div className="border-t border-border" />

            <IconInfoRow icon={Clock} title={leadership.serviceTimesTitle}>
              {siteConfig.serviceTimes.map((service) => (
                <p key={service.label}>
                  {service.label} at {service.time}
                </p>
              ))}
            </IconInfoRow>
          </div>

          <ButtonLink href="/connect" fill="ink" text="inverse" border="ink" shadow="grey" className="mt-8 w-full">
            {leadership.ctaLabel}
          </ButtonLink>
        </Panel>
      </Container>
    </section>
  );
}
