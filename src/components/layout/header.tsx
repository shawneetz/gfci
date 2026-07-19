"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";

import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NavItem = (typeof siteConfig.nav)[number];

export function Header() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const solid = scrolled || open;
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-200 lg:hidden",
        solid ? "border-b border-border bg-surface shadow-sm" : "bg-transparent"
      )}
    >
      <Container className="flex h-16 items-center">
        <Link href="/" className="flex h-10 w-10 items-center justify-center">
          <Image
            src="/icons/gfci-logo-icon.svg"
            alt={`${siteConfig.name} Logo`}
            width={30}
            height={30}
            priority
            className="h-30px w-30px"
          />
        </Link>

        <Link href="/" className="flex-1 text-center">
          <span
            className={cn(
              "font-headline text-[clamp(1.375rem,1rem_+_3vw,2rem)] font-extrabold leading-none tracking-[0.02em] transition-colors duration-200",
              solid ? "text-ink" : "text-ink-inverse"
            )}
          >
            {siteConfig.name}
          </span>
        </Link>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-sm transition-colors",
            solid ? "text-ink" : "text-ink-inverse"
          )}
        >
          {open ? <X size={30} /> : <Menu size={30} />}
        </button>
      </Container>

      {/* ================= Mobile Navigation Drawer ================= */}
      <div
        className={cn(
          "fixed inset-x-0 top-16 bottom-0 overflow-y-auto bg-surface transition-transform duration-200",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <Container className="flex flex-col gap-1 pt-6">
          {siteConfig.nav.map((item) => (
            <MobileNavItem key={item.label} item={item} pathname={pathname} />
          ))}

          <ButtonLink href={siteConfig.primaryCta.href} className="mt-6 w-full">
            {siteConfig.primaryCta.label}
          </ButtonLink>
        </Container>
      </div>
    </header>
  );
}

// ---------------------------------------------------------------------------
// Standalone links render directly; groups render as an accordion row that
// expands into an indented sub-list.
// ---------------------------------------------------------------------------

function MobileNavItem({ item, pathname }: { item: NavItem; pathname: string }) {
  const [open, setOpen] = useState(false);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  if (item.type === "link") {
    return (
      <Link
        href={item.href}
        className={cn(
          "border-b border-border py-4 text-base font-semibold",
          pathname === item.href ? "text-ink" : "text-ink-secondary"
        )}
      >
        {item.label}
      </Link>
    );
  }

  // item.type === "group"
  const isActive = item.items.some((sub) => sub.href === pathname);

  return (
    <div className="border-b border-border">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "flex w-full items-center justify-between py-4 text-base font-semibold",
          isActive ? "text-ink" : "text-ink-secondary"
        )}
      >
        {item.label}
        <ChevronDown
          size={18}
          className={cn("transition-transform duration-150", open && "rotate-180")}
        />
      </button>

      {open && (
        <div className="flex flex-col gap-1 pb-4 pl-4">
          {item.items.map((sub) => (
            <Link
              key={sub.href}
              href={sub.href}
              className={cn(
                "py-2 text-sm font-semibold",
                pathname === sub.href ? "text-ink" : "text-ink-muted"
              )}
            >
              {sub.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}