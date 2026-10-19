"use client";

import { useState } from "react";
import { ChevronDown, Cloud, LifeBuoy, Map, Network, Server, ShieldCheck, Store } from "lucide-react";
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
  { ssr: false, loading: () => <div className="mt-7 h-[24rem] sm:h-[22rem]" aria-hidden /> },
);

import { cn } from "@/lib/utils";
import { useI18n } from "@/components/locale-provider";
import { getSkillGroups } from "@/lib/localised-content";
import { skillGroups as sourceSkillGroups } from "@/lib/site";
import { useRoleFocus } from "@/components/role-focus-provider";
import { getRoleFocus, isTopMatch, prioritizeByKeys } from "@/lib/role-focus";

// One icon per capability group, in the same order as `skillGroups` in
// lib/content/skills.ts: IT support, Retail & field, Networking, Security, Servers,
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

// Every pair in the pattern fills a 12-column row, so an odd card out at the
// end would sit beside a hole. Give it the whole row instead.
const spanFor = (index: number, count: number) =>
  index === count - 1 && index % 2 === 0
    ? "lg:col-span-12"
    : SPAN_PATTERN[index % SPAN_PATTERN.length];

export function Skills() {
  const { t, locale } = useI18n();
  const skillGroups = getSkillGroups(locale);
  const focusProfile = getRoleFocus(useRoleFocus());
  // Phones only: which cards have their skill list open. Desktop always
  // shows every list; the toggle is hidden there.
  const [openGroups, setOpenGroups] = useState<ReadonlySet<string>>(new Set());
  const toggleGroup = (title: string) =>
    setOpenGroups((current) => {
      const next = new Set(current);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });
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
          const open = openGroups.has(group.title);
          const listId = `skills-${sourceIndex}`;
          return (
            <Reveal key={group.title} delay={0.04 * i} className={cn(spanFor(i, orderedGroups.length))}>
              <Panel
                reactive
                className={cn("trace-panel group h-full p-5", matched && "focus-match")}
              >
                {matched && (
                  <div className="mb-3">
                    <Badge variant="accent">{t.ui.focusMatch}</Badge>
                  </div>
                )}
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

                {/* Collapsed on phones until asked for; the list stays in the
                    page either way, so search and find-in-page still see it. */}
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={listId}
                  onClick={() => toggleGroup(group.title)}
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent sm:hidden"
                >
                  {open ? t.ui.hideSkills : t.ui.showSkills(group.skills.length)}
                  <ChevronDown
                    aria-hidden
                    className={cn("size-4 transition-transform duration-300", open && "rotate-180")}
                  />
                </button>
                <ul
                  id={listId}
                  className={cn("skill-list mt-4 flex-wrap gap-1.5 sm:flex", open ? "flex" : "hidden")}
                >
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="skill-chip rounded-md border border-border bg-surface-2 px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-accent/40 hover:text-foreground"
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

      {/* Ties the Security group above to the work that backs it up. */}
      <Reveal delay={0.05}>
        <Panel className="trace-panel mt-3 p-5 sm:p-7">
          <p className="label flex items-center gap-2">
            <ShieldCheck aria-hidden className="size-3 text-accent" /> {t.ui.securityLabel}
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            {t.ui.securityStatement}
          </p>
        </Panel>
      </Reveal>

      {/* The topology evidences the network administration group above it —
          a worked example rather than a decorative header graphic. */}
      <Reveal delay={0.05}>
        <Panel className="trace-panel mt-3 p-5 sm:p-7">
          <p className="label">{t.hero.topologyMode}</p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            {t.ui.topologyCaption}
          </p>
          <NetworkTopology className="mt-7 h-[24rem] sm:h-[22rem]" />
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
