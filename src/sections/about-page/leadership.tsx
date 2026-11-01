import { MapPin, Clock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Panel } from "@/components/ui/panel";
import { IconInfoRow } from "@/components/ui/icon-info-row";
import { PersonCard } from "@/components/ui/person-card";
import { ButtonLink } from "@/components/ui/button";
import { getLeadershipTeam } from "@/server/queries/people";
import { getSiteSettings } from "@/server/queries/site-settings";
import { getServiceTimes } from "@/server/queries/service-times";
import { CONTENT_MAX_WIDTH } from "@/lib/layout";
import { leadership } from "@/content/about";

export async function Leadership() {
  const leaders = await getLeadershipTeam();
  const [settings, serviceTimes] = await Promise.all([getSiteSettings(), getServiceTimes()]);

  return (
    <section className="section bg-surface-alt">
      <Container className={CONTENT_MAX_WIDTH}>
        <h2 className="mb-8 text-section-title text-ink">{leadership.title}</h2>

        <div className="grid grid-cols-2 gap-6">
          {leaders.map((leader) => (
            <PersonCard
              key={leader.id}
              name={leader.displayName}
              role={leader.title}
              image={leader.imageUrl ?? undefined}
            />
          ))}
        </div>

        <Panel className="mt-12" shadow={false}>
          <div className="space-y-6">
            <IconInfoRow icon={MapPin} title={leadership.campusTitle}>
              <p className="whitespace-pre-line">{settings.address}</p>
            </IconInfoRow>

            <div className="border-t border-border" />

            <IconInfoRow icon={Clock} title={leadership.serviceTimesTitle}>
              {serviceTimes.map((service) => (
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