import { redirect } from "next/navigation";
import Link from "next/link";
import { auth, signOut } from "@/auth";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { AdminNav } from "./_components/admin-nav";

export const dynamic = "force-dynamic";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  async function logout() {
    "use server";
    await signOut({ redirectTo: "/admin/login" });
  }

  return (
    <div className="min-h-dvh bg-surface-alt">
      <header className="border-b-2 border-frame bg-surface-inverse text-ink-inverse">
        <Container className="flex h-16 items-center justify-between">
          <Link href="/admin" className="font-headline text-xl font-extrabold tracking-[0.02em]">
            GOLDEN FAITH <span className="text-ink-inverse-secondary">ADMIN</span>
          </Link>

          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-ink-inverse-secondary sm:inline">
              {session.user.name ?? session.user.email}
            </span>
            <form action={logout}>
              <Button
                type="submit"
                fill="transparent"
                text="inverse"
                border="inverse"
                shadow="transparent"
                className="px-4 py-2 text-xs"
              >
                Sign Out
              </Button>
            </form>
          </div>
        </Container>
      </header>

      <div className="border-b-2 border-frame bg-surface">
        <Container>
          <AdminNav />
        </Container>
      </div>

      <Container className="py-10">{children}</Container>
    </div>
  );
}