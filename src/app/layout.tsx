import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/app/globals.css";
import { siteConfig } from "@/config/site";

// "Editorial Civic" pairing (design-checklist.md §2/§11): Zodiak for
// headlines, General Sans for body — replaces Big Shoulders Display +
// Archivo. Both self-hosted via next/font/local rather than Fontshare's
// CDN, consistent with how Big Shoulders was already hosted and per the
// self-host-vs-CDN decision in design-checklist.md (avoids a third-party
// runtime request). Font files live in src/app/fonts/zodiak and
// src/app/fonts/general-sans — see each folder's LICENSE.md.
const zodiak = localFont({
  src: [
    {
      path: "./fonts/zodiak/Zodiak-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/zodiak/Zodiak-Extrabold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/zodiak/Zodiak-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-zodiak",
  display: "swap",
});

const generalSans = localFont({
  src: [
    {
      path: "./fonts/general-sans/GeneralSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/general-sans/GeneralSans-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/general-sans/GeneralSans-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-general-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${zodiak.variable} ${generalSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}