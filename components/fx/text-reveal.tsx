"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Masked line reveal — each line slides up from behind its own clip box, which
 * reads far more deliberate than fading a whole heading at once.
 */
export function TextReveal({
  lines,
  className,
  delay = 0,
}: {
  lines: string[];
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();

  // A full line-height slide per line is the clearest possible case for
  // honouring this preference.
  if (reduced) {
    return (
      <span className={cn("block", className)}>
        {lines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </span>
    );
  }

  return (
    <span className={cn("block", className)}>
      {lines.map((line, i) => (
        <span key={line} className="block overflow-hidden pb-[0.06em]">
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
