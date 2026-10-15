import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * A short, low-travel fade as the block scrolls into view. Editorial layouts
 * fall apart when elements slide around, so it only moves 12px and never
 * blurs.
 *
 * The animation is the scroll-driven `.reveal` rule in globals.css, so this
 * is plain markup: no client JS, no observers. `delay` keeps its old meaning
 * for staggering siblings (seconds, typically 0.04 × index) and becomes how
 * much later in the entry range this block starts.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const step = Math.min(Math.round(delay * 100), 30);
  const style = step ? ({ "--reveal-step": step } as CSSProperties) : undefined;

  return (
    <div className={cn("reveal", className)} style={style}>
      {children}
    </div>
  );
}
