"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onStoreChange: () => void) {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

/**
 * Hydration-safe reduced-motion preference.
 *
 * React uses the server snapshot for the first client render, then updates to
 * the real media query after hydration. This keeps animated/static branches
 * structurally identical while React is attaching to the server HTML.
 */
export function useReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
