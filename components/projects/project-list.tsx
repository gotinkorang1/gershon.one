"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Panel } from "@/components/ui/panel";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Project, ProjectCategory, ProjectsPageCopy } from "@/lib/site";

const CATEGORIES: ProjectCategory[] = ["network", "infrastructure", "software", "design", "business", "study"];

/**
 * The project list with a single-choice filter. Every project stays in the
 * server HTML; filtering only hides cards, so nothing depends on JavaScript to
 * be read or indexed.
 */
// Plain data only: this crosses the server/client boundary, so no functions.
type ListCopy = Omit<ProjectsPageCopy, "homepageAlt">;

export function ProjectList({ copy, projects }: { copy: ListCopy; projects: Project[] }) {
  const [active, setActive] = useState<ProjectCategory | null>(null);
  const counts = Object.fromEntries(
    CATEGORIES.map((c) => [c, projects.filter((p) => p.category === c).length]),
  ) as Record<ProjectCategory, number>;

  const chip = (selected: boolean) =>
    cn(
      "tap rounded-md border px-3 py-2 text-xs font-medium transition-colors",
      selected
        ? "border-accent/50 bg-accent-quiet text-foreground"
        : "border-border text-muted-foreground hover:border-border-strong hover:text-foreground",
    );

  return (
    <>
      <div role="group" aria-label={copy.projectsLede} className="mt-6 flex flex-wrap gap-2">
        <button type="button" aria-pressed={active === null} onClick={() => setActive(null)} className={chip(active === null)}>
          {copy.all} <span className="ml-1 text-faint">{projects.length}</span>
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={active === c}
            onClick={() => setActive(c)}
            className={chip(active === c)}
          >
            {copy.categories[c]} <span className="ml-1 text-faint">{counts[c]}</span>
          </button>
        ))}
      </div>

      <ul className="mt-6 grid gap-3 md:grid-cols-2">
        {projects.map((p) => {
          const external = p.href?.startsWith("http");
          return (
            <li key={p.title} hidden={active !== null && p.category !== active}>
              <Panel className="flex h-full flex-col p-5">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                  <span className="label">{copy.categories[p.category]}</span>
                  {p.status === "in-progress" && <Badge variant="accent">{copy.inProgress}</Badge>}
                </div>
                <h3 className="mt-2.5 font-semibold leading-snug tracking-tight">{p.title}</h3>
                <p className="mt-0.5 text-sm text-muted-foreground">{p.context}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.summary}</p>
                <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-4">
                  <ul className="flex flex-wrap gap-1.5">
                    {p.tags.map((tag) => (
                      <li key={tag}>
                        <Badge>{tag}</Badge>
                      </li>
                    ))}
                  </ul>
                  {p.href &&
                    (external ? (
                      <a
                        href={p.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="link inline-flex items-center gap-1 text-xs font-medium text-accent"
                      >
                        {p.video ? copy.watch : copy.visit} <ArrowUpRight aria-hidden className="size-3" />
                      </a>
                    ) : (
                      <Link
                        href={p.href}
                        className="link inline-flex items-center gap-1 text-xs font-medium text-accent"
                      >
                        {copy.readMore} <ArrowRight aria-hidden className="size-3" />
                      </Link>
                    ))}
                </div>
              </Panel>
            </li>
          );
        })}
      </ul>
    </>
  );
}
