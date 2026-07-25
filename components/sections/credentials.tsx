import { ArrowUpRight, Award, GraduationCap } from "lucide-react";
import { SectionHeading } from "@/components/fx/section-heading";
import { Reveal } from "@/components/fx/reveal";
import { Panel } from "@/components/ui/panel";
import { Badge } from "@/components/ui/badge";
import { credentials } from "@/lib/site";

function monthYear(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { month: "short", year: "numeric" });
}

export function Credentials() {
  const sorted = [...credentials].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <section id="credentials" className="shell scroll-mt-24 py-20 md:py-28">
      <SectionHeading
        index="03 — Credentials"
        title="Education and certification"
        description="Every item is independently verifiable — links go to the issuing body, not a screenshot."
      />

      <div className="mt-12 grid gap-3 md:grid-cols-2">
        {sorted.map((c, i) => {
          const Icon = c.kind === "degree" ? GraduationCap : Award;
          const expired = c.expires ? new Date(c.expires) < new Date() : false;

          return (
            <Reveal key={`${c.title}-${c.date}`} delay={0.03 * i}>
              <Panel interactive reactive className="flex h-full gap-4 p-5">
                <span className="panel-inset grid size-10 shrink-0 place-items-center rounded-lg">
                  <Icon className="size-4 text-accent" />
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h3 className="font-medium leading-snug tracking-tight">{c.title}</h3>
                    {c.upcoming && <Badge variant="accent">Upcoming</Badge>}
                  </div>

                  <p className="mt-1 text-sm text-muted-foreground">{c.issuer}</p>
                  {c.detail && (
                    <p className="mt-1.5 text-xs leading-relaxed text-faint">{c.detail}</p>
                  )}

                  <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5">
                    <span className="label">{monthYear(c.date)}</span>
                    {c.expires && (
                      <span className="label">
                        {expired ? "Expired" : "Valid to"} {monthYear(c.expires)}
                      </span>
                    )}
                    {c.verifyUrl && (
                      <a
                        href={c.verifyUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="link ml-auto inline-flex items-center gap-1 text-xs font-medium text-accent"
                      >
                        Verify <ArrowUpRight className="size-3" />
                      </a>
                    )}
                  </div>
                </div>
              </Panel>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
