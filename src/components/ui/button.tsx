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
  ink: "var(--color-ink)",
  inverse: "var(--color-ink-inverse)",
  grey: "var(--color-border)",
  grey2: "var(--color-ink-muted)",
  brand: "var(--color-brand)",
  transparent: "transparent",
};


const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-none border-2 px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] transition-all duration-150 whitespace-nowrap hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none disabled:cursor-not-allowed disabled:opacity-60 disabled:pointer-events-none";


interface ColorProps {
  fill?: Tone;   // the button's background
  text?: Tone;   // the label color
  border?: Tone; // the 2px outline color
  shadow?: Tone; // the hard offset shadow color
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
    boxShadow: `4px 4px 0 0 ${toneVar[shadow]}`,
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