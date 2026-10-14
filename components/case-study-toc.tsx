"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type TocItem = { id: string; heading: string };

/**
 * "On this page" for a long case study. Sits in the empty column beside the
 * article on wide screens and marks the section being read, so an 8-minute
 * write-up can be skimmed and jumped through instead of scrolled blind.
 */
export function CaseStudyToc({ items, label }: { items: TocItem[]; label: string }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    // The current section is the last one whose heading has passed the
    // upper third of the viewport.
    const update = () => {
      const line = window.innerHeight * 0.33;
      let current = sections[0]?.id ?? "";
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= line) current = section.id;
      }
      setActive(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [items]);

  return (
    <nav aria-label={label} className="sticky top-28">
      <p className="label">{label}</p>
      <ol className="mt-4 space-y-1 border-l border-border">
        {items.map((item) => {
          const current = item.id === active;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={current ? "location" : undefined}
                className={cn(
                  "-ml-px block border-l py-1.5 pl-4 text-sm leading-snug transition-colors",
                  current
                    ? "border-accent text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                {item.heading}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
