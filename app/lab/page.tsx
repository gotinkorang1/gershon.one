import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { portfolioFeatures, site } from "@/lib/site";
import { getActivityItems, getEvidenceItems } from "@/lib/portfolio-features";
import { SystemsLab } from "@/components/lab/systems-lab";

export const metadata: Metadata = {
  title: portfolioFeatures.lab.title,
  description: portfolioFeatures.lab.lede,
  alternates: { canonical: "/lab" },
  openGraph: {
    type: "website",
    url: "/lab",
    title: `${portfolioFeatures.navigation.lab} — ${site.shortName}`,
    description: portfolioFeatures.lab.lede,
  },
};

export default function SystemsLabPage() {
  return (
    <div className="shell pb-24 pt-28 md:pt-32">
      <Link href="/" className="link inline-flex items-center gap-2 text-sm text-muted-foreground">
        <ArrowLeft className="size-3.5" />
        {site.shortName}
      </Link>

      <header className="mt-10 max-w-4xl" data-reveal-intro>
        <p className="label text-accent">{portfolioFeatures.lab.eyebrow}</p>
        <h1 className="mt-5 text-jumbo font-semibold tracking-tight">{portfolioFeatures.lab.title}</h1>
        <p className="measure mt-5 text-lede leading-relaxed text-muted-foreground">
          {portfolioFeatures.lab.lede}
        </p>
      </header>

      <div className="mt-12">
        <SystemsLab evidence={getEvidenceItems()} activity={getActivityItems()} />
      </div>
    </div>
  );
}
