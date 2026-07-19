import Link from "next/link";
import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { AdminNavLinks } from "./admin-nav-links";

interface AdminSidebarProps {
  logoutAction: () => Promise<void>;
  userLabel: string;
}

export function AdminSidebar({ logoutAction, userLabel }: AdminSidebarProps) {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-ink-inverse/10 bg-surface-inverse text-ink-inverse lg:flex">
      <Link
        href="/admin"
        className="flex h-16 shrink-0 items-center border-b border-ink-inverse/10 px-6 font-headline text-lg font-extrabold tracking-[0.02em]"
      >
        {siteConfig.name} <span className="ml-1.5 text-ink-inverse-secondary">ADMIN</span>
      </Link>

      <div className="flex-1 overflow-y-auto px-3 py-4">
        <AdminNavLinks />
      </div>

      <div className="shrink-0 border-t border-ink-inverse/10 p-4">
        <p className="truncate px-1 text-xs text-ink-inverse-secondary">{userLabel}</p>
        <form action={logoutAction} className="mt-3">
          <Button
            type="submit"
            fill="transparent"
            text="inverse"
            border="inverse"
            shadow="transparent"
            className="w-full justify-start px-3 py-2 text-xs"
          >
            <LogOut size={14} />
            Sign Out
          </Button>
        </form>
      </div>
    </aside>
  );
}