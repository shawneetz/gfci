import { Container } from "@/components/ui/container";
import { FeatureItem } from "@/components/ui/feature-item";
import { CONTENT_MAX_WIDTH } from "@/lib/layout";
import { getCoreValues } from "@/server/queries/core-values";
import { resolveIcon } from "@/lib/icon-map";
import { coreValuesSection } from "@/content/about";

export async function CoreValues() {
  const values = await getCoreValues();

  return (
    <section className="section bg-surface">
      <Container className={CONTENT_MAX_WIDTH}>
        <h2 className="mb-8 text-section-title text-ink">{coreValuesSection.title}</h2>
        <div>
          {values.map((value, index) => (
            <FeatureItem
              key={value.id}
              icon={resolveIcon(value.icon)}
              title={value.title}
              divider={index < values.length - 1}
            >
              {value.description}
            </FeatureItem>
          ))}
        </div>
      </Container>
    </section>
  );
}