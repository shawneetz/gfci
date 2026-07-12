import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ICON_SIZE } from "@/lib/icon-sizes";

type LinkHref = ComponentPropsWithoutRef<typeof Link>["href"];

export interface MonthNavProps {
  label: string;
  prevHref?: LinkHref;
  nextHref?: LinkHref;
  className?: string;
}

const arrowClass =
  "flex h-9 w-9 items-center justify-center border-2 transition-colors";

export function MonthNav({ label, prevHref, nextHref, className }: MonthNavProps) {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <h2 className="text-section-title text-ink">{label}</h2>
      <div className="flex items-center gap-2">
        {prevHref ? (
          <Link
            href={prevHref}
            aria-label="Previous month"
            className={cn(arrowClass, "border-ink text-ink hover:bg-surface-alt")}
          >
            <ChevronLeft size={ICON_SIZE.inline} />
          </Link>
        ) : (
          <span
            aria-hidden="true"
            className={cn(arrowClass, "border-border text-ink-muted")}
          >
            <ChevronLeft size={ICON_SIZE.inline} />
          </span>
        )}
        {nextHref ? (
          <Link
            href={nextHref}
            aria-label="Next month"
            className={cn(arrowClass, "border-ink text-ink hover:bg-surface-alt")}
          >
            <ChevronRight size={ICON_SIZE.inline} />
          </Link>
        ) : (
          <span
            aria-hidden="true"
            className={cn(arrowClass, "border-border text-ink-muted")}
          >
            <ChevronRight size={ICON_SIZE.inline} />
          </span>
        )}
      </div>
    </div>
  );
}