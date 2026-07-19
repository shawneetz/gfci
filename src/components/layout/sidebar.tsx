"use client";

import { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/config/site";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HOME_HERO_ID } from "@/lib/layout";

export function Sidebar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [hidden, setHidden] = useState(isHome);

  useEffect(() => {
    if (!isHome) {
      setHidden(false);
      return;
    }

    setHidden(true);

    const heroEl = document.getElementById(HOME_HERO_ID);
    if (!heroEl) {
      setHidden(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(heroEl);

    return () => observer.disconnect();
  }, [isHome]);

  return (
    <aside
      aria-label="Primary navigation"
      aria-hidden={hidden}
      className={cn(
        "fixed inset-y-0 left-0 z-40 hidden w-72 flex-col border-r-2 border-frame bg-surface-inverse text-ink-inverse transition-transform duration-300 ease-out lg:flex",
        hidden ? "-translate-x-full pointer-events-none" : "translate-x-0"
      )}
    >
      <Link href="/" className="flex items-center gap-3 border-b-2 border-frame px-6 py-6">
        <Image
          src="/icons/gfci-logo-icon.svg"
          alt={`${siteConfig.name} Logo`}
          width={30}
          height={30}
          className="h-30px w-30px"
        />
        <span className="font-headline text-lg font-extrabold leading-none tracking-[0.02em]">
          {siteConfig.name}
        </span>
      </Link>

      <nav className="flex-1 overflow-y-auto px-4 py-8">
        <ul className="space-y-6">
          {siteConfig.nav.map((item) =>
            item.type === "link" ? (
              <li key={item.label}>
                <SidebarLink href={item.href} active={pathname === item.href}>
                  {item.label}
                </SidebarLink>
              </li>
            ) : (
              // item.type === "group"
              <li key={item.label}>
                <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-inverse-secondary/60">
                  {item.label}
                </p>
                <ul className="space-y-1">
                  {item.items.map((sub) => (
                    <li key={sub.href}>
                      <SidebarLink href={sub.href} active={pathname === sub.href}>
                        {sub.label}
                      </SidebarLink>
                    </li>
                  ))}
                </ul>
              </li>
            )
          )}
        </ul>
      </nav>

      <div className="border-t-2 border-frame p-6">
        <ButtonLink
          href={siteConfig.primaryCta.href}
          fill="brand"
          text="inverse"
          border="brand"
          shadow="grey"
          className="w-full"
        >
          {siteConfig.primaryCta.label}
        </ButtonLink>
      </div>
    </aside>
  );
}

function SidebarLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "block border-l-2 py-2 pl-[10px] pr-3 text-sm font-semibold tracking-wide transition-colors",
        active
          ? "border-brand bg-ink-inverse/10 text-ink-inverse"
          : "border-transparent text-ink-inverse-secondary hover:border-ink-inverse/30 hover:bg-ink-inverse/5 hover:text-ink-inverse"
      )}
    >
      {children}
    </Link>
  );
}