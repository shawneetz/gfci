import { Container } from "@/components/ui/container";

export default function LivePage() {
  return (
    <section className="bg-surface-inverse text-ink-inverse py-10">
      <Container className="grid gap-6 lg:grid-cols-[220px_1fr_280px]">
        <aside className="hidden lg:block">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-inverse-secondary mb-4">
            Sermon Notes
          </h2>
          <p className="text-sm text-ink-inverse-secondary">
            Outline / notes for today&apos;s message go here.
          </p>
        </aside>

        <div className="aspect-video bg-black rounded-md flex items-center justify-center">
          <span className="text-ink-inverse-secondary text-sm">Live stream player</span>
        </div>

        <aside className="hidden lg:block">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-inverse-secondary mb-4">
            Live Chat
          </h2>
          <p className="text-sm text-ink-inverse-secondary">Chat panel goes here.</p>
        </aside>
      </Container>
    </section>
  );
}