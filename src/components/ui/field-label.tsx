import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export function FieldLabel({
  className,
  ...props
}: ComponentPropsWithoutRef<"span">) {
  return (
    <span
      className={cn("mb-3 block text-label text-brand", className)}
      {...props}
    />
  );
}