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

import type { MinistryWithLeader } from "@/server/queries/ministries";
import { form } from "@/content/connect";

type Audience = "kids" | "youth" | "adults";

const TABS: TabItem[] = [
  { value: "kids", label: "Kids" },
  { value: "youth", label: "Youth" },
  { value: "adults", label: "Adults" },
];

interface ConnectFormProps {
  ministries: MinistryWithLeader[];
  hostEmail: string;
}

export function ConnectForm({ ministries, hostEmail }: ConnectFormProps) {
  const [audience, setAudience] = useState<Audience>("kids");
  const idPrefix = useId();

  return (
    <section id="connect-form" className="section scroll-mt-[calc(var(--header-height)+16px)] bg-surface">
      <Container>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch">
          <Panel>
            <span className="eyebrow mb-3 text-[11px] text-brand">{form.eyebrow}</span>
            <h2 className="text-section-title text-ink">{form.title}</h2>
            <p className="mt-3 text-body-sm text-ink-secondary">{form.description}</p>

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
              {audience === "kids" && <KidsForm ministries={ministries} />}
              {audience === "youth" && <YouthForm ministries={ministries} />}
              {audience === "adults" && <AdultsForm ministries={ministries} />}
            </div>
          </Panel>

          <CtaCard
            icon={<HeartHandshake size={24} />}
            label={form.host.label}
            title={form.host.title}
            description={form.host.description}
            buttonText={form.host.buttonText}
            buttonHref={`mailto:${hostEmail}?subject=${encodeURIComponent(form.host.subject)}`}
            fill="ink"
            text="inverse"
            border="ink"
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