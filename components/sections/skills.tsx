"use client";

import { Cloud, LifeBuoy, Map, Network, Server, ShieldCheck, Store } from "lucide-react";
import { SectionHeading } from "@/components/fx/section-heading";
import { Reveal } from "@/components/fx/reveal";
import { Panel } from "@/components/ui/panel";
import dynamic from "next/dynamic";
import { GitHubActivity } from "@/components/github-activity";
import { Badge } from "@/components/ui/badge";

// The terminal and the topology are the two heaviest client components on the
// page and sit well below the fold. Loading them on demand keeps their JS out
// of the initial bundle and off the first-load main thread (Total Blocking
// Time). Both have fixed heights, so the placeholders reserve exact space and
// cause no layout shift.
const Terminal = dynamic(() => import("@/components/terminal").then((m) => m.Terminal), {
  ssr: false,
  loading: () => <div className="panel panel-raised h-[17rem]" aria-hidden />,
});
const NetworkTopology = dynamic(
  () => import("@/components/fx/network-topology").then((m) => m.NetworkTopology),
  { ssr: false, loading: () => <div className="mt-7 h-[18rem] sm:h-[20rem]" aria-hidden /> },
);

import { cn } from "@/lib/utils";
import { useI18n } from "@/components/locale-provider";
import { getSkillGroups } from "@/lib/localised-content";
import { skillGroups as sourceSkillGroups } from "@/lib/site";
import { useRoleFocus } from "@/components/role-focus-provider";
import { getRoleFocus, isTopMatch, prioritizeByKeys } from "@/lib/role-focus";

// One icon per capability group, in the same order as `skillGroups` in
// lib/site.ts: IT support, Retail & field, Networking, Security, Servers,
// Cloud & web, GIS & other. Kept here rather than in the data file so the
// content layer stays free of UI-library imports.
const ICONS = [LifeBuoy, Store, Network, ShieldCheck, Server, Cloud, Map];

/**
 * Deliberately uneven so the grid reads as composed rather than tiled. The
 * pattern repeats, so adding a skill group can never leave a card without a
 * span — the previous fixed-length array silently dropped the sixth group out
 * of the grid entirely, rendering it as an 86px vertical sliver.
 */
const SPAN_PATTERN = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-4",
  "lg:col-span-8",
  "lg:col-span-6",
  "lg:col-span-6",
] as const;

const spanFor = (index: number) => SPAN_PATTERN[index % SPAN_PATTERN.length];

export function Skills() {
  const { t, locale } = useI18n();
  const skillGroups = getSkillGroups(locale);
  const focusProfile = getRoleFocus(useRoleFocus());
  const orderedGroups = prioritizeByKeys(
    skillGroups.map((group, sourceIndex) => ({ group, sourceIndex })),
    focusProfile?.skillGroups,
    ({ sourceIndex }) => sourceSkillGroups[sourceIndex]?.title ?? "",
  );

  return (
    <section id="capabilities" className="section-band shell scroll-mt-24 py-14 md:py-16">
      <SectionHeading
        index={t.ui.eyebrowCapabilities}
        title={t.sections.capabilitiesTitle}
        description={t.sections.capabilitiesLede}
      />

      <div className="mt-10 grid gap-3 lg:grid-cols-12">
        {orderedGroups.map(({ group, sourceIndex }, i) => {
          const Icon = ICONS[sourceIndex] ?? Network;
          const sourceTitle = sourceSkillGroups[sourceIndex]?.title ?? group.title;
          const matched = isTopMatch(sourceTitle, focusProfile?.skillGroups);
          return (
            <Reveal key={group.title} delay={0.04 * i} className={cn(spanFor(i))}>
              <Panel
                reactive
                className={cn("trace-panel group h-full p-5", matched && "focus-match")}
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span aria-hidden className="trace-id">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {matched && <Badge variant="accent">{t.ui.focusMatch}</Badge>}
                </div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">{group.title}</h3>
                    <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">
                      {group.blurb}
                    </p>
                  </div>
                  <span className="panel-inset grid size-9 shrink-0 place-items-center rounded-lg transition-colors duration-300 group-hover:bg-accent-quiet">
                    <Icon aria-hidden className="size-4 text-accent" />
                  </span>
                </div>

                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="skill-chip rounded-[0.2rem_0.5rem_0.2rem_0.5rem] border border-border bg-surface-2 px-2.5 py-1 text-[0.6875rem] text-muted-foreground transition-colors hover:border-accent/40 hover:text-foreground"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </Panel>
            </Reveal>
          );
        })}
      </div>

      {/* The topology evidences the network administration group above it —
          a worked example rather than a decorative header graphic. */}
      <Reveal delay={0.05}>
        <Panel className="trace-panel mt-3 p-5 sm:p-7">
          <p className="label">{t.hero.topologyMode}</p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            {t.ui.topologyCaption}
          </p>
          <NetworkTopology className="mt-7 h-[18rem] sm:h-[20rem]" />
        </Panel>
      </Reveal>

      {/* Terminal and GitHub sit here because they evidence the claims above. */}
      <div className="mt-3 grid gap-3 lg:grid-cols-12">
        {/* min-w-0: without it a grid column's automatic minimum size is its
            content's intrinsic width. The GitHub contribution graph (~53 weeks
            wide) then forces the column past the viewport instead of scrolling
            inside its own overflow-x-auto — a mobile horizontal-scroll bug that
            only surfaces where the graph is configured (production, not local). */}
        <Reveal delay={0.05} className="min-w-0 lg:col-span-7">
          <Terminal className="h-[17rem]" />
        </Reveal>
        <Reveal delay={0.1} className="min-w-0 lg:col-span-5">
          <GitHubActivity />
        </Reveal>
      </div>
    </section>
  );
}
