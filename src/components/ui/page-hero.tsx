import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { ReactNode } from "react";

export type HeroTone = "dark" | "light";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  tone?: HeroTone;
  children?: ReactNode;
  className?: string;
}

const toneClass: Record<HeroTone, string> = {
  dark: "bg-surface-inverse text-ink-inverse border-b-2 border-ink-inverse",
  light: "bg-surface-alt text-ink",
};

const eyebrowToneClass: Record<HeroTone, string> = {
  dark: "text-ink-inverse-secondary",
  light: "text-ink-muted",
};

const titleToneClass: Record<HeroTone, string> = {
  dark: "",
  light: "text-brand",
};

const descriptionToneClass: Record<HeroTone, string> = {
  dark: "text-ink-inverse-secondary",
  light: "text-ink-secondary",
};

export function PageHero({
  eyebrow,
  title,
  description,
  tone = "dark",
  children,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "pt-28 pb-14 md:pt-36 md:pb-20",
        toneClass[tone],
        className
      )}
    >
      <Container>
        {eyebrow && (
          <span className={cn("eyebrow mb-4", eyebrowToneClass[tone])}>
            {eyebrow}
          </span>
        )}
        <h1 className={cn("text-display max-w-2xl", titleToneClass[tone])}>
          {title}
        </h1>
        {description && (
          <p
            className={cn(
              "mt-4 max-w-xl text-body",
              descriptionToneClass[tone]
            )}
          >
            {description}
          </p>
        )}
        {children}
      </Container>
    </section>
  );
}