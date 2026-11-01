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
  // Old WordPress addresses (lucagermano.it) → new pages, so links already
  // indexed by Google and shared online keep working after the switch.
  async redirects() {
    const to = (destination: string, ...sources: string[]) =>
      sources.map((source) => ({ source, destination, permanent: true }));
    return [
      ...to("/portfolio", "/i-miei-lavori"),
      ...to("/portfolio/matrimoni", "/galleries/matrimoni", "/i-miei-lavori/matrimoni-gli-sposi", "/i-miei-lavori/album-di-nozze"),
      ...to("/portfolio/newborn-maternita", "/galleries/maternita", "/galleries/newborn", "/galleries/smah-cake"),
      ...to("/portfolio/eventi", "/galleries/san-valentino", "/galleries/natale"),
      ...to("/servizi", "/fotografo-matrimoni", "/newborn-e-maternita", "/cerimonie-e-ricorrenze", "/eventi-tematici", "/ritratti"),
      ...to("/", "/blog", "/blog/:path*", "/category/:path*"),
    ];
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
