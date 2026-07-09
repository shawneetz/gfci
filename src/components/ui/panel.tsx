import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type PanelTone = "surface" | "surface-alt" | "surface-inverse";

const toneClass: Record<PanelTone, string> = {
  surface: "bg-surface text-ink",
  "surface-alt": "bg-surface-alt text-ink",
  "surface-inverse": "bg-surface-inverse text-ink-inverse",
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
        "rounded-none border-2 border-ink p-6 md:p-8",
        toneClass[tone],
        shadow && "shadow-[6px_6px_0_0_var(--color-ink)]",
        className
      )}
      {...props}
    />
  );
}