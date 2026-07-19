import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type PanelTone = "surface" | "surface-alt" | "surface-inverse" | "brand-subtle";

const toneClass: Record<PanelTone, string> = {
  surface: "bg-surface text-ink",
  "surface-alt": "bg-surface-alt text-ink",
  "surface-inverse": "bg-surface-inverse text-ink-inverse",
  "brand-subtle": "bg-brand-subtle text-ink",
};

interface PanelProps extends ComponentPropsWithoutRef<"div"> {
  tone?: PanelTone;
  shadow?: boolean;
}

export function Panel({
  tone = "surface",
  shadow = true,
  className,
  ...props
}: PanelProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border p-6 md:p-8",
        toneClass[tone],
        shadow && "shadow-[var(--shadow-soft)]",
        className
      )}
      {...props}
    />
  );
}