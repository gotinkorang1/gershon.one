"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";

/**
 * Navigation progress bar. Next gives no router events in the App Router, so
 * this watches for clicks on internal links and clears when the pathname
 * actually changes — which is the moment navigation genuinely completed.
 */
export function RouteProgress() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    setLoading(false);
    clearTimeout(timeout.current);
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;

      const link = (e.target as HTMLElement).closest("a");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      if (link.target === "_blank") return;
      if (href.startsWith("http") && !href.startsWith(window.location.origin)) return;
      if (href === pathname) return;

      setLoading(true);
      // Safety net: if navigation stalls or is cancelled, don't strand the bar.
      timeout.current = setTimeout(() => setLoading(false), 8000);
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
