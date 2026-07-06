import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef } from "react";

export function Card({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "group rounded-none border-2 border-ink bg-surface overflow-hidden transition-all duration-150 hover:-translate-y-1 hover:shadow-[6px_6px_0_0_var(--color-ink)]",
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