import Image from "next/image";
import { ArrowUpRight, Star } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { StudioLight } from "@/components/motion/studio-light";
import { getReviews, type Review } from "@/lib/reviews";
import { cn } from "@/lib/utils";

function Stars({ value, className }: { value: number; className?: string }) {
  const rounded = Math.round(value);
  return (
    <span className={cn("inline-flex gap-0.5", className)} role="img" aria-label={`${value.toLocaleString("it-IT")} stelle su 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={cn("size-3.5", i < rounded ? "fill-current" : "opacity-25")} strokeWidth={1.25} />
      ))}
    </span>
  );
}

function Author({ review }: { review: Review }) {
  const name = review.authorUrl ? (
    <a href={review.authorUrl} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
      {review.author}
    </a>
  ) : (
    review.author
  );

  return (
    <figcaption className="mt-6 flex items-center gap-3">
      {review.photo ? (
        <Image
          src={review.photo}
          alt=""
          width={36}
          height={36}
          // Avatars are already small thumbnails served by their own CDN.
          unoptimized
          referrerPolicy="no-referrer"
          className={cn(
            "size-9 shrink-0 rounded-full object-cover grayscale transition-[filter] duration-700 group-hover:grayscale-0"
          )}
        />
      ) : (
        <span
          aria-hidden
          className={cn(
            "grid size-9 shrink-0 place-items-center rounded-full border border-border font-serif italic"
          )}
        >
          {review.author.charAt(0)}
        </span>
      )}
      <span className="flex flex-col gap-0.5">
        <span className="text-sm">{name}</span>
        <span className="eyebrow flex items-center gap-3 text-muted-foreground">
          {review.rating ? <Stars value={review.rating} /> : null}
          {review.context}
        </span>
      </span>
    </figcaption>
  );
}

/**
 * Testimonianze dei clienti, in una striscia compatta che scorre in orizzontale.
 * Mostra le recensioni Google quando la Places API è configurata, altrimenti
 * le testimonianze locali.
 */
export async function ReviewsSection({ className }: { className?: string }) {
  const { reviews, rating, total, url, source } = await getReviews();
  if (!reviews.length) return null;

  return (
    <section aria-labelledby="recensioni" className={cn("relative isolate overflow-hidden border-t border-border/60", className)}>
      <StudioLight rest={{ x: 18, y: 30 }} className="-z-10" />

      <div className="mx-auto w-full max-w-[1600px] px-5 py-16 md:px-10 md:py-20">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <div>
            <p className="eyebrow mb-3 text-muted-foreground">Dicono di me</p>
            <h2 id="recensioni" className="text-3xl font-light md:text-4xl">
              Le vostre <span className="italic">parole</span>
            </h2>
          </div>
          <div className="flex items-center gap-6">
            {rating ? (
              <span className="flex items-center gap-3">
                <span className="font-serif text-3xl font-light tabular-nums leading-none">
                  {rating.toLocaleString("it-IT", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
                </span>
                <span className="flex flex-col gap-1">
                  <Stars value={rating} />
                  {total ? <span className="eyebrow text-muted-foreground">{total} su Google</span> : null}
                </span>
              </span>
            ) : null}
            {url ? (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="eyebrow inline-flex items-center gap-2 opacity-70 transition-opacity hover:opacity-100"
              >
                {source === "google" ? "Tutte su Google" : "Leggi su Google"}
                <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
              </a>
            ) : null}
          </div>
        </Reveal>

        <ul className="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto px-5 pb-4 md:scroll-px-10 [scrollbar-width:thin] md:-mx-10 md:px-10">
          {reviews.map((review, i) => (
            <li
              key={review.author + i}
              className="w-[82%] shrink-0 snap-start border-t border-border/60 pt-6 sm:w-[46%] lg:w-[calc((100%-3*1.25rem)/4)]"
            >
              <figure className="group flex h-full flex-col justify-between">
                <blockquote className="font-serif text-lg font-light leading-snug md:text-xl">
                  <span className="line-clamp-5">&ldquo;{review.text}&rdquo;</span>
                </blockquote>
                <Author review={review} />
              </figure>
            </li>
          ))}
        </ul>
        {source === "google" ? <p className="eyebrow mt-4 text-muted-foreground">Recensioni pubblicate su Google</p> : null}
      </div>
    </section>
  );
}
