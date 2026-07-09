import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { ImageCard } from "@/components/ui/image-card";
import { ministries } from "@/data/ministries";

export function Ministries() {
  return (
    <section className="bg-surface-inverse py-16">
      <Container>
        <div className="max-w-xl">
          <h2 className="text-section-title text-ink-inverse">
            Ministries
          </h2>

          <p className="mt-6 text-body-lg leading-relaxed text-ink-inverse-secondary">
            We believe growth happens in community.
            <br />
            Discover a ministry where you can belong and serve.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3">
          {ministries.map((ministry) => (
            <ImageCard
              key={ministry.slug}
              title={ministry.title}
              image={ministry.image}
              href={`/ministries/${ministry.slug}`}
            />
          ))}
        </div>

        <div className="mt-10">
          <ButtonLink
            href="/ministries"
            text="ink"
            fill="inverse"
            border="ink"
            shadow="grey"
            className="w-full"
          >
            Explore All Ministries
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}