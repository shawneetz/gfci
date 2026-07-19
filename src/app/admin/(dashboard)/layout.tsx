import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";

import { Container } from "@/components/ui/container";
import { AdminSidebar } from "./_components/admin-sidebar";
import { AdminMobileNav } from "./_components/admin-mobile-nav";

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

  const userLabel = session.user.name ?? session.user.email ?? "";

  return (
    <div className="min-h-dvh bg-surface-alt">
      {/* Desktop (lg+): fixed sidebar is the nav. */}
      <AdminSidebar logoutAction={logout} userLabel={userLabel} />

      {/* Mobile & tablet (below lg): hamburger + drawer is the nav. */}
      <AdminMobileNav logoutAction={logout} userLabel={userLabel} />

      <div className="lg:pl-64">
        <Container className="py-10">{children}</Container>
      </div>
    </div>
  );
}