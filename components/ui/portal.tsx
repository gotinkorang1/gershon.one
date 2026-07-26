"use client";

import { createPortal } from "react-dom";
import type { ReactNode } from "react";
import { useHasMounted } from "@/lib/use-media-query";

/**
 * Renders children at document.body.
 *
 * Overlays must escape their trigger's position in the tree. A transformed
 * ancestor — a magnetic button, a parallax wrapper, anything with a CSS
 * transform, filter or will-change — becomes the containing block for
 * `position: fixed` descendants, so a modal nested inside one anchors to that
 * element rather than the viewport. Portalling avoids the whole class of
 * problem instead of patching each occurrence.
 *
 * `useHasMounted` is useSyncExternalStore rather than useState + useEffect:
 * document does not exist during SSR, but seeding that in an effect renders
 * twice by design.
 */
export function Portal({ children }: { children: ReactNode }) {
  const mounted = useHasMounted();

  if (!mounted) return null;
  return createPortal(children, document.body);
}
