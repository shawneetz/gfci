import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ICON_SIZE } from "@/lib/icon-sizes";

interface MetaRowItem {
  icon: LucideIcon;
  label: string;
}

interface MetaRowProps {
  items: MetaRowItem[];
  className?: string;
}

export function MetaRow({ items, className }: MetaRowProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-3 gap-y-1 text-body-sm text-ink-muted",
        className
      )}
    >
      {items.map((item) => (
        <span key={item.label} className="inline-flex items-center gap-1.5">
          <item.icon size={ICON_SIZE.inline} />
          {item.label}
        </span>
      ))}
    </div>
  );
}