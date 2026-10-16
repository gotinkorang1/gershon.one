import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Clock } from "lucide-react";
import { Github } from "@/components/ui/brand-icons";
import { caseStudies } from "@/lib/case-studies";
import { getCaseStudy } from "@/lib/localised-content";
import { getDictionary } from "@/lib/i18n";
import { Badge } from "@/components/ui/badge";
import { Panel } from "@/components/ui/panel";
import { Counter } from "@/components/fx/counter";
import { CaseTitleMorph } from "@/components/fx/case-title-morph";
import { CaseStudyToc } from "@/components/case-study-toc";
import { slugify } from "@/lib/utils";
import { serialiseJsonLd } from "@/lib/json-ld";
import { site } from "@/lib/site";
import { defaultOgImage } from "@/lib/seo";

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
    description: study.metaDescription,
    alternates: {
      canonical: `/fr/work/${study.slug}`,
      languages: {
        "en-CA": `${base}/work/${study.slug}`,
        "fr-CA": `${base}/fr/work/${study.slug}`,
        // Default to the English version, matching the EN page and the sitemap,
        // so the whole hreflang cluster is symmetric.
        "x-default": `${base}/work/${study.slug}`,
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
      description: study.metaDescription,
    },
    openGraph: {
      type: "article",
      title: study.title,
      description: study.metaDescription,
      locale: "fr_CA",
      // Setting openGraph replaces the layout's wholesale, image included.
      images: [defaultOgImage],
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
    description: study.metaDescription,
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

        <CaseTitleMorph slug={study.slug}>
          <h1 className="mt-5 text-jumbo font-semibold">{study.title}</h1>
        </CaseTitleMorph>
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
            <Panel key={o.label} className="flex flex-col p-5">
              <dt className="order-2 mt-1.5 text-xs leading-snug text-muted-foreground">
                {o.label}
              </dt>
              <dd className="order-1 text-xl font-semibold tracking-tight">
                <Counter value={o.value} animate />
              </dd>
            </Panel>
          ))}
        </dl>
      )}

      {/* Article plus an "On this page" rail in the otherwise empty column. */}
      <div className="mt-14 lg:grid lg:grid-cols-[minmax(0,42rem)_minmax(0,1fr)] lg:gap-16">
        <div>
          {study.sections.map((section) => (
            <section
              key={section.heading}
              id={slugify(section.heading)}
              className="mb-12 scroll-mt-28"
            >
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
        {study.sections.length > 2 && (
          <aside className="hidden lg:block">
            <CaseStudyToc
              label={t.common.onThisPage}
              items={study.sections.map((section) => ({
                id: slugify(section.heading),
                heading: section.heading,
              }))}
            />
          </aside>
        )}
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
