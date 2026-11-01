// Next.js configuration.
// Sets the Server Action upload limit and which remote image hosts <Image> may load from.
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Admin image uploads travel inside a Server Action, so this limit must be
    // high enough for them. Vercel itself rejects request bodies above 4.5 MB.
    serverActions: { bodySizeLimit: "4mb" },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        // Vercel Blob's public URLs live on a per-store subdomain of this
        // form — the wildcard covers whichever store ID your project uses,
        // so this doesn't need updating if you ever recreate the store.
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;