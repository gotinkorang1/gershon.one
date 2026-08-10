"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * Masked line reveal — each line slides up from behind its own clip box, which
 * reads far more deliberate than fading a whole heading at once.
 */
export function TextReveal({
  lines,
  className,
  delay = 0,
  animate = true,
}: {
  lines: string[];
  className?: string;
  delay?: number;
  animate?: boolean;
}) {
  const reduced = useReducedMotion();
  const accessibleText = lines.join(" ");

  // A full line-height slide per line is the clearest possible case for
  // honouring this preference.
  if (reduced || !animate) {
    return (
      <span className={cn("block", className)}>
        <span className="sr-only">{accessibleText}</span>
        {lines.map((line) => (
          <span key={line} aria-hidden className="block">
            {line}
          </span>
        ))}
      </span>
    );
  }

  return (
    <span className={cn("block", className)}>
      {/* Block-level lines produce no whitespace between them, so the
          accessible name would read "GershonOtinkorang". This carries the
          spaced version; the visible lines are hidden from the a11y tree. */}
      <span className="sr-only">{accessibleText}</span>
      {lines.map((line, i) => (
        <span key={line} aria-hidden className="block overflow-hidden pb-[0.06em]">
          <motion.span
            className="block"
            initial={{ y: "108%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.9,
              delay: delay + i * 0.09,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
