import Image from "next/image";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { HERO_OVERLAY } from "@/lib/overlays";
import { ReactNode } from "react";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  image?: string;
  imageAlt?: string;
}

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  className,
  image,
  imageAlt,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-surface-inverse text-ink-inverse border-b border-ink-inverse/25 pt-28 pb-14 md:pt-36 md:pb-20",
        className
      )}
    >
      {image && (
        <>
          <Image
            src={image}
            alt={imageAlt ?? ""}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className={cn("pointer-events-none absolute inset-0", HERO_OVERLAY)} />
        </>
      )}

      <Container className="relative z-10">
        {eyebrow && (
          <span className="eyebrow mb-4 text-ink-inverse-secondary">
            {eyebrow}
          </span>
        )}
        <h1 className="text-display max-w-2xl">{title}</h1>
        {description && (
          <p className="mt-4 max-w-xl text-body text-ink-inverse-secondary">
            {description}
          </p>
        )}
        {children}
      </Container>
    </section>
  );
}