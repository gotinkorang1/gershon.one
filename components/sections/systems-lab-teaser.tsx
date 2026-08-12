import Link from "next/link";
import { Activity, ArrowRight, Boxes, Network, Wrench } from "lucide-react";
import { portfolioFeatures } from "@/lib/site";
import { Panel } from "@/components/ui/panel";

const icons = [Wrench, Network, Boxes, Activity];

export function SystemsLabTeaser() {
  const labels = Object.values(portfolioFeatures.lab.tabs);
  return (
    <section className="shell py-20 sm:py-24" aria-labelledby="systems-lab-teaser-title">
      <Panel raised reactive className="trace-panel p-6 sm:p-9">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <p className="label text-accent">{portfolioFeatures.lab.eyebrow}</p>
            <h2 id="systems-lab-teaser-title" className="mt-4 max-w-3xl text-section font-semibold tracking-tight">
              {portfolioFeatures.lab.homeTitle}
            </h2>
            <p className="mt-4 max-w-2xl text-lede leading-relaxed text-muted-foreground">
              {portfolioFeatures.lab.homeLede}
            </p>
          </div>
          <Link
            href="/lab"
            className="tap inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 text-sm font-medium text-accent-fg transition-transform hover:-translate-y-0.5 sm:w-auto"
          >
            {portfolioFeatures.lab.open}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {labels.map((label, index) => {
            const Icon = icons[index];
            return (
              <div key={label} className="flex min-h-20 flex-col justify-between rounded-lg border border-border bg-surface-inset p-3">
                <Icon className="size-4 text-accent" aria-hidden />
                <p className="mt-4 text-sm font-medium">{label}</p>
              </div>
            );
          })}
        </div>
      </Panel>
    </section>
  );
}
