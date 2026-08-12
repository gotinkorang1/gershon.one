"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Github } from "@/components/ui/brand-icons";
import { Panel } from "@/components/ui/panel";
import { Tooltip } from "@/components/ui/tooltip";
import { site } from "@/lib/site";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useI18n } from "@/components/locale-provider";

type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };
type Event = { id: string; type: string; repo: string; at: string };
type Payload = {
  configured: boolean;
  total?: number;
  days?: Day[];
  events?: Event[];
  hasGraph?: boolean;
};

const LEVEL_CLASS = [
  "bg-surface-inset",
  "bg-accent/25",
  "bg-accent/45",
  "bg-accent/70",
  "bg-accent",
];

function relative(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86_400_000);
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days}d ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

export function GitHubActivity() {
  const { t } = useI18n();
  const [data, setData] = useState<Payload | null>(null);

  useEffect(() => {
    fetch("/api/github")
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData({ configured: false }));
  }, []);

  // Nothing configured — render the link rather than an empty box.
  if (data && !data.configured) {
    return (
      <Panel className="flex flex-wrap items-center justify-between gap-4 p-5">
        <div>
          <h3 className="flex items-center gap-2.5 text-sm font-medium">
            <Github className="size-4" />
            {t.ui.githubActivity}
          </h3>
          <p className="mt-1.5 text-sm text-muted-foreground">{t.ui.githubFallback}</p>
        </div>
        <a
          href={site.socials.github}
          target="_blank"
          rel="noreferrer noopener"
          className="link inline-flex items-center gap-1 text-sm font-medium"
        >
          {t.ui.visit} <ArrowUpRight className="size-3.5" />
        </a>
      </Panel>
    );
  }

  const weeks: Day[][] = [];
  if (data?.days) {
    for (let i = 0; i < data.days.length; i += 7) {
      weeks.push(data.days.slice(i, i + 7));
    }
  }

  return (
    <Panel reactive className="p-5 sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="flex items-center gap-2 text-sm font-medium">
          <Github className="size-4" />
          {t.ui.githubActivity}
        </h3>
        {data?.total ? (
          <p className="label">{data.total} contributions this year</p>
        ) : (
          <p className="label">{t.ui.recentEvents}</p>
        )}
      </div>

      {data?.hasGraph && (
        <div className="mt-5 overflow-x-auto pb-1">
          <div className="flex gap-[3px]">
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.map((day) => (
                  <Tooltip
                    key={day.date}
                    content={`${day.count} on ${new Date(day.date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}`}
                  >
                    <span
                      className={cn(
                        "size-[9px] rounded-[2px] transition-transform sm:size-[10px] sm:hover:scale-125",
                        LEVEL_CLASS[day.level],
                      )}
                    />
                  </Tooltip>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {data?.events && data.events.length > 0 && (
        <ul className="mt-5 space-y-2 border-t border-border pt-4">
          {data.events.slice(0, 4).map((e) => (
            <li key={e.id} className="flex items-baseline justify-between gap-4 text-sm">
              <span className="truncate text-muted-foreground">
                <span className="text-foreground">{e.type}</span> · {e.repo}
              </span>
              <span className="label shrink-0 text-[0.625rem]">{relative(e.at)}</span>
            </li>
          ))}
        </ul>
      )}

      {!data && (
        <div className="mt-5 space-y-3">
          <div className="flex gap-[3px]">
            {Array.from({ length: 26 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-[3px]">
                {Array.from({ length: 7 }).map((_, j) => (
                  <Skeleton
                    key={j}
                    className="size-[9px] rounded-[2px] sm:size-[10px]"
                    // Staggered so it reads as loading rather than as a frozen grid.
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="space-y-2 border-t border-border pt-4">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      )}
    </Panel>
  );
}
