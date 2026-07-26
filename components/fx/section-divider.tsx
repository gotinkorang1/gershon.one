"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * The rule between sections draws outward from the centre as it enters view,
 * so a boundary announces itself rather than appearing pre-drawn. Cheap
 * transform-and-opacity work only — no layout thrash while scrolling.
 */
export function SectionDivider() {
  const reduced = useReducedMotion();

  return (
    <div className="shell" aria-hidden>
      <motion.hr
        className="section-rule"
        initial={reduced ? false : { scaleX: 0.25, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}
