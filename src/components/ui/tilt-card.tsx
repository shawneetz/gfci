import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export const TILT_CARD_BORDER = "border-2 border-frame transition-all duration-150";
export const TILT_CARD_LIFT =
  "hover:-translate-y-1 hover:shadow-[6px_6px_0_0_var(--color-frame)]";

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