"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Dialog } from "radix-ui";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

import type { Photo } from "@/lib/portfolio";
import { categoryLabel } from "@/lib/portfolio";

type Props = {
  photos: Photo[];
  index: number | null;
  onIndexChange: (index: number) => void;
  onClose: () => void;
};

const SWIPE_THRESHOLD = 80;

export function ImageModal({ photos, index, onIndexChange, onClose }: Props) {
  const open = index !== null;
  const [direction, setDirection] = useState(0);
  const count = photos.length;

  const go = useCallback(
    (step: 1 | -1) => {
      if (index === null) return;
      setDirection(step);
      onIndexChange((index + step + count) % count);
    },
    [index, count, onIndexChange]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_THRESHOLD) go(1);
    else if (info.offset.x > SWIPE_THRESHOLD) go(-1);
  };

  const photo = index !== null ? photos[index] : null;
  const neighbours =
    index !== null && count > 1
      ? [photos[(index + 1) % count], photos[(index - 1 + count) % count]]
      : [];

  return (
    <Dialog.Root open={open} onOpenChange={(v) => !v && onClose()}>
      <AnimatePresence>
        {open && photo && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-[70] bg-[#060606]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
              />
            </Dialog.Overlay>

            <Dialog.Content
              forceMount
              aria-describedby={undefined}
              className="fixed inset-0 z-[71] flex flex-col text-[#ededeb] outline-none"
            >
              <Dialog.Title className="sr-only">{photo.alt}</Dialog.Title>

              {/* Top bar */}
              <div className="flex h-16 shrink-0 items-center justify-between px-5 md:h-20 md:px-10">
                <p className="eyebrow tabular-nums opacity-70">
                  {String(index! + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
                  <span className="ml-4 hidden opacity-70 sm:inline">{categoryLabel(photo.category)}</span>
                </p>
                <Dialog.Close
                  className="inline-flex size-10 items-center justify-center transition-opacity hover:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                  aria-label="Chiudi"
                >
                  <X className="size-5" strokeWidth={1.25} />
                </Dialog.Close>
              </div>

              {/* Image stage */}
              <div className="relative flex-1 overflow-hidden">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  <motion.div
                    key={photo.id}
                    custom={direction}
                    variants={{
                      enter: (d: number) => ({ opacity: 0, x: d * 60 }),
                      center: { opacity: 1, x: 0 },
                      exit: (d: number) => ({ opacity: 0, x: d * -60 }),
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    drag={count > 1 ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.25}
                    onDragEnd={onDragEnd}
                    className="absolute inset-0 mx-5 mb-5 touch-pan-y md:mx-24 md:mb-10"
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="100vw"
                      placeholder="blur"
                      blurDataURL={photo.blurDataURL}
                      draggable={false}
                      className="select-none object-contain"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Warm the cache for the next and previous photos */}
                <div aria-hidden className="pointer-events-none absolute size-px overflow-hidden opacity-0">
                  {neighbours.map((n) => (
                    <div key={n.id} className="relative h-screen w-screen">
                      <Image src={n.src} alt="" fill sizes="100vw" loading="eager" />
                    </div>
                  ))}
                </div>

                {count > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => go(-1)}
                      aria-label="Foto precedente"
                      className="absolute left-2 top-1/2 hidden size-12 -translate-y-1/2 items-center justify-center opacity-60 transition-opacity hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 md:inline-flex md:left-6"
                    >
                      <ArrowLeft className="size-5" strokeWidth={1.25} />
                    </button>
                    <button
                      type="button"
                      onClick={() => go(1)}
                      aria-label="Foto successiva"
                      className="absolute right-2 top-1/2 hidden size-12 -translate-y-1/2 items-center justify-center opacity-60 transition-opacity hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 md:inline-flex md:right-6"
                    >
                      <ArrowRight className="size-5" strokeWidth={1.25} />
                    </button>
                  </>
                )}
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
