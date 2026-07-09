import { MapPin, Clock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Panel } from "@/components/ui/panel";
import { IconInfoRow } from "@/components/ui/icon-info-row";
import { PersonCard } from "@/components/ui/person-card";
import { ButtonLink } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { people } from "@/data/people";

interface Leader {
  name: string;
  role: string;
  image?: string;
}

// Sourced from the shared `people` record so names/titles here always match
// how the same person appears elsewhere (ministry leaders, sermon speakers).
const leaders: Leader[] = [
  { name: people.sarahJenkins.displayName, role: people.sarahJenkins.title },
  { name: people.davidChen.displayName, role: people.davidChen.title },
  // add `image: "/images/about-page/..."` once real photos are ready —
  // PersonCard falls back to a placeholder icon until then
];

export function Leadership() {
  return (
    <section className="section bg-surface-alt">
      <Container className="max-w-2xl">
        <h2 className="mb-8 text-section-title text-ink">Meet Our Leaders</h2>

        <div className="grid grid-cols-2 gap-6">
          {leaders.map((leader) => (
            <PersonCard
              key={leader.name}
              name={leader.name}
              role={leader.role}
              image={leader.image}
            />
          ))}
        </div>

        <Panel className="mt-12">
          <div className="space-y-6">
            <IconInfoRow icon={MapPin} title="Our Campus">
              <p className="whitespace-pre-line">
                {siteConfig.contact.address}
              </p>
            </IconInfoRow>

            <div className="border-t border-border" />

            <IconInfoRow icon={Clock} title="Service Times">
              {siteConfig.serviceTimes.map((service) => (
                <p key={service.label}>
                  {service.label} at {service.time}
                </p>
              ))}
            </IconInfoRow>
          </div>

          <ButtonLink
            href="/connect"
            fill="ink"
            text="inverse"
            border="ink"
            shadow="grey"
            className="mt-8 w-full"
          >
            Plan a Visit
          </ButtonLink>
        </Panel>
      </Container>
    </section>
  );
}