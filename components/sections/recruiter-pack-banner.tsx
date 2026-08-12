import Link from "next/link";
import { ArrowRight, FileUser } from "lucide-react";
import { portfolioFeatures, roleFocusProfiles, type RoleFocusId } from "@/lib/site";
import { Panel } from "@/components/ui/panel";

export function RecruiterPackBanner({ focus }: { focus: RoleFocusId }) {
  const profile = roleFocusProfiles.find((item) => item.id === focus);
  if (!profile) return null;

  return (
    <section className="shell pb-16 sm:pb-20" aria-labelledby="recruiter-pack-title">
      <Panel raised className="trace-panel p-5 sm:p-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-start gap-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-accent-quiet text-accent">
              <FileUser className="size-5" aria-hidden />
            </span>
            <div>
              <p className="label text-accent">{portfolioFeatures.recruiterPack.eyebrow}</p>
              <h2 id="recruiter-pack-title" className="mt-2 text-xl font-semibold tracking-tight">
                {portfolioFeatures.recruiterPack.title} {profile.title}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {portfolioFeatures.recruiterPack.lede}
              </p>
            </div>
          </div>
          <Link
            href={`/pack/${profile.id}`}
            className="tap inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-foreground px-4 text-sm font-medium text-surface-0 transition-opacity hover:opacity-90"
          >
            {portfolioFeatures.recruiterPack.open}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </Panel>
    </section>
  );
}
