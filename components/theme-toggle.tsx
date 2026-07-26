"use client";

import { useTheme } from "next-themes";
import { useHasMounted } from "@/lib/use-media-query";
import { Moon, Sun } from "lucide-react";
import { useI18n } from "@/components/locale-provider";

export function ThemeToggle() {
  const { t } = useI18n();
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useHasMounted();

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
            ? t.ui.switchToLightTheme
            : t.ui.switchToDarkTheme
          : t.ui.toggleTheme
      }
      onClick={() => setTheme(isDark ? "light" : "dark")}
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
