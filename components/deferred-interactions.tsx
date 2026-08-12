"use client";

import dynamic from "next/dynamic";

/**
 * Client-only wrapper for the command palette and keyboard shortcuts.
 *
 * Both are invisible by default and only needed once the user reaches for a
 * keyboard interaction (Cmd/Ctrl-K, `?`, etc.), so they are code-split with
 * `ssr: false` to keep their parse + init cost out of the initial hydration
 * window — which is what Total Blocking Time measures.
 *
 * `ssr: false` on `next/dynamic` is only permitted inside a Client Component,
 * so this wrapper exists to keep it out of the server-rendered root layout.
 */
const CommandPalette = dynamic(
  () =>
    import("@/components/command-palette").then((m) => ({
      default: m.CommandPalette,
    })),
  { ssr: false },
);

const KeyboardShortcuts = dynamic(
  () =>
    import("@/components/keyboard-shortcuts").then((m) => ({
      default: m.KeyboardShortcuts,
    })),
  { ssr: false },
);

export function DeferredInteractions() {
  return (
    <>
      <CommandPalette />
      <KeyboardShortcuts />
    </>
  );
}
