import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef } from "react";

export function Container({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-container px-6 md:px-10", className)}
      {...props}
    />
  );
}
