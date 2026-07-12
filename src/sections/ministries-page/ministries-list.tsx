import { Container } from "@/components/ui/container";
import { MinistryCard } from "@/components/ui/ministry-card";
import { getAllMinistries } from "@/server/queries/ministries";

export async function MinistriesList() {
  const ministries = await getAllMinistries();

  return (
    <section className="section bg-surface">
      <Container className="max-w-xl">
        <div className="space-y-6">
          {ministries.map((ministry) => (
            <MinistryCard
              key={ministry.slug}
              title={ministry.title}
              description={ministry.tagline}
              image={ministry.image}
              imageAlt={ministry.imageAlt}
              href={`/ministries/${ministry.slug}`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}