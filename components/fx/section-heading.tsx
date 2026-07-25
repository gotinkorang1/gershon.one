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
      <div className="grid gap-x-12 gap-y-4 md:grid-cols-12">
        <p className="label md:col-span-2">{index}</p>
        <h2 className="text-jumbo font-medium md:col-span-5">{title}</h2>
        {description && (
          <p className="max-w-md self-end text-base leading-relaxed text-muted-foreground md:col-span-5">
            {description}
          </p>
        )}
      </div>
    </Reveal>
  );
}
