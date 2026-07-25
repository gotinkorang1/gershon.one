import { Award, ExternalLink, GraduationCap } from "lucide-react";
import { SectionHeading } from "@/components/fx/section-heading";
import { Reveal } from "@/components/fx/reveal";
import { GlowCard } from "@/components/fx/glow-card";
import { credentials } from "@/lib/site";

function formatFull(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
  });
}

export function Credentials() {
  const sorted = [...credentials].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <section id="credentials" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="dot-bg pointer-events-none absolute inset-0 -z-10 opacity-50" />
      <div className="container-page">
        <SectionHeading
          eyebrow="Credentials"
          title="Verified education and certification."
          description="Every item below is independently verifiable — the links go to the issuing body, not to a screenshot."
        />

        <ol className="mt-14 grid gap-4 md:grid-cols-2">
          {sorted.map((c, i) => {
            const Icon = c.kind === "degree" ? GraduationCap : Award;
            const expired = c.expires ? new Date(c.expires) < new Date() : false;

            return (
              <Reveal key={`${c.title}-${c.date}`} delay={0.04 * i}>
                <GlowCard as="li" className="flex h-full gap-5 p-6">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-border/70 bg-muted/50">
                    <Icon className="size-5 text-accent" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium leading-snug tracking-tight">{c.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{c.issuer}</p>
                    {c.detail && (
                      <p className="mt-1.5 text-xs font-medium text-accent">{c.detail}</p>
                    )}

                    <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                      <span>{formatFull(c.date)}</span>
                      {c.expires && (
                        <span className={expired ? "text-muted-foreground/70" : ""}>
                          {expired ? "Expired" : "Valid to"} {formatFull(c.expires)}
                        </span>
                      )}
                    </div>

                    {c.verifyUrl && (
                      <a
                        href={c.verifyUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-accent transition-opacity hover:opacity-80"
                      >
                        Verify
                        <ExternalLink className="size-3" />
                      </a>
                    )}
                  </div>
                </GlowCard>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
