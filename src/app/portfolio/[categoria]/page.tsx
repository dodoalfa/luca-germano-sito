import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PortfolioView } from "@/components/portfolio/portfolio-view";
import { categories, getCategory, getPhotos } from "@/lib/portfolio";

export function generateStaticParams() {
  return categories.map((c) => ({ categoria: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/portfolio/[categoria]">): Promise<Metadata> {
  const { categoria } = await params;
  const category = getCategory(categoria);
  if (!category) return {};
  return {
    title: category.title,
    description: category.description,
    alternates: { canonical: `/portfolio/${category.slug}` },
  };
}

export default async function CategoryPage({ params }: PageProps<"/portfolio/[categoria]">) {
  const { categoria } = await params;
  const category = getCategory(categoria);
  if (!category) notFound();

  return (
    <PortfolioView
      eyebrow="Portfolio"
      title={category.label}
      intro={category.description}
      photos={getPhotos(category.slug)}
    />
  );
}
