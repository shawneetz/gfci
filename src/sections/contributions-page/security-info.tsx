import { ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { IconInfoRow } from "@/components/ui/icon-info-row";
import { FORM_PAGE_MAX_WIDTH } from "@/lib/layout";
import { security } from "@/content/giving";

export function SecurityInfo() {
  return (
    <section className="section-sm bg-surface">
      <Container className={FORM_PAGE_MAX_WIDTH}>
        <IconInfoRow icon={ShieldCheck} title={security.title}>
          {security.body}
        </IconInfoRow>
      </Container>
    </section>
  );
}
