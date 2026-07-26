"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";

/**
 * Navigation progress bar. The App Router exposes no router events, so this
 * watches clicks on internal links and clears when the pathname actually
 * changes — the moment navigation genuinely completed.
 *
 * Rather than store a boolean and reset it in an effect keyed on `pathname`,
 * it stores the pathname the navigation started *from*. Visibility is then
 * derived during render: the bar shows while the current pathname still equals
 * the one we departed. No effect writes state, which is what
 * `react-hooks/set-state-in-effect` is guarding against — a functional updater
 * does not help, since the write is still synchronous inside the effect body.
 */
export function RouteProgress() {
  const pathname = usePathname();
  const [departedFrom, setDepartedFrom] = useState<string | null>(null);
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const loading = departedFrom !== null && departedFrom === pathname;

  // Navigation finished: the pathname moved on, so drop the safety timer.
  // Clearing a timeout is an external-system effect, not a state write.
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
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      ) {
        return;
      }
      if (link.target === "_blank") return;
      if (href.startsWith("http") && !href.startsWith(window.location.origin)) return;
      if (href === pathname) return;

      setDepartedFrom(pathname);

      // If navigation stalls or is cancelled the pathname never changes, so
      // release the bar rather than leaving it stuck at 90%.
      clearTimeout(timeout.current);
      timeout.current = setTimeout(() => setDepartedFrom(null), 8000);
    };

    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      clearTimeout(timeout.current);
    };
  }, [pathname]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-accent"
          initial={{ scaleX: 0, opacity: 1 }}
          // Eases toward 90% and waits — the last 10% lands on completion.
          animate={{ scaleX: 0.9, transition: { duration: 2.2, ease: [0.16, 1, 0.3, 1] } }}
          exit={{ scaleX: 1, opacity: 0, transition: { duration: 0.22 } }}
        />
      )}
    </AnimatePresence>
  );
}
