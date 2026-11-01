import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
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