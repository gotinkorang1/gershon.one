"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Dependency-free tooltip. Positioned with CSS rather than a portal, which is
 * enough here because nothing sits inside an overflow-hidden ancestor.
 */
export function Tooltip({
  content,
  children,
  side = "top",
  className,
}: {
  content: ReactNode;
  children: ReactNode;
  side?: "top" | "bottom";
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {children}
      <span
        role="tooltip"
        className={cn(
          "pointer-events-none absolute left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-surface-2 px-2 py-1 text-xs text-foreground shadow-[var(--shadow-lg)] transition-[opacity,transform] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)]",
          // Scale in from the edge nearest the trigger — a popover appears from
          // where it is anchored, not from its own centre.
          side === "top" ? "bottom-full mb-2 origin-bottom" : "top-full mt-2 origin-top",
          open ? "scale-100 opacity-100" : "scale-95 opacity-0",
          className,
        )}
      >
        {content}
      </span>
    </span>
  );
}
