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
  return (
    <Reveal>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-12">
        <div>
          <p className="label flex items-center gap-3">
            <span className="inline-block h-px w-6 bg-border-strong" />
            {index}
          </p>
          <h2 className="mt-4 text-jumbo font-semibold">{title}</h2>
        </div>
        {description && (
          <p className="max-w-sm text-base leading-relaxed text-muted-foreground md:pb-1.5">
            {description}
          </p>
        )}
      </div>
    </Reveal>
  );
}
