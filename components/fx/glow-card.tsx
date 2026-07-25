"use client";

import type { ElementType, MouseEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Card with a border + halo that tracks the pointer. The gradient position is
 * driven by --mx/--my custom properties; all the visual work happens in CSS
 * (see .glow-card in globals.css) so this stays cheap.
 */
export function GlowCard({
  children,
  className,
  as,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  const Tag = (as ?? "div") as ElementType;

  const onMouseMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  return (
    <Tag
      onMouseMove={onMouseMove}
      className={cn(
        "glow-card relative rounded-2xl border border-border bg-card/50 backdrop-blur-sm transition-colors duration-300",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
