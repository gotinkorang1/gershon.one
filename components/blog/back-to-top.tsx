"use client";

import { useI18n } from "@/components/locale-provider";
import { getBlogCopy } from "@/lib/localised-content";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

/** Floating button that appears once the reader has scrolled a screenful down. */
export function BackToTop() {
  const c = getBlogCopy(useI18n().locale);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label={c.backToTop}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "fixed bottom-6 right-6 z-40 grid size-11 place-items-center rounded-full border border-border bg-surface-1/85 text-muted-foreground shadow-[var(--shadow-lg)] backdrop-blur-xl transition-[opacity,transform,color,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-border-strong hover:text-foreground active:scale-95",
        shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <ArrowUp className="size-5" />
    </button>
  );
}
