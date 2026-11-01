export const site = {
  name: "Luca Germano",
  title: "Luca Germano Fotografo",
  tagline:
    "Fotografare significa catturare l'essenza di un momento. Posso farlo per i tuoi.",
  description:
    "Luca Germano, fotografo a Fano. Reportage di matrimonio, newborn e maternità, ritratti, cerimonie ed eventi nelle Marche.",
  url: "https://www.lucagermano.it",
  locale: "it_IT",
  location: "Fano (PU), Marche",
  address: {
    street: "Via Indipendenza 47",
    postalCode: "61032",
    city: "Fano",
    region: "PU",
    full: "Via Indipendenza 47, 61032 Fano (PU)",
  },
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Luca%20Germano%20Fotografo%20Via%20Indipendenza%2047%20Fano",
  email: "info@lucagermano.it",
  phone: "+39 338 649 2379",
  phoneHref: "tel:+393386492379",
  // Activate only after Luca has reviewed the site and his Formspree endpoint is configured.
  contactForm: {
    enabled: false as boolean,
    provider: "formspree",
  },
  social: {
    instagram: "https://www.instagram.com/lucagermanofotografo",
    facebook: "https://www.facebook.com/lucagermanofotografo",
  },
  /**
   * Voto Google mostrato nell'header finché la Places API non è configurata.
   * Copiare i valori dalla scheda di Luca su Google Maps (lasciare null per nasconderlo).
   */
  google: {
    rating: null as number | null,
    reviews: null as number | null,
    url: null as string | null,
  },
} as const;

export const navigation = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/chi-sono", label: "Chi sono" },
  { href: "/servizi", label: "Servizi" },
  { href: "/contatti", label: "Contatti" },
] as const;
