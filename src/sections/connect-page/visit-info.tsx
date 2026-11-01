import { Clock, MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Panel } from "@/components/ui/panel";
import { ArrowLink } from "@/components/ui/arrow-link";
import { siteConfig } from "@/config/site";
import { getSiteSettings } from "@/server/queries/site-settings";
import { getServiceTimes } from "@/server/queries/service-times";
import { visitInfo } from "@/content/connect";

export async function VisitInfo() {
  const [settings, serviceTimes] = await Promise.all([getSiteSettings(), getServiceTimes()]);
  const mapQuery = encodeURIComponent(settings.address.replace(/\s+/g, " ").trim());

  return (
    <section className="section bg-surface">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <Panel className="flex flex-col" shadow={false}>
            <div className="flex items-center gap-2 text-ink">
              <Clock size={20} className="text-brand" />
              <h2 className="text-lg font-bold">{visitInfo.title}</h2>
            </div>

            <div className="mt-5 space-y-4">
              {serviceTimes.map((service) => (
                <div
                  key={service.label}
                  className="flex items-center justify-between border-b border-border pb-4 last:border-b-0 last:pb-0"
                >
                  <span className="text-body-sm font-semibold text-ink">{service.label}</span>
                  <span className="text-body-sm text-ink-muted">{service.time}</span>
                </div>
              ))}
            </div>

            <p className="mt-6 text-caption text-ink-muted">{visitInfo.note}</p>
          </Panel>

          <div className="relative overflow-hidden rounded-lg border border-border">
            <iframe
              title={`Map to ${siteConfig.name}`}
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              className="h-80 w-full lg:h-full"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            <div className="absolute left-4 top-4 max-w-xs rounded-lg border border-border bg-surface p-4 shadow-[var(--shadow-soft)]">
              <div className="flex items-start gap-2">
                <MapPin size={18} className="mt-0.5 shrink-0 text-brand" />
                <div>
                  <p className="text-sm font-bold text-ink">
                    {siteConfig.name} {visitInfo.campusLabel}
                  </p>
                  <p className="mt-1 whitespace-pre-line text-caption text-ink-muted">
                    {settings.address}
                  </p>
                  <ArrowLink
                    href={`https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2"
                  >
                    {visitInfo.directionsLabel}
                  </ArrowLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}