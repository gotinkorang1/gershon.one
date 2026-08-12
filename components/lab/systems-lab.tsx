"use client";

import { useState, type KeyboardEvent } from "react";
import { Activity, Boxes, Network, Wrench } from "lucide-react";
import { portfolioFeatures } from "@/lib/site";
import type { ActivityItem, EvidenceItem } from "@/lib/portfolio-features";
import { TroubleshootingLab } from "@/components/lab/troubleshooting-lab";
import { EvidenceMap } from "@/components/lab/evidence-map";
import { ArchitectureExplorer } from "@/components/lab/architecture-explorer";
import { ActivityTimeline } from "@/components/lab/activity-timeline";
import { cn } from "@/lib/utils";
import { GitHubActivity } from "@/components/github-activity";
import { captureAnalyticsEvent } from "@/lib/analytics";

type Tab = keyof typeof portfolioFeatures.lab.tabs;
const tabs = [
  { id: "troubleshoot" as const, icon: Wrench },
  { id: "evidence" as const, icon: Network },
  { id: "architecture" as const, icon: Boxes },
  { id: "activity" as const, icon: Activity },
];

export function SystemsLab({
  evidence,
  activity,
}: {
  evidence: EvidenceItem[];
  activity: ActivityItem[];
}) {
  const [tab, setTab] = useState<Tab>("troubleshoot");

  function selectTab(next: Tab) {
    setTab(next);
    captureAnalyticsEvent("systems lab opened", { tab: next });
  }

  function moveTab(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number | undefined;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = tabs.length - 1;
    if (nextIndex === undefined) return;

    event.preventDefault();
    const next = tabs[nextIndex].id;
    selectTab(next);
    document.getElementById(`lab-tab-${next}`)?.focus();
  }

  return (
    <>
      <div className="sticky top-[4.75rem] z-30 -mx-5 border-y border-border bg-surface-0/90 px-5 py-3 backdrop-blur-xl md:-mx-10 md:px-10">
        <div role="tablist" aria-label={portfolioFeatures.lab.title} className="focus-strip flex gap-2 overflow-x-auto">
          {tabs.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={tab === item.id}
                aria-controls={`lab-panel-${item.id}`}
                id={`lab-tab-${item.id}`}
                tabIndex={tab === item.id ? 0 : -1}
                onClick={() => selectTab(item.id)}
                onKeyDown={(event) => moveTab(event, index)}
                className={cn(
                  "tap inline-flex min-h-10 shrink-0 items-center gap-2 rounded-lg border px-3.5 text-sm transition-colors",
                  tab === item.id
                    ? "border-accent/50 bg-accent-quiet text-accent"
                    : "border-border bg-surface-1 text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className="size-4" aria-hidden />
                {portfolioFeatures.lab.tabs[item.id]}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-10">
        <section id="lab-panel-troubleshoot" role="tabpanel" aria-labelledby="lab-tab-troubleshoot" hidden={tab !== "troubleshoot"}>
          <TroubleshootingLab />
        </section>
        <section id="lab-panel-evidence" role="tabpanel" aria-labelledby="lab-tab-evidence" hidden={tab !== "evidence"}>
          <EvidenceMap items={evidence} />
        </section>
        <section id="lab-panel-architecture" role="tabpanel" aria-labelledby="lab-tab-architecture" hidden={tab !== "architecture"}>
          <ArchitectureExplorer />
        </section>
        <section id="lab-panel-activity" role="tabpanel" aria-labelledby="lab-tab-activity" hidden={tab !== "activity"}>
          <ActivityTimeline items={activity} />
          <div className="mt-6">
            <GitHubActivity />
          </div>
        </section>
      </div>
    </>
  );
}
