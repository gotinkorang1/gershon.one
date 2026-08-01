import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Portrait that swaps between a light and a dark artwork with the active theme.
 *
 * Both images are rendered and toggled purely in CSS off the `.dark` class on
 * <html> (set by next-themes before paint). Doing it in CSS rather than reading
 * the theme in JS means there's no first-paint flash and no hydration mismatch —
 * the correct image is visible from the very first frame, even during SSR.
 */
export function ThemePortrait({
  alt,
  width,
  height,
  className,
  imgClassName,
  priority,
  sizes,
}: {
  alt: string;
  width: number;
  height: number;
  /** Applied to the wrapper (sizing/positioning). */
  className?: string;
  /** Applied to both <Image> elements (object-fit, radius, etc.). */
  imgClassName?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const common = {
    width,
    height,
    priority,
    sizes,
    className: cn("size-full", imgClassName),
  } as const;

  return (
    <div className={cn("relative", className)}>
      {/* Light theme image — hidden when .dark is on the html element. */}
      <Image
        src="/gershon-light.png"
        alt={alt}
        {...common}
        className={cn(common.className, "dark:hidden")}
      />
      {/* Dark theme image — a decorative duplicate, shown only under .dark. */}
      <Image
        src="/gershon-dark.png"
        alt=""
        aria-hidden
        {...common}
        className={cn(common.className, "hidden dark:block")}
      />
    </div>
  );
}
