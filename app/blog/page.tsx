import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Clock } from "lucide-react";
import { getPublishedPosts } from "@/lib/blog";
import { site } from "@/lib/site";
import { Panel } from "@/components/ui/panel";
import { Badge } from "@/components/ui/badge";
import { Stagger, StaggerItem } from "@/components/fx/stagger";

const description = "Field notes on networking, systems administration, and the things I build and run.";

export const metadata: Metadata = {
  title: "Blog",
  description,
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: `${process.env.NEXT_PUBLIC_SITE_URL ?? site.url}/blog`,
    title: `Blog — ${site.shortName}`,
    description,
  },
  twitter: { card: "summary_large_image", title: `Blog — ${site.shortName}`, description },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogIndex() {
  const posts = getPublishedPosts();

  return (
    <div className="shell relative pb-24 pt-28 md:pt-32">
      {/* Soft accent wash behind the header — quiet visual warmth, no motion. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[26rem] overflow-hidden"
      >
        <div
          className="absolute -left-1/4 -top-1/3 size-[34rem] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(circle, var(--accent-quiet), transparent 68%)" }}
        />
      </div>

      <header className="max-w-2xl" data-reveal-intro>
        <p className="label flex items-center gap-3">
          <span className="inline-block h-px w-6 bg-border-strong" />
          Writing
        </p>
        <h1 className="mt-4 text-jumbo font-semibold tracking-tight">Blog</h1>
        <p className="mt-4 text-lede text-muted-foreground">{description}</p>
      </header>

      {posts.length === 0 ? (
        <p className="mt-12 text-muted-foreground">No posts yet — check back soon.</p>
      ) : (
        <Stagger className="mt-14 grid gap-4">
          {posts.map((post, i) => (
            <StaggerItem key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="block">
                <Panel
                  interactive
                  reactive
                  className="group flex items-start gap-4 p-5 sm:gap-6 sm:p-6"
                >
                  {post.cover ? (
                    <div className="shrink-0 self-start overflow-hidden rounded-xl border border-border">
                      <Image
                        src={post.cover}
                        alt=""
                        width={768}
                        height={512}
                        sizes="176px"
                        className="aspect-3/2 w-28 object-cover transition-transform duration-500 group-hover:scale-[1.06] sm:w-44"
                      />
                    </div>
                  ) : (
                    // No cover: a designed accent tile with the post's number, so
                    // every card carries a consistent, intentional left visual.
                    <div
                      aria-hidden
                      className="grid aspect-3/2 w-28 shrink-0 self-start place-items-center overflow-hidden rounded-xl border border-border sm:w-44"
                      style={{
                        background:
                          "radial-gradient(130% 130% at 30% 20%, var(--accent-quiet), var(--surface-inset))",
                      }}
                    >
                      <span className="font-mono text-3xl font-semibold text-accent/70">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                      <p className="label">{formatDate(post.date)}</p>
                      <p className="label flex items-center gap-1.5">
                        <Clock className="size-3" />
                        {post.readingMinutes} min read
                      </p>
                    </div>

                    <div className="mt-3 flex items-start justify-between gap-6">
                      <div className="min-w-0">
                        <h2 className="text-xl font-semibold tracking-tight transition-colors group-hover:text-accent sm:text-2xl">
                          {post.title}
                        </h2>
                        <p className="measure mt-2 text-sm leading-relaxed text-muted-foreground">
                          {post.summary}
                        </p>
                      </div>
                      <ArrowUpRight className="nudge mt-1 size-5 shrink-0 text-faint transition-colors group-hover:text-accent" />
                    </div>

                    {post.tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {post.tags.map((tag) => (
                          <Badge key={tag}>{tag}</Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </Panel>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      )}
    </div>
  );
}
