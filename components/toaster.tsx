"use client";

import { useTheme } from "next-themes";
import { Toaster as SonnerToaster } from "sonner";

/**
 * App-wide toast surface, mounted once in the root layout.
 *
 * Positioned bottom-centre so it never collides with the back-to-top button or
 * the PWA update card (both live bottom-right). Colours stay neutral — no
 * `richColors` — to match the site's restrained palette; the type icon carries
 * the meaning. Theme follows next-themes so toasts read correctly in both modes.
 */
export function Toaster() {
  const { resolvedTheme } = useTheme();

  return (
    <SonnerToaster
      theme={resolvedTheme === "light" ? "light" : "dark"}
      position="bottom-center"
      offset={20}
      mobileOffset={16}
      toastOptions={{
        style: {
          borderRadius: "0.7rem",
          fontFamily: "var(--font-sans), ui-sans-serif, system-ui, sans-serif",
        },
      }}
    />
  );
}
