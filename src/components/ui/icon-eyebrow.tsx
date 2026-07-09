import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Tone } from "@/components/ui/button";

const toneClass: Record<Tone, string> = {
  ink: "text-ink",
  inverse: "text-ink-inverse",
  grey: "text-ink-muted",
  grey2: "text-ink-muted",
  brand: "text-brand",
  transparent: "text-current",
};

interface IconEyebrowProps {
  icon: LucideIcon;
  tone?: Tone;
  className?: string;
  children: ReactNode;
}

export function IconEyebrow({
  icon: Icon,
  tone = "brand",
  className,
  children,
}: IconEyebrowProps) {
  return (
    <div className={cn("flex items-center gap-2", toneClass[tone], className)}>
      <Icon size={14} strokeWidth={2.5} />
      <span className="text-label">{children}</span>
    </div>
  );
}