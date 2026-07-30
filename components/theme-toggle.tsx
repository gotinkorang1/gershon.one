"use client";

import { useRef } from "react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";
import { useHasMounted } from "@/lib/use-media-query";
import { Moon, Sun } from "lucide-react";
import { useI18n } from "@/components/locale-provider";

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => { ready: Promise<void> };
};

export function ThemeToggle() {
  const { t } = useI18n();
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useHasMounted();
  const buttonRef = useRef<HTMLButtonElement>(null);

  // `resolvedTheme` is undefined during SSR and on the first client render, so
  // every attribute derived from it — icon *and* aria-label — has to wait for
  // mount. Branching on it earlier produces a hydration mismatch.
  const isDark = resolvedTheme === "dark";

  function toggle() {
    const next = isDark ? "light" : "dark";
    const doc = document as ViewTransitionDocument;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // No View Transitions support, or the visitor asked for less motion: swap
    // instantly. The theme still changes — only the flourish is dropped.
    if (!doc.startViewTransition || prefersReduced || !buttonRef.current) {
      setTheme(next);
      return;
    }

    // Reveal the incoming theme as a circle expanding from the toggle itself,
    // so the change reads as originating from the control the visitor pressed.
    const rect = buttonRef.current.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = doc.startViewTransition(() => {
      // flushSync forces next-themes to commit the class change inside the
      // capture, so the "after" snapshot is the new theme rather than the old.
      flushSync(() => setTheme(next));
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 480,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    });
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      aria-label={
        mounted
          ? isDark
            ? t.ui.switchToLightTheme
            : t.ui.switchToDarkTheme
          : t.ui.toggleTheme
      }
      onClick={toggle}
      className="tap grid size-9 place-items-center rounded-lg border border-border text-faint transition-colors hover:border-border-strong hover:text-foreground"
    >
      {mounted ? (
        isDark ? (
          <Sun className="size-3.5" />
        ) : (
          <Moon className="size-3.5" />
        )
      ) : (
        <span className="size-3.5" />
      )}
    </button>
  );
}
