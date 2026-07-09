import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import { Tone } from "@/components/ui/button";

const toneClass: Record<Tone, string> = {
  ink: "bg-ink text-ink-inverse",
  inverse: "bg-ink-inverse text-ink",
  grey: "bg-border text-ink-secondary",
  grey2: "bg-ink-muted text-ink-inverse",
  brand: "bg-brand text-ink-inverse",
  transparent: "bg-transparent text-ink border border-ink",
};

interface BadgeProps extends ComponentPropsWithoutRef<"span"> {
  tone?: Tone;
}

export function Badge({ tone = "grey", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide",
        toneClass[tone],
        className
      )}
      {...props}
    />
  );
}