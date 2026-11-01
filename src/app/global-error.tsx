"use client";

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="en"><body>
      <main className="mx-auto flex min-h-dvh max-w-2xl flex-col items-center justify-center px-6 text-center">
        <h1 className="text-4xl font-black text-ink">Something went wrong</h1>
        <p className="mt-4 text-body text-ink-secondary">Please try again.</p>
        <button onClick={reset} className="mt-8 rounded-lg border border-brand bg-brand px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-ink-inverse">Try again</button>
      </main>
    </body></html>
  );
}
