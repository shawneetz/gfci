import { PhoneCall } from "lucide-react";
import { Container } from "@/components/ui/container";
import { IconInfoRow } from "@/components/ui/icon-info-row";
import { siteConfig } from "@/config/site";
import { FORM_PAGE_MAX_WIDTH } from "@/lib/layout";
import { urgentLine } from "@/content/prayer-requests";

export function UrgentPrayerLine() {
  return (
    <section className="section-sm bg-surface-alt">
      <Container className={FORM_PAGE_MAX_WIDTH}>
        <IconInfoRow icon={PhoneCall} title={urgentLine.title}>
          For urgent needs, call our prayer line at {siteConfig.contact.phone}
          . Someone from our team is available to pray with you directly.
        </IconInfoRow>
      </Container>
    </section>
  );
}
