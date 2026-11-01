import Link from "next/link";
import { Facebook, Instagram, Youtube } from "lucide-react";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { getSiteSettings } from "@/server/queries/site-settings";

export async function Footer() {
  const settings = await getSiteSettings();
  return (
    <footer className="bg-surface-inverse text-ink-inverse">
      <Container className="py-14">
        {/* Follow Us */}
        <div className="flex flex-col items-center">
        <h2 className="text-subtitle uppercase tracking-[0.02em]">Follow Us</h2>
          <div className="mt-6 flex items-center gap-5">
            <a
              href={settings.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1877F2] transition-transform hover:scale-105"
            >
              <Facebook size={20} fill="currentColor" />
            </a>
            <a
              href={settings.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-linear-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] transition-transform hover:scale-105"
            >
              <Instagram size={20} />
            </a>
            <a
              href={settings.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FF0000] transition-transform hover:scale-105"
            >
              <Youtube size={20} fill="currentColor" />
            </a>
          </div>
        </div>

        {/* Main Footer */}
        <div className="mt-14 grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-16">
          {/* Contact */}
          <div className="col-span-2 md:col-span-2">
          <h3 className="text-subtitle uppercase tracking-[0.02em]">Contact Us</h3>
            <div className="mt-6 space-y-6">
              <div>
                <h4 className="font-headline font-bold">Address:</h4>

                <p className="mt-2 text-body-sm whitespace-pre-line text-ink-inverse-secondary">
                  {settings.address}
                </p>
              </div>

              <div>
                <h4 className="font-headline font-bold">Contact:</h4>
                <a
                  href={`tel:${settings.phone}`}
                  className="mt-2 block text-body-sm text-ink-inverse-secondary transition-colors hover:text-ink-inverse"
                >
                  {settings.phone}
                </a>
              </div>

              <div>
                <h4 className="font-headline font-bold">E-mail:</h4>
                <a
                  href={`mailto:${settings.email}`}
                  className="mt-2 block break-all text-body-sm text-ink-inverse-secondary transition-colors hover:text-ink-inverse"
                >
                  {settings.email}
                </a>
              </div>
            </div>
          </div>

          {/* Explore */}
          <div>
          <h3 className="text-subtitle uppercase tracking-[0.02em]">Explore</h3>
            <nav className="mt-6">
              <ul className="space-y-4">
                {siteConfig.footerNav.explore.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-body text-ink-inverse-secondary transition-colors hover:text-ink-inverse"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Get Involved */}
          <div>
          <h3 className="text-subtitle uppercase tracking-[0.02em]">Get Involved</h3>
            <nav className="mt-6">
              <ul className="space-y-4">
                {siteConfig.footerNav.getInvolved.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-body text-ink-inverse-secondary transition-colors hover:text-ink-inverse"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-14 border-t border-ink-inverse/10 pt-6 text-center">
          <p className="text-body-sm text-ink-inverse-secondary">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}