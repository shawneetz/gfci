// src/components/ui/cta-card.tsx
import { ReactNode, CSSProperties } from "react";

import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";
import { Tone, toneVar } from "@/components/ui/button";

// Controls how rounded the card's corners are. Kept as an overridable prop
// (rather than hardcoding rounded-none) so a future one-off exception has
// somewhere to go — see design-notes.md's guidance on treating rounded
// corners as an explicit exception, not a default.
export type Radius = "none" | "sm" | "md" | "lg" | "xl" | "full";

const radiusClass: Record<Radius, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-[2rem]",
};

interface CtaCardProps {
  icon: ReactNode;
  label: string;
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;

  // Card colors
  fill?: Tone;   // card background
  text?: Tone;   // heading, description, and icon color
  border?: Tone; // card border color
  shadow?: Tone; // card's own hard offset shadow color ("transparent" = no shadow)
  radius?: Radius; // card corner rounding — defaults to "none" per design-notes.md

  // Button colors — fully independent from the card.
  // If left unset, they default to an inverted version of the card's
  // colors (fill<->text swap), matching the original look.
  buttonFill?: Tone;
  buttonTextColor?: Tone;
  buttonBorder?: Tone;
  buttonShadow?: Tone;

  className?: string;
}

export function CtaCard({
  icon,
  label,
  title,
  description,
  buttonText,
  buttonHref,
  fill = "ink",
  text = "inverse",
  border = "ink",
  shadow = "transparent",
  radius = "none",
  buttonFill,
  buttonTextColor,
  buttonBorder,
  buttonShadow = "grey",
  className,
}: CtaCardProps) {
  const cardStyle: CSSProperties = {
    backgroundColor: toneVar[fill],
    color: toneVar[text],
    borderColor: toneVar[border],
    boxShadow: shadow === "transparent" ? "none" : `6px 6px 0 0 ${toneVar[shadow]}`,
  };

  // Fall back to an inverted card color scheme if button colors aren't set.
  const resolvedButtonFill = buttonFill ?? text;
  const resolvedButtonText = buttonTextColor ?? fill;
  const resolvedButtonBorder = buttonBorder ?? fill;

  return (
    <div
      className={cn("border p-8 md:p-10", radiusClass[radius], className)}
      style={cardStyle}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-current/10">
        {icon}
      </div>

      <p className="mt-8 text-label opacity-80">{label}</p>

      <h2 className="mt-3 text-section-title">{title}</h2>

      <p className="mt-4 max-w-md text-body opacity-80">{description}</p>

      <ButtonLink
        href={buttonHref}
        fill={resolvedButtonFill}
        text={resolvedButtonText}
        border={resolvedButtonBorder}
        shadow={buttonShadow}
        className="mt-8 w-full sm:w-auto"
      >
        {buttonText}
      </ButtonLink>
    </div>
  );
}