"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { Bookmark, Clock3, X } from "lucide-react";
import type { PostCard } from "@/lib/blog";
import { portfolioFeatures } from "@/lib/site";
import {
  getReadingServerSnapshot,
  getReadingSnapshot,
  subscribeReading,
  toggleSaved,
} from "@/lib/reading-store";
import { Panel } from "@/components/ui/panel";

export function ReadingShelf({ posts }: { posts: PostCard[] }) {
  const state = useSyncExternalStore(subscribeReading, getReadingSnapshot, getReadingServerSnapshot);
  const bySlug = new Map(posts.map((post) => [post.slug, post]));
  const continueReading = Object.values(state.entries)
    .filter((entry) => entry.progress > 1 && entry.progress < 100 && bySlug.has(entry.slug))
    .toSorted((a, b) => b.lastRead - a.lastRead)
    .slice(0, 1);
  const saved = state.saved.map((slug) => bySlug.get(slug)).filter((post): post is PostCard => Boolean(post)).slice(0, 3);

  if (continueReading.length === 0 && saved.length === 0) return null;

  return (
    <section className="mt-10 grid gap-3 sm:grid-cols-2" aria-label={portfolioFeatures.reading.continueReading}>
      {continueReading.map((entry) => (
        <Link key={entry.slug} href={`/blog/${entry.slug}`} className="block">
          <Panel interactive className="h-full p-4">
            <p className="label flex items-center gap-2 text-accent">
              <Clock3 className="size-3.5" aria-hidden /> {portfolioFeatures.reading.continueReading}
            </p>
            <p className="mt-2 line-clamp-2 text-sm font-medium leading-snug">{entry.title}</p>
            <div className="mt-4 h-1 overflow-hidden rounded-full bg-surface-inset" aria-hidden>
              <span className="block h-full bg-accent" style={{ width: `${entry.progress}%` }} />
            </div>
            <p className="mt-2 text-xs text-faint">{entry.progress}% {portfolioFeatures.reading.progress}</p>
          </Panel>
        </Link>
      ))}

      {saved.length > 0 && (
        <Panel className="p-4">
          <p className="label flex items-center gap-2">
            <Bookmark className="size-3.5 text-accent" aria-hidden /> {portfolioFeatures.reading.savedArticles}
          </p>
          <ul className="mt-3 divide-y divide-border">
            {saved.map((post) => (
              <li key={post.slug} className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
                <Link href={`/blog/${post.slug}`} className="link min-w-0 flex-1 truncate text-sm">{post.title}</Link>
                <button
                  type="button"
                  onClick={() => toggleSaved(post)}
                  aria-label={`${portfolioFeatures.reading.remove}: ${post.title}`}
                  className="tap grid size-8 shrink-0 place-items-center rounded-md text-faint hover:bg-surface-2 hover:text-foreground"
                >
                  <X className="size-3.5" aria-hidden />
                </button>
              </li>
            ))}
          </ul>
        </Panel>
      )}
    </section>
  );
}
