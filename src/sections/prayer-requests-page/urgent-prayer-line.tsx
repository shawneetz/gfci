import { PhoneCall } from "lucide-react";
import { Container } from "@/components/ui/container";
import { IconInfoRow } from "@/components/ui/icon-info-row";
import { getSiteSettings } from "@/server/queries/site-settings";
import { FORM_PAGE_MAX_WIDTH } from "@/lib/layout";
import { urgentLine } from "@/content/prayer-requests";

export async function UrgentPrayerLine() {
  const settings = await getSiteSettings();
  return (
    <section className="section-sm bg-surface-alt">
      <Container className={FORM_PAGE_MAX_WIDTH}>
        <IconInfoRow icon={PhoneCall} title={urgentLine.title}>
          For urgent needs, call our prayer line at {settings.phone}
          . Someone from our team is available to pray with you directly.
        </IconInfoRow>
      </Container>
    </section>
  );
}
