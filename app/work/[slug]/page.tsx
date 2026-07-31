import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Clock, Github } from "lucide-react";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";
import { Badge } from "@/components/ui/badge";
import { Panel } from "@/components/ui/panel";
import { Counter } from "@/components/fx/counter";
import { site } from "@/lib/site";
import { serialiseJsonLd } from "@/lib/json-ld";
import { getDictionary } from "@/lib/i18n";

const t = getDictionary("en");

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};

  return {
    title: study.title,
    description: study.summary,
    // Both language versions must reference each other, or Google discards the
    // hreflang annotations entirely. The French page already points back here;
    // without this block that return link was one-directional and ignored.
    alternates: {
      canonical: `/work/${study.slug}`,
      languages: {
        "en-CA": `/work/${study.slug}`,
        "fr-CA": `/fr/work/${study.slug}`,
        "x-default": `/work/${study.slug}`,
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
      publishedTime: study.published,
      authors: [site.name],
      tags: [...study.tags],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const base = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: base },
      { "@type": "ListItem", position: 2, name: "Case studies", item: `${base}/#work` },
      { "@type": "ListItem", position: 3, name: study.title, item: `${base}/work/${study.slug}` },
    ],
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${base}/work/${study.slug}`,
    url: `${base}/work/${study.slug}`,
    inLanguage: "en-CA",
    wordCount: study.sections.reduce(
      (n, sec) => n + sec.body.join(" ").split(/\s+/).length,
      0,
    ),
    headline: study.title,
    description: study.summary,
    datePublished: study.published,
    author: { "@type": "Person", name: site.name },
    keywords: study.tags.join(", "),
    ...(study.repo ? { codeRepository: study.repo } : {}),
  };

  return (
    <article className="shell pb-24 pt-28 md:pt-32">
      <Link
        href="/#work"
        className="link inline-flex items-center gap-2 text-sm text-muted-foreground"
      >
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
              <dt className="mt-1.5 text-xs leading-snug text-muted-foreground">
                {o.label}
              </dt>
            </Panel>
          ))}
        </dl>
      )}

      <div className="mt-14 max-w-2xl">
        {study.sections.map((section) => (
          <section key={section.heading} className="mb-12">
            <h2 className="text-xl font-semibold tracking-tight">{section.heading}</h2>
            {section.body.map((para) => (
              <p
                key={para.slice(0, 40)}
                className="measure mt-4 text-base leading-relaxed text-muted-foreground"
              >
                {para}
              </p>
            ))}
          </section>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5 border-t border-border pt-8">
        {study.tags.map((t) => (
          <Badge key={t}>{t}</Badge>
        ))}
      </div>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: serialiseJsonLd(jsonLd) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: serialiseJsonLd(breadcrumbs) }}
      />
    </article>
  );
}
