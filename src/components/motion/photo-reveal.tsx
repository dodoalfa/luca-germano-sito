"use client";

import { motion, useReducedMotion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  direction?: "left" | "right" | "up";
  role?: "hero" | "portrait" | "gallery";
  delay?: number;
};

/** Photo entrances vary by placement; the surrounding layout keeps its dimensions. */
export function PhotoReveal({ children, className, direction = "up", role = "gallery", delay = 0 }: Props) {
  const reduce = useReducedMotion();
  const distance = role === "hero" ? 14 : 32;
  return (
    <motion.div
      className={className}
      initial={reduce ? false : {
        opacity: 0,
        x: direction === "left" ? -Math.min(distance, 18) : direction === "right" ? Math.min(distance, 18) : 0,
        y: direction === "up" ? distance : 0,
        scale: role === "portrait" ? 1.025 : 1,
      }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: reduce ? 0 : role === "portrait" ? 1.1 : 0.85, delay: reduce ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
