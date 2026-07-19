import { ReactNode, CSSProperties } from "react";

import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";
import { Tone, toneVar } from "@/components/ui/button";

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

  fill?: Tone;
  text?: Tone;
  border?: Tone;
  shadow?: Tone;
  radius?: Radius;

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
  radius = "lg",
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
    boxShadow: shadow === "transparent" ? "none" : `0 16px 32px -12px ${toneVar[shadow]}`,
  };

  const resolvedButtonFill = buttonFill ?? text;
  const resolvedButtonText = buttonTextColor ?? fill;
  const resolvedButtonBorder = buttonBorder ?? fill;

  return (
    <div
      className={cn("border p-8 md:p-10", radiusClass[radius], className)}
      style={cardStyle}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-current/10">
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