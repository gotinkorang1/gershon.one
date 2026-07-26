"use client";

import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/fx/reveal";

export function SectionHeading({
  index,
  title,
  description,
}: {
  index: string;
  title: string;
  description?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <Reveal>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-12">
        <div>
          <p className="label flex items-center gap-3">
            {/* The rule draws itself in — a small cue that the section has
                arrived, matching the reveal on the content below. */}
            <motion.span
              aria-hidden
              className="inline-block h-px bg-border-strong"
              initial={reduced ? false : { width: 0 }}
              whileInView={{ width: "1.5rem" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            />
            {index}
          </p>
          <h2 className="mt-3.5 text-jumbo font-semibold tracking-tight">{title}</h2>
        </div>
        {description && (
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground md:pb-1.5">
            {description}
          </p>
        )}
      </div>
    </Reveal>
  );
}
