import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export const TILT_CARD_BORDER = "rounded-lg border border-border transition-all duration-200";
export const TILT_CARD_LIFT =
  "hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] hover:border-transparent";

interface TiltCardProps extends ComponentPropsWithoutRef<typeof Link> {
  lift?: boolean;
}

export function TiltCard({ lift = true, className, ...props }: TiltCardProps) {
  return (
    <Link
      className={cn(TILT_CARD_BORDER, lift && TILT_CARD_LIFT, className)}
      {...props}
    />
  );
}