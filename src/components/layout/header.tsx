"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close mobile menu after navigation
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scrolling while mobile menu is open
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
        scrolled
          ? "border-b border-neutral-200 bg-secondary shadow-sm"
          : "bg-transparent"
      )}
    >
      <Container className="flex h-16 items-center justify-between">
        {/* ================= Mobile Header ================= */}
        <div className="flex w-full items-center lg:hidden">
          {/* Logo */}
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
              className="h-[30px] w-[30px]"
            />
          </Link>

          {/* Centered Title */}
          <Link
            href="/"
            className="flex-1 text-center"
          >
            <span
              className={cn(
                "font-headline text-[32px] font-extrabold leading-none transition-colors duration-300",
                scrolled ? "text-primary" : "text-white"
              )}
            >
              {siteConfig.name}
            </span>
          </Link>

          {/* Menu */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-sm transition-colors",
              scrolled ? "text-primary" : "text-white"
            )}
          >
            {open ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>

        {/* ================= Desktop Header ================= */}
        <div className="hidden w-full items-center justify-between lg:flex">
          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <Image
              src="/icons/gfci-logo-icon.svg"
              alt={`${siteConfig.name} Logo`}
              width={30}
              height={30}
              priority
              className="h-[30px] w-[30px]"
            />

            <span
              className={cn(
                "font-headline text-[32px] font-extrabold leading-none transition-colors duration-300",
                scrolled ? "text-primary" : "text-white"
              )}
            >
              {siteConfig.name}
            </span>
          </Link>

          <nav className="flex items-center gap-8">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-semibold tracking-wide transition-colors",
                  pathname === item.href
                    ? scrolled
                      ? "text-primary"
                      : "text-white"
                    : scrolled
                    ? "text-neutral-700 hover:text-primary"
                    : "text-white/90 hover:text-white"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <ButtonLink
            href={siteConfig.primaryCta.href}
            variant={scrolled ? "primary" : "outlined"}
          >
            {siteConfig.primaryCta.label}
          </ButtonLink>
        </div>
      </Container>

      {/* ================= Mobile Navigation ================= */}
      <div
        className={cn(
          "fixed inset-x-0 top-16 bottom-0 bg-secondary transition-transform duration-300 lg:hidden",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <Container className="flex flex-col gap-1 pt-6">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "border-b border-neutral-200 py-4 text-base font-semibold",
                pathname === item.href
                  ? "text-primary"
                  : "text-neutral-800"
              )}
            >
              {item.label}
            </Link>
          ))}

          <ButtonLink
            href={siteConfig.primaryCta.href}
            variant="primary"
            className="mt-6 w-full"
          >
            {siteConfig.primaryCta.label}
          </ButtonLink>
        </Container>
      </div>
    </header>
  );
}