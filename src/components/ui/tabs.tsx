"use client";

import { cn } from "@/lib/utils";

export interface TabItem {
  value: string;
  label: string;
}

type TabsVariant = "light" | "dark";

const VARIANT_STYLES: Record<TabsVariant, { wrap: string; selected: string; unselected: string }> = {
  light: {
    wrap: "border-border bg-surface",
    selected: "bg-ink text-ink-inverse",
    unselected: "text-ink-secondary hover:text-ink",
  },
  dark: {
    wrap: "border-ink-inverse/20 bg-transparent",
    selected: "bg-ink-inverse text-ink",
    unselected: "text-ink-inverse-secondary hover:text-ink-inverse",
  },
};

interface TabsProps {
  items: TabItem[];
  value: string;
  onChange: (value: string) => void;
  idPrefix: string; // ties each tab button to its panel for a11y
  variant?: TabsVariant;
  className?: string;
}

export function Tabs({
  items,
  value,
  onChange,
  idPrefix,
  variant = "light",
  className,
}: TabsProps) {
  const styles = VARIANT_STYLES[variant];

  return (
    <div
      role="tablist"
      className={cn(
        "inline-flex w-full rounded-lg border p-1",
        styles.wrap,
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
              "flex-1 rounded-md px-4 py-2.5 text-sm font-bold uppercase tracking-[0.08em] transition-colors duration-150",
              selected ? styles.selected : styles.unselected
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}