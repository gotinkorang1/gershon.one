"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { Heading } from "@/lib/blog";

/**
 * Table of contents with scroll-spy. Highlights the section currently in view
 * using an IntersectionObserver over the heading ids (assigned to match these
 * entries by the same slugify function that generated them).
 */
export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState("");

  useEffect(() => {
    const els = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-96px 0px -68% 0px", threshold: [0, 1] },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <nav aria-label="Table of contents" className="text-sm">
      <p className="label mb-3">On this page</p>
      <ul>
        {headings.map((h) => (
          <li key={h.id} className={cn(h.level === 3 && "ml-3")}>
            <a
              href={`#${h.id}`}
              className={cn(
                "block border-l-2 py-1 pl-3 transition-colors",
                active === h.id
                  ? "border-accent text-foreground"
                  : "border-border text-muted-foreground hover:border-border-strong hover:text-foreground",
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
