import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SystemsLab } from "@/components/lab/systems-lab";
import { getActivityItems, getEvidenceItems } from "@/lib/portfolio-features";
import { getLab } from "@/lib/localised-content";
import type { Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

export function LabView({ locale }: { locale: Locale }) {
  const lab = getLab(locale);
  return (
    <div className="shell pb-24 pt-28 md:pt-32">
      <Link href={locale === "fr" ? "/fr" : "/"} className="link inline-flex items-center gap-2 text-sm text-muted-foreground">
        <ArrowLeft className="size-3.5" />
        {site.shortName}
      </Link>

      <header className="mt-10 max-w-4xl" data-reveal-intro>
        <p className="label text-accent">{lab.eyebrow}</p>
        <h1 className="mt-5 text-jumbo font-semibold tracking-tight">{lab.title}</h1>
        <p className="measure mt-5 text-lede leading-relaxed text-muted-foreground">{lab.lede}</p>
      </header>

      <div className="mt-12">
        <SystemsLab evidence={getEvidenceItems(locale)} activity={getActivityItems(locale)} />
      </div>
    </div>
  );
}
