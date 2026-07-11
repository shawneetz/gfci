import { Container } from "@/components/ui/container";
import { QuoteCard } from "@/components/ui/quote-card";
import { answeredPrayers } from "@/data/testimonies";
import { answered } from "@/content/prayer-requests";

export function AnsweredPrayers() {
  return (
    <section className="section bg-surface">
      <Container>
        <h2 className="mb-8 text-section-title text-ink">{answered.title}</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {answeredPrayers.map((entry) => (
            <QuoteCard
              key={entry.id}
              quote={entry.quote}
              name={entry.name}
              tag={entry.category}
              fill="inverse"
              text="ink"
              border="ink"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
