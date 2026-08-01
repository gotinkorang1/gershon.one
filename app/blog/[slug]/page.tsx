import type { Metadata } from "next";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  getAllPosts,
  getPost,
  getHeadings,
  getRelatedPosts,
  slugify,
} from "@/lib/blog";
import { Badge } from "@/components/ui/badge";
import { Panel } from "@/components/ui/panel";
import { site } from "@/lib/site";
import { serialiseJsonLd } from "@/lib/json-ld";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { ShareBar } from "@/components/blog/share-bar";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: `/blog/${post.slug}` },
    robots: post.draft ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary,
      publishedTime: post.date,
      authors: [site.name],
      tags: post.tags,
      ...(post.cover ? { images: [post.cover] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      ...(post.cover ? { images: [post.cover] } : {}),
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Flatten a heading's React children to plain text, to derive its slug id. */
function nodeText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeText).join("");
  if (node && typeof node === "object" && "props" in node) {
    return nodeText((node as { props?: { children?: ReactNode } }).props?.children);
  }
  return "";
}

function Anchored({ as: Tag, children }: { as: "h2" | "h3"; children: ReactNode }) {
  const id = slugify(nodeText(children));
  return (
    <Tag id={id} className="group/anchor scroll-mt-28">
      {children}
      <a href={`#${id}`} aria-label="Link to this section" className="heading-anchor">
        #
      </a>
    </Tag>
  );
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const base = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;
  const url = `${base}/blog/${post.slug}`;
  const headings = getHeadings(post.content);
  const related = getRelatedPosts(post.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": url,
    url,
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    inLanguage: "en-CA",
    keywords: post.tags.join(", "),
    author: { "@type": "Person", name: site.name, url: base },
    publisher: { "@id": `${base}/#person` },
    mainEntityOfPage: url,
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: base },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${base}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return (
    <article className="shell pb-24 pt-28 md:pt-32">
      <Link
        href="/blog"
        className="link inline-flex items-center gap-2 text-sm text-muted-foreground"
      >
        <ArrowLeft className="size-3.5" />
        All posts
      </Link>

      <div className="mt-8 grid gap-10 xl:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="min-w-0 max-w-3xl">
          <header data-reveal-intro>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <p className="label">{formatDate(post.date)}</p>
              <p className="label flex items-center gap-1.5">
                <Clock className="size-3" />
                {post.readingMinutes} min read
              </p>
            </div>
            <h1 className="mt-5 text-jumbo font-semibold tracking-tight">{post.title}</h1>
            <p className="measure mt-5 text-lede text-muted-foreground">{post.summary}</p>
          </header>

          {post.cover && (
            <div className="mt-8 overflow-hidden rounded-xl border border-border">
              <Image
                src={post.cover}
                alt=""
                width={768}
                height={512}
                priority
                sizes="(max-width: 768px) 100vw, 768px"
                className="w-full"
              />
            </div>
          )}

          <div className="prose mt-12">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ children }) => <Anchored as="h2">{children}</Anchored>,
                h3: ({ children }) => <Anchored as="h3">{children}</Anchored>,
                a: ({ href, children }: ComponentPropsWithoutRef<"a">) => {
                  const external = typeof href === "string" && /^https?:\/\//.test(href);
                  return (
                    <a
                      href={href}
                      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
                    >
                      {children}
                    </a>
                  );
                },
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
            {post.tags.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
            ) : (
              <span />
            )}
            <ShareBar url={url} title={post.title} />
          </div>

          {related.length > 0 && (
            <section className="mt-16">
              <p className="label">Read next</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {related.map((r) => (
                  <Link key={r.slug} href={`/blog/${r.slug}`} className="block">
                    <Panel interactive reactive className="group h-full p-5">
                      <p className="label">
                        {formatDate(r.date)} · {r.readingMinutes} min
                      </p>
                      <h3 className="mt-2 font-semibold leading-snug tracking-tight transition-colors group-hover:text-accent">
                        {r.title}
                      </h3>
                      <p className="measure mt-1.5 line-clamp-2 text-sm text-muted-foreground">
                        {r.summary}
                      </p>
                    </Panel>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sticky table of contents — desktop only. */}
        <aside className="hidden xl:block">
          <div className="sticky top-28">
            <TableOfContents headings={headings} />
          </div>
        </aside>
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
