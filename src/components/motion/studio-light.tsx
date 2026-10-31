"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

import { cn } from "@/lib/utils";

type LightProps = {
  className?: string;
  /** Where the light rests before the pointer moves, in % of the area. */
  rest?: { x: number; y: number };
};

/**
 * Tracks the pointer inside the nearest positioned parent and returns sprung
 * coordinates in %. On touch devices the light drifts slowly on its own, and
 * with reduced motion it stays at rest.
 */
function useLightPosition(ref: React.RefObject<HTMLElement | null>, rest = { x: 30, y: 30 }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(rest.x);
  const y = useMotionValue(rest.y);
  const sx = useSpring(x, { stiffness: 40, damping: 18, mass: 1.2 });
  const sy = useSpring(y, { stiffness: 40, damping: 18, mass: 1.2 });
  const hasPointer = useRef(false);

  useEffect(() => {
    const host = ref.current?.parentElement;
    if (!host || reduce) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      hasPointer.current = true;
      const r = host.getBoundingClientRect();
      x.set(((e.clientX - r.left) / r.width) * 100);
      y.set(((e.clientY - r.top) / r.height) * 100);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [ref, reduce, x, y]);

  // Slow drift when there is no mouse (phones, tablets).
  useAnimationFrame((t) => {
    if (reduce || hasPointer.current) return;
    const s = t / 1000;
    x.set(rest.x + Math.sin(s * 0.23) * 22);
    y.set(rest.y + Math.cos(s * 0.17) * 14);
  });

  return { x: sx, y: sy };
}

/**
 * Soft studio lighting for a section: a warm key light that follows the
 * pointer like a softbox, a faint rim light from the top corner, a vignette
 * and film grain. Place inside a `relative` container, behind the content.
 */
export function StudioLight({ className, rest }: LightProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { x, y } = useLightPosition(ref, rest);

  const key = useMotionTemplate`radial-gradient(ellipse 42% 58% at ${x}% ${y}%, var(--studio-key) 0%, transparent 70%)`;
  const shadow = useMotionTemplate`radial-gradient(ellipse 90% 90% at ${x}% ${y}%, transparent 35%, var(--studio-shadow) 100%)`;

  return (
    <div ref={ref} aria-hidden className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden [mask-image:linear-gradient(to_bottom,black_75%,transparent)]",
        className
      )}>
      {/* Rim light from the top-left, like a strip softbox */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_0%_0%,var(--studio-rim),transparent_70%)]" />
      <motion.div className="absolute inset-0" style={{ background: shadow }} />
      <motion.div className="absolute inset-0 mix-blend-soft-light dark:mix-blend-screen" style={{ background: key }} />
      {/* Grain */}
      <div className="studio-grain absolute inset-[-50%] opacity-[0.07] dark:opacity-[0.09]" />
    </div>
  );
}

/**
 * Large text whose shadow is cast away from the moving key light, as if the
 * letters were standing in a studio.
 */
export function ShadowCast({
  children,
  className,
  rest,
}: {
  children: React.ReactNode;
  className?: string;
  rest?: { x: number; y: number };
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const { x, y } = useLightPosition(ref, rest);
  const dx = useTransform(x, (v: number) => (50 - v) * 0.35);
  const dy = useTransform(y, (v: number) => (50 - v) * 0.35);
  const textShadow = useMotionTemplate`${dx}px ${dy}px 28px var(--studio-cast)`;

  return (
    <motion.span ref={ref} className={cn("inline-block", className)} style={{ textShadow } as { textShadow: MotionValue<string> }}>
      {children}
    </motion.span>
  );
}
