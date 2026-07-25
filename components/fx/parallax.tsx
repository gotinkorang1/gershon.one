"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "motion/react";

/**
 * Differential scroll drift. Kept deliberately small — parallax works when you
 * feel depth without noticing the effect. Anything past ~60px of travel starts
 * to read as a gimmick and fights the reader.
 *
 * Returns children untouched under reduced-motion rather than animating to
 * zero, so no spring runs at all.
 */
export function Parallax({
  children,
  distance = 40,
  className,
}: {
  children: ReactNode;
  distance?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const raw = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const y = useSpring(raw, { stiffness: 120, damping: 30, mass: 0.5 });

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
