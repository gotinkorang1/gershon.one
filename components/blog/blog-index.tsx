"use client";

import { useI18n } from "@/components/locale-provider";
import { blogDate, blogHref, getBlogCopy } from "@/lib/localised-content";

import { useMemo, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Clock, Search, X } from "lucide-react";
import { Panel } from "@/components/ui/panel";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { PostCard } from "@/lib/blog";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { ReadingShelf } from "@/components/blog/reading-shelf";

function useBlog() {
  const { locale } = useI18n();
  return { c: getBlogCopy(locale), locale };
}

function Meta({ post }: { post: PostCard }) {
  const { c, locale } = useBlog();
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      <p className="label">{blogDate(post.date, locale)}</p>
      <p className="label flex items-center gap-1.5">
        <Clock className="size-3" />
        {post.readingMinutes} {c.minRead}
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
  const { c, locale } = useBlog();
  return (
    <Link href={blogHref(locale, post.slug)} className="block">
      {/* Side by side from lg up, so the title is on screen without scrolling;
          stacked below that, where a full-width cover reads better. */}
      <Panel
        interactive
        reactive
        className="group overflow-hidden lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]"
      >
        <div className="overflow-hidden border-b border-border lg:border-b-0 lg:border-r">
          {post.cover ? (
            <Image
              src={post.cover}
              alt=""
              width={1200}
              height={560}
              priority
              sizes="(min-width: 1024px) 640px, 100vw"
              className="aspect-[2.2/1] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] lg:aspect-auto lg:h-full lg:min-h-80"
            />
          ) : (
            <div
              aria-hidden
              className="grid aspect-[3/1] w-full place-items-center lg:aspect-auto lg:h-full lg:min-h-80"
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
        <div className="p-6 sm:p-8 lg:flex lg:flex-col lg:justify-center">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="label text-accent">{c.latest}</p>
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
  const { locale } = useI18n();
  return (
    <Link href={blogHref(locale, post.slug)} className="block">
      {/* On phones the cover sits above the text: beside it, the text column
          shrank to ~140px and titles wrapped onto five lines. */}
      <Panel
        interactive
        reactive
        className="group flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:gap-6 sm:p-6"
      >
        {post.cover ? (
          <div className="shrink-0 overflow-hidden rounded-xl border border-border sm:self-start">
            <Image
              src={post.cover}
              alt=""
              width={768}
              height={512}
              sizes="(min-width: 640px) 176px, 100vw"
              className="aspect-[2.2/1] w-full object-cover transition-transform duration-500 group-hover:scale-[1.06] sm:aspect-3/2 sm:w-44"
            />
          </div>
        ) : (
          <div
            aria-hidden
            className="grid aspect-[2.2/1] w-full shrink-0 place-items-center overflow-hidden rounded-xl border border-border sm:aspect-3/2 sm:w-44 sm:self-start"
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
            <ArrowUpRight className="nudge mt-1 hidden size-5 shrink-0 text-faint transition-colors group-hover:text-accent sm:block" />
          </div>
          <Tags tags={post.tags} />
        </div>
      </Panel>
    </Link>
  );
}

const FILTER_CHANGE = "blog-filter-change";

function subscribeToUrl(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener(FILTER_CHANGE, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(FILTER_CHANGE, onChange);
  };
}

/**
 * The blog filter lives in the URL (?tag=…&q=…), so a filtered view can be
 * shared, bookmarked, and survives a reload or back/forward. The URL is the
 * only copy of that state: the page is static, so the server renders the
 * unfiltered list and the filter applies once the client takes over.
 */
function useUrlFilter() {
  const search = useSyncExternalStore(
    subscribeToUrl,
    () => window.location.search,
    () => "",
  );
  const params = new URLSearchParams(search);

  const set = (key: "tag" | "q", value: string | null) => {
    const url = new URL(window.location.href);
    if (value) url.searchParams.set(key, value);
    else url.searchParams.delete(key);
    // replaceState, not push: typing in the search box shouldn't add a back
    // button entry per keystroke.
    window.history.replaceState(window.history.state, "", url);
    window.dispatchEvent(new Event(FILTER_CHANGE));
  };

  return { tag: params.get("tag"), query: params.get("q") ?? "", set };
}

export function BlogIndex({ posts, tags }: { posts: PostCard[]; tags: string[] }) {
  const { c } = useBlog();
  const reduced = useReducedMotion();
  const filter = useUrlFilter();
  const query = filter.query;
  const activeTag = filter.tag && tags.includes(filter.tag) ? filter.tag : null;
  const setQuery = (value: string) => filter.set("q", value);
  const setActiveTag = (value: string | null) => filter.set("tag", value);

  const tagCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of posts) for (const t of p.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
    return counts;
  }, [posts]);

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
      <ReadingShelf posts={posts} />
      {/* Controls */}
      <div className="mt-10 flex flex-col gap-4">
        <div className="relative max-w-md">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-faint" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={c.searchPlaceholder}
            aria-label={c.searchLabel}
            className="w-full rounded-lg border border-border bg-surface-inset py-2.5 pl-10 pr-9 text-sm outline-none transition-colors placeholder:text-faint focus:border-accent/60 focus:bg-surface-1"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label={c.clearSearch}
              className="tap absolute right-2.5 top-1/2 grid size-6 -translate-y-1/2 place-items-center rounded text-faint hover:text-foreground"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>

        {tags.length > 0 && (
          <div role="group" aria-label={c.filterLabel} className="flex flex-wrap gap-2">
            <button
              type="button"
              aria-pressed={activeTag === null}
              onClick={() => setActiveTag(null)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                activeTag === null
                  ? "border-accent/50 bg-accent-quiet text-accent"
                  : "border-border text-muted-foreground hover:border-border-strong hover:text-foreground",
              )}
            >
              {c.all}
            </button>
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                aria-pressed={activeTag === tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                  activeTag === tag
                    ? "border-accent/50 bg-accent-quiet text-accent"
                    : "border-border text-muted-foreground hover:border-border-strong hover:text-foreground",
                )}
              >
                {/* Screen readers hear "Fibre 1 post"; sighted users see "Fibre 1".
                    The real space keeps the tag and count from running together. */}
                {tag}{" "}
                <span aria-hidden className="ml-0.5 tabular-nums opacity-60">
                  {tagCounts.get(tag) ?? 0}
                </span>
                <span className="sr-only">{c.resultCount(tagCounts.get(tag) ?? 0)}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Announced to screen readers as the filter changes; shown while filtering. */}
      <p
        role="status"
        className={cn("label mt-6", !filtering && "sr-only")}
      >
        {filtering && c.resultCount(filtered.length)}
      </p>

      {/* Results */}
      {filtered.length === 0 ? (
        <p className="mt-12 text-muted-foreground">
          {c.noResults(query, activeTag ?? "")}
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
