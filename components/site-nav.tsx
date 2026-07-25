"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Command } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLinks, site } from "@/lib/site";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter((el): el is Element => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.3, 1] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[80] focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:text-background"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
          scrolled
            ? "border-rule bg-background/85 backdrop-blur-md"
            : "border-transparent",
        )}
      >
        <div className="shell flex h-16 items-center justify-between gap-6">
          <Link href="/" className="flex items-baseline gap-3">
            <span className="text-[0.9375rem] font-medium tracking-tight">
              {site.shortName}
            </span>
            <span className="label hidden sm:inline">{site.role}</span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "link group flex items-baseline gap-2 text-sm transition-colors",
                  active === link.href ? "text-foreground" : "text-muted-foreground",
                )}
              >
                <span className="label text-[0.625rem]">{link.index}</span>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={site.resumeUrl}
              className="hidden bg-foreground px-4 py-2 text-xs font-medium tracking-tight text-background transition-opacity hover:opacity-80 sm:inline-block"
            >
              Download CV
            </a>
            <button
              type="button"
              onClick={() =>
                window.dispatchEvent(new CustomEvent("open-command-palette"))
              }
              aria-label="Open command palette"
              className="hidden size-9 place-items-center border border-rule text-faint transition-colors hover:border-rule-strong hover:text-foreground lg:grid"
            >
              <Command className="size-3.5" />
            </button>
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="relative grid size-9 place-items-center md:hidden"
            >
              <span
                className={cn(
                  "absolute h-px w-5 bg-foreground transition-transform duration-300",
                  open ? "rotate-45" : "-translate-y-1",
                )}
              />
              <span
                className={cn(
                  "absolute h-px w-5 bg-foreground transition-transform duration-300",
                  open ? "-rotate-45" : "translate-y-1",
                )}
              />
            </button>
          </div>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-background transition-[opacity,visibility] duration-300 md:hidden",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <nav className="shell flex h-full flex-col justify-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex items-baseline gap-4 border-b border-rule py-5"
            >
              <span className="label">{link.index}</span>
              <span className="text-3xl tracking-tight">{link.label}</span>
            </Link>
          ))}
          <a
            href={site.resumeUrl}
            className="mt-8 bg-foreground px-5 py-3.5 text-center text-sm font-medium text-background"
          >
            Download CV
          </a>
        </nav>
      </div>
    </>
  );
}
