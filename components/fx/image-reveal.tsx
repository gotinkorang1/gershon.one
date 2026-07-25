"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Clip-path wipe on entry, with a slow counter-scale so the image settles
 * rather than snapping. The inner element starts slightly oversized so the
 * clip never exposes an empty edge mid-reveal.
 */
export function ImageReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={cn("overflow-hidden", className)}
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      whileInView={{ clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.05, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        initial={{ scale: 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.4, delay, ease: [0.16, 1, 0.3, 1] }}
        className="size-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
