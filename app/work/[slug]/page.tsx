import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";
import { Badge } from "@/components/ui/badge";
import { Panel } from "@/components/ui/panel";
import { site } from "@/lib/site";

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
    alternates: { canonical: `/work/${study.slug}` },
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: study.title,
    description: study.summary,
    datePublished: study.published,
    author: { "@type": "Person", name: site.name },
    keywords: study.tags.join(", "),
  };

  return (
    <article className="shell pb-24 pt-28 md:pt-32">
      <Link
        href="/#work"
        className="link inline-flex items-center gap-2 text-sm text-muted-foreground"
      >
        <ArrowLeft className="size-3.5" />
        All case studies
      </Link>

      <header className="mt-8 max-w-3xl">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="label">{study.period}</p>
          <p className="label flex items-center gap-1.5">
            <Clock className="size-3" />
            {study.readingMinutes} min read
          </p>
          {study.draft && <Badge variant="accent">Draft</Badge>}
        </div>

        <h1 className="mt-5 text-jumbo font-semibold">{study.title}</h1>
        <p className="mt-5 text-lede text-muted-foreground">{study.summary}</p>

        <p className="mt-6 text-sm text-muted-foreground">
          {study.role} · {study.context}
        </p>
      </header>

      {study.outcomes.length > 0 && (
        <dl className="mt-10 grid max-w-3xl gap-3 sm:grid-cols-3">
          {study.outcomes.map((o) => (
            <Panel key={o.label} className="p-5">
              <dd className="text-xl font-semibold tracking-tight">{o.value}</dd>
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
                className="mt-4 text-base leading-relaxed text-muted-foreground"
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </article>
  );
}
