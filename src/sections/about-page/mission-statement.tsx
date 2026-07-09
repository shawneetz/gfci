import { Flag } from "lucide-react";
import { Container } from "@/components/ui/container";
import { IconEyebrow } from "@/components/ui/icon-eyebrow";

export function MissionStatement() {
  return (
    <section className="section bg-surface-alt">
      <Container className="max-w-2xl">
        <IconEyebrow icon={Flag}>Our Mission</IconEyebrow>
        <blockquote className="mt-4 text-subtitle text-ink">
          &ldquo;To cultivate a dynamic community where authentic faith meets
          everyday action. We are committed to spreading hope, fostering deep
          connections, and experiencing the transformative power of
          God&apos;s love together.&rdquo;
        </blockquote>
      </Container>
    </section>
  );
}