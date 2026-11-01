import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { SectionContactCta } from "@/components/contact/section-contact-cta";
import { FaqSection } from "@/components/editorial/faq-section";
import { StoryPaths } from "@/components/editorial/story-paths";
import { generalFaqs } from "@/data/editorial";
import { Reveal } from "@/components/motion/reveal";
import { ShadowCast } from "@/components/motion/studio-light";
import { Button } from "@/components/ui/button";
import { getPhotos } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Servizi fotografici a Fano",
  description:
    "Servizi fotografici di Luca Germano a Fano: reportage di matrimonio, newborn e maternità in studio, ritratti, battesimi e cerimonie, eventi a tema.",
  alternates: { canonical: "/servizi" },
};

const services = [
  {
    slug: "matrimoni",
    title: "Matrimoni",
    lead: "Un racconto spontaneo e discreto della vostra giornata, dai preparativi all'ultimo ballo.",
    includes: ["Incontro conoscitivo", "Servizio pre-wedding", "Reportage del giorno", "Post-wedding", "Album di nozze"],
  },
  {
    slug: "newborn-maternita",
    title: "Newborn e Maternità",
    lead: "In studio, con calma e luce morbida, nei primi giorni di vita: idealmente tra i 7 e i 15 giorni dalla nascita.",
    includes: ["Servizio maternità", "Sessione newborn in studio", "Accessori e set curati", "Foto con mamma e papà"],
  },
  {
    slug: "ritratti",
    title: "Ritratti",
    lead: "Ritratti individuali, di coppia e di famiglia, in studio o in esterna, per immagini che vi somigliano davvero.",
    includes: ["Ritratto in studio", "Ritratto in esterna", "Famiglia e bambini", "Anteprima pre-battesimo"],
  },
  {
    slug: "cerimonie",
    title: "Cerimonie e ricorrenze",
    lead: "Battesimi, comunioni, cresime, anniversari e compleanni, raccontati con la stessa cura di un matrimonio.",
    includes: ["Battesimi", "Comunioni e cresime", "Anniversari", "Feste private"],
  },
  {
    slug: "eventi",
    title: "Eventi a tema",
    lead: "Set stagionali in studio e servizi per eventi privati e aziendali.",
    includes: ["San Valentino", "Natale", "Smash cake", "Eventi aziendali"],
  },
];

const steps = [
  { title: "Ci conosciamo", text: "Un primo incontro, anche online, per capire cosa desiderate e come immaginate le vostre foto." },
  { title: "Progettiamo", text: "Definiamo insieme tempi, luoghi e stile, e ricevete una proposta su misura." },
  { title: "Il giorno", text: "Io mi occupo delle immagini, voi pensate solo a vivere il momento." },
  { title: "Le vostre foto", text: "Selezione e post-produzione curate, consegna in galleria online e, se volete, in un album stampato." },
];

export default function ServiziPage() {
  return (
    <>
      {/* Lit hero */}
      <section className="relative isolate overflow-hidden">
        <div className="relative mx-auto w-full max-w-[1600px] px-5 pb-28 pt-36 md:px-10 md:pb-40 md:pt-52">
          <Reveal>
            <p className="eyebrow mb-8 text-muted-foreground">Servizi</p>
            <h1 className="max-w-5xl text-5xl font-light leading-[1.02] md:text-8xl">
              <ShadowCast rest={{ x: 28, y: 40 }}>
                La luce giusta
                <br />
                <span className="italic">per ogni storia.</span>
              </ShadowCast>
            </h1>
          </Reveal>
          <Reveal delay={0.15} className="mt-12 grid md:grid-cols-12">
            <p className="text-lg leading-relaxed text-muted-foreground md:col-span-5 md:col-start-8">
              Ogni servizio nasce da un incontro: ascolto, propongo, e costruisco con voi un racconto
              fotografico su misura. Ecco come posso accompagnarvi.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Services, typography-led */}
      <section aria-label="Elenco servizi" className="mx-auto w-full max-w-[1600px] px-5 md:px-10">
        <ol>
          {services.map((s, i) => (
            <Reveal as="li" key={s.slug} className="border-t border-border/60 py-14 md:py-20">
              <article className="grid gap-6 md:grid-cols-12 md:gap-10">
                <span className="eyebrow tabular-nums text-muted-foreground md:col-span-1">0{i + 1}</span>
                <h2 className="text-4xl font-light leading-tight md:col-span-5 md:text-6xl">
                  {s.title.split(" ").map((w, j) => (j === s.title.split(" ").length - 1 && j > 0 ? <span key={j} className="italic">{w}</span> : <span key={j}>{w} </span>))}
                </h2>
                <div className="md:col-span-5 md:col-start-8">
                  <p className="text-lg leading-relaxed">{s.lead}</p>
                  <p className="mt-6 text-sm leading-loose text-muted-foreground">
                    {s.includes.join("  /  ")}
                  </p>
                  <Link
                    href={getPhotos(s.slug).length ? `/portfolio/${s.slug}` : "#scrivimi"}
                    className="eyebrow mt-8 inline-flex items-center gap-2 border-b border-current pb-1 transition-opacity hover:opacity-60"
                  >
                    {getPhotos(s.slug).length ? "Guarda i lavori" : "Parliamone insieme"} <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
                  </Link>
                  {getPhotos(s.slug).length > 0 && <div className="mt-5"><Link href="#scrivimi" className="eyebrow inline-flex items-center gap-2 border-b border-current pb-1">Parliamone insieme <ArrowUpRight aria-hidden="true" className="size-3.5" /></Link></div>}
                </div>
              </article>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Process */}
      <section aria-labelledby="come-lavoro" className="mt-20 border-t border-border/60 md:mt-28">
        <div className="mx-auto w-full max-w-[1600px] px-5 py-28 md:px-10 md:py-40">
          <Reveal className="mb-16 md:mb-24">
            <p className="eyebrow mb-6 text-muted-foreground">Come lavoro</p>
            <h2 id="come-lavoro" className="text-4xl font-light md:text-6xl">
              Quattro passi, <span className="italic">nessuna fretta.</span>
            </h2>
          </Reveal>
          <ol className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {steps.map((st, i) => (
              <Reveal as="li" key={st.title} delay={i * 0.08}>
                <span className="block font-serif text-6xl font-light italic text-muted-foreground/50">{i + 1}</span>
                <h3 className="mt-6 text-2xl font-light">{st.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{st.text}</p>
              </Reveal>
            ))}
          </ol>
          <SectionContactCta title="Ti accompagno dal primo incontro." text="Scrivimi che cosa desideri e cominciamo a organizzare il tuo servizio." label="Organizziamolo insieme" />
        </div>
      </section>

      <StoryPaths />
      <FaqSection items={generalFaqs} />
      {/* Lit CTA */}
      <section className="relative isolate overflow-hidden border-t border-border/60">
        <Reveal className="relative mx-auto flex w-full max-w-[1600px] flex-col items-start gap-10 px-5 py-28 md:flex-row md:items-end md:justify-between md:px-10 md:py-40">
          <h2 className="max-w-3xl text-4xl font-light leading-tight md:text-6xl">
            Ogni progetto è diverso: <span className="italic">parliamone.</span>
          </h2>
          <Button asChild size="lg">
            <Link href="#scrivimi">Richiedi un preventivo</Link>
          </Button>
        </Reveal>
      </section>
    </>
  );
}
