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
    sizes,
    className: cn("size-full", imgClassName),
  } as const;

  return (
    <div className={cn("relative", className)}>
      {/* Light theme image — hidden when .dark is on the html element. Only this
          one carries `priority`: preloading both would put a second, never-shown
          image on the LCP critical path. The dark copy loads eagerly-but-normal. */}
      <Image
        src="/gershon-light.webp"
        alt={alt}
        priority={priority}
        {...common}
        className={cn(common.className, "dark:hidden")}
      />
      {/* Dark theme image — a decorative duplicate, shown only under .dark. */}
      <Image
        src="/gershon-dark.webp"
        alt=""
        aria-hidden
        loading="eager"
        {...common}
        className={cn(common.className, "hidden dark:block")}
      />
    </div>
  );
}
