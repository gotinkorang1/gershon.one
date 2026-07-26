"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Media query as an external store.
 *
 * The obvious implementation — useState plus a useEffect that seeds it — makes
 * React render once with a wrong value and then immediately re-render, which is
 * what `react-hooks/set-state-in-effect` flags. `useSyncExternalStore` exists
 * for exactly this: subscribe to a browser API, read it synchronously, and give
 * the server a separate snapshot so SSR and hydration agree.
 */
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);

  // No matchMedia on the server; false matches the pre-hydration markup.
  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Convenience wrapper — the query most components need. */
export function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/**
 * True once the component has hydrated on the client. Replaces the
 * `useState(false)` + `useEffect(() => setMounted(true))` idiom, which renders
 * twice by design.
 */
export function useHasMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}
