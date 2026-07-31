import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Clock, Github } from "lucide-react";
import { caseStudies } from "@/lib/case-studies";
import { getCaseStudy } from "@/lib/localised-content";
import { getDictionary } from "@/lib/i18n";
import { Badge } from "@/components/ui/badge";
import { Panel } from "@/components/ui/panel";
import { Counter } from "@/components/fx/counter";
import { serialiseJsonLd } from "@/lib/json-ld";
import { site } from "@/lib/site";

const t = getDictionary("fr");

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy("fr", slug);
  if (!study) return {};

  const base = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;
  return {
    title: study.title,
    description: study.summary,
    alternates: {
      canonical: `/fr/work/${study.slug}`,
      languages: {
        "en-CA": `${base}/work/${study.slug}`,
        "fr-CA": `${base}/fr/work/${study.slug}`,
      },
    },
    // A draft's visible text contains TODO placeholders. Indexing that would
    // put "TODO: your actual VLAN numbering" into search results under his
    // name. Published studies index normally.
    robots: study.draft
      ? { index: false, follow: true }
      : { index: true, follow: true },
    twitter: {
      card: "summary_large_image",
      title: study.title,
      description: study.summary,
    },
    openGraph: {
      type: "article",
      title: study.title,
      description: study.summary,
      locale: "fr_CA",
    },
  };
}

export default async function FrenchCaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy("fr", slug);
  if (!study) notFound();

  const base = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${base}/fr/work/${study.slug}`,
    headline: study.title,
    description: study.summary,
    datePublished: study.published,
    inLanguage: "fr-CA",
    author: { "@type": "Person", name: site.name },
    keywords: study.tags.join(", "),
    ...(study.repo ? { codeRepository: study.repo } : {}),
  };

  return (
    <article className="shell pb-24 pt-28 md:pt-32">
      <Link href="/fr#work" className="link inline-flex items-center gap-2 text-sm text-muted-foreground">
        <ArrowLeft className="size-3.5" />
        {t.common.allCaseStudies}
      </Link>

      <header className="mt-8 max-w-3xl" data-reveal-intro>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="label">{study.period}</p>
          <p className="label flex items-center gap-1.5">
            <Clock className="size-3" />
            {study.readingMinutes} {t.common.minRead}
          </p>
          {study.draft && <Badge variant="accent">{t.common.draft}</Badge>}
        </div>

        <h1 className="mt-5 text-jumbo font-semibold">{study.title}</h1>
        <p className="measure mt-5 text-lede text-muted-foreground">{study.summary}</p>
        <p className="mt-6 text-sm text-muted-foreground">
          {study.role} · {study.context}
        </p>

        {/* Most case studies are claims. When the work is public, say so and
            link it — a reader who can check does not have to take my word. */}
        {study.repo && (
          <a
            href={study.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-5 inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm transition-colors hover:border-border-strong hover:bg-surface-1"
          >
            <Github className="size-3.5 shrink-0 text-faint" />
            {t.common.viewSource}
            <ArrowUpRight className="size-3.5 shrink-0 text-faint transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        )}
      </header>

      {study.outcomes.length > 0 && (
        <dl className="mt-10 grid max-w-3xl gap-3 sm:grid-cols-3">
          {study.outcomes.map((o) => (
            <Panel key={o.label} className="p-5">
              <dd className="text-xl font-semibold tracking-tight">
                <Counter value={o.value} animate />
              </dd>
              <dt className="mt-1.5 text-xs leading-snug text-muted-foreground">{o.label}</dt>
            </Panel>
          ))}
        </dl>
      )}

      <div className="mt-14 max-w-2xl">
        {study.sections.map((section) => (
          <section key={section.heading} className="mb-12">
            <h2 className="text-xl font-semibold tracking-tight">{section.heading}</h2>
            {section.body.map((para) => (
              <p key={para.slice(0, 40)} className="measure mt-4 text-base leading-relaxed text-muted-foreground">
                {para}
              </p>
            ))}
          </section>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5 border-t border-border pt-8">
        {study.tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: serialiseJsonLd(jsonLd) }}
      />
    </article>
  );
}
