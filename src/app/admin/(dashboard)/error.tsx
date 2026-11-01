"use client";

// Error boundary for every admin page. Next.js shows this when a page throws,
// keeping the admin sidebar in place. "Try again" re-renders the failed page.
import { Button } from "@/components/ui/button";
import { ArrowLink } from "@/components/ui/arrow-link";

export default function AdminError({ reset }: { reset: () => void }) {
  return (
    <div className="max-w-lg">
      <h1 className="text-section-title text-ink">Something went wrong</h1>
      <p className="mt-2 text-body-sm text-ink-secondary">
        This page could not load. Please try again.
      </p>

      <div className="mt-6 flex items-center gap-6">
        <Button type="button" onClick={reset} fill="brand" text="inverse" border="brand" shadow="grey">
          Try again
        </Button>
        <ArrowLink href="/admin">Back to overview</ArrowLink>
      </div>
    </div>
  );
}
