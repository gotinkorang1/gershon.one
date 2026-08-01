"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Rotates through a list of role titles, one at a time, in the hero.
 *
 * - `mode="wait"` swaps cleanly so only one word is ever visible.
 * - The container reserves the line height so the layout never jumps as words
 *   of different lengths cycle.
 * - Honours `prefers-reduced-motion`: those users see the first role, static.
 * - Pauses while the tab is hidden so it isn't animating off-screen, and always
 *   resumes on the current word (no desync).
 */
export function RoleRotator({
  roles,
  interval = 2300,
  className,
}: {
  roles: readonly string[];
  interval?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced || roles.length < 2) return;

    let timer: ReturnType<typeof setInterval> | undefined;
    const start = () => {
      timer = setInterval(() => setIndex((i) => (i + 1) % roles.length), interval);
    };
    const stop = () => {
      if (timer) clearInterval(timer);
      timer = undefined;
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    start();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduced, roles.length, interval]);

  // Static fallback — no motion, no cycling.
  if (reduced || roles.length < 2) {
    return <span className={className}>{roles[0]}</span>;
  }

  return (
    <span
      className={`relative inline-grid ${className ?? ""}`}
      // The grid overlays each word in the same cell, so height is driven by the
      // tallest single line and never collapses mid-swap.
      aria-live="polite"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={roles[index]}
          initial={{ opacity: 0, y: "0.5em", filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: "-0.5em", filter: "blur(4px)" }}
          transition={{ duration: 0.42, ease: EASE }}
          className="col-start-1 row-start-1 text-accent"
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
