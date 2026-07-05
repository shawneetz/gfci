import Link from "next/link";
import { Facebook, Instagram, Youtube } from "lucide-react";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="bg-primary text-secondary">
      <Container className="py-14">
        {/* Follow Us */}
        <div className="flex flex-col items-center">
          <h2 className="text-subtitle uppercase">Follow Us</h2>

          <div className="mt-6 flex items-center gap-5">
            <a
              href={siteConfig.contact.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1877F2] transition-transform hover:scale-105"
            >
              <Facebook size={20} fill="currentColor" />
            </a>

            <a
              href={siteConfig.contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] transition-transform hover:scale-105"
            >
              <Instagram size={20} />
            </a>

            <a
              href={siteConfig.contact.youtube}
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
        <div className="mt-14 grid grid-cols-2 gap-8 md:gap-16">
          {/* Contact */}
          <div>
            <h3 className="text-subtitle uppercase">Contact Us</h3>

            <div className="mt-6 space-y-6">
              <div>
                <h4 className="font-headline font-bold">Address:</h4>

                <p className="mt-2 text-body-sm whitespace-pre-line text-secondary/70">
                  {siteConfig.contact.address}
                </p>
              </div>

              <div>
                <h4 className="font-headline font-bold">Contact:</h4>

                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="mt-2 block text-body-sm text-secondary/70 transition-colors hover:text-secondary"
                >
                  {siteConfig.contact.phone}
                </a>
              </div>

              <div>
                <h4 className="font-headline font-bold">E-mail:</h4>

                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="mt-2 block break-all text-body-sm text-secondary/70 transition-colors hover:text-secondary"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-subtitle uppercase">Navigate</h3>

            <nav className="mt-6">
              <ul className="space-y-4">
                {siteConfig.nav.slice(0, 5).map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-body text-secondary/70 transition-colors hover:text-secondary"
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
        <div className="mt-14 border-t border-white/10 pt-6 text-center">
          <p className="text-body-sm text-secondary/60">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
