import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { SectionContactCta } from "@/components/contact/section-contact-cta";
import { FaqSection } from "@/components/editorial/faq-section";
import { StoryPaths } from "@/components/editorial/story-paths";
import { generalFaqs } from "@/data/editorial";
import { Reveal } from "@/components/motion/reveal";
import { PhotoReveal } from "@/components/motion/photo-reveal";
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
    photoId: "matrimoni/banner-4",
    photoAlt: "Una coppia di sposi in un ambiente luminoso con archi",
    photoPosition: "50% 55%",
    title: "Matrimoni",
    lead: "Un racconto spontaneo e discreto della vostra giornata, dai preparativi all'ultimo ballo.",
    includes: ["Incontro conoscitivo", "Servizio pre-wedding", "Reportage del giorno", "Post-wedding", "Album di nozze"],
  },
  {
    slug: "newborn-maternita",
    photoId: "newborn-maternita/ERL0316-Modifica-Modifica-copia-scaled",
    photoAlt: "Neonato addormentato avvolto in una coperta verde",
    photoPosition: "50% 40%",
    title: "Newborn e Maternità",
    lead: "In studio, con calma e luce morbida, nei primi giorni di vita: idealmente tra i 7 e i 15 giorni dalla nascita.",
    includes: ["Servizio maternità", "Sessione newborn in studio", "Accessori e set curati", "Foto con mamma e papà"],
  },
  {
    slug: "ritratti",
    photoId: "newborn-maternita/ERL2256-copia",
    photoAlt: "Ritratto di due bambine abbracciate su un divano",
    photoPosition: "43% 55%",
    title: "Ritratti",
    lead: "Ritratti individuali, di coppia e di famiglia, in studio o in esterna, per immagini che vi somigliano davvero.",
    includes: ["Ritratto in studio", "Ritratto in esterna", "Famiglia e bambini", "Anteprima pre-battesimo"],
  },
  {
    slug: "cerimonie",
    photoId: "matrimoni/banner-02",
    photoAlt: "Le mani degli sposi durante lo scambio degli anelli",
    photoPosition: "50% 50%",
    title: "Cerimonie e ricorrenze",
    lead: "Battesimi, comunioni, cresime, anniversari e compleanni, raccontati con la stessa cura di un matrimonio.",
    includes: ["Battesimi", "Comunioni e cresime", "Anniversari", "Feste private"],
  },
  {
    slug: "eventi",
    photoId: "newborn-maternita/ERL2706-Modifica-copia",
    photoAlt: "Due bambine in un set fotografico natalizio",
    photoPosition: "50% 45%",
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
  const servicePhotos = new Map(getPhotos().map((photo) => [photo.id, photo]));
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

      {/* One selected photograph accompanies each service. */}
      <section aria-label="Elenco servizi" className="mx-auto w-full max-w-[1600px] px-5 md:px-10">
        <ol>
          {services.map((s, i) => {
            const photo = servicePhotos.get(s.photoId);
            return (
              <li key={s.slug} className="border-t border-border/60 py-12 md:py-20">
                <article className="grid items-center gap-8 sm:grid-cols-12 sm:gap-8 lg:gap-16">
                  <Reveal className="sm:col-span-7">
                    <span className="eyebrow tabular-nums text-muted-foreground">0{i + 1}</span>
                    <h2 className="mt-5 text-4xl font-light leading-tight sm:text-3xl md:text-4xl xl:text-6xl">
                      {s.title.split(" ").map((word, j, words) =>
                        j === words.length - 1 && j > 0
                          ? <span key={j} className="italic">{word}</span>
                          : <span key={j}>{word} </span>
                      )}
                    </h2>
                    <p className="mt-6 max-w-xl text-base leading-relaxed lg:text-lg">{s.lead}</p>
                    <p className="mt-5 max-w-xl text-sm leading-loose text-muted-foreground">
                      {s.includes.join("  /  ")}
                    </p>
                    <div className="mt-7 flex flex-wrap gap-x-6 gap-y-4">
                      <Link
                        href={getPhotos(s.slug).length ? `/portfolio/${s.slug}` : "#scrivimi"}
                        className="eyebrow inline-flex items-center gap-2 border-b border-current pb-1 transition-opacity hover:opacity-60"
                      >
                        {getPhotos(s.slug).length ? "Guarda i lavori" : "Parliamone insieme"}
                        <ArrowUpRight aria-hidden="true" className="size-3.5" strokeWidth={1.5} />
                      </Link>
                      {getPhotos(s.slug).length > 0 && (
                        <Link href="#scrivimi" className="eyebrow inline-flex items-center gap-2 border-b border-current pb-1 transition-opacity hover:opacity-60">
                          Parliamone insieme
                          <ArrowUpRight aria-hidden="true" className="size-3.5" strokeWidth={1.5} />
                        </Link>
                      )}
                    </div>
                  </Reveal>
                  {photo && (
                    <PhotoReveal direction="right" className="relative aspect-[4/5] overflow-hidden bg-muted sm:col-span-5">
                      <Image
                        src={photo.src}
                        alt={s.photoAlt}
                        fill
                        placeholder="blur"
                        blurDataURL={photo.blurDataURL}
                        sizes="(min-width: 1600px) 600px, (min-width: 640px) 40vw, 100vw"
                        style={{ objectPosition: s.photoPosition }}
                        className="object-cover transition-transform duration-1000 motion-safe:hover:scale-[1.025] motion-reduce:transition-none"
                      />
                    </PhotoReveal>
                  )}
                </article>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Process */}
      <section aria-labelledby="come-lavoro" className="mt-20 border-t border-border/60 md:mt-28">
        <div className="mx-auto w-full max-w-[1600px] px-5 pb-8 pt-20 md:px-10 md:pb-10 md:pt-28">
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
          <SectionContactCta compact title="Ti accompagno dal primo incontro." text="Scrivimi che cosa desideri e cominciamo a organizzare il tuo servizio." label="Organizziamolo insieme" />
        </div>
      </section>

      <StoryPaths compact />
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
