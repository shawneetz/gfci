"use client";

import { useId, useState } from "react";
import { CalendarDays, MapPin } from "lucide-react";

import { Container } from "@/components/ui/container";
import { MetaRow } from "@/components/ui/meta-row";
import { Tabs, type TabItem } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { hero, tabs, notes, chat } from "@/content/live";

type LivePanel = "notes" | "chat";

interface LiveStreamViewProps {
  stream: { title: string; date: string; location: string };
}

export function LiveStreamView({ stream }: LiveStreamViewProps) {
  const [activePanel, setActivePanel] = useState<LivePanel>("notes");
  const idPrefix = useId();

  return (
    <section className="bg-surface-inverse pt-32 pb-14 text-ink-inverse md:pb-20 md:pt-40">
      <Container className="max-w-4xl">
        <span className="eyebrow mb-4 text-ink-inverse-secondary">{hero.eyebrow}</span>
        <h1 className="text-2xl max-w-2xl">{stream.title}</h1>
        <MetaRow
          className="mt-4 text-ink-inverse-secondary"
          items={[
            { icon: CalendarDays, label: stream.date },
            { icon: MapPin, label: stream.location },
          ]}
        />

        <div className="mt-8 flex aspect-video items-center justify-center rounded-md bg-black">
          <span className="text-sm text-ink-inverse-secondary">Live stream player</span>
        </div>

        <Tabs
          items={tabs as TabItem[]}
          value={activePanel}
          onChange={(value) => setActivePanel(value as LivePanel)}
          idPrefix={idPrefix}
          className="mt-6"
        />

        <div
          id={`${idPrefix}-panel-notes`}
          role="tabpanel"
          aria-labelledby={`${idPrefix}-tab-notes`}
          className={cn("mt-6", activePanel === "notes" ? "block" : "hidden")}
        >
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-ink-inverse-secondary">
            {notes.title}
          </h2>
          <p className="text-sm text-ink-inverse-secondary">{notes.placeholder}</p>
        </div>

        <div
          id={`${idPrefix}-panel-chat`}
          role="tabpanel"
          aria-labelledby={`${idPrefix}-tab-chat`}
          className={cn("mt-6", activePanel === "chat" ? "block" : "hidden")}
        >
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-ink-inverse-secondary">
            {chat.title}
          </h2>
          <p className="text-sm text-ink-inverse-secondary">{chat.placeholder}</p>
        </div>
      </Container>
    </section>
  );
}