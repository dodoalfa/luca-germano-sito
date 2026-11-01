"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import type { Photo } from "@/lib/portfolio";
import { Logo } from "@/components/logo";

const INTERVAL = 5000;

export function HeroSlider({ photos }: { photos: Photo[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const count = photos.length;

  useEffect(() => {
    if (paused || reduce || count < 2) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % count), INTERVAL);
    return () => clearTimeout(t);
  }, [index, paused, reduce, count]);

  // Pause while the tab is hidden so slides don't pile up.
  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const photo = photos[index];
  if (!photo) return null;

  return (
    <section
      aria-roledescription="carosello"
      aria-label="Immagini in evidenza"
      className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-[#0a0a0a] text-white"
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={photo.id}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 1.2, ease: "easeInOut" }}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: reduce ? 1 : 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: INTERVAL / 1000 + 1.2, ease: "linear" }}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="100vw"
              preload={index === 0}
              placeholder="blur"
              blurDataURL={photo.blurDataURL}
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Legibility scrim: darker at top (nav) and bottom (controls) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-black/55" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 text-center">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >

          <Logo variant="full" className="w-[240px] sm:w-[340px] md:w-[440px]" />
        </motion.div>
        <motion.p
          className="eyebrow mt-8 text-white/75"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.7 }}
        >
          Fotografo a Fano · Matrimoni · Famiglia · Newborn
        </motion.p>
        <h1 className="mt-6 max-w-3xl font-serif text-3xl font-light leading-tight sm:text-4xl md:text-5xl">Le vostre emozioni,<br /><span className="italic">una storia da rivivere.</span></h1>
        <a href="#scrivimi" className="eyebrow mt-8 border-b border-white/70 pb-2 transition-opacity hover:opacity-70">Raccontami il tuo momento</a>
      </div>

      {/* Slide indicators with progress */}
      {count > 1 && (
        <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between px-5 pb-6 md:px-10 md:pb-10">
          <div className="flex gap-1.5" role="tablist" aria-label="Scegli immagine">
            {photos.map((p, i) => (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Immagine ${i + 1} di ${count}`}
                onClick={() => setIndex(i)}
                className="group relative h-6 w-4 sm:w-6 md:w-8"
              >
                <span className="absolute inset-x-0 top-1/2 h-px bg-white/30" />
                {i === index && (
                  <motion.span
                    key={`${p.id}-${paused}`}
                    className="absolute left-0 top-1/2 h-px bg-white"
                    initial={{ width: reduce || paused ? "100%" : "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: reduce || paused ? 0 : INTERVAL / 1000, ease: "linear" }}
                  />
                )}
              </button>
            ))}
          </div>
          <a
            href="#introduzione"
            className="eyebrow flex items-center gap-3 text-white/75 transition-colors hover:text-white"
          >
            Scorri
            <motion.span
              aria-hidden
              className="block h-8 w-px bg-white/60"
              animate={reduce ? undefined : { scaleY: [0, 1, 0], originY: [0, 0, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </a>
        </div>
      )}
    </section>
  );
}
