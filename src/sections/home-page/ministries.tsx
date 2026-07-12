import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { ImageCard } from "@/components/ui/image-card";
import { getAllMinistries } from "@/server/queries/ministries";
import { ministries } from "@/content/home";

export async function Ministries() {
  const ministriesData = await getAllMinistries();

  return (
    <section className="section bg-surface-inverse">
      <Container>
        <div className="max-w-xl">
          <h2 className="text-section-title text-ink-inverse">{ministries.title}</h2>
          <p className="mt-6 whitespace-pre-line text-body-lg leading-relaxed text-ink-inverse-secondary">
            {ministries.body}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3">
          {ministriesData.map((ministry) => (
            <ImageCard
              key={ministry.slug}
              title={ministry.title}
              image={ministry.image}
              href={`/ministries/${ministry.slug}`}
            />
          ))}
        </div>

        <div className="mt-10">
          <ButtonLink href="/ministries" text="ink" fill="inverse" border="ink" shadow="grey" className="w-full">
            {ministries.ctaLabel}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}