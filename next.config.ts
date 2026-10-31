import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  env: { NEXT_PUBLIC_BUILD_YEAR: String(new Date().getFullYear()) },
  // Cache Components stays off: the OpenNext Cloudflare adapter does not yet
  // serve its prerendered shells (requests hang on Workers). Every page here
  // is fully static anyway.
  cacheComponents: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "www.lucagermano.it", pathname: "/wp-content/uploads/**" },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

// Lets `next dev` use Cloudflare bindings (images, env) locally.
initOpenNextCloudflareForDev();
