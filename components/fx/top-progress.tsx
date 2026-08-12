"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * The single top-edge progress bar.
 *
 * Two jobs that used to be two overlapping components: a scroll-position
 * indicator, and a navigation-loading indicator. They shared the same colour,
 * height and position, so during a navigation the two stacked and read as one
 * glitching bar. Here only ever one is visible — the scroll bar fades out the
 * instant a navigation starts, and the loading bar takes the top edge until the
 * route resolves.
 */
export function TopProgress() {
  const reduced = useReducedMotion();
  const pathname = usePathname();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 160, damping: 30, restDelta: 0.001 });

  // The pathname the current navigation departed from. Loading is true while
  // the URL has not yet moved on — derived, never written from an effect.
  const [departedFrom, setDepartedFrom] = useState<string | null>(null);
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const loading = departedFrom !== null && departedFrom === pathname;

  // Navigation finished: the pathname moved on, so drop the safety timer.
  useEffect(() => {
    if (departedFrom !== null && departedFrom !== pathname) {
      clearTimeout(timeout.current);
    }
  }, [pathname, departedFrom]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) {
        return;
      }

      const link = (e.target as HTMLElement).closest("a");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
        return;
      }
      if (link.target === "_blank") return;
      if (href.startsWith("http") && !href.startsWith(window.location.origin)) return;
      if (href === pathname) return;

      // Let the browser finish the click's default action before React updates
      // state. A synchronous state update here can cancel navigation for a
      // native same-origin <a>, because this listener runs on `document`.
      clearTimeout(timeout.current);
      timeout.current = setTimeout(() => {
        setDepartedFrom(pathname);

        // If navigation stalls or is cancelled the pathname never changes, so
        // release the bar rather than leaving it stuck.
        timeout.current = setTimeout(() => setDepartedFrom(null), 8000);
      }, 0);
    };

    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      clearTimeout(timeout.current);
    };
  }, [pathname]);

  return (
    <>
      {/* Scroll position — hidden the moment a navigation is in flight so it
          never shares the edge with the loading bar. */}
      {!reduced && (
        <motion.div
          aria-hidden
          data-site-progress
          style={{ scaleX, opacity: loading ? 0 : 1 }}
          className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-accent transition-opacity duration-200"
        />
      )}

      {/* Navigation loading. */}
      <AnimatePresence>
        {loading && (
          <motion.div
            aria-hidden
            data-site-progress
            className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-accent"
            initial={{ scaleX: 0, opacity: 1 }}
            animate={
              reduced
                ? { scaleX: 0.9, opacity: 1 }
                : { scaleX: 0.9, transition: { duration: 2.2, ease: [0.16, 1, 0.3, 1] } }
            }
            exit={{ scaleX: 1, opacity: 0, transition: { duration: 0.22 } }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
