import type { Metadata } from "next";
import { CampaignPage, type Campaign } from "@/components/editorial/campaign-page";
import { familyFaqs } from "@/data/editorial";

export const metadata: Metadata = {
  title: "Fotografo di famiglia a Fano | Ritratti e ricorrenze",
  description: "Ritratti di famiglia, battesimi e ricorrenze a Fano con Luca Germano. Racconta la tua occasione e richiedi una proposta per il servizio fotografico.",
  alternates: { canonical: "/fotografo-famiglia-fano" },
  openGraph: { title: "La vostra famiglia, una storia da custodire | Luca Germano", description: "Ritratti, battesimi e ricorrenze a Fano. Raccontami la vostra occasione.", url: "/fotografo-famiglia-fano" },
};
const campaign: Campaign = {
  path: "/fotografo-famiglia-fano", service: "Servizio fotografico di famiglia a Fano", category: "newborn-maternita",
  eyebrow: "Luca Germano · Fotografo di famiglia a Fano",
  title: "La famiglia cambia. Il ricordo resta.",
  intro: "Un nuovo arrivo, un battesimo, un anniversario o il desiderio di una fotografia insieme. Sono Luca Germano, fotografo a Fano: racconto i vostri legami nei momenti che desiderate portare con voi.",
  heroPhotoId: "newborn-maternita/ERL2256-copia",
  heroAlt: "Due bambine abbracciate durante un servizio fotografico di Luca Germano",
  cta: "Scrivimi su WhatsApp",
  chapter: "Il vostro modo di stare insieme.",
  story: "Ci sono gesti che riconoscete soltanto voi: una mano cercata, un sorriso, un abbraccio. Prima del servizio parliamo della vostra famiglia e di ciò che vi piacerebbe ritrovare nelle immagini.",
  detail: "Ritratti in studio o in esterna, maternità, newborn e ricorrenze hanno esigenze diverse. Luogo e organizzazione si definiscono insieme, a partire dal servizio scelto e dalla vostra idea.",
  galleryTitle: "Dall'attesa ai primi ricordi.", faqs: familyFaqs,
};
export default function FamilyPage() { return <CampaignPage campaign={campaign} />; }