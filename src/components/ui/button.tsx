// src/components/ui/button.tsx
import Link from "next/link";
import { ComponentPropsWithoutRef, CSSProperties } from "react";

import { cn } from "@/lib/utils";


//   ink         = near-black  (#111111)
//   inverse     = white       (#FFFFFF)
//   grey        = light grey  (#D8D3CD)
//   grey2       = darker grey (#666666)
//   brand       = accent green (#074E40)
//   transparent = see-through
export type Tone = "ink" | "inverse" | "grey" | "grey2" | "brand" | "transparent";

export const toneVar: Record<Tone, string> = {
  ink: "var(--color-frame)", 
  inverse: "var(--color-ink-inverse)",
  grey: "var(--color-border)",
  grey2: "var(--color-ink-muted)",
  brand: "var(--color-brand)",
  transparent: "transparent",
};

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-lg border px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] transition-all duration-200 whitespace-nowrap hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:pointer-events-none disabled:hover:translate-y-0";


interface ColorProps {
  fill?: Tone;   // the button's background
  text?: Tone;   // the label color
  border?: Tone; // the 1px outline color
  shadow?: Tone; // the soft shadow tint
}

const defaultColors: Required<ColorProps> = {
  fill: "ink",
  text: "inverse",
  border: "ink",
  shadow: "ink",
};

function colorStyle({ fill, text, border, shadow }: Required<ColorProps>): CSSProperties {
  return {
    backgroundColor: toneVar[fill],
    color: toneVar[text],
    borderColor: toneVar[border],
    boxShadow:
      shadow === "transparent"
        ? "none"
        : `0 6px 18px -8px ${toneVar[shadow]}, 0 2px 6px -2px ${toneVar[shadow]}`,
  };
}


interface ButtonProps extends ComponentPropsWithoutRef<"button">, ColorProps {}

export function Button({
  fill = defaultColors.fill,
  text = defaultColors.text,
  border = defaultColors.border,
  shadow = defaultColors.shadow,
  className,
  style,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(baseStyles, className)}
      style={{ ...colorStyle({ fill, text, border, shadow }), ...style }}
      {...props}
    />
  );
}

interface ButtonLinkProps extends ComponentPropsWithoutRef<typeof Link>, ColorProps {}

export function ButtonLink({
  fill = defaultColors.fill,
  text = defaultColors.text,
  border = defaultColors.border,
  shadow = defaultColors.shadow,
  className,
  style,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(baseStyles, className)}
      style={{ ...colorStyle({ fill, text, border, shadow }), ...style }}
      {...props}
    />
  );
}