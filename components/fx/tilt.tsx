"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * Subtle cursor-following 3D tilt for the hero portrait.
 *
 * The pointer's position within the element drives a small rotateX/rotateY,
 * smoothed by a spring so it feels weighted, not twitchy. Max tilt is a few
 * degrees — enough to feel alive, not a novelty. A faint sheen tracks the
 * cursor to sell the depth.
 *
 * Disabled for reduced-motion and for coarse pointers (touch), where there's no
 * hover to drive it — those users get the plain element.
 */
export function Tilt({
  children,
  className,
  max = 6,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), {
    stiffness: 150,
    damping: 18,
  });
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), {
    stiffness: 150,
    damping: 18,
  });

  // Sheen follows the cursor across the surface. Must be declared before the
  // early return so hook order stays stable across renders.
  const sheen = useTransform(
    px,
    (x) =>
      `radial-gradient(220px circle at ${x * 100}% 30%, rgba(255,255,255,0.14), transparent 60%)`,
  );

  if (reduced) return <div className={className}>{children}</div>;

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };

  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{
        rotateX: rx,
        rotateY: ry,
        transformPerspective: 900,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      {children}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 rounded-xl opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
        style={{ background: sheen }}
      />
    </motion.div>
  );
}
