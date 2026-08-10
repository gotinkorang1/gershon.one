"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * Crossfade between routes. Deliberately short and travel-light — a page
 * transition that makes someone wait to read a CV is a cost, not a feature.
 * `mode="wait"` would double the perceived latency, so the outgoing and
 * incoming pages overlap instead.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  return (
    <AnimatePresence initial={false}>
      <motion.div
        key={pathname}
        initial={reduced ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduced ? { opacity: 1 } : { opacity: 0 }}
        transition={
          reduced
            ? { duration: 0 }
            : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }
        }
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
