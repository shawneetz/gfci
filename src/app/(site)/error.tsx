"use client";

// Error boundary for every public page. The header, sidebar and footer stay in
// place; only the page content is replaced by this message.
import { Container } from "@/components/ui/container";
import { Button, ButtonLink } from "@/components/ui/button";

export default function SiteError({ reset }: { reset: () => void }) {
  return (
    <section className="section bg-surface">
      <Container className="max-w-2xl text-center">
        <h1 className="text-section-title text-ink">Something went wrong</h1>
        <p className="mt-4 text-body text-ink-secondary">
          This page could not load. Please try again.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button type="button" onClick={reset} fill="brand" text="inverse" border="brand" shadow="grey">
            Try again
          </Button>
          <ButtonLink href="/" fill="transparent" text="ink" border="ink" shadow="transparent">
            Back home
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
