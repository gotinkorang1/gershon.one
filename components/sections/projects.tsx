"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, ExternalLink, Github } from "lucide-react";
import { SectionHeading } from "@/components/fx/section-heading";
import { Reveal } from "@/components/fx/reveal";
import { GlowCard } from "@/components/fx/glow-card";
import { Badge } from "@/components/ui/badge";
import { projects, type Project } from "@/lib/site";
import { cn } from "@/lib/utils";

function CaseStudy({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);

  return (
    <GlowCard as="article" className="overflow-hidden">
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b opacity-70",
          project.accent,
        )}
      />

      <div className="relative p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {project.year}
            </p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight">{project.name}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{project.tagline}</p>
          </div>

          <div className="flex gap-2">
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`Open ${project.name} live site`}
                className="grid size-9 place-items-center rounded-full border border-border/70 bg-card/60 text-muted-foreground transition hover:text-foreground"
              >
                <ExternalLink className="size-4" />
              </a>
            )}
            {project.links.repo && (
              <a
                href={project.links.repo}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`Open ${project.name} repository`}
                className="grid size-9 place-items-center rounded-full border border-border/70 bg-card/60 text-muted-foreground transition hover:text-foreground"
              >
                <Github className="size-4" />
              </a>
            )}
          </div>
        </div>

        <dl className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {project.outcome.map((o) => (
            <div key={o.label} className="rounded-xl border border-border/60 bg-background/40 p-4">
              <dt className="sr-only">{o.label}</dt>
              <dd className="text-xl font-semibold tracking-tight">{o.metric}</dd>
              <p className="mt-1 text-xs leading-snug text-muted-foreground">{o.label}</p>
            </div>
          ))}
        </dl>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-opacity hover:opacity-80"
        >
          {open ? "Hide case study" : "Read the case study"}
          <ChevronDown
            className={cn("size-4 transition-transform duration-300", open && "rotate-180")}
          />
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="overflow-hidden"
            >
              <div className="space-y-6 pt-7">
                {(
                  [
                    ["Problem", project.problem],
                    ["Solution", project.solution],
                    ["Architecture", project.architecture],
                  ] as const
                ).map(([label, body]) => (
                  <div key={label} className="grid gap-2 sm:grid-cols-[130px_1fr] sm:gap-6">
                    <p className="font-mono text-xs uppercase tracking-widest text-accent">
                      {label}
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-7 flex flex-wrap gap-2 border-t border-border/60 pt-6">
          {project.stack.map((s) => (
            <Badge key={s}>{s}</Badge>
          ))}
        </div>
      </div>
    </GlowCard>
  );
}

export function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="work" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          eyebrow="Selected work"
          title="Problems, and what I did about them."
          description="Screenshots age badly. These are written as short case studies instead — the constraint, the decision, and what changed as a result."
        />

        <div className="mt-14 space-y-5">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={0.05 * i}>
              <CaseStudy project={p} />
            </Reveal>
          ))}
        </div>

        {rest.length > 0 && (
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={0.05 * i}>
                <CaseStudy project={p} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
