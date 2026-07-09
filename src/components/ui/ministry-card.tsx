import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { ButtonLink, type Tone } from "@/components/ui/button";

type MinistryCardAspect = "portrait" | "video" | "square";

const aspectClass: Record<MinistryCardAspect, string> = {
  portrait: "aspect-4/5",
  video: "aspect-video",
  square: "aspect-square",
};

interface MinistryCardProps {
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  href: string;
  aspect?: MinistryCardAspect;

  buttonLabel?: string;

  // Button design props — independent from the card itself.
  buttonFill?: Tone;
  buttonText?: Tone;
  buttonBorder?: Tone;
  buttonShadow?: Tone;

  className?: string;
}

export function MinistryCard({
  title,
  description,
  image,
  imageAlt,
  href,
  aspect = "portrait",
  buttonLabel = "Learn More",
  buttonFill = "inverse",
  buttonText = "ink",
  buttonBorder = "ink",
  buttonShadow = "ink",
  className,
}: MinistryCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden border-2 border-ink",
        aspectClass[aspect],
        className
      )}
    >
      <Image
        src={image}
        alt={imageAlt ?? title}
        fill
        sizes="(max-width: 768px) 100vw, 576px"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-linear-to-t from-surface-inverse/90 via-surface-inverse/30 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
        <h3 className="text-card-title text-ink-inverse">{title}</h3>
        <p className="mt-2 max-w-sm text-body-sm text-ink-inverse-secondary">
          {description}
        </p>

        <ButtonLink
          href={href}
          fill={buttonFill}
          text={buttonText}
          border={buttonBorder}
          shadow={buttonShadow}
          className="mt-5"
        >
          {buttonLabel}
          <ArrowRight size={16} />
        </ButtonLink>
      </div>
    </div>
  );
}