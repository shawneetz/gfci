import { Flag } from "lucide-react";
import { Container } from "@/components/ui/container";
import { IconEyebrow } from "@/components/ui/icon-eyebrow";
import { CONTENT_MAX_WIDTH } from "@/lib/layout";
import { mission } from "@/content/about";

export function MissionStatement() {
  return (
    <section className="section bg-surface-alt">
      <Container className={CONTENT_MAX_WIDTH}>
        <IconEyebrow icon={Flag}>{mission.eyebrow}</IconEyebrow>
        <blockquote className="mt-4 text-subtitle text-ink">&ldquo;{mission.quote}&rdquo;</blockquote>
      </Container>
    </section>
  );
}
