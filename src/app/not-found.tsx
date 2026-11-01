import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-2xl flex-col items-center justify-center px-6 text-center">
      <p className="text-caption font-bold uppercase tracking-[0.18em] text-brand">404</p>
      <h1 className="mt-3 text-4xl font-black text-ink">Page not found</h1>
      <p className="mt-4 text-body text-ink-secondary">The page you’re looking for may have moved or no longer exists.</p>
      <Link href="/" className="mt-8 rounded-lg border border-brand bg-brand px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-ink-inverse">Back home</Link>
    </main>
  );
}
