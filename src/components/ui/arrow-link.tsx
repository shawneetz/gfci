import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export function ArrowLink({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof Link>) {
  return (
    <Link
      className={cn(
        "inline-flex items-center gap-1 text-sm font-semibold text-brand underline decoration-dotted underline-offset-4 transition-colors hover:text-brand-hover",
        className
      )}
      {...props}
    />
  );
}