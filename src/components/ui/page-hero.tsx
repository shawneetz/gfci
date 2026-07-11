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
        "bg-surface-inverse text-ink-inverse border-b-2 border-ink-inverse pt-28 pb-14 md:pt-36 md:pb-20",
        className
      )}
    >
      <Container>
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