import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { SectionHeading } from "@/components/fx/section-heading";
import { Reveal } from "@/components/fx/reveal";
import { Panel } from "@/components/ui/panel";
import { Badge } from "@/components/ui/badge";
import { caseStudies } from "@/lib/case-studies";

export function CaseStudies() {
  return (
    <section id="work" className="shell scroll-mt-24 py-16 md:py-20">
      <SectionHeading
        index="02 — Case studies"
        title="How the work actually went"
        description="Longer write-ups of problems worth explaining, rather than screenshots that age badly."
      />

      <div className="mt-10 grid gap-3">
        {caseStudies.map((study, i) => (
          <Reveal key={study.slug} delay={0.04 * i}>
            <Link href={`/work/${study.slug}`} className="block">
              <Panel interactive reactive className="group p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <p className="label">{study.period}</p>
                  <p className="label flex items-center gap-1.5">
                    <Clock className="size-3" />
                    {study.readingMinutes} min
                  </p>
                  {study.draft && <Badge variant="accent">Draft</Badge>}
                </div>

                <div className="mt-3 flex items-start justify-between gap-6">
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold tracking-tight sm:text-xl">
                      {study.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                      {study.summary}
                    </p>
                  </div>
                  <ArrowUpRight className="mt-1 size-4 shrink-0 text-faint transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {study.tags.slice(0, 5).map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
              </Panel>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
