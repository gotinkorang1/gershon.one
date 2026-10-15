export function SectionHeading({
  index,
  title,
  description,
}: {
  index: string;
  title: string;
  description?: string;
}) {
  // The index prop reads like "01 — Experience"; only the words are shown.
  const sectionLabel = index.replace(/^\d+\s*[—–-]\s*/, "");

  return (
    // The whole heading settles in as one piece, driven by scroll position
    // (see .scroll-settle in globals.css).
    <div className="section-heading scroll-settle">
      <div>
        <p className="label">{sectionLabel}</p>
        <h2 className="mt-3.5 text-jumbo font-semibold tracking-tight">{title}</h2>
      </div>

      {description && (
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:pb-1.5">
          {description}
        </p>
      )}
    </div>
  );
}
