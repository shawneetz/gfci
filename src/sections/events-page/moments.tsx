import { Container } from "@/components/ui/container";
import { PhotoGrid } from "@/components/ui/photo-grid";
import { ArrowLink } from "@/components/ui/arrow-link";
import { moments } from "@/content/events";

export function Moments() {
  return (
    <section className="section bg-surface">
      <Container className="max-w-md">
        <h2 className="mb-6 text-section-title text-ink">{moments.title}</h2>

        <PhotoGrid featured={moments.featured} secondary={moments.secondary} />

        <div className="mt-6 text-center">
          <ArrowLink href="/events/archive">{moments.archiveLabel}</ArrowLink>
        </div>
      </Container>
    </section>
  );
}
