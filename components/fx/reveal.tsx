"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * A short, low-travel fade. Editorial layouts fall apart when elements slide
 * around, so this only moves 8px and never blurs.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  // The global CSS reduced-motion rule cannot reach this: Motion writes inline
  // styles from JS, so the opt-out has to happen here.
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
