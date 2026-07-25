"use client";

import { useCallback, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Dialog } from "@/components/ui/dialog";
import { navLinks, site } from "@/lib/site";

const SHORTCUTS: { keys: string[]; label: string }[] = [
  { keys: ["⌘", "K"], label: "Open command palette" },
  { keys: ["?"], label: "Show this help" },
  { keys: ["G", "then", "E"], label: "Go to experience" },
  { keys: ["G", "then", "C"], label: "Go to capabilities" },
  { keys: ["G", "then", "R"], label: "Go to credentials" },
  { keys: ["G", "then", "T"], label: "Go to contact" },
  { keys: ["G", "then", "H"], label: "Go to top" },
  { keys: ["D"], label: "Toggle dark mode" },
  { keys: ["V"], label: "Download CV" },
  { keys: ["Esc"], label: "Close any overlay" },
];

const GO_TARGETS: Record<string, string> = {
  e: "#experience",
  c: "#capabilities",
  r: "#credentials",
  t: "#contact",
};

/**
 * Global shortcut layer. Uses a short-lived `g` prefix so Vim-style sequences
 * work without colliding with single-key actions.
 */
export function KeyboardShortcuts() {
  const [helpOpen, setHelpOpen] = useState(false);
  const [awaitingGo, setAwaitingGo] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  const scrollTo = useCallback((hash: string) => {
    document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (!awaitingGo) return;
    const timer = setTimeout(() => setAwaitingGo(false), 1200);
    return () => clearTimeout(timer);
  }, [awaitingGo]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;
      if (typing || e.metaKey || e.ctrlKey || e.altKey) return;

      const key = e.key.toLowerCase();

      if (awaitingGo) {
        e.preventDefault();
        setAwaitingGo(false);
        if (key === "h") window.scrollTo({ top: 0, behavior: "smooth" });
        else if (GO_TARGETS[key]) scrollTo(GO_TARGETS[key]);
        return;
      }

      if (key === "g") {
        setAwaitingGo(true);
        return;
      }
      if (e.key === "?") {
        e.preventDefault();
        setHelpOpen((v) => !v);
        return;
      }
      if (key === "d") {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
        return;
      }
      if (key === "v") {
        window.open(site.resumeUrl, "_blank");
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [awaitingGo, resolvedTheme, setTheme, scrollTo]);

  return (
    <>
      {awaitingGo && (
        <div className="pointer-events-none fixed bottom-6 left-1/2 z-[65] -translate-x-1/2">
          <div className="panel panel-raised px-3 py-2">
            <p className="label text-[0.625rem]">
              g … {navLinks.map((l) => l.label[0].toLowerCase()).join(" / ")} / h
            </p>
          </div>
        </div>
      )}

      <Dialog open={helpOpen} onClose={() => setHelpOpen(false)} title="Keyboard shortcuts">
        <ul className="divide-y divide-border">
          {SHORTCUTS.map((s) => (
            <li key={s.label} className="flex items-center justify-between gap-6 px-5 py-2.5">
              <span className="text-sm text-muted-foreground">{s.label}</span>
              <span className="flex items-center gap-1">
                {s.keys.map((k) =>
                  k === "then" ? (
                    <span key={k} className="px-0.5 text-xs text-faint">
                      then
                    </span>
                  ) : (
                    <kbd
                      key={k}
                      className="min-w-6 rounded border border-border bg-surface-2 px-1.5 py-0.5 text-center font-mono text-[0.6875rem]"
                    >
                      {k}
                    </kbd>
                  ),
                )}
              </span>
            </li>
          ))}
        </ul>
      </Dialog>
    </>
  );
}
