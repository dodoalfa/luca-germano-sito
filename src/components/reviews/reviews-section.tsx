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

function Author({ review, large }: { review: Review; large?: boolean }) {
  const name = review.authorUrl ? (
    <a href={review.authorUrl} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
      {review.author}
    </a>
  ) : (
    review.author
  );

  return (
    <figcaption className="mt-8 flex items-center gap-4">
      {review.photo ? (
        <Image
          src={review.photo}
          alt=""
          width={large ? 56 : 44}
          height={large ? 56 : 44}
          // Avatars are already small thumbnails served by their own CDN.
          unoptimized
          referrerPolicy="no-referrer"
          className={cn(
            "shrink-0 rounded-full object-cover grayscale transition-[filter] duration-700 group-hover:grayscale-0",
            large ? "size-14" : "size-11"
          )}
        />
      ) : (
        <span
          aria-hidden
          className={cn(
            "grid shrink-0 place-items-center rounded-full border border-border font-serif italic",
            large ? "size-14 text-xl" : "size-11 text-lg"
          )}
        >
          {review.author.charAt(0)}
        </span>
      )}
      <span className="flex flex-col gap-1">
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
 * Testimonianze dei clienti. Mostra le recensioni Google quando la Places API
 * è configurata, altrimenti le testimonianze locali.
 */
export async function ReviewsSection({ className }: { className?: string }) {
  const { reviews, rating, total, url, source } = await getReviews();
  if (!reviews.length) return null;
  const [featured, ...rest] = reviews;

  return (
    <section aria-labelledby="recensioni" className={cn("relative isolate overflow-hidden border-t border-border/60", className)}>
      <StudioLight rest={{ x: 22, y: 30 }} className="-z-10" />

      <div className="mx-auto grid w-full max-w-[1600px] gap-16 px-5 py-28 md:grid-cols-12 md:px-10 md:py-40">
        <Reveal className="md:col-span-4">
          <p className="eyebrow mb-6 text-muted-foreground">Dicono di me</p>
          <h2 id="recensioni" className="text-4xl font-light leading-[1.05] md:text-6xl">
            Le vostre <span className="italic">parole</span>
          </h2>

          {rating ? (
            <div className="mt-10 flex items-end gap-4">
              <span className="font-serif text-6xl font-light tabular-nums leading-none">
                {rating.toLocaleString("it-IT", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
              </span>
              <span className="flex flex-col gap-2 pb-1">
                <Stars value={rating} />
                {total ? <span className="eyebrow text-muted-foreground">{total} recensioni su Google</span> : null}
              </span>
            </div>
          ) : null}

          {url ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="eyebrow mt-10 inline-flex items-center gap-2 opacity-70 transition-opacity hover:opacity-100"
            >
              {source === "google" ? "Tutte le recensioni su Google" : "Leggi le recensioni su Google"}
              <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
            </a>
          ) : null}
        </Reveal>

        <div className="md:col-span-8">
          <Reveal as="figure" className="group">
            <blockquote className="font-serif text-3xl font-light leading-snug md:text-5xl">
              <span className="italic text-muted-foreground">&ldquo;</span>
              {featured.text}
              <span className="italic text-muted-foreground">&rdquo;</span>
            </blockquote>
            <Author review={featured} large />
          </Reveal>

          {rest.length ? (
            <ul className="mt-20 grid gap-x-10 gap-y-14 border-t border-border/60 pt-14 sm:grid-cols-2">
              {rest.map((review, i) => (
                <Reveal as="li" key={review.author + i} delay={(i % 2) * 0.1} className={cn(i % 2 === 1 && "sm:mt-16")}>
                  <figure className="group">
                    <blockquote className="text-lg leading-relaxed md:text-xl">
                      <span className="line-clamp-[8]">&ldquo;{review.text}&rdquo;</span>
                    </blockquote>
                    <Author review={review} />
                  </figure>
                </Reveal>
              ))}
            </ul>
          ) : null}

          {source === "google" ? (
            <p className="eyebrow mt-14 text-muted-foreground">Recensioni pubblicate su Google</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
