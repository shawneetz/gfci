import { PhoneCall } from "lucide-react";
import { Container } from "@/components/ui/container";
import { IconInfoRow } from "@/components/ui/icon-info-row";
import { siteConfig } from "@/config/site";

export function UrgentPrayerLine() {
  return (
    <section className="section-sm bg-surface-alt">
      <Container className="max-w-xl">
        <IconInfoRow icon={PhoneCall} title="Need Prayer Right Now?">
          For urgent needs, call our prayer line at {siteConfig.contact.phone}
          . Someone from our team is available to pray with you directly.
        </IconInfoRow>
      </Container>
    </section>
  );
}