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
  email: "info@lucagermano.it",
  phone: "+39 338 64 92 379",
  phoneHref: "tel:+393386492379",
  social: {
    instagram: "https://www.instagram.com/lucagermanofotografo",
    facebook: "https://www.facebook.com/lucagermanofotografo",
  },
} as const;

export const navigation = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/chi-sono", label: "Chi sono" },
  { href: "/servizi", label: "Servizi" },
  { href: "/contatti", label: "Contatti" },
] as const;
