import type { Metadata } from "next";
import { CampaignPage, type Campaign } from "@/components/editorial/campaign-page";
import { weddingFaqs } from "@/data/editorial";

export const metadata: Metadata = {
  title: "Fotografo matrimonio a Fano",
  description: "Il vostro matrimonio a Fano raccontato da Luca Germano: persone, gesti ed emozioni. Contatta il fotografo per disponibilità e un preventivo dedicato.",
  alternates: { canonical: "/fotografo-matrimonio-fano" },
  openGraph: { title: "Il vostro matrimonio, da rivivere | Luca Germano", description: "Un racconto fotografico che parte da voi. Parliamo della vostra data a Fano.", url: "/fotografo-matrimonio-fano" },
};
const campaign: Campaign = {
  path: "/fotografo-matrimonio-fano", service: "Servizio fotografico di matrimonio a Fano", category: "matrimoni",
  eyebrow: "Luca Germano · Fotografo matrimonio a Fano",
  title: "Il vostro giorno. Le emozioni, ogni volta.",
  intro: "Ci sono momenti che aspettate da mesi e altri che vi sorprenderanno. Sono Luca Germano, fotografo a Fano: li unisco in un racconto di matrimonio che vi somigli, da riguardare insieme negli anni.",
  cta: "Scrivimi su WhatsApp",
  chapter: "Prima della giornata, ci siete voi.",
  story: "Chi desiderate avere accanto? Quali gesti vorreste ricordare? Ogni matrimonio ha un ritmo e legami diversi. Il mio lavoro comincia ascoltando la vostra storia, per riconoscerla quando accade davanti all'obiettivo.",
  detail: "Dai preparativi alla festa, definiamo insieme quali momenti includere. Possiamo valutare anche pre-wedding, post-wedding e album di nozze: ogni scelta trova spazio nella proposta concordata.",
  galleryTitle: "L'attesa. Gli incontri. La festa.", faqs: weddingFaqs,
};
export default function WeddingPage() { return <CampaignPage campaign={campaign} />; }