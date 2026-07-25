"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * The surface primitive. `reactive` adds a cursor-following wash; the pointer
 * position is written to CSS custom properties so the gradient itself is
 * painted by the compositor rather than by React.
 */
export const Panel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    raised?: boolean;
    inset?: boolean;
    interactive?: boolean;
    reactive?: boolean;
  }
>(({ className, raised, inset, interactive, reactive, onMouseMove, ...props }, ref) => {
  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reactive) {
      const rect = e.currentTarget.getBoundingClientRect();
      e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
    }
    onMouseMove?.(e);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className={cn(
        "panel overflow-hidden",
        raised && "panel-raised",
        inset && "panel-inset",
        interactive && "panel-interactive",
        reactive && "reactive",
        className,
      )}
      {...props}
    />
  );
});
Panel.displayName = "Panel";
