import { Container } from "@/components/ui/container";
import { PhotoGrid } from "@/components/ui/photo-grid";
import { ArrowLink } from "@/components/ui/arrow-link";

export function Moments() {
  return (
    <section className="section bg-surface">
      <Container className="max-w-md">
        <h2 className="mb-6 text-section-title text-ink">Moments</h2>

        <PhotoGrid
          featured={{
            src: "/images/home-page/outreach.jpg",
            alt: "Congregation gathered outdoors for a community picnic",
          }}
          secondary={[
            {
              src: "/images/home-page/connect-groups.jpg",
              alt: "Two people chatting over coffee at a connect group",
            },
            {
              src: "/images/home-page/youth-assemble.jpg",
              alt: "Volunteers greeting each other at a service event",
            },
          ]}
        />

        <div className="mt-6 text-center">
          <ArrowLink href="/events/archive">View Archive →</ArrowLink>
        </div>
      </Container>
    </section>
  );
}