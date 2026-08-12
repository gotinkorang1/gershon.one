"use client";

import { useEffect, useSyncExternalStore } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import type { PostCard } from "@/lib/blog";
import { portfolioFeatures } from "@/lib/site";
import { captureAnalyticsEvent } from "@/lib/analytics";
import {
  getReadingServerSnapshot,
  getReadingSnapshot,
  recordReadingProgress,
  subscribeReading,
  toggleSaved,
} from "@/lib/reading-store";

export function ReadingTools({ post }: { post: PostCard }) {
  const state = useSyncExternalStore(subscribeReading, getReadingSnapshot, getReadingServerSnapshot);
  const saved = state.saved.includes(post.slug);

  useEffect(() => {
    let frame: number | null = null;
    const update = () => {
      frame = null;
      const article = document.querySelector<HTMLElement>("[data-reading-article]");
      if (!article) return;
      const rect = article.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const available = Math.max(article.offsetHeight - window.innerHeight * 0.4, 1);
      const progress = ((window.scrollY - top + window.innerHeight * 0.25) / available) * 100;
      recordReadingProgress(post, progress);
    };
    const onScroll = () => {
      if (frame === null) frame = window.requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();
    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [post]);

  function toggle() {
    const nowSaved = toggleSaved(post);
    captureAnalyticsEvent("article saved", { post_slug: post.slug, saved: nowSaved });
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={saved}
      className="tap inline-flex min-h-10 items-center gap-2 rounded-full border border-border bg-surface-1 px-3.5 text-xs font-medium text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
    >
      {saved ? <BookmarkCheck className="size-4 text-accent" aria-hidden /> : <Bookmark className="size-4" aria-hidden />}
      {saved ? portfolioFeatures.reading.saved : portfolioFeatures.reading.save}
    </button>
  );
}
