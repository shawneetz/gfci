import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type Variant =
  | "primary"
  | "secondary"
  | "ghost"
  | "tonal"
  | "outlined"
  | "inverted";

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] transition-colors duration-200 whitespace-nowrap";

const variantStyles: Record<Variant, string> = {
  // Filled green
  primary:
    "bg-primary text-secondary hover:bg-primary-600",

  // White button with green border
  secondary:
    "border border-primary bg-secondary text-primary hover:bg-primary-50",

  // Text only
  ghost:
    "bg-transparent text-primary hover:bg-primary-50",

  // Light surface button for dark containers
  tonal:
    "bg-secondary text-primary hover:bg-neutral-100",

  // Transparent button with white border/text
  // Ideal for hero sections and image backgrounds
  outlined:
    "border border-secondary bg-transparent text-secondary hover:bg-secondary/10",

  // Kept for backwards compatibility
  inverted:
    "bg-neutral text-secondary hover:bg-neutral-800",
};

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: Variant;
}

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    />
  );
}

interface ButtonLinkProps extends ComponentPropsWithoutRef<typeof Link> {
  variant?: Variant;
}

export function ButtonLink({
  variant = "primary",
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    />
  );
}