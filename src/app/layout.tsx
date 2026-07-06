import type { Metadata } from "next";
import localFont from "next/font/local";
import { Archivo } from "next/font/google";
import "@/app/globals.css";
import { siteConfig } from "@/config/site";

const bigShouldersDisplay = localFont({
  src: [
    {
      path: "./fonts/big-shoulders-display/big-shoulders-display.bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/big-shoulders-display/big-shoulders-display.extrabold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/big-shoulders-display/big-shoulders-display.black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-big-shoulders",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  weight: ["400", "500", "700"],
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
    <html
      lang="en"
      className={`${bigShouldersDisplay.variable} ${archivo.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}