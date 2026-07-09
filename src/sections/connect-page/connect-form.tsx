"use client";

import { useId, useState } from "react";
import { HeartHandshake } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Panel } from "@/components/ui/panel";
import { CtaCard } from "@/components/ui/cta-card";
import { Tabs, type TabItem } from "@/components/ui/tabs";
import { KidsForm } from "@/sections/connect-page/kids-form";
import { YouthForm } from "@/sections/connect-page/youth-form";
import { AdultsForm } from "@/sections/connect-page/adults-form";
import { siteConfig } from "@/config/site";

type Audience = "kids" | "youth" | "adults";

const TABS: TabItem[] = [
  { value: "kids", label: "Kids" },
  { value: "youth", label: "Youth" },
  { value: "adults", label: "Adults" },
];

export function ConnectForm() {
  const [audience, setAudience] = useState<Audience>("kids");
  const idPrefix = useId(); // links the active Tabs button to its panel for a11y

  return (
    <section
      id="connect-form"
      className="section scroll-mt-[calc(var(--header-height)+16px)] bg-surface"
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch">
          <Panel>
            <span className="eyebrow mb-3 text-[11px] text-brand">
              Get Connected
            </span>
            <h2 className="text-section-title text-ink">
              Tell Us You&apos;re Coming
            </h2>
            <p className="mt-3 text-body-sm text-ink-secondary">
              Choose who&apos;s visiting so we can prepare the right welcome —
              from kids check-in to a seat saved just for you.
            </p>

            <Tabs
              items={TABS}
              value={audience}
              onChange={(value) => setAudience(value as Audience)}
              idPrefix={idPrefix}
              className="mt-6"
            />

            <div
              id={`${idPrefix}-panel-${audience}`}
              role="tabpanel"
              aria-labelledby={`${idPrefix}-tab-${audience}`}
              className="mt-6"
            >
              {audience === "kids" && <KidsForm />}
              {audience === "youth" && <YouthForm />}
              {audience === "adults" && <AdultsForm />}
            </div>
          </Panel>

          <CtaCard
            icon={<HeartHandshake size={24} />}
            label="First Time?"
            title="Meet a Host"
            description="Don't want to navigate your first visit alone? Request a host to meet you at the door, show you around, and sit with you during service."
            buttonText="Request a Host"
            buttonHref={`mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
              "Request a Host for My Visit"
            )}`}
            fill="ink"
            text="inverse"
            border="ink"
            radius="none"
            buttonFill="inverse"
            buttonTextColor="ink"
            buttonBorder="ink"
            buttonShadow="grey"
            className="flex flex-col justify-center"
          />
        </div>
      </Container>
    </section>
  );
}