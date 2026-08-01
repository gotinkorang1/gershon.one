"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Clock, Search, X } from "lucide-react";
import { Panel } from "@/components/ui/panel";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { PostCard } from "@/lib/blog";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function Meta({ post }: { post: PostCard }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      <p className="label">{formatDate(post.date)}</p>
      <p className="label flex items-center gap-1.5">
        <Clock className="size-3" />
        {post.readingMinutes} min read
      </p>
    </div>
  );
}

function Tags({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null;
  return (
    <div className="mt-4 flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <Badge key={tag}>{tag}</Badge>
      ))}
    </div>
  );
}

/** The newest post, shown large when no filter is active. */
function Featured({ post, index }: { post: PostCard; index: number }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block">
      <Panel interactive reactive className="group overflow-hidden">
        <div className="overflow-hidden border-b border-border">
          {post.cover ? (
            <Image
              src={post.cover}
              alt=""
              width={1200}
              height={560}
              priority
              sizes="(max-width: 1024px) 100vw, 900px"
              className="aspect-[2.2/1] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div
              aria-hidden
              className="grid aspect-[3/1] w-full place-items-center"
              style={{
                background:
                  "radial-gradient(120% 140% at 25% 15%, var(--accent-quiet), var(--surface-inset))",
              }}
            >
              <span className="font-mono text-6xl font-semibold text-accent/60">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          )}
        </div>
        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="label text-accent">Latest</p>
            <Meta post={post} />
          </div>
          <div className="mt-4 flex items-start justify-between gap-6">
            <div className="min-w-0">
              <h2 className="text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent sm:text-3xl">
                {post.title}
              </h2>
              <p className="measure mt-3 text-base leading-relaxed text-muted-foreground">
                {post.summary}
              </p>
            </div>
            <ArrowUpRight className="nudge mt-1 size-6 shrink-0 text-faint transition-colors group-hover:text-accent" />
          </div>
          <Tags tags={post.tags} />
        </div>
      </Panel>
    </Link>
  );
}

/** Compact row with the small side thumbnail. */
export function PostRow({ post, index }: { post: PostCard; index: number }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block">
      <Panel interactive reactive className="group flex items-start gap-4 p-5 sm:gap-6 sm:p-6">
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
          <div
            aria-hidden
            className="grid aspect-3/2 w-28 shrink-0 self-start place-items-center overflow-hidden rounded-xl border border-border sm:w-44"
            style={{
              background:
                "radial-gradient(130% 130% at 30% 20%, var(--accent-quiet), var(--surface-inset))",
            }}
          >
            <span className="font-mono text-3xl font-semibold text-accent/70">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        )}
        <div className="min-w-0 flex-1">
          <Meta post={post} />
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
          <Tags tags={post.tags} />
        </div>
      </Panel>
    </Link>
  );
}

export function BlogIndex({ posts, tags }: { posts: PostCard[]; tags: string[] }) {
  const reduced = useReducedMotion();
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtering = query.trim() !== "" || activeTag !== null;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      const tagOk = !activeTag || p.tags.includes(activeTag);
      const qOk =
        !q || `${p.title} ${p.summary} ${p.tags.join(" ")}`.toLowerCase().includes(q);
      return tagOk && qOk;
    });
  }, [posts, query, activeTag]);

  const featured = !filtering && posts.length > 0 ? posts[0] : null;
  const list = featured ? filtered.filter((p) => p.slug !== featured.slug) : filtered;

  return (
    <div className="mt-12">
      {/* Controls */}
      <div className="flex flex-col gap-4">
        <div className="relative max-w-md">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-faint" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts…"
            aria-label="Search posts"
            className="w-full rounded-lg border border-border bg-surface-inset py-2.5 pl-10 pr-9 text-sm outline-none transition-colors placeholder:text-faint focus:border-accent/60 focus:bg-surface-1"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="tap absolute right-2.5 top-1/2 grid size-6 -translate-y-1/2 place-items-center rounded text-faint hover:text-foreground"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveTag(null)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                activeTag === null
                  ? "border-accent/50 bg-accent-quiet text-accent"
                  : "border-border text-muted-foreground hover:border-border-strong hover:text-foreground",
              )}
            >
              All
            </button>
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag((t) => (t === tag ? null : tag))}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                  activeTag === tag
                    ? "border-accent/50 bg-accent-quiet text-accent"
                    : "border-border text-muted-foreground hover:border-border-strong hover:text-foreground",
                )}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <p className="mt-12 text-muted-foreground">
          No posts match{query ? ` “${query}”` : ""}
          {activeTag ? ` in ${activeTag}` : ""}.
        </p>
      ) : (
        <div className="mt-8 grid gap-4">
          {featured && <Featured post={featured} index={posts.indexOf(featured)} />}
          <AnimatePresence mode="popLayout">
            {list.map((post) => (
              <motion.div
                key={post.slug}
                layout={!reduced}
                initial={reduced ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <PostRow post={post} index={posts.indexOf(post)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
