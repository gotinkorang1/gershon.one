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
  animate: shouldAnimate = false,
  duration = 1.4,
  className,
}: {
  value: string;
  /**
   * Opt in per value. Counting is only meaningful for quantities — animating
   * "Aug 2026" walks through "Aug 1256" because a year is an identifier, not
   * an amount. Default off so a new fact cannot silently acquire nonsense.
   */
  animate?: boolean;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    const node = ref.current;
    if (!inView || !node) return;

    if (!shouldAnimate) {
      node.textContent = value;
      return;
    }

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
      onComplete: () => {
        node.textContent = value;
      },
    });

    // rAF is throttled in a background tab, so an animation started there
    // stalls mid-count and displays a number that is simply wrong — "1+ years"
    // instead of "5+". Snap to the true value whenever the tab is hidden, and
    // on unmount, so the DOM is never left showing a partial figure.
    const settle = () => {
      if (document.visibilityState === "hidden") {
        controls.stop();
        node.textContent = value;
      }
    };
    document.addEventListener("visibilitychange", settle);
    settle();

    return () => {
      document.removeEventListener("visibilitychange", settle);
      controls.stop();
      node.textContent = value;
    };
  }, [inView, value, duration, shouldAnimate]);

  // Rendered in full so it is correct before hydration and for crawlers.
  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
