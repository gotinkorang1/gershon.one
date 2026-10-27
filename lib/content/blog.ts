/** Blog chrome (index, post page and reading widgets). French in lib/content.fr.ts. Re-exported from lib/site.ts. */
export const blogCopy = {
  eyebrow: "Writing",
  title: "Blog",
  // Search title. "Blog" alone is too short for a results page to say what
  // the writing is about (Bing flags titles this short).
  metaTitle: "IT field notes: networking, ERPNext and systems",
  description: "Field notes on networking, systems administration, and the things I build and run.",
  intro:
    "Writing from real work in IT and the workplaces around it: why a slow network often isn't the fibre's fault, how to print two bilingual ID cards per A4 sheet straight from ERPNext, and what foreign-owned workplaces mean for the African workers in them. Every post is also published in French.",
  subscribe: "Subscribe via RSS",
  empty: "No posts yet — check back soon.",
  searchPlaceholder: "Search posts…",
  searchLabel: "Search posts",
  clearSearch: "Clear search",
  all: "All",
  filterLabel: "Filter by topic",
  resultCount: (n: number) => `${n} ${n === 1 ? "post" : "posts"}`,
  latest: "Latest",
  noResults: (query: string, tag: string) =>
    `No posts match${query ? ` “${query}”` : ""}${tag ? ` in ${tag}` : ""}.`,
  minRead: "min read",
  min: "min",
  allPosts: "All posts",
  readNext: "Read next",
  olderPost: "Older post",
  newerPost: "Newer post",
  share: "Share",
  shareOnX: "Share on X",
  shareOnLinkedIn: "Share on LinkedIn",
  originallyOnLinkedIn: "Originally posted on LinkedIn",
  copyLink: "Copy link",
  linkCopied: "Link copied",
  onThisPage: "On this page",
  tableOfContents: "Table of contents",
  backToTop: "Back to top",
  copyCode: "Copy code",
  copied: "Copied",
  linkToSection: "Link to this section",
  home: "Home",
  blogName: "Writing",
};

export type BlogCopy = typeof blogCopy;
