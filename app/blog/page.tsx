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
    <div className="shell pb-24 pt-28 md:pt-32">
      <header className="max-w-2xl" data-reveal-intro>
        <p className="label">Writing</p>
        <h1 className="mt-4 text-jumbo font-semibold tracking-tight">Blog</h1>
        <p className="mt-4 text-lede text-muted-foreground">{description}</p>
      </header>

      {posts.length === 0 ? (
        <p className="mt-12 text-muted-foreground">No posts yet — check back soon.</p>
      ) : (
        <Stagger className="mt-12 grid gap-3">
          {posts.map((post) => (
            <StaggerItem key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="block">
                <Panel
                  interactive
                  reactive
                  className="group flex items-start gap-4 p-5 sm:gap-5 sm:p-6"
                >
                  {post.cover && (
                    <div className="shrink-0 self-start overflow-hidden rounded-lg border border-border">
                      <Image
                        src={post.cover}
                        alt=""
                        width={768}
                        height={512}
                        sizes="160px"
                        className="aspect-3/2 w-24 object-cover sm:w-40"
                      />
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
                        <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
                          {post.title}
                        </h2>
                        <p className="measure mt-2 text-sm leading-relaxed text-muted-foreground">
                          {post.summary}
                        </p>
                      </div>
                      <ArrowUpRight className="nudge mt-1 size-4 shrink-0 text-faint transition-colors group-hover:text-accent" />
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
