import { Cloud, Code2, Network, Shield, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/fx/section-heading";
import { Reveal } from "@/components/fx/reveal";
import { GlowCard } from "@/components/fx/glow-card";
import { skillGroups, type SkillGroup } from "@/lib/site";
import { cn } from "@/lib/utils";

const icons = {
  cloud: Cloud,
  network: Network,
  shield: Shield,
  code: Code2,
  sparkles: Sparkles,
} satisfies Record<SkillGroup["icon"], typeof Cloud>;

const levelStyles = {
  core: "border-accent/40 bg-[var(--accent-soft)] text-accent",
  working: "border-border bg-muted/60 text-muted-foreground",
  learning: "border-dashed border-border bg-transparent text-muted-foreground",
} as const;

export function Skills() {
  return (
    <section id="skills" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          eyebrow="Capabilities"
          title="What I actually reach for."
          description="Grouped by domain rather than ranked by an arbitrary percentage. Solid outlines are what I use most; dashed ones are what I'm deliberately getting better at."
        />

        <div className="mt-14 grid auto-rows-fr gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => {
            const Icon = icons[group.icon];
            const wide = i === 0 || i === 3;
            return (
              <Reveal
                key={group.title}
                delay={0.05 * i}
                className={cn(wide && "lg:col-span-2")}
              >
                <GlowCard className="flex h-full flex-col p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-medium tracking-tight">{group.title}</h3>
                      <p className="mt-1.5 max-w-md text-sm text-muted-foreground">
                        {group.blurb}
                      </p>
                    </div>
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-border/70 bg-muted/50">
                      <Icon className="size-4 text-accent" />
                    </span>
                  </div>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <li key={skill.name}>
                        <span
                          className={cn(
                            "inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-medium transition-transform duration-200 hover:-translate-y-0.5",
                            levelStyles[skill.level ?? "working"],
                          )}
                        >
                          {skill.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </GlowCard>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <span className="size-2 rounded-full border border-accent/40 bg-[var(--accent-soft)]" />
              Core
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="size-2 rounded-full border border-border bg-muted" />
              Working knowledge
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="size-2 rounded-full border border-dashed border-border" />
              Actively learning
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
