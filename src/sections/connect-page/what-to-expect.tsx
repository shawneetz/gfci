import { Container } from "@/components/ui/container";
import { Panel } from "@/components/ui/panel";
import { getExpectationItems } from "@/server/queries/expectation-items";
import { resolveIcon } from "@/lib/icon-map";
import { whatToExpectSection } from "@/content/connect";
import { ICON_SIZE } from "@/lib/icon-sizes";


export async function WhatToExpect() {
  const items = await getExpectationItems();

  return (
    <section
      id="what-to-expect"
      className="section scroll-mt-[calc(var(--header-height)+16px)] bg-surface-alt"
    >
      <Container className="text-center">
        <h2 className="text-section-title text-ink">{whatToExpectSection.title}</h2>
        <p className="mx-auto mt-3 max-w-lg text-body text-ink-secondary">
          {whatToExpectSection.description}
        </p>

        <div className="mt-10 grid gap-6 text-left sm:grid-cols-3">
          {items.map((item) => {
            const Icon = resolveIcon(item.icon);
            return (
              <Panel key={item.id} shadow={false}>
                <div className="flex h-11 w-11 items-center justify-center rounded-none bg-brand-subtle text-brand">
                  <Icon size={ICON_SIZE.section} />
                </div>
                <h3 className="mt-5 text-lg font-bold text-ink">{item.title}</h3>
                <p className="mt-2 text-body-sm text-ink-secondary">{item.description}</p>
              </Panel>
            );
          })}
        </div>
      </Container>
    </section>
  );
}