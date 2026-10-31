import type { Metadata } from "next";

import { PortfolioView } from "@/components/portfolio/portfolio-view";
import { getPhotos } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Il portfolio di Luca Germano: matrimoni, newborn e maternità, ritratti, cerimonie ed eventi a Fano e nelle Marche.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return (
    <PortfolioView
      eyebrow="Portfolio"
      title={
        <>
          Storie, <span className="italic">non pose.</span>
        </>
      }
      intro="Una selezione di lavori recenti. Scegli una categoria o lasciati guidare dalle immagini."
      photos={getPhotos()}
      showCategory
    />
  );
}
