import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { HeroSlider } from "@/components/home/hero-slider";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { getCategoryCovers, getHeroPhotos } from "@/lib/portfolio";
import { site } from "@/lib/site";
import portrait from "@/assets/luca-germano-ritratto.jpg";

export default function Home() {
  const hero = getHeroPhotos();
  const covers = getCategoryCovers().filter((c) => c.cover);
  // Asymmetric rhythm for the category index: wide, narrow, narrow, wide...
  const spans = ["md:col-span-7", "md:col-span-5 md:mt-32", "md:col-span-5", "md:col-span-7 md:-mt-24", "md:col-span-6 md:col-start-4"];

  return (
    <>
      <HeroSlider photos={hero} />

      {/* Intro */}
      <section id="introduzione" className="mx-auto w-full max-w-[1600px] scroll-mt-20 px-5 py-28 md:px-10 md:py-44">
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-8">
            <p className="eyebrow mb-8 text-muted-foreground">Fotografo · {site.location}</p>
            <h2 className="text-4xl font-light leading-[1.08] md:text-6xl lg:text-7xl">
              Fotografare significa catturare l&apos;essenza di un momento.{" "}
              <span className="italic text-muted-foreground">Posso farlo per i tuoi.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="self-end md:col-span-4">
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              Reportage di matrimonio, newborn e maternità, ritratti ed eventi. Immagini sincere e
              luce naturale, per raccontare le vostre storie con discrezione e cura.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Category index */}
      <section aria-labelledby="lavori" className="mx-auto w-full max-w-[1600px] px-5 pb-28 md:px-10 md:pb-44">
        <Reveal className="mb-14 flex items-end justify-between gap-6 border-b border-border/60 pb-6 md:mb-20">
          <h2 id="lavori" className="text-3xl font-light md:text-5xl">
            I miei <span className="italic">lavori</span>
          </h2>
          <Link href="/portfolio" className="eyebrow inline-flex items-center gap-2 opacity-70 transition-opacity hover:opacity-100">
            Tutto il portfolio <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
          </Link>
        </Reveal>

        <ul className="grid gap-x-6 gap-y-16 md:grid-cols-12 md:gap-y-24">
          {covers.map((c, i) => (
            <Reveal as="li" key={c.slug} className={spans[i % spans.length]} delay={(i % 2) * 0.1}>
              <Link href={`/portfolio/${c.slug}`} className="group block">
                <div className="overflow-hidden">
                  <Image
                    src={c.cover!.src}
                    alt={c.cover!.alt}
                    width={c.cover!.width}
                    height={c.cover!.height}
                    placeholder="blur"
                    blurDataURL={c.cover!.blurDataURL}
                    sizes="(min-width: 768px) 58vw, 100vw"
                    className="h-auto w-full transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-5 flex items-baseline justify-between gap-4">
                  <h3 className="text-2xl font-light md:text-3xl">{c.label}</h3>
                  <span className="eyebrow tabular-nums text-muted-foreground">0{i + 1}</span>
                </div>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">{c.description}</p>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* About teaser */}
      <section className="border-t border-border/60">
        <div className="mx-auto grid w-full max-w-[1600px] items-center gap-12 px-5 py-28 md:grid-cols-12 md:px-10 md:py-40">
          <Reveal className="md:col-span-5">
            <Image
              src={portrait}
              alt="Ritratto di Luca Germano"
              placeholder="blur"
              sizes="(min-width: 768px) 40vw, 100vw"
              className="h-auto w-full"
            />
          </Reveal>
          <Reveal delay={0.15} className="md:col-span-6 md:col-start-7">
            <p className="eyebrow mb-6 text-muted-foreground">Chi sono</p>
            <blockquote className="font-serif text-3xl font-light leading-snug md:text-5xl">
              <span className="italic">&ldquo;</span>Non cerco la foto perfetta: cerco quella vera, che tra vent&apos;anni vi farà
              ancora emozionare.<span className="italic">&rdquo;</span>
            </blockquote>
            <p className="mt-8 max-w-md leading-relaxed text-muted-foreground">
              Sono Luca, fotografo a Fano. Racconto matrimoni, primi giorni di vita e momenti di famiglia
              con uno stile spontaneo e discreto.
            </p>
            <Button asChild variant="outline" className="mt-10">
              <Link href="/chi-sono">Scopri di più</Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
