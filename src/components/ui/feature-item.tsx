import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ICON_SIZE } from "@/lib/icon-sizes";

interface FeatureItemProps {
  icon: LucideIcon;
  title: string;
  divider?: boolean;
  className?: string;
  children: ReactNode;
}

export function FeatureItem({
  icon: Icon,
  title,
  divider = true,
  className,
  children,
}: FeatureItemProps) {
  return (
    <div
      className={cn(
        "flex gap-4 py-6 first:pt-0 last:pb-0",
        divider && "border-b border-border",
        className
      )}
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-subtle text-brand">
        <Icon size={ICON_SIZE.feature} />
      </div>
      <div>
        <h3 className="text-lg font-bold text-ink">{title}</h3>
        <p className="mt-2 text-body-sm text-ink-secondary">{children}</p>
      </div>
    </div>
  );
}