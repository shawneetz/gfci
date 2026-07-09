import { Heart, HandHeart, Users } from "lucide-react";
import { Container } from "@/components/ui/container";
import { FeatureItem } from "@/components/ui/feature-item";

const coreValues = [
  {
    icon: Heart,
    title: "Authentic Faith",
    description:
      "We don't pretend to have it all together. We embrace honest questions, real struggles, and a genuine pursuit of truth in our daily walk.",
  },
  {
    icon: HandHeart,
    title: "Bold Love",
    description:
      "Love is an action verb. We strive to love fiercely, inclusively, and without condition, reflecting the heart of our Creator to our city.",
  },
  {
    icon: Users,
    title: "Active Service",
    description:
      "Faith without works is dead. We are mobilized to serve our neighbors, care for the vulnerable, and bring tangible hope to the world.",
  },
];

export function CoreValues() {
  return (
    <section className="section bg-surface">
      <Container className="max-w-2xl">
        <h2 className="mb-8 text-section-title text-ink">Core Values</h2>
        <div>
          {coreValues.map((value, index) => (
            <FeatureItem
              key={value.title}
              icon={value.icon}
              title={value.title}
              divider={index < coreValues.length - 1}
            >
              {value.description}
            </FeatureItem>
          ))}
        </div>
      </Container>
    </section>
  );
}