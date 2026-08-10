"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  ContactRound,
  Copy,
  FileText,
  Mail,
  Moon,
  Search,
  Sun,
  Text,
} from "lucide-react";
import { Github, Linkedin } from "@/components/ui/brand-icons";
import { useTheme } from "next-themes";
import { navLinks, site } from "@/lib/site";
import { searchDocs, type SearchDoc } from "@/lib/search-index";
import { cn } from "@/lib/utils";
import { useI18n } from "@/components/locale-provider";
import { resumeUrlFor } from "@/lib/i18n";
import { Portal } from "@/components/ui/portal";
import { captureAnalyticsEvent } from "@/lib/analytics";

type Item = {
  id: string;
  label: string;
  group: string;
  icon: React.ReactNode;
  run: () => void;
  keywords?: string;
};

export function CommandPalette() {
  const { t, locale } = useI18n();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  // The query the highlight belongs to; a mismatch means reset to the top.
  const [indexQuery, setIndexQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { resolvedTheme, setTheme } = useTheme();

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setIndex(0);
    setIndexQuery("");
  }, []);

  const go = useCallback(
    (hash: string) => {
      close();
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
    },
    [close],
  );

  const items = useMemo<Item[]>(() => {
    const nav: Item[] = navLinks.map((l) => ({
      id: l.href,
      label: l.label,
      group: "Navigate",
      icon: <ArrowRight className="size-4" />,
      run: () => go(l.href),
    }));

    const actions: Item[] = [
      {
        id: "theme",
        label:
          resolvedTheme === "dark" ? t.ui.switchToLightTheme : t.ui.switchToDarkTheme,
        group: "Actions",
        icon:
          resolvedTheme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />,
        run: () => {
          setTheme(resolvedTheme === "dark" ? "light" : "dark");
          close();
        },
      },
      {
        id: "copy-email",
        label: t.ui.copyEmail,
        group: "Actions",
        keywords: site.email,
        icon: <Copy className="size-4" />,
        run: () => {
          void navigator.clipboard.writeText(site.email);
          close();
        },
      },
      {
        id: "cv-view",
        label: t.ui.viewCv,
        group: "Actions",
        icon: <FileText className="size-4" />,
        run: () => {
          window.open(resumeUrlFor(locale), "_blank", "noopener,noreferrer");
          close();
        },
      },
      {
        id: "cv-download",
        label: t.ui.downloadPdf,
        group: "Actions",
        icon: <FileText className="size-4" />,
        run: () => {
          const a = document.createElement("a");
          a.href = resumeUrlFor(locale);
          a.download = "";
          a.click();
          close();
        },
      },
      {
        id: "save-contact",
        label: site.contactCard.labels[locale].save,
        group: "Actions",
        keywords: `${site.name} vCard phone email`,
        icon: <ContactRound className="size-4" />,
        run: () => {
          captureAnalyticsEvent(
            "contact card downloaded",
            { source: "command_palette" },
            { immediate: true },
          );
          const anchor = document.createElement("a");
          anchor.href = site.contactCard.url;
          anchor.download = site.contactCard.fileName;
          anchor.click();
          close();
        },
      },
    ];

    const links: Item[] = [
      {
        id: "github",
        label: "GitHub",
        group: "Links",
        icon: <Github className="size-4" />,
        run: () => {
          window.open(site.socials.github, "_blank", "noopener,noreferrer");
          close();
        },
      },
      {
        id: "linkedin",
        label: "LinkedIn",
        group: "Links",
        icon: <Linkedin className="size-4" />,
        run: () => {
          window.open(site.socials.linkedin, "_blank", "noopener,noreferrer");
          close();
        },
      },
      {
        id: "email",
        label: t.ui.sendEmail,
        group: "Links",
        icon: <Mail className="size-4" />,
        run: () => {
          window.location.href = `mailto:${site.email}`;
          close();
        },
      },
    ];

    return [...nav, ...actions, ...links];
  }, [close, go, resolvedTheme, setTheme, t, locale]);

  const openDoc = useCallback(
    (doc: SearchDoc) => {
      close();
      if (doc.href.startsWith("#")) {
        document.querySelector(doc.href)?.scrollIntoView({ behavior: "smooth" });
      } else if (doc.href.startsWith("/") && !doc.href.startsWith("//")) {
        // Same-origin paths only. Rejecting "//" and absolute URLs keeps this
        // navigation sink from becoming an open redirect if the index ever
        // carries external or user-supplied values.
        window.location.href = doc.href;
      } else {
        console.warn("[palette] refused non-relative navigation:", doc.href);
      }
    },
    [close],
  );

  // Derived during render rather than corrected afterwards in an effect.
  const activeIndex = indexQuery === query ? index : 0;

  const setActiveIndex = useCallback(
    (next: number) => {
      setIndex(next);
      setIndexQuery(query);
    },
    [query],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;

    const commands = items.filter((i) =>
      `${i.label} ${i.group} ${i.keywords ?? ""}`.toLowerCase().includes(q),
    );

    // Content matches sit below matching commands, so typing a command name
    // still puts that command first.
    const content: Item[] = searchDocs(query).map((doc) => ({
      id: doc.id,
      label: doc.title,
      group: doc.group,
      icon: <Text className="size-4" />,
      keywords: doc.subtitle,
      run: () => openDoc(doc),
    }));

    return [...commands, ...content];
  }, [items, query, openDoc]);

  const groups = useMemo(() => {
    const map = new Map<string, Item[]>();
    filtered.forEach((i) => {
      map.set(i.group, [...(map.get(i.group) ?? []), i]);
    });
    return [...map.entries()];
  }, [filtered]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") close();
    };
    const onOpen = () => setOpen(true);

    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", onOpen);
    };
  }, [close]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 40);
  }, [open]);


  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((activeIndex + 1) % Math.max(filtered.length, 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex(
        (activeIndex - 1 + filtered.length) % Math.max(filtered.length, 1),
      );
    }
    if (e.key === "Enter") {
      e.preventDefault();
      filtered[activeIndex]?.run();
    }
  };

  return (
    <Portal>
      <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-start justify-center bg-background/70 p-4 pt-[12vh] backdrop-blur-sm"
          onClick={close}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -4 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={t.ui.commandPalette}
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-border px-4">
              <Search className="size-4 shrink-0 text-muted-foreground" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onListKey}
                placeholder={t.ui.searchPlaceholder}
                className="w-full bg-transparent py-4 text-sm outline-none placeholder:text-muted-foreground"
              />
              <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                ESC
              </kbd>
            </div>

            <div className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 && (
                <p className="px-3 py-8 text-center text-sm text-muted-foreground">
                  {t.ui.noResults(query)}
                </p>
              )}
              {groups.map(([group, groupItems]) => (
                <div key={group} className="mb-1">
                  <p className="px-3 py-2 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                    {group}
                  </p>
                  {groupItems.map((item) => {
                    const i = filtered.indexOf(item);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onMouseEnter={() => setActiveIndex(i)}
                        onClick={item.run}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                          i === activeIndex
                            ? "bg-muted text-foreground"
                            : "text-muted-foreground",
                        )}
                      >
                        <span className="shrink-0 text-muted-foreground">{item.icon}</span>
                        <span className="min-w-0 flex-1 truncate">{item.label}</span>
                        {item.keywords && item.group !== "Actions" && (
                          <span className="ml-auto shrink-0 truncate pl-3 text-xs text-faint">
                            {item.keywords}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </Portal>
  );
}
