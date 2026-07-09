import { ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { IconInfoRow } from "@/components/ui/icon-info-row";

export function SecurityInfo() {
  return (
    <section className="section-sm bg-surface">
      <Container className="max-w-xl">
        <IconInfoRow icon={ShieldCheck} title="Secure & Transparent">
          Your financial information is encrypted and securely processed. We
          maintain strict financial accountability.
        </IconInfoRow>
      </Container>
    </section>
  );
}