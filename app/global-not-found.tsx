import type { Metadata } from "next";
import { RootDocument, rootMetadata } from "@/components/root-document";
import NotFound from "@/app/(en)/not-found";

/**
 * 404 for URLs that match no route at all. With one root layout per language
 * there is no single layout to wrap an app-wide 404, so Next renders this file
 * on its own; it uses the same document shell, so it keeps the nav, footer,
 * fonts and theme. notFound() calls inside a route still use that language's
 * not-found.tsx.
 */
export const metadata: Metadata = {
  ...rootMetadata,
  title: { absolute: "Page not found" },
  robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
  return (
    <RootDocument lang="en-CA">
      <NotFound />
    </RootDocument>
  );
}
