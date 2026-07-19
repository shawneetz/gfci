"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Menu, X } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { AdminNavLinks } from "./admin-nav-links";

interface AdminMobileNavProps {
  logoutAction: () => Promise<void>;
  userLabel: string;
}
export function AdminMobileNav({ logoutAction, userLabel }: AdminMobileNavProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="border-b border-ink-inverse/10 bg-surface-inverse text-ink-inverse lg:hidden">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/admin" className="font-headline text-lg font-extrabold tracking-[0.02em]">
          {siteConfig.name} <span className="text-ink-inverse-secondary">ADMIN</span>
        </Link>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center text-ink-inverse"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </Container>

      <div
        className={cn(
          "fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-surface-inverse transition-transform duration-200",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <Container className="flex flex-col gap-6 py-6">
          <AdminNavLinks onNavigate={() => setOpen(false)} />

          <div className="border-t border-ink-inverse/10 pt-4">
            <p className="px-1 text-xs text-ink-inverse-secondary">{userLabel}</p>
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
        </Container>
      </div>
    </div>
  );
}