import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Globe } from "lucide-react";
import { Panel } from "@/components/ui/panel";
import { ProjectList } from "@/components/projects/project-list";
import { projectsPage as copy, site, websites } from "@/lib/site";
import { defaultOgImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: copy.metaTitle,
  description: copy.metaDescription,
  alternates: { canonical: "/projects" },
  openGraph: {
    images: [defaultOgImage],
    type: "website",
    url: "/projects",
    title: `${copy.metaTitle} — ${site.shortName}`,
    description: copy.metaDescription,
  },
  twitter: { card: "summary_large_image", images: [defaultOgImage.url] },
};

const domain = (url: string) => new URL(url).hostname.replace(/^www\./, "");

export default function ProjectsPage() {
  return (
    <div className="shell pb-24 pt-28 md:pt-32">
      <Link href="/" className="link inline-flex items-center gap-2 text-sm text-muted-foreground">
        <ArrowLeft className="size-3.5" />
        {site.shortName}
      </Link>

      <header className="mt-8 max-w-3xl">
        <p className="label">{copy.eyebrow}</p>
        <h1 className="mt-4 text-jumbo font-semibold">{copy.title}</h1>
        <p className="mt-5 text-lede text-muted-foreground">{copy.lede}</p>
      </header>

      {/* ------------------------------------------------------ websites */}
      <section aria-labelledby="websites-title" className="mt-16">
        <h2 id="websites-title" className="text-xl font-semibold tracking-tight">
          {copy.websitesTitle}
        </h2>
        <p className="mt-1.5 text-sm text-muted-foreground">{copy.websitesLede}</p>

        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {websites.map((w) => {
            const body = (
              <>
                <div className="relative aspect-[8/5] overflow-hidden border-b border-border bg-surface-inset">
                  {w.image ? (
                    <Image
                      src={w.image}
                      alt={`${w.name} homepage`}
                      fill
                      sizes="(min-width: 1024px) 26rem, (min-width: 640px) 45vw, 100vw"
                      className="object-cover object-top transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="grid size-full place-items-center">
                      <Globe aria-hidden className="size-8 text-faint" />
                    </div>
                  )}
                </div>
                <div className="flex items-start justify-between gap-3 p-4">
                  <div className="min-w-0">
                    <h3 className="truncate font-medium">{w.name}</h3>
                    <p className="mt-0.5 text-sm text-muted-foreground">{w.summary}</p>
                    <p className="label mt-2.5 normal-case tracking-normal">
                      {w.offline ? copy.offline : domain(w.url)}
                    </p>
                  </div>
                  {!w.offline && (
                    <ArrowUpRight
                      aria-hidden
                      className="mt-1 size-4 shrink-0 text-faint transition-colors group-hover:text-foreground"
                    />
                  )}
                </div>
              </>
            );
            return (
              <li key={w.slug}>
                {w.offline ? (
                  <Panel className="h-full opacity-70">{body}</Panel>
                ) : (
                  <a
                    href={w.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`${w.name} — ${copy.visit}`}
                    className="group block h-full"
                  >
                    <Panel interactive className="h-full">
                      {body}
                    </Panel>
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      {/* ------------------------------------------------------ projects */}
      <section aria-labelledby="projects-title" className="mt-20">
        <h2 id="projects-title" className="text-xl font-semibold tracking-tight">
          {copy.projectsTitle}
        </h2>
        <p className="mt-1.5 text-sm text-muted-foreground">{copy.projectsLede}</p>
        <ProjectList />
      </section>
    </div>
  );
}
