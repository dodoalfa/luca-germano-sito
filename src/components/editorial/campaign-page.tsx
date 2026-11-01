import Image from "next/image";
import { SectionContactCta } from "@/components/contact/section-contact-cta";
import { PhotoReveal } from "@/components/motion/photo-reveal";
import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaqSection } from "@/components/editorial/faq-section";
import type { Faq } from "@/data/editorial";
import { getPhotos } from "@/lib/portfolio";
import { site } from "@/lib/site";

export type Campaign = {
  path: string; service: string; category: string; eyebrow: string; title: string;
  intro: string; cta: string; chapter: string; story: string; detail: string;
  galleryTitle: string; faqs: Faq[]; heroPhotoId?: string; heroAlt?: string;
};
const whatsappButtonClassName = "border-emerald-700 text-emerald-800 hover:bg-emerald-50 hover:text-emerald-900 focus-visible:ring-emerald-600 dark:border-emerald-400 dark:text-emerald-300 dark:hover:bg-emerald-950 dark:hover:text-emerald-200";

export function CampaignPage({ campaign: c }: { campaign: Campaign }) {
  const photos = getPhotos(c.category);
  const hero = photos.find((photo) => photo.id === c.heroPhotoId) ?? photos[0];
  const gallery = photos.filter((photo) => photo.id !== hero?.id).slice(0, 3);
  const whatsapp = "https://wa.me/393386492379?text=" + encodeURIComponent("Ciao Luca, vorrei informazioni per " + c.service.toLowerCase() + ". ");
  const schema = {
    "@context": "https://schema.org", "@type": "Service", name: c.service,
    url: site.url + c.path, description: c.intro,
    provider: { "@id": site.url + "/#attivita" }, areaServed: { "@type": "City", name: "Fano" },
  };
  return (
    <>
      <section className="mx-auto grid max-w-[1600px] gap-12 px-5 pb-20 pt-32 md:grid-cols-12 md:px-10 md:pb-28 md:pt-44">
        <div className="self-center md:col-span-6">
          <p className="eyebrow mb-8 text-muted-foreground">{c.eyebrow}</p>
          <h1 className="text-5xl font-light leading-[1.07] md:text-6xl lg:text-7xl">{c.title}</h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">{c.intro}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button asChild variant="outline" size="lg" className={whatsappButtonClassName}><a href={whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle aria-hidden="true" className="size-5" />{c.cta}</a></Button>
            <Button asChild variant="outline" size="lg"><a href={site.phoneHref}><Phone aria-hidden="true" className="size-4" />Chiamami</a></Button>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">Luca Germano Fotografo · Fano · 338 649 2379</p>
        </div>
        {hero && <PhotoReveal role="hero" direction="right" className="relative min-h-[420px] overflow-hidden md:col-span-5 md:col-start-8 md:min-h-[640px]"><Image src={hero.src} alt={c.heroAlt ?? hero.alt} fill preload placeholder="blur" blurDataURL={hero.blurDataURL} sizes="(min-width: 768px) 42vw, 100vw" className="object-cover" /></PhotoReveal>}
      </section>
      <section className="border-y border-border/60">
        <div className="mx-auto grid max-w-[1600px] gap-10 px-5 py-20 md:grid-cols-12 md:px-10 md:py-28">
          <div className="md:col-span-5"><p className="eyebrow mb-6 text-muted-foreground">Prima le persone, poi le immagini</p><h2 className="text-4xl font-light md:text-5xl">{c.chapter}</h2></div>
          <div className="space-y-6 text-lg leading-relaxed text-muted-foreground md:col-span-6 md:col-start-7"><p>{c.story}</p><p>{c.detail}</p></div>
        </div>
      </section>
      <section className="mx-auto max-w-[1600px] px-5 py-20 md:px-10 md:py-28">
        <p className="eyebrow mb-6 text-muted-foreground">Dentro il racconto</p><h2 className="mb-12 text-4xl font-light md:text-5xl">{c.galleryTitle}</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6">{gallery.map((photo, i) => <PhotoReveal key={photo.id} direction={i === 0 ? "left" : i === 1 ? "right" : "up"} delay={i * 0.09} className={i === 2 ? "relative col-span-2 aspect-[4/3] md:col-span-1" : "relative aspect-[3/4]"}><Image src={photo.src} alt={photo.alt} fill placeholder="blur" blurDataURL={photo.blurDataURL} sizes="(min-width: 768px) 33vw, 50vw" className="object-cover" /></PhotoReveal>)}</div>
        <SectionContactCta title={c.category === "matrimoni" ? "Parliamo della vostra data?" : "Quale momento vuoi ricordare?"} text="Scrivimi qualche dettaglio: ti rispondo per parlare del servizio e della disponibilità." label="Scrivimi per disponibilità e preventivo" />
        <Link href={"/portfolio/" + c.category} className="eyebrow mt-8 inline-block border-b border-current pb-2">Esplora le fotografie</Link>
      </section>
      <section className="bg-muted/40"><div className="mx-auto max-w-[1600px] px-5 py-20 md:px-10">
        <h2 className="text-4xl font-light md:text-5xl">Un primo passo, insieme.</h2>
        <ol className="mt-12 grid gap-10 md:grid-cols-3">{[
          ["Raccontami", "Scrivimi l'occasione, la data o il periodo e il luogo. Aggiungi ciò che per te conta davvero."],
          ["Confrontiamoci", "Parliamo delle tue aspettative, dell'organizzazione e delle possibilità per il servizio."],
          ["Diamo forma al racconto", "Definiamo una proposta con tempi, copertura ed eventuali servizi aggiuntivi concordati."],
        ].map(([title, text], i) => <li key={title} className="border-t border-border pt-6"><p className="eyebrow text-muted-foreground">0{i + 1}</p><h3 className="mt-5 text-2xl">{title}</h3><p className="mt-4 leading-relaxed text-muted-foreground">{text}</p></li>)}</ol>
        <SectionContactCta title="Facciamo il primo passo?" label="Raccontami che cosa hai in mente" />
      </div></section>
      <FaqSection items={c.faqs} />
      <section id="richiesta" className="border-t border-border/60"><div className="mx-auto max-w-4xl px-5 py-24 text-center md:py-32">
        <p className="eyebrow mb-6 text-muted-foreground">Il prossimo ricordo comincia qui</p><h2 className="text-4xl font-light md:text-6xl">Parliamo della vostra storia.</h2>
        <p className="mx-auto mt-6 max-w-xl leading-relaxed text-muted-foreground">Scrivimi su WhatsApp per disponibilità e preventivo, oppure usa il modulo contatti. Indica data, luogo e servizio desiderato.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4"><Button asChild variant="outline" size="lg" className={whatsappButtonClassName}><a href={whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle aria-hidden="true" className="size-5" />{c.cta}</a></Button><Button asChild variant="outline" size="lg"><Link href="#scrivimi">Scrivimi dal modulo</Link></Button></div>
        <p className="mt-8 text-sm text-muted-foreground">{site.address.full}</p>
      </div></section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\u003c") }} />
    </>
  );
}