// src/components/ui/card.tsx
import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef } from "react";
import { TILT_CARD_BORDER, TILT_CARD_LIFT } from "@/components/ui/tilt-card";

export function Card({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "group rounded-none bg-surface overflow-hidden",
        TILT_CARD_BORDER,
        TILT_CARD_LIFT,
        className
      )}
      {...props}
    />
  );
}

export function CardBody({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return <div className={cn("p-5 md:p-6", className)} {...props} />;
}