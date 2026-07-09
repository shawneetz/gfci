import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

interface PillProps extends ComponentPropsWithoutRef<typeof Link> {
  active?: boolean;
  size?: "sm" | "md";
}

const sizeClass: Record<NonNullable<PillProps["size"]>, string> = {
  sm: "px-3 py-1 text-xs",
  md: "px-4 py-1.5 text-sm",
};

export function Pill({
  active = false,
  size = "md",
  className,
  ...props
}: PillProps) {
  return (
    <Link
      aria-current={active ? true : undefined}
      className={cn(
        "inline-flex items-center whitespace-nowrap rounded-full font-semibold transition-colors",
        sizeClass[size],
        active
          ? "bg-ink-inverse text-ink"
          : "bg-ink-inverse/15 text-ink-inverse hover:bg-ink-inverse/25",
        className
      )}
      {...props}
    />
  );
}