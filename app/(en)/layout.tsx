import type { Metadata, Viewport } from "next";
import { RootDocument, rootMetadata, rootViewport } from "@/components/root-document";

export const metadata: Metadata = rootMetadata;
export const viewport: Viewport = rootViewport;

export default function EnglishRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <RootDocument lang="en-CA">{children}</RootDocument>;
}
