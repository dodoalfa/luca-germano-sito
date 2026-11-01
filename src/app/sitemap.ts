import type { MetadataRoute } from "next";
import { getAvailableCategories } from "@/lib/portfolio";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/chi-sono", "/servizi", "/portfolio", "/contatti", "/fotografo-matrimonio-fano", "/fotografo-famiglia-fano", ...getAvailableCategories().map((c) => "/portfolio/" + c.slug)]
    .map((path) => ({ url: site.url + path }));
}