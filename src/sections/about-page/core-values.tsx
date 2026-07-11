import { Container } from "@/components/ui/container";
import { FeatureItem } from "@/components/ui/feature-item";
import { CONTENT_MAX_WIDTH } from "@/lib/layout";
import { coreValues } from "@/content/about";

export function CoreValues() {
  return (
    <section className="section bg-surface">
      <Container className={CONTENT_MAX_WIDTH}>
        <h2 className="mb-8 text-section-title text-ink">{coreValues.title}</h2>
        <div>
          {coreValues.values.map((value, index) => (
            <FeatureItem
              key={value.title}
              icon={value.icon}
              title={value.title}
              divider={index < coreValues.values.length - 1}
            >
              {value.description}
            </FeatureItem>
          ))}
        </div>
      </Container>
    </section>
  );
}
