import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default async function AdminHomePage() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  async function logout() {
    "use server";
    await signOut({ redirectTo: "/admin/login" });
  }

  return (
    <section className="flex min-h-dvh items-center justify-center bg-surface">
      <Container className="max-w-sm text-center">
        <p className="text-body text-ink-secondary">Signed in as</p>
        <p className="mt-1 text-lg font-bold text-ink">{session.user.name ?? session.user.email}</p>

        <p className="mt-6 text-body-sm text-ink-muted">
          The admin dashboard isn&apos;t built yet — this page just proves sign-in and
          route protection work.
        </p>

        <form action={logout} className="mt-6">
          <Button type="submit" fill="ink" text="inverse" border="ink" shadow="grey" className="w-full">
            Sign Out
          </Button>
        </form>
      </Container>
    </section>
  );
}