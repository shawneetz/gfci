"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

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
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        solid
          ? "border-b border-border bg-surface shadow-sm"
          : "bg-transparent"
      )}
    >
      <Container className="flex h-16 items-center justify-between">
        {/* ================= Mobile Header ================= */}
        <div className="flex w-full items-center lg:hidden">
          <Link
            href="/"
            className="flex h-10 w-10 items-center justify-center"
          >
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
                "font-headline text-[32px] font-extrabold leading-none tracking-[0.02em] transition-colors duration-300",
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
        </div>

        {/* ================= Desktop Header ================= */}
        <div className="hidden w-full items-center justify-between lg:flex">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/icons/gfci-logo-icon.svg"
              alt={`${siteConfig.name} Logo`}
              width={30}
              height={30}
              priority
              className="h-30px w-30px"
            />

            <span
              className={cn(
                "font-headline text-[32px] font-extrabold leading-none tracking-[0.02em] transition-colors duration-300",
                scrolled ? "text-ink" : "text-ink-inverse"
              )}
            >
              {siteConfig.name}
            </span>
          </Link>

          <nav className="flex items-center gap-8">
            {siteConfig.nav.map((item) => (
              <DesktopNavItem
                key={item.label}
                item={item}
                pathname={pathname}
                scrolled={scrolled}
              />
            ))}
          </nav>

          <ButtonLink href={siteConfig.primaryCta.href}>
            {siteConfig.primaryCta.label}
          </ButtonLink>
        </div>
      </Container>

      {/* ================= Mobile Navigation ================= */}
      <div
        className={cn(
          "fixed inset-x-0 top-16 bottom-0 overflow-y-auto bg-surface transition-transform duration-300 lg:hidden",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <Container className="flex flex-col gap-1 pt-6">
          {siteConfig.nav.map((item) => (
            <MobileNavItem key={item.label} item={item} pathname={pathname} />
          ))}

          <ButtonLink
            href={siteConfig.primaryCta.href}
            className="mt-6 w-full"
          >
            {siteConfig.primaryCta.label}
          </ButtonLink>
        </Container>
      </div>
    </header>
  );
}

// ---------------------------------------------------------------------------
// Desktop: standalone links render directly; groups render as a click-to-open
// dropdown (closes on outside click, Escape, or route change).
// ---------------------------------------------------------------------------

function DesktopNavItem({
  item,
  pathname,
  scrolled,
}: {
  item: NavItem;
  pathname: string;
  scrolled: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const linkColor = (active: boolean) =>
    cn(
      "text-sm font-semibold tracking-wide transition-colors",
      active
        ? scrolled
          ? "text-ink"
          : "text-ink-inverse"
        : scrolled
        ? "text-ink-secondary hover:text-brand"
        : "text-ink-inverse/90 hover:text-ink-inverse"
    );

  if (item.type === "link") {
    return (
      <Link href={item.href} className={linkColor(pathname === item.href)}>
        {item.label}
      </Link>
    );
  }

  // item.type === "group"
  const isActive = item.items.some((sub) => sub.href === pathname);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className={cn(linkColor(isActive), "flex items-center gap-1")}
      >
        {item.label}
        <ChevronDown
          size={14}
          className={cn("transition-transform duration-150", open && "rotate-180")}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-3 min-w-200px rounded-none border-2 border-frame bg-surface py-2 shadow-[4px_4px_0_0_var(--color-frame)]">
          {item.items.map((sub) => (
            <Link
              key={sub.href}
              href={sub.href}
              onClick={() => setOpen(false)}
              className={cn(
                "block px-4 py-2.5 text-sm font-semibold transition-colors",
                pathname === sub.href
                  ? "text-ink"
                  : "text-ink-secondary hover:bg-surface-alt hover:text-ink"
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

// ---------------------------------------------------------------------------
// Mobile: standalone links render directly; groups render as an accordion
// row that expands into an indented sub-list.
// ---------------------------------------------------------------------------

function MobileNavItem({
  item,
  pathname,
}: {
  item: NavItem;
  pathname: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

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