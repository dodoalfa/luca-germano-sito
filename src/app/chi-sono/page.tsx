import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { categories } from "@/lib/portfolio";
import { site } from "@/lib/site";
import portrait from "@/assets/luca-germano-ritratto.jpg";

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
    title: "Luce naturale",
    text: "Preferisco la luce vera, quella del luogo e del momento, a pose costruite e flash invadenti.",
  },
  {
    title: "Cura del dettaglio",
    text: "Dalla post-produzione all'album stampato, seguo ogni fase perché il racconto resti coerente e senza tempo.",
  },
];

export default function ChiSonoPage() {
  return (
    <div className="md:grid md:grid-cols-2">
      {/* Portrait: full height and sticky on desktop */}
      <div className="relative h-[75svh] md:sticky md:top-0 md:h-[100svh]">
        <Image
          src={portrait}
          alt="Ritratto di Luca Germano, fotografo a Fano"
          fill
          preload
          placeholder="blur"
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      {/* Bio */}
      <div className="px-5 pb-24 pt-16 md:px-16 md:pb-32 md:pt-44 lg:px-24">
        <Reveal>
          <p className="eyebrow mb-8 text-muted-foreground">Chi sono</p>
          <h1 className="text-5xl font-light leading-[1.02] md:text-7xl">
            Ciao, sono <span className="italic">Luca.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 max-w-xl space-y-6 text-lg leading-relaxed text-muted-foreground">
          <p>
            La fotografia è la mia passione da anni, e oggi è il mio lavoro. Vivo e lavoro a Fano e
            racconto matrimoni, eventi e momenti di famiglia in tutte le Marche.
          </p>
          <p>
            Per me fotografare significa catturare l&apos;essenza di un momento, così che possiate
            conservarlo e riviverlo ogni volta che lo desiderate. Che sia il giorno del vostro
            matrimonio, dal pre-wedding fino all&apos;album di nozze, o i primi giorni di vita del
            vostro bambino, in studio tra i 7 e i 15 giorni dalla nascita.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="my-20 border-l border-foreground/30 pl-6 md:my-28 md:pl-10">
          <blockquote className="font-serif text-3xl font-light italic leading-snug md:text-4xl">
            Non cerco la foto perfetta: cerco quella vera.
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
            <Link href="/contatti">Raccontami la tua storia</Link>
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
