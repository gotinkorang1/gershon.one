import type { PostCard } from "@/lib/blog";

export type ReadingEntry = PostCard & {
  progress: number;
  lastRead: number;
};

export type ReadingState = {
  saved: string[];
  entries: Record<string, ReadingEntry>;
};

const STORAGE_KEY = "gershon.one:reading:v1";
const EMPTY_STATE: ReadingState = { saved: [], entries: {} };
const listeners = new Set<() => void>();
let cache: ReadingState | null = null;
let listeningToStorage = false;

function parse(value: string | null): ReadingState {
  if (!value) return EMPTY_STATE;
  try {
    const parsed = JSON.parse(value) as Partial<ReadingState>;
    return {
      saved: Array.isArray(parsed.saved) ? parsed.saved.filter((slug): slug is string => typeof slug === "string") : [],
      entries: parsed.entries && typeof parsed.entries === "object" ? parsed.entries : {},
    };
  } catch {
    return EMPTY_STATE;
  }
}

function currentState() {
  if (cache) return cache;
  cache = typeof window === "undefined" ? EMPTY_STATE : parse(window.localStorage.getItem(STORAGE_KEY));
  return cache;
}

function publish(next: ReadingState) {
  cache = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Private browsing and storage quotas can disable localStorage. Reading still works normally.
  }
  listeners.forEach((listener) => listener());
}

export function subscribeReading(listener: () => void) {
  listeners.add(listener);
  if (typeof window !== "undefined" && !listeningToStorage) {
    listeningToStorage = true;
    window.addEventListener("storage", (event) => {
      if (event.key !== STORAGE_KEY) return;
      cache = parse(event.newValue);
      listeners.forEach((item) => item());
    });
  }
  return () => listeners.delete(listener);
}

export function getReadingSnapshot() {
  return currentState();
}

export function getReadingServerSnapshot() {
  return EMPTY_STATE;
}

export function toggleSaved(post: PostCard) {
  const current = currentState();
  const saved = current.saved.includes(post.slug)
    ? current.saved.filter((slug) => slug !== post.slug)
    : [post.slug, ...current.saved];
  publish({
    saved,
    entries: {
      ...current.entries,
      [post.slug]: current.entries[post.slug] ?? { ...post, progress: 0, lastRead: Date.now() },
    },
  });
  return saved.includes(post.slug);
}

export function recordReadingProgress(post: PostCard, progress: number) {
  const current = currentState();
  const rounded = Math.max(0, Math.min(100, Math.round(progress)));
  const previous = current.entries[post.slug];
  if (previous && Math.abs(previous.progress - rounded) < 3 && rounded < 97) return;
  publish({
    ...current,
    entries: {
      ...current.entries,
      [post.slug]: { ...post, progress: rounded >= 97 ? 100 : rounded, lastRead: Date.now() },
    },
  });
}
