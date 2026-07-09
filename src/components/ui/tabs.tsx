"use client";

import { cn } from "@/lib/utils";

export interface TabItem {
  value: string;
  label: string;
}

interface TabsProps {
  items: TabItem[];
  value: string;
  onChange: (value: string) => void;
  idPrefix: string; // ties each tab button to its panel for a11y
  className?: string;
}

// A plain segmented-control tab switcher. No fancy animation, no state of
// its own — the parent owns "value" and re-renders whatever panel matches it.
export function Tabs({ items, value, onChange, idPrefix, className }: TabsProps) {
  return (
    <div
      role="tablist"
      className={cn(
        "inline-flex w-full rounded-none border-2 border-ink bg-surface p-1",
        className
      )}
    >
      {items.map((item) => {
        const selected = item.value === value;
        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            id={`${idPrefix}-tab-${item.value}`}
            aria-selected={selected}
            aria-controls={`${idPrefix}-panel-${item.value}`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(item.value)}
            className={cn(
              "flex-1 rounded-none px-4 py-2.5 text-sm font-bold uppercase tracking-[0.08em] transition-colors duration-150",
              selected
                ? "bg-ink text-ink-inverse"
                : "text-ink-secondary hover:text-ink"
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}