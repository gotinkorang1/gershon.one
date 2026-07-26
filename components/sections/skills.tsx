"use client";

import { Cloud, Code2, Network, Server, Users } from "lucide-react";
import { SectionHeading } from "@/components/fx/section-heading";
import { Reveal } from "@/components/fx/reveal";
import { Panel } from "@/components/ui/panel";
import { Terminal } from "@/components/terminal";
import { NetworkTopology } from "@/components/fx/network-topology";
import { GitHubActivity } from "@/components/github-activity";

import { cn } from "@/lib/utils";
import { useI18n } from "@/components/locale-provider";
import { getSkillGroups } from "@/lib/localised-content";

const ICONS = [Network, Server, Cloud, Code2, Users];

// Deliberately uneven so the grid reads as composed rather than tiled.
const SPANS = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-4",
  "lg:col-span-8",
  "lg:col-span-12",
];

export function Skills() {
  const { t, locale } = useI18n();
  const skillGroups = getSkillGroups(locale);

  return (
    <section id="capabilities" className="shell scroll-mt-24 py-14 md:py-16">
      <SectionHeading
        index="03 — Capabilities"
        title={t.sections.capabilitiesTitle}
        description={t.sections.capabilitiesLede}
      />

      <div className="mt-10 grid gap-3 lg:grid-cols-12">
        {skillGroups.map((group, i) => {
          const Icon = ICONS[i] ?? Network;
          return (
            <Reveal key={group.title} delay={0.04 * i} className={cn(SPANS[i])}>
              <Panel interactive reactive className="h-full p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">{group.title}</h3>
                    <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">
                      {group.blurb}
                    </p>
                  </div>
                  <span className="panel-inset grid size-9 shrink-0 place-items-center rounded-lg">
                    <Icon className="size-4 text-accent" />
                  </span>
                </div>

                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-md border border-border bg-surface-2 px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
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
        <Panel className="mt-3 p-5 sm:p-7">
          <p className="label">{t.hero.topologyMode}</p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            {t.ui.topologyCaption}
          </p>
          <NetworkTopology className="mt-7 h-[18rem] sm:h-[20rem]" />
        </Panel>
      </Reveal>

      {/* Terminal and GitHub sit here because they evidence the claims above. */}
      <div className="mt-3 grid gap-3 lg:grid-cols-12">
        <Reveal delay={0.05} className="lg:col-span-7">
          <Terminal className="h-[17rem]" />
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-5">
          <GitHubActivity />
        </Reveal>
      </div>
    </section>
  );
}
