"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Overview", href: "/admin" },
  { label: "Sermons", href: "/admin/sermons" },
  { label: "Events", href: "/admin/events" },
  { label: "Ministries", href: "/admin/ministries" },
  { label: "Prayer Teams", href: "/admin/prayer-teams" },
  { label: "Testimonies", href: "/admin/testimonies" },
  { label: "People", href: "/admin/people" },
  { label: "Live Stream", href: "/admin/live-stream" },
  { label: "Core Values", href: "/admin/core-values" },
  { label: "What to Expect", href: "/admin/expectation-items" },
] as const;

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-1 overflow-x-auto">
      {NAV_ITEMS.map((item) => {
        // "/admin" needs an exact match — every other admin route starts
        // with "/admin/", so a plain startsWith would keep Overview
        // highlighted on every other page too.
        const active =
          item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "whitespace-nowrap border-b-2 px-3 py-3 text-sm font-semibold transition-colors",
              active ? "border-ink text-ink" : "border-transparent text-ink-muted hover:text-ink"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}