import { Cloud, Code2, Network, Server, Users } from "lucide-react";
import { SectionHeading } from "@/components/fx/section-heading";
import { Reveal } from "@/components/fx/reveal";
import { Panel } from "@/components/ui/panel";
import { Terminal } from "@/components/terminal";
import { GitHubActivity } from "@/components/github-activity";
import { skillGroups } from "@/lib/site";
import { cn } from "@/lib/utils";

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
  return (
    <section id="capabilities" className="shell scroll-mt-24 py-16 md:py-20">
      <SectionHeading
        index="03 — Capabilities"
        title="What I actually reach for"
        description="Grouped by use, in rough order of how central each is to the current role."
      />

      <div className="mt-10 grid gap-3 lg:grid-cols-12">
        {skillGroups.map((group, i) => {
          const Icon = ICONS[i] ?? Network;
          return (
            <Reveal key={group.title} delay={0.04 * i} className={cn(SPANS[i])}>
              <Panel interactive reactive className="h-full p-5 sm:p-6">
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

                <ul className="mt-5 flex flex-wrap gap-1.5">
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

      {/* Terminal and GitHub sit here because they evidence the claims above. */}
      <div className="mt-3 grid gap-3 lg:grid-cols-12">
        <Reveal delay={0.05} className="lg:col-span-7">
          <Terminal className="h-[19rem]" />
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-5">
          <GitHubActivity />
        </Reveal>
      </div>
    </section>
  );
}
