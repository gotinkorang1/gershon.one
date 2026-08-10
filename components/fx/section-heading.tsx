"use client";

import { Reveal } from "@/components/fx/reveal";

export function SectionHeading({
  index,
  title,
  description,
}: {
  index: string;
  title: string;
  description?: string;
}) {
  const sectionNumber = index.match(/\d+/)?.[0] ?? "--";
  const sectionLabel = index.replace(/^\d+\s*[—–-]\s*/, "");

  return (
    <Reveal>
      <div className="section-heading">
        <span aria-hidden className="section-index">
          {sectionNumber}
        </span>

        <div className="section-heading-copy">
          <p className="label">{sectionLabel}</p>
          <h2 className="mt-3.5 text-jumbo font-semibold tracking-tight">{title}</h2>
        </div>

        {description && (
          <p className="col-span-2 max-w-md text-sm leading-relaxed text-muted-foreground md:col-span-1 md:pb-1.5">
            {description}
          </p>
        )}
      </div>
    </Reveal>
  );
}
