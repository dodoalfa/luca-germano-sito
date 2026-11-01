import photosData from "@/data/photos.json";

export type Photo = {
  id: string;
  src: string;
  width: number;
  height: number;
  category: string;
  alt: string;
  featured: boolean;
  blurDataURL: string;
};

export const categories = [
  {
    slug: "matrimoni",
    label: "Matrimoni",
    title: "Fotografo di matrimonio a Fano",
    description:
      "Reportage di matrimonio spontaneo e discreto: preparativi, cerimonia, festa. Dal pre-wedding all'album di nozze.",
  },
  {
    slug: "newborn-maternita",
    label: "Newborn e Maternità",
    title: "Servizi newborn e maternità",
    description:
      "Servizi in studio per i primi giorni di vita, tra i 7 e i 15 giorni, e ritratti di maternità in attesa del vostro bambino.",
  },
  {
    slug: "ritratti",
    label: "Ritratti",
    title: "Ritratti fotografici",
    description: "Ritratti individuali, di coppia e di famiglia, in studio o in esterna, con luce naturale.",
  },
  {
    slug: "cerimonie",
    label: "Cerimonie",
    title: "Battesimi, comunioni e ricorrenze",
    description: "Battesimi, comunioni, cresime e anniversari raccontati con la stessa cura di un matrimonio.",
  },
  {
    slug: "eventi",
    label: "Eventi",
    title: "Fotografia di eventi",
    description: "Eventi privati e aziendali, servizi a tema per San Valentino, Natale e smash cake.",
  },
] as const;

export type CategorySlug = (typeof categories)[number]["slug"];

const labelBySlug = Object.fromEntries(categories.map((c) => [c.slug, c.label])) as Record<string, string>;

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

function withAlt(p: Photo, index: number): Photo {
  const label = labelBySlug[p.category] ?? "Fotografia";
  return { ...p, alt: p.alt || `${label}, fotografia ${index + 1} di Luca Germano` };
}

const all = (photosData as Photo[]).filter((p) => p.category in labelBySlug);

export function getPhotos(category?: string): Photo[] {
  if (category) {
    return all.filter((p) => p.category === category).map(withAlt);
  }
  // "Tutti": interleave categories so the mix feels curated, featured first.
  const buckets = categories.map((c) =>
    all
      .filter((p) => p.category === c.slug)
      .map(withAlt)
      .sort((a, b) => Number(b.featured) - Number(a.featured))
  );
  const out: Photo[] = [];
  for (let i = 0; buckets.some((b) => i < b.length); i++) {
    for (const b of buckets) if (b[i]) out.push(b[i]);
  }
  return out;
}

export function categoryLabel(slug: string) {
  return labelBySlug[slug] ?? slug;
}

/** Landscape photos for the full-bleed hero, featured first, mixed across categories. */
export function getHeroPhotos(limit = 10): Photo[] {
  return getPhotos()
    .filter((p) => p.width > p.height)
    .sort((a, b) => Number(b.featured) - Number(a.featured))
    .slice(0, limit);
}

/** Only categories with real photos are offered as gallery filters. */
export function getAvailableCategories() {
  return categories.filter((category) => getPhotos(category.slug).length > 0);
}

/** One representative photo per category, for the home page category index. */
export function getCategoryCovers() {
  return categories.map((c) => {
    const list = getPhotos(c.slug);
    return { ...c, cover: list.find((p) => p.featured) ?? list[0] };
  });
}
