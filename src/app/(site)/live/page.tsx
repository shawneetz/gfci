"use client";

import { useId, useState } from "react";

import { Container } from "@/components/ui/container";
import { Tabs, type TabItem } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type LivePanel = "video" | "notes" | "chat";

const TABS: TabItem[] = [
  { value: "video", label: "Video" },
  { value: "notes", label: "Notes" },
  { value: "chat", label: "Chat" },
];

export default function LivePage() {
  const [activePanel, setActivePanel] = useState<LivePanel>("video");
  const idPrefix = useId();

  return (
    <section className="bg-surface-inverse text-ink-inverse py-10">
      <Container>
        {/* Below `lg` these three panels can't sit side-by-side, so a tab
            switcher replaces the old `hidden lg:block` treatment that
            dropped Notes and Chat entirely on smaller screens. At `lg` and
            up all three always show, and this switcher hides itself. */}
        <Tabs
          items={TABS}
          value={activePanel}
          onChange={(value) => setActivePanel(value as LivePanel)}
          idPrefix={idPrefix}
          className="mb-6 lg:hidden"
        />

        <div className="grid gap-6 lg:grid-cols-[220px_1fr_280px]">
          <aside
            id={`${idPrefix}-panel-notes`}
            className={cn(
              activePanel === "notes" ? "block" : "hidden",
              "lg:block"
            )}
          >
            <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-inverse-secondary mb-4">
              Sermon Notes
            </h2>
            <p className="text-sm text-ink-inverse-secondary">
              Outline / notes for today&apos;s message go here.
            </p>
          </aside>

          <div
            id={`${idPrefix}-panel-video`}
            className={cn(
              "aspect-video bg-black rounded-md items-center justify-center",
              activePanel === "video" ? "flex" : "hidden",
              "lg:flex"
            )}
          >
            <span className="text-ink-inverse-secondary text-sm">
              Live stream player
            </span>
          </div>

          <aside
            id={`${idPrefix}-panel-chat`}
            className={cn(
              activePanel === "chat" ? "block" : "hidden",
              "lg:block"
            )}
          >
            <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-inverse-secondary mb-4">
              Live Chat
            </h2>
            <p className="text-sm text-ink-inverse-secondary">
              Chat panel goes here.
            </p>
          </aside>
        </div>
      </Container>
    </section>
  );
}