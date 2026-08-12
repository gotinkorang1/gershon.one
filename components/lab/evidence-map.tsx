"use client";

import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import { portfolioFeatures } from "@/lib/site";
import type { EvidenceItem } from "@/lib/portfolio-features";
import { Badge } from "@/components/ui/badge";
import { Panel } from "@/components/ui/panel";
import { cn } from "@/lib/utils";

const content = portfolioFeatures.lab.evidence;

export function EvidenceMap({ items }: { items: EvidenceItem[] }) {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(items[0]?.id ?? "");

  const filtered = useMemo(() => {
    const value = query.trim().toLowerCase();
    return value
      ? items.filter((item) => `${item.skill} ${item.group}`.toLowerCase().includes(value))
      : items;
  }, [items, query]);

  const selected = filtered.find((item) => item.id === selectedId) ?? filtered[0];

  return (
    <div>
      <div className="max-w-2xl">
        <h2 className="text-2xl font-semibold tracking-tight">{content.title}</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">{content.lede}</p>
      </div>

      <div className="mt-7 grid gap-4 lg:grid-cols-[18rem_minmax(0,1fr)]">
        <Panel className="h-fit p-4">
          <label className="label" htmlFor="evidence-search">
            {content.select}
          </label>
          <div className="relative mt-3">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-faint" />
            <input
              id="evidence-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="w-full rounded-lg border border-border bg-surface-inset py-2.5 pl-9 pr-3 text-sm outline-none focus:border-accent/60"
            />
          </div>
          <div className="mt-3 max-h-[28rem] space-y-1 overflow-y-auto pr-1">
            {filtered.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedId(item.id)}
                className={cn(
                  "min-h-11 w-full rounded-lg px-3 py-2.5 text-left transition-colors",
                  selected?.id === item.id
                    ? "bg-accent-quiet text-accent"
                    : "text-muted-foreground hover:bg-surface-2 hover:text-foreground",
                )}
              >
                <span className="block text-sm font-medium">{item.skill}</span>
                <span className="mt-0.5 block text-[0.6875rem] text-faint">{item.group}</span>
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="px-3 py-4 text-sm leading-relaxed text-faint">{content.noResults}</p>
            )}
          </div>
        </Panel>

        {selected && (
          <Panel className="trace-panel p-5 sm:p-7">
            <Badge variant="accent">{selected.group}</Badge>
            <h3 className="mt-4 text-2xl font-semibold tracking-tight">{selected.skill}</h3>

            <div className="mt-7 grid gap-6 sm:grid-cols-2">
              <EvidenceGroup title={content.experience}>
                {selected.experience.map((item) => (
                  <li key={`${item.title}-${item.subtitle}`}>
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{item.subtitle}</p>
                  </li>
                ))}
              </EvidenceGroup>

              <EvidenceGroup title={content.caseStudies} empty={content.none}>
                {selected.caseStudies.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="link inline-flex items-start gap-2 text-sm">
                      {item.title} <ArrowUpRight className="mt-0.5 size-3.5 shrink-0 text-faint" />
                    </Link>
                  </li>
                ))}
              </EvidenceGroup>

              <EvidenceGroup title={content.roles}>
                {selected.roles.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="link text-sm">{item.title}</Link>
                  </li>
                ))}
              </EvidenceGroup>

              <EvidenceGroup title={content.credentials}>
                {selected.credentials.map((item) => (
                  <li key={`${item.title}-${item.subtitle}`}>
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{item.subtitle}</p>
                  </li>
                ))}
              </EvidenceGroup>
            </div>
          </Panel>
        )}
      </div>
    </div>
  );
}

function EvidenceGroup({
  title,
  empty,
  children,
}: {
  title: string;
  empty?: string;
  children: ReactNode;
}) {
  const isEmpty = Array.isArray(children) && children.length === 0;
  return (
    <section>
      <h4 className="label">{title}</h4>
      {isEmpty ? (
        <p className="mt-3 text-sm leading-relaxed text-faint">{empty ?? content.none}</p>
      ) : (
        <ul className="mt-3 space-y-3">{children}</ul>
      )}
    </section>
  );
}
