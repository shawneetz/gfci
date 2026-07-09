import { Car, Shirt, Music } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Panel } from "@/components/ui/panel";

const items = [
  {
    icon: Car,
    title: "VIP Parking",
    description:
      "Turn on your flashers when entering the lot. Our parking team will direct you to a reserved spot right up front just for first-time guests.",
  },
  {
    icon: Shirt,
    title: "Come As You Are",
    description:
      "You'll find everything from jeans and t-shirts to suits and ties. Wear whatever makes you comfortable — you belong here.",
  },
  {
    icon: Music,
    title: "Engaging Service",
    description:
      "Expect a 75-minute service with high-energy worship music and a practical, inspiring message based on the Bible.",
  },
];

export function WhatToExpect() {
  return (
    <section
      id="what-to-expect"
      className="section scroll-mt-[calc(var(--header-height)+16px)] bg-surface-alt"
    >
      <Container className="text-center">
        <h2 className="text-section-title text-ink">What to Expect</h2>
        <p className="mx-auto mt-3 max-w-lg text-body text-ink-secondary">
          We want you to feel comfortable and at home from the moment you
          pull into the parking lot.
        </p>

        <div className="mt-10 grid gap-6 text-left sm:grid-cols-3">
          {items.map((item) => (
            <Panel key={item.title} shadow={false}>
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-subtle text-brand">
                <item.icon size={20} />
              </div>
              <h3 className="mt-5 text-lg font-bold text-ink">
                {item.title}
              </h3>
              <p className="mt-2 text-body-sm text-ink-secondary">
                {item.description}
              </p>
            </Panel>
          ))}
        </div>
      </Container>
    </section>
  );
}