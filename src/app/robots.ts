import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// The preview Worker overrides this route with Disallow: /.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
