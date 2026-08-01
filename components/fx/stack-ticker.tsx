"use client";

import { Fragment } from "react";
import { useReducedMotion } from "motion/react";

/**
 * A quiet, seamless marquee of tool names for the hero.
 *
 * The track holds two identical copies of the list and translates by -50%, so
 * the loop is seamless with no jump. Edge-fade masks let it dissolve into the
 * page rather than hard-cutting at the container edge. Pauses on hover.
 *
 * Reduced-motion: renders a static, wrapped row instead of animating.
 */
export function StackTicker({ items }: { items: readonly string[] }) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div className="flex flex-wrap items-center gap-y-1 text-sm text-muted-foreground">
        {items.map((item, i) => (
          <Fragment key={item}>
            <span className="whitespace-nowrap">{item}</span>
            {i < items.length - 1 && (
              <span aria-hidden className="mx-3 text-faint">
                ·
              </span>
            )}
          </Fragment>
        ))}
      </div>
    );
  }

  // One copy of the list, with a trailing separator after each item so the two
  // copies chain together seamlessly.
  const row = items.map((item) => (
    <span key={item} className="inline-flex items-center whitespace-nowrap">
      {item}
      <span aria-hidden className="mx-3 text-faint">
        ·
      </span>
    </span>
  ));

  return (
    <div
      className="group/ticker relative w-full min-w-0 max-w-full overflow-hidden text-sm text-muted-foreground"
      style={{
        maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
      }}
    >
      <div className="ticker-track flex w-max group-hover/ticker:[animation-play-state:paused]">
        <div className="flex shrink-0 items-center pr-6">{row}</div>
        <div className="flex shrink-0 items-center pr-6" aria-hidden>
          {row}
        </div>
      </div>
    </div>
  );
}
