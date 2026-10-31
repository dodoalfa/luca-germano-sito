"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import type { Photo } from "@/lib/portfolio";
import { categoryLabel } from "@/lib/portfolio";
import { ImageModal } from "./image-modal";

type Props = {
  photos: Photo[];
  /** Show the category caption under each photo (useful on the "Tutti" view). */
  showCategory?: boolean;
};

export function MasonryGrid({ photos, showCategory = false }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    <>
      <ul className="columns-1 gap-x-4 sm:columns-2 md:gap-x-6 lg:columns-3">
        {photos.map((photo, i) => (
          <motion.li
            key={photo.id}
            className="mb-4 break-inside-avoid md:mb-6"
            initial={reduceMotion ? false : { opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -8% 0px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: (i % 3) * 0.08 }}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              className="group block w-full cursor-zoom-in overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
              aria-label={`Apri a tutto schermo: ${photo.alt}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                placeholder="blur"
                blurDataURL={photo.blurDataURL}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                loading={i < 3 ? "eager" : "lazy"}
                fetchPriority={i < 3 ? "high" : "auto"}
                className="h-auto w-full transition-[transform,filter] duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025] group-hover:brightness-[0.92]"
              />
            </button>
            {showCategory && (
              <p className="eyebrow mt-3 text-muted-foreground">{categoryLabel(photo.category)}</p>
            )}
          </motion.li>
        ))}
      </ul>

      <ImageModal
        photos={photos}
        index={openIndex}
        onIndexChange={setOpenIndex}
        onClose={() => setOpenIndex(null)}
      />
    </>
  );
}
