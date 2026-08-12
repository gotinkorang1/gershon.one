"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { portfolioFeatures } from "@/lib/site";
import type { ActivityItem } from "@/lib/portfolio-features";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const content = portfolioFeatures.lab.activity;
type Filter = "all" | ActivityItem["type"];

function formatDate(value: string) {
  return new Date(`${value.slice(0, 10)}T12:00:00Z`).toLocaleDateString("en-CA", {
    month: "short",
    year: "numeric",
  });
}

export function ActivityTimeline({ items }: { items: ActivityItem[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const visible = filter === "all" ? items : items.filter((item) => item.type === filter);
  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: content.filters.all },
    { id: "writing", label: content.filters.writing },
    { id: "caseStudy", label: content.filters.caseStudy },
    { id: "credential", label: content.filters.credential },
  ];

  return (
    <div>
      <div className="max-w-2xl">
        <h2 className="text-2xl font-semibold tracking-tight">{content.title}</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">{content.lede}</p>
      </div>

      <div className="mt-7 flex flex-wrap gap-2">
        {filters.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setFilter(item.id)}
            aria-pressed={filter === item.id}
            className={cn(
              "tap min-h-10 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
              filter === item.id
                ? "border-accent/50 bg-accent-quiet text-accent"
                : "border-border text-muted-foreground hover:text-foreground",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      <ol className="relative mt-8 space-y-2 before:absolute before:bottom-4 before:left-[0.3125rem] before:top-4 before:w-px before:bg-border">
        {visible.slice(0, 18).map((item) => {
          const label =
            item.type === "writing"
              ? content.filters.writing
              : item.type === "caseStudy"
                ? content.filters.caseStudy
                : content.filters.credential;
          return (
            <li key={item.id} className="relative grid grid-cols-[0.7rem_minmax(0,1fr)] gap-4">
              <span className="relative z-10 mt-6 size-2.5 rounded-full border-2 border-surface-0 bg-accent" />
              <article className="rounded-xl border border-border bg-surface-1 p-4 sm:p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>{label}</Badge>
                  <time className="label">{formatDate(item.date)}</time>
                </div>
                <h3 className="mt-3 font-semibold tracking-tight">
                  {item.href ? (
                    <Link
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noreferrer noopener" : undefined}
                      className="group inline-flex items-start gap-2"
                    >
                      {item.title}
                      <ArrowUpRight className="mt-0.5 size-3.5 shrink-0 text-faint transition-colors group-hover:text-accent" />
                    </Link>
                  ) : (
                    item.title
                  )}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </article>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
