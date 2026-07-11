"use client";

import { useId, useState } from "react";
import { CalendarDays, MapPin } from "lucide-react";

import { Container } from "@/components/ui/container";
import { MetaRow } from "@/components/ui/meta-row";
import { Tabs, type TabItem } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type LivePanel = "notes" | "chat";

const TABS: TabItem[] = [
  { value: "notes", label: "Notes" },
  { value: "chat", label: "Chat" },
];

// Placeholder info for whichever service is currently live — swap these
// three fields for real data once the stream is wired up to a schedule.
const LIVE_STREAM = {
  title: "Title Here",
  date: "Sundays, 9:00 AM & 11:00 AM",
  location: "Main Sanctuary",
};

export default function LivePage() {
  const [activePanel, setActivePanel] = useState<LivePanel>("notes");
  const idPrefix = useId();

  return (
    <section className="bg-surface-inverse pt-32 pb-14 text-ink-inverse md:pb-20 md:pt-40">
      <Container className="max-w-4xl">
        <span className="eyebrow mb-4 text-ink-inverse-secondary">Live</span>
        <h1 className="text-2xl max-w-2xl">{LIVE_STREAM.title}</h1>
        <MetaRow
          className="mt-4 text-ink-inverse-secondary"
          items={[
            { icon: CalendarDays, label: LIVE_STREAM.date },
            { icon: MapPin, label: LIVE_STREAM.location },
          ]}
        />

        {/* Video always shows — it's not tied to which tab is selected below it. */}
        <div className="mt-8 flex aspect-video items-center justify-center rounded-md bg-black">
          <span className="text-sm text-ink-inverse-secondary">
            Live stream player
          </span>
        </div>

        <Tabs
          items={TABS}
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
            Sermon Notes
          </h2>
          <p className="text-sm text-ink-inverse-secondary">
            Outline / notes for today&apos;s message go here.
          </p>
        </div>

        <div
          id={`${idPrefix}-panel-chat`}
          role="tabpanel"
          aria-labelledby={`${idPrefix}-tab-chat`}
          className={cn("mt-6", activePanel === "chat" ? "block" : "hidden")}
        >
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-ink-inverse-secondary">
            Live Chat
          </h2>
          <p className="text-sm text-ink-inverse-secondary">
            Chat panel goes here.
          </p>
        </div>
      </Container>
    </section>
  );
}