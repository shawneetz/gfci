import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef } from "react";

export function Card({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "group rounded-md bg-secondary shadow-card overflow-hidden transition-transform duration-200 hover:-translate-y-1",
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
