import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/fx/section-heading";
import { Reveal } from "@/components/fx/reveal";
import { credentials } from "@/lib/site";

function year(iso: string) {
  return iso.slice(0, 4);
}

export function Credentials() {
  const sorted = [...credentials].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <section id="credentials" className="shell scroll-mt-20 py-24 md:py-36">
      <SectionHeading
        index="03"
        title="Credentials"
        description="Each item is independently verifiable — links go to the issuing body, not to a screenshot."
      />

      <Reveal delay={0.05}>
        <ol className="mt-16 border-b border-rule">
          {sorted.map((c) => (
            <li
              key={`${c.title}-${c.date}`}
              className="row-sweep grid grid-cols-12 items-start gap-x-6 gap-y-2 border-t border-rule py-7 md:gap-x-12"
            >
              <span className="label col-span-3 pt-1.5 md:col-span-2">
                {c.upcoming ? `${year(c.date)} →` : year(c.date)}
              </span>

              <div className="col-span-9 md:col-span-6">
                <h3 className="text-lg font-medium tracking-tight">{c.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.issuer}</p>
                {c.detail && (
                  <p className="mt-1.5 text-sm text-muted-foreground">{c.detail}</p>
                )}
              </div>

              <div className="col-span-12 flex items-baseline gap-6 md:col-span-4 md:justify-end">
                {c.expires && (
                  <span className="label">
                    {new Date(c.expires) < new Date() ? "Expired" : "Valid to"}{" "}
                    {year(c.expires)}
                  </span>
                )}
                {c.upcoming && <span className="label text-accent">In progress</span>}
                {c.verifyUrl && (
                  <a
                    href={c.verifyUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="link link-out inline-flex items-center gap-1 text-sm"
                  >
                    Verify
                    <ArrowUpRight className="size-3" />
                  </a>
                )}
              </div>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
