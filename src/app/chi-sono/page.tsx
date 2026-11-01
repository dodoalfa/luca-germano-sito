import type { Metadata } from "next";
import Image from "next/image";
import { SectionContactCta } from "@/components/contact/section-contact-cta";
import { PhotoReveal } from "@/components/motion/photo-reveal";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { categories } from "@/lib/portfolio";
import { site } from "@/lib/site";
import portrait from "@/assets/luca-germano-ritratto-reale.png";
import headshot from "@/assets/luca-germano-presentazione.png";

export const metadata: Metadata = {
  title: "Chi sono",
  description:
    "Luca Germano, fotografo a Fano: reportage di matrimonio, newborn e maternità, ritratti ed eventi nelle Marche. Il mio approccio e la mia storia.",
  alternates: { canonical: "/chi-sono" },
};

const principles = [
  {
    title: "Discrezione",
    text: "Mi muovo in punta di piedi. Le immagini più belle nascono quando vi dimenticate della macchina fotografica.",
  },
  {
    title: "Ascolto",
    text: "Ogni servizio comincia dalle persone: da ciò che desiderate ricordare e da quello che vi fa sentire a vostro agio.",
  },
  {
    title: "Cura del dettaglio",
    text: "Dalla post-produzione all'album stampato, seguo ogni fase perché il racconto resti coerente e senza tempo.",
  },
];

export default function ChiSonoPage() {
  return (
    <div className="pt-24 md:grid md:grid-cols-2 md:pt-28">
      {/* Framed portrait: clear of the fixed menu, with the face kept in view. */}
      <figure className="relative mx-5 h-[78svh] min-h-[420px] overflow-hidden border border-border/70 bg-muted shadow-[0_18px_60px_-24px_rgba(0,0,0,0.45)] md:sticky md:top-28 md:mx-0 md:ml-10 md:h-[calc(100svh-9rem)]">
        <PhotoReveal role="portrait" direction="up" className="absolute inset-0 origin-top">
          <Image
            src={portrait}
            alt="Luca Germano con la macchina fotografica, ritratto in bianco e nero"
            fill
            preload
            placeholder="blur"
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover object-top contrast-[1.04]"
          />
        </PhotoReveal>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-3 border border-white/20 md:inset-5" />
        <div aria-hidden="true" className="studio-grain pointer-events-none absolute inset-0 opacity-[0.025]" />
        <figcaption className="pointer-events-none absolute bottom-7 left-7 right-7 text-white md:bottom-10 md:left-10">
          <span className="block font-serif text-2xl font-light">Luca Germano</span>
          <span className="eyebrow mt-2 block text-white/80">Fotografo · Fano</span>
        </figcaption>
      </figure>

      {/* Bio */}
      <div className="px-5 pb-24 pt-16 md:px-16 md:pb-32 md:pt-12 lg:px-24">
        <div>
          <p className="eyebrow mb-8 text-muted-foreground">Chi sono</p>
          <PhotoReveal role="portrait" direction="up" className="relative mb-8 size-36 overflow-hidden rounded-full border border-foreground/25 bg-muted shadow-[0_12px_35px_-12px_rgba(0,0,0,0.4)]">
            <Image
              src={headshot}
              alt="Ritratto di presentazione di Luca Germano"
              fill
              placeholder="blur"
              sizes="144px"
              className="rounded-full object-cover object-top p-1.5"
            />
          </PhotoReveal>
          <Reveal delay={0.08}>
            <h1 className="text-4xl font-light leading-[1.08] md:text-5xl lg:text-6xl">
              <span className="mb-2 block text-2xl md:text-3xl">Ciao, sono</span>
              <span className="italic">Luca Germano.</span>
            </h1>
            <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">Fotografo a Fano. Prima delle immagini, mi interessano le persone e le storie che portano con sé.</p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-12 max-w-xl space-y-6 text-lg leading-relaxed text-muted-foreground">
          <p>
            Ricordo ancora la mia prima macchina fotografica compatta. Lavoravo in un salone di
            parrucchieri e mettevo da parte i soldi per frequentare corsi e acquistare l’attrezzatura.
            In quel periodo ho scoperto quanto un’immagine potesse custodire un’emozione.
          </p>
          <p>
            Prima le persone si riflettevano negli specchi del salone; oggi le incontro attraverso
            l’obiettivo. Sono Luca Germano, fotografo a Fano: racconto matrimoni, primi giorni di vita,
            battesimi, anniversari e momenti di famiglia.
          </p>
          <p>
            Per me ogni servizio segue il filo di un racconto. Le immagini danno spazio ai momenti
            importanti e alle sfumature, perché chi le guarda possa ritrovare qualcosa di ciò che
            ha vissuto, anche a distanza di anni.
          </p>
          <p>
            Accanto all’attività di fotografo, condivido la mia esperienza attraverso la formazione,
            trasmettendo tecnica, sensibilità e attenzione al racconto per immagini.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="my-20 border-l border-foreground/30 pl-6 md:my-28 md:pl-10">
          <blockquote className="font-serif text-3xl font-light italic leading-snug md:text-4xl">
            Ogni storia comincia dall’ascolto.
          </blockquote>
        </Reveal>

        <section aria-labelledby="approccio">
          <Reveal>
            <h2 id="approccio" className="eyebrow mb-10 font-sans text-muted-foreground">
              Il mio approccio
            </h2>
          </Reveal>
          <ol className="space-y-12">
            {principles.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 0.08} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-border/60 pt-8">
                <span className="eyebrow tabular-nums text-muted-foreground">0{i + 1}</span>
                <div>
                  <h3 className="text-2xl font-light md:text-3xl">{p.title}</h3>
                  <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </section>

        <SectionContactCta title="Ogni racconto comincia da un incontro." text="Parlami delle persone e dei momenti che vorresti custodire." label="Cominciamo dalla tua storia" />

        <section aria-labelledby="cosa-fotografo" className="mt-24">
          <Reveal>
            <h2 id="cosa-fotografo" className="eyebrow mb-8 font-sans text-muted-foreground">
              Cosa fotografo
            </h2>
            <ul className="flex flex-wrap gap-x-6 gap-y-3 font-serif text-2xl font-light md:text-3xl">
              {categories.map((c, i) => (
                <li key={c.slug}>
                  <Link href={`/portfolio/${c.slug}`} className="transition-opacity hover:opacity-60">
                    {c.label}
                  </Link>
                  {i < categories.length - 1 && <span className="ml-6 text-muted-foreground">/</span>}
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        <Reveal className="mt-24 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="#scrivimi">Raccontami la tua storia</Link>
          </Button>
          <Button asChild variant="outline">
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer">
              Seguimi su Instagram
            </a>
          </Button>
        </Reveal>
      </div>
    </div>
  );
}
