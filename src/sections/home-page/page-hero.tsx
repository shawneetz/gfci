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
    <section className={cn("bg-primary text-secondary pt-16 pb-14 md:pt-24 md:pb-20", className)}>
      <Container>
        {eyebrow && (
          <span className="eyebrow text-secondary/90 mb-4 [&::before]:bg-secondary">
            {eyebrow}
          </span>
        )}
        <h1 className="text-display max-w-2xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-xl text-body text-secondary/85">
            {description}
          </p>
        )}
        {children}
      </Container>
    </section>
  );
}
