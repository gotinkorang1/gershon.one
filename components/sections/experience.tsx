import { SectionHeading } from "@/components/fx/section-heading";
import { Reveal } from "@/components/fx/reveal";
import { Badge } from "@/components/ui/badge";
import { experience } from "@/lib/site";
import { formatDate } from "@/lib/utils";

export function Experience() {
  return (
    <section id="experience" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="dot-bg pointer-events-none absolute inset-0 -z-10 opacity-50" />
      <div className="container-page">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've done the work."
          description="A short history of the systems I've been responsible for."
        />

        <ol className="mt-16 space-y-0">
          {experience.map((job, i) => (
            <Reveal key={`${job.company}-${job.start}`} delay={0.05 * i}>
              <li className="group relative grid gap-6 border-t border-border/70 py-10 md:grid-cols-[190px_1fr] md:gap-12">
                <div className="md:pt-1">
                  <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    {formatDate(`${job.start}-01`)} —{" "}
                    {job.end ? formatDate(`${job.end}-01`) : "Present"}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">{job.location}</p>
                </div>

                <div>
                  <h3 className="text-xl font-medium tracking-tight">
                    {job.role}
                    <span className="text-muted-foreground"> · {job.company}</span>
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    {job.summary}
                  </p>
                  <ul className="mt-5 space-y-2.5">
                    {job.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {job.stack.map((s) => (
                      <Badge key={s}>{s}</Badge>
                    ))}
                  </div>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
