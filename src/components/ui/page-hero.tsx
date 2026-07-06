import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { ReactNode } from "react";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "bg-surface-inverse text-ink-inverse pt-16 pb-14 md:pt-24 md:pb-20 border-b-2 border-ink-inverse",
        className
      )}
    >
      <Container>
        {eyebrow && (
          <span className="eyebrow text-ink-inverse-secondary mb-4">
            {eyebrow}
          </span>
        )}
        <h1 className="text-display max-w-2xl">
          {title}
        </h1>
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