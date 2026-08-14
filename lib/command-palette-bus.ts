/**
 * Tiny controller that lets any trigger open the command palette.
 *
 * The palette UI is code-split with `ssr: false` (see
 * `components/deferred-interactions.tsx`) to keep its cost out of the initial
 * hydration window. That means it mounts — and registers its event listener —
 * a beat after the page becomes interactive. A trigger fired in that gap would
 * be lost if it relied on a one-shot `dispatchEvent` alone.
 *
 * So we also *latch* the request: `requestCommandPalette()` records that the
 * palette was wanted, and the palette replays that latch when it mounts. A
 * click therefore always opens the palette, whether it lands before or after
 * the deferred chunk has loaded.
 *
 * Both the trigger (in the eager bundle) and the palette (in the lazy chunk)
 * import this module, so they share one instance of the `wanted` flag.
 */

export const COMMAND_PALETTE_EVENT = "open-command-palette";

let wanted = false;

/** Open the command palette, surviving the deferred mount if it isn't ready. */
export function requestCommandPalette() {
  wanted = true;
  window.dispatchEvent(new CustomEvent(COMMAND_PALETTE_EVENT));
}

/** Read-and-clear the latch. The palette calls this when it mounts. */
export function consumePendingCommandPalette(): boolean {
  const was = wanted;
  wanted = false;
  return was;
}

/** Clear the latch without opening — used once the palette has handled it. */
export function clearPendingCommandPalette() {
  wanted = false;
}
