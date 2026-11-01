"use client";

// Navigation links shared by the admin sidebar (desktop) and drawer (mobile).
// A small heading is shown above the first link of each group.
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ADMIN_NAV_ITEMS } from "./admin-nav-items";

interface AdminNavLinksProps {
  onNavigate?: () => void;
  className?: string;
}

export function AdminNavLinks({ onNavigate, className }: AdminNavLinksProps) {
  const pathname = usePathname();

  return (
    <nav className={cn("flex flex-col gap-1", className)}>
      {ADMIN_NAV_ITEMS.map((item, index) => {
        // Overview only matches /admin exactly; other links match their sub-pages too.
        const active =
          item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);

        // Show the group heading only when this item starts a new group.
        const startsGroup = !!item.group && ADMIN_NAV_ITEMS[index - 1]?.group !== item.group;

        return (
          <div key={item.href}>
          {startsGroup && (
            <p className="mb-2 mt-5 px-3 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-ink-inverse-secondary/60">{item.group}</p>
          )}
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors",
              active
                ? "bg-ink-inverse/10 text-ink-inverse"
                : "text-ink-inverse-secondary hover:bg-ink-inverse/5 hover:text-ink-inverse"
            )}
          >
            <item.icon size={18} className="shrink-0" />
            {item.label}
          </Link>
          </div>
        );
      })}
    </nav>
  );
}