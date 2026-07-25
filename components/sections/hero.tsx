import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { site, facts } from "@/lib/site";

export function Hero() {
  return (
    <section className="shell pt-28 md:pt-36">
      {/* Meta line — the two facts a Canadian recruiter is looking for. */}
      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-2 border-b border-rule pb-4">
        <p className="label">
          {site.location} <span className="mx-1.5 text-rule-strong">/</span>{" "}
          {site.relocation.to}
        </p>
        <p className="label flex items-center gap-2">
          <span className="inline-block size-1.5 rounded-full bg-accent" />
          {site.availability}
        </p>
      </div>

      {/* Name, set as large as it can reasonably go. */}
      <h1 className="mt-10 text-display font-medium md:mt-14">
        <span className="block">Gershon</span>
        <span className="block">Otinkorang</span>
      </h1>

      <div className="mt-10 grid gap-x-12 gap-y-10 border-t border-rule pt-8 md:mt-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="label">Role</p>
          <p className="mt-3 text-lede font-medium tracking-tight">{site.role}</p>
        </div>

        <div className="md:col-span-7">
          <p className="label">Summary</p>
          <p className="mt-3 max-w-2xl text-lede text-muted-foreground">
            {site.headline}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href={site.resumeUrl}
              className="group inline-flex items-center gap-2.5 bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80"
            >
              Download CV
              <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" />
            </a>
            <a
              href={`mailto:${site.email}`}
              className="link inline-flex items-center gap-1.5 text-sm font-medium"
            >
              {site.email}
              <ArrowUpRight className="size-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Portrait + facts, sharing one baseline grid. */}
      <div className="mt-14 grid gap-8 border-t border-rule pt-8 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-4 lg:col-span-3">
          <Image
            src="/gershon.webp"
            alt={`Portrait of ${site.name}`}
            width={840}
            height={624}
            priority
            sizes="(max-width: 768px) 100vw, 320px"
            className="w-full object-cover grayscale"
          />
        </div>

        <dl className="grid grid-cols-2 gap-x-8 gap-y-8 self-end md:col-span-8 md:grid-cols-4 lg:col-span-9">
          {facts.map((f) => (
            <div key={f.label} className="border-t border-rule pt-3">
              <dt className="label">{f.label}</dt>
              <dd className="mt-2 text-lg font-medium tracking-tight">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
