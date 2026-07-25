"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // `resolvedTheme` is undefined during SSR and on the first client render, so
  // every attribute derived from it — icon *and* aria-label — has to wait for
  // mount. Branching on it earlier produces a hydration mismatch.
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={
        mounted
          ? isDark
            ? "Switch to light theme"
            : "Switch to dark theme"
          : "Toggle theme"
      }
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="grid size-9 place-items-center border border-rule text-faint transition-colors hover:border-rule-strong hover:text-foreground"
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
