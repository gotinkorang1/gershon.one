"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "motion/react";

/**
 * Counts the numerals inside a string while leaving everything else intact,
 * so "5+ years", "99.9%" and "Accra → St. John's" can all pass through the
 * same component — the last one simply has nothing to animate.
 */
export function Counter({
  value,
  duration = 1.4,
  className,
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    const node = ref.current;
    if (!inView || !node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.textContent = value;
      return;
    }

    const match = value.match(/(\d+(?:\.\d+)?)/);
    if (!match) {
      node.textContent = value;
      return;
    }

    const target = parseFloat(match[1]);
    const decimals = match[1].includes(".") ? match[1].split(".")[1].length : 0;
    const [before, after] = value.split(match[1]);

    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        node.textContent = `${before}${v.toFixed(decimals)}${after}`;
      },
    });

    return () => controls.stop();
  }, [inView, value, duration]);

  // Rendered in full so it is correct before hydration and for crawlers.
  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
