import type { Metadata } from "next";
import {
  cloneElement,
  isValidElement,
  type ComponentPropsWithoutRef,
  type ReactElement,
  type ReactNode,
} from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { AlertTriangle, ArrowLeft, ArrowRight, Clock, Info, Lightbulb } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import {
  getAllPosts,
  getPost,
  getHeadings,
  getRelatedPosts,
  getAdjacentPosts,
  slugify,
} from "@/lib/blog";
import { Badge } from "@/components/ui/badge";
import { Panel } from "@/components/ui/panel";
import { site } from "@/lib/site";
import { serialiseJsonLd } from "@/lib/json-ld";
import { ThemePortrait } from "@/components/theme-portrait";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { ShareBar } from "@/components/blog/share-bar";
import { CodeBlock } from "@/components/blog/code-block";
import { BackToTop } from "@/components/blog/back-to-top";

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

/** Flatten a node's React children to plain text (for slugs and callout detection). */
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

// GitHub-style callouts: > [!NOTE] / [!TIP] / [!WARNING] / [!CAUTION] / [!IMPORTANT]
const CALLOUT_RE = /^\s*\[!(NOTE|TIP|WARNING|CAUTION|IMPORTANT)\]\s*/i;
const CALLOUT_ICONS: Record<string, ReactNode> = {
  note: <Info />,
  important: <Info />,
  tip: <Lightbulb />,
  warning: <AlertTriangle />,
  caution: <AlertTriangle />,
};

/** Remove the leading `[!TYPE]` marker from the first text node of a callout. */
function stripCalloutMarker(node: ReactNode): ReactNode {
  let done = false;
  const walk = (n: ReactNode): ReactNode => {
    if (done) return n;
    if (typeof n === "string") {
      const out = n.replace(CALLOUT_RE, "");
      if (out !== n) done = true;
      return out;
    }
    if (Array.isArray(n)) return n.map(walk);
    if (isValidElement(n)) {
      const el = n as ReactElement<{ children?: ReactNode }>;
      return cloneElement(el, {}, walk(el.props.children));
    }
    return n;
  };
  return walk(node);
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
  const { newer, older } = getAdjacentPosts(post.slug);

  // The cover if the post has one, otherwise the auto-generated card at
  // /blog/<slug>/opengraph-image so the article node always has an image.
  const image = post.cover
    ? new URL(post.cover, base).toString()
    : `${url}/opengraph-image`;
  const wordCount = post.content.trim().split(/\s+/).filter(Boolean).length;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": url,
    url,
    headline: post.title,
    description: post.summary,
    image,
    datePublished: post.date,
    dateModified: post.date,
    wordCount,
    inLanguage: "en-CA",
    keywords: post.tags.join(", "),
    author: { "@type": "Person", name: site.name, url: base },
    publisher: { "@id": `${base}/#person` },
    isPartOf: { "@id": `${base}/blog#blog` },
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

            <div className="mt-7 flex items-center gap-3">
              <ThemePortrait
                alt=""
                width={40}
                height={40}
                className="size-10 shrink-0 overflow-hidden rounded-full border border-border"
                imgClassName="object-cover object-top"
              />
              <div className="text-sm leading-tight">
                <p className="font-medium text-foreground">{site.shortName}</p>
                <p className="text-muted-foreground">{site.role}</p>
              </div>
            </div>
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
              rehypePlugins={[rehypeHighlight]}
              components={{
                h2: ({ children }) => <Anchored as="h2">{children}</Anchored>,
                h3: ({ children }) => <Anchored as="h3">{children}</Anchored>,
                pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
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
                img: ({ src, alt, title }: ComponentPropsWithoutRef<"img">) => {
                  const image = (
                    // eslint-disable-next-line @next/next/no-img-element -- Markdown image dimensions are unknown, so next/image can't be used; native lazy-loading is the pragmatic optimisation.
                    <img src={src} alt={alt ?? ""} loading="lazy" decoding="async" />
                  );
                  return title ? (
                    <figure>
                      {image}
                      <figcaption>{title}</figcaption>
                    </figure>
                  ) : (
                    image
                  );
                },
                blockquote: ({ children }) => {
                  const marker = nodeText(children).trimStart().match(CALLOUT_RE);
                  if (!marker) return <blockquote>{children}</blockquote>;
                  const type = marker[1].toLowerCase();
                  return (
                    <div className={`callout callout-${type}`}>
                      <p className="callout-title">
                        {CALLOUT_ICONS[type]}
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </p>
                      {stripCalloutMarker(children)}
                    </div>
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
                  <Link key={tag} href={`/blog/tag/${slugify(tag)}`}>
                    <Badge>{tag}</Badge>
                  </Link>
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

          {(newer || older) && (
            <nav className="mt-10 grid gap-3 border-t border-border pt-8 sm:grid-cols-2">
              {older ? (
                <Link href={`/blog/${older.slug}`} className="group block">
                  <Panel interactive reactive className="h-full p-5">
                    <p className="label flex items-center gap-1.5">
                      <ArrowLeft className="size-3" /> Older post
                    </p>
                    <p className="mt-2 font-medium leading-snug tracking-tight transition-colors group-hover:text-accent">
                      {older.title}
                    </p>
                  </Panel>
                </Link>
              ) : (
                <span className="hidden sm:block" />
              )}
              {newer ? (
                <Link href={`/blog/${newer.slug}`} className="group block">
                  <Panel interactive reactive className="h-full p-5 sm:text-right">
                    <p className="label flex items-center gap-1.5 sm:justify-end">
                      Newer post <ArrowRight className="size-3" />
                    </p>
                    <p className="mt-2 font-medium leading-snug tracking-tight transition-colors group-hover:text-accent">
                      {newer.title}
                    </p>
                  </Panel>
                </Link>
              ) : (
                <span />
              )}
            </nav>
          )}
        </div>

        {/* Sticky table of contents — desktop only. */}
        <aside className="hidden xl:block">
          <div className="sticky top-28">
            <TableOfContents headings={headings} />
          </div>
        </aside>
      </div>

      <BackToTop />

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
