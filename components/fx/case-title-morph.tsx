import { ViewTransition, type ReactNode } from "react";

/**
 * Pairs a case-study title on its card with the same title on its page. The
 * shared name lets the browser morph one into the other during navigation,
 * so the reader sees the heading they clicked carry over rather than a new
 * page replacing the old. `default="none"` keeps it out of every other
 * transition; `share` must stay set for the pair to keep morphing.
 */
export function CaseTitleMorph({ slug, children }: { slug: string; children: ReactNode }) {
  return (
    <ViewTransition name={`case-title-${slug}`} share="title-morph" default="none">
      {children}
    </ViewTransition>
  );
}
