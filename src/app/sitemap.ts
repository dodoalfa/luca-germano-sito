import type { MetadataRoute } from "next";
import { getAvailableCategories } from "@/lib/portfolio";
import { navigation, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "/",
    ...navigation.map((item) => item.href),
    "/fotografo-matrimonio-fano",
    "/fotografo-famiglia-fano",
  ];
  return [
    ...pages.map((path) => ({
      url: path === "/" ? site.url : `${site.url}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.8,
    })),
    ...getAvailableCategories().map((category) => ({
      url: `${site.url}/portfolio/${category.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
