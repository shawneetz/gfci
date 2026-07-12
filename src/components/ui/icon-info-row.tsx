import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ICON_SIZE } from "@/lib/icon-sizes";

interface IconInfoRowProps {
  icon: LucideIcon;
  title: string;
  className?: string;
  children: ReactNode;
}

export function IconInfoRow({
  icon: Icon,
  title,
  className,
  children,
}: IconInfoRowProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center gap-2">
        <Icon size={ICON_SIZE.section} className="shrink-0 text-brand" />
        <h3 className="text-lg font-bold text-ink">{title}</h3>
      </div>
      <div className="pl-6 text-body-sm text-ink-secondary">{children}</div>
    </div>
  );
}