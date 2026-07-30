"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useMediaQuery, usePrefersReducedMotion } from "@/lib/use-media-query";
import { useI18n } from "@/components/locale-provider";

/**
 * The aggregated multi-WAN topology described in the experience section: eight
 * satellite terminals bonded across eight WAN ports, feeding a core switch and
 * a GPON distribution layer that carries fibre out across the site.
 * Deliberately generic — no client name, no addressing, no site-specific detail.
 *
 * Dropping a terminal is not a binary failover. Load rebalances across whatever
 * uplinks remain, which is what aggregation buys you over a primary/backup
 * pair: capacity degrades in eighths instead of cutting over.
 */

type Node = {
  id: string;
  label: string;
  sub: string;
  x: number;
  y: number;
  kind: "wan" | "router" | "leaf";
};

// Symmetric about y=50 so the fan-out reads as deliberate rather than sketched.
// Three even columns. The previous values bunched the leaves against the right
// edge and left the lower-left quadrant empty.
// Eight Starlink terminals aggregate into the router, which feeds the switch,
// then GPON, then out across the park.
//
// The terminals sit in two columns of four, not one column of eight: the
// figure is ~320px tall, so eight rows leaves ~40px each and the labels
// collide. Four rows at 22% apart clears the panel height with room to spare.
const NODES: Node[] = [
  { id: "sat1", label: "1", sub: "Starlink", x: 5, y: 12, kind: "wan" },
  { id: "sat2", label: "2", sub: "Starlink", x: 5, y: 37, kind: "wan" },
  { id: "sat3", label: "3", sub: "Starlink", x: 5, y: 62, kind: "wan" },
  { id: "sat4", label: "4", sub: "Starlink", x: 5, y: 87, kind: "wan" },
  { id: "sat5", label: "5", sub: "Starlink", x: 21, y: 12, kind: "wan" },
  { id: "sat6", label: "6", sub: "Starlink", x: 21, y: 37, kind: "wan" },
  { id: "sat7", label: "7", sub: "Starlink", x: 21, y: 62, kind: "wan" },
  { id: "sat8", label: "8", sub: "Starlink", x: 21, y: 87, kind: "wan" },
  { id: "router", label: "MikroTik", sub: "8 × WAN", x: 42, y: 50, kind: "router" },
  { id: "switch", label: "S5735", sub: "Huawei", x: 60, y: 50, kind: "router" },
  { id: "gpon", label: "GPON", sub: "1:4 split", x: 76, y: 50, kind: "router" },
  { id: "factory", label: "Factories", sub: "Fibre", x: 93, y: 12, kind: "leaf" },
  { id: "cctv", label: "CCTV", sub: "Fibre", x: 93, y: 37, kind: "leaf" },
  { id: "pos", label: "POS", sub: "Fibre", x: 93, y: 62, kind: "leaf" },
  { id: "remote", label: "Off-site", sub: "P2P + VPN", x: 93, y: 87, kind: "leaf" },
];

// Narrow screens: WANs across the top, router in the middle, VLANs in a row
// beneath. Same graph, laid out top-to-bottom so nothing overlaps.
// Narrow screens cannot carry eight stacked labels plus a four-node fan-out,
// so satellites compress into two columns and the chain runs vertically.
const MOBILE_POSITIONS: Record<string, { x: number; y: number }> = {
  sat1: { x: 12, y: 5 }, sat2: { x: 36, y: 5 },
  sat3: { x: 60, y: 5 }, sat4: { x: 84, y: 5 },
  sat5: { x: 12, y: 20 }, sat6: { x: 36, y: 20 },
  sat7: { x: 60, y: 20 }, sat8: { x: 84, y: 20 },
  router: { x: 30, y: 45 },
  switch: { x: 70, y: 45 },
  gpon: { x: 50, y: 65 },
  factory: { x: 13, y: 90 }, cctv: { x: 38, y: 90 },
  pos: { x: 63, y: 90 }, remote: { x: 88, y: 90 },
};

const LINKS: { from: string; to: string; id: string }[] = [
  ...Array.from({ length: 8 }, (_, i) => ({
    id: `sat${i + 1}-router`,
    from: `sat${i + 1}`,
    to: "router",
  })),
  { id: "router-switch", from: "router", to: "switch" },
  { id: "switch-gpon", from: "switch", to: "gpon" },
  { id: "gpon-factory", from: "gpon", to: "factory" },
  { id: "gpon-cctv", from: "gpon", to: "cctv" },
  { id: "gpon-pos", from: "gpon", to: "pos" },
  { id: "gpon-remote", from: "gpon", to: "remote" },
];

const SAT_IDS = NODES.filter((n) => n.kind === "wan").map((n) => n.id);

const byId = (id: string) => NODES.find((n) => n.id === id)!;

export function NetworkTopology({ className }: { className?: string }) {
  const { t } = useI18n();
  const compact = useMediaQuery("(max-width: 640px)");
  const reduced = usePrefersReducedMotion();
  // Which terminals are offline. A set rather than a boolean, because the
  // interesting property of this design is that it degrades gradually — you
  // can drop several and still be up.
  const [down, setDown] = useState<ReadonlySet<string>>(new Set());
  const [elapsed, setElapsed] = useState(0);

  // The carrying-line dashes animate stroke-dashoffset, which runs on the main
  // thread rather than the compositor. Pausing them while the figure is off
  // screen removes ~14 continuous animations' worth of idle CPU and battery.
  const figureRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = figureRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: "120px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const failed = down.size > 0;
  const liveCount = SAT_IDS.length - down.size;

  // Mirrors the real reconvergence window: detection, then rebalance.
  useEffect(() => {
    if (!failed) return;

    const start = Date.now();
    const id = setInterval(() => setElapsed((Date.now() - start) / 1000), 90);
    const stop = setTimeout(() => clearInterval(id), 8000);
    return () => {
      clearInterval(id);
      clearTimeout(stop);
    };
  }, [failed]);

  // Drop the lowest-numbered terminal still up, so repeated clicks walk down
  // the stack predictably rather than picking at random.
  //
  // Functional updater, not `new Set([...down, next])`: several clicks inside
  // one tick would otherwise each read the same captured `down` and all pick
  // the same terminal, so eight clicks dropped two.
  const dropOne = () => {
    setElapsed(0);
    setDown((current) => {
      const next = SAT_IDS.find((id) => !current.has(id));
      if (!next) return current;
      return new Set([...current, next]);
    });
  };

  const pos = (node: Node) =>
    compact ? (MOBILE_POSITIONS[node.id] ?? { x: node.x, y: node.y }) : { x: node.x, y: node.y };

  const description = failed ? t.ui.topologyDescFailed : t.ui.topologyDescHealthy;

  return (
    <figure
      ref={figureRef}
      className={cn("relative m-0", className)}
      role="group"
      aria-label={t.ui.topologyLabel}
    >
      <figcaption className="sr-only">{description}</figcaption>

      {/* State changes are announced, not just shown. */}
      <p aria-live="polite" className="sr-only">
        {liveCount === 0
          ? t.ui.allUplinksDownAnnounce
          : failed
            ? t.ui.failedOverAnnounce(elapsed.toFixed(1), String(liveCount))
            : t.ui.wansHealthy(String(liveCount))}
      </p>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-lg opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--grid) 1px, transparent 1px), linear-gradient(to bottom, var(--grid) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />

      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 size-full"
        aria-hidden
      >
        {LINKS.map((link) => {
          const a = pos(byId(link.from));
          const b = pos(byId(link.to));
          const aNode = byId(link.from);
          const isWanLink = aNode.kind === "wan";
          const isDown = isWanLink && down.has(aNode.id);
          // Downstream links stay live regardless: that is the whole point of
          // aggregating upstream. They only go dark if every terminal is out.
          const isCarrying = isWanLink ? !isDown : liveCount > 0;

          return (
            <g key={link.id}>
              <line
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                vectorEffect="non-scaling-stroke"
                strokeWidth={1}
                className={cn(
                  "transition-all duration-500",
                  isDown
                    ? "stroke-warn opacity-40"
                    : isCarrying
                      ? "stroke-accent opacity-70"
                      : "stroke-border-strong opacity-50",
                )}
                strokeDasharray={isDown ? "3 3" : undefined}
              />
              {isCarrying && !reduced && (
                <line
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  vectorEffect="non-scaling-stroke"
                  strokeWidth={1.75}
                  strokeLinecap="round"
                  strokeDasharray="1 14"
                  className="stroke-accent"
                  style={{
                    animation: "dash 2.4s linear infinite",
                    animationPlayState: inView ? "running" : "paused",
                  }}
                />
              )}
            </g>
          );
        })}
      </svg>

      {NODES.map((node) => {
        const isDown = down.has(node.id);
        const isActiveWan = node.kind === "wan" && !isDown;

        return (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.05 * NODES.indexOf(node) }}
            style={{ left: `${pos(node).x}%`, top: `${pos(node).y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
          >
            <div
              className={cn(
                "panel flex flex-col items-center whitespace-nowrap px-2 py-1 transition-all duration-500 sm:px-3 sm:py-2",
                node.kind === "router" && "panel-raised px-2.5 py-1.5 sm:px-4 sm:py-3",
                isDown && "opacity-55",
                isActiveWan && "border-accent/40",
              )}
            >
              <span className="flex items-center gap-1 text-[0.625rem] font-medium sm:gap-1.5 sm:text-xs">
                {node.kind === "wan" && (
                  <span
                    className={cn(
                      "size-1.5 shrink-0 rounded-full transition-colors duration-300",
                      isDown ? "bg-warn" : isActiveWan ? "bg-live" : "bg-faint",
                    )}
                  />
                )}
                {node.label}
              </span>
              <span className="label mt-0.5 hidden text-[0.5625rem] tracking-[0.08em] sm:block">
                {isDown
                  ? t.ui.terminalDown
                  : node.id === "router"
                    ? t.ui.uplinkCount(String(liveCount))
                    : node.sub}
              </span>
            </div>
          </motion.div>
        );
      })}

      {/* Control strip */}
      <div className="absolute inset-x-0 -bottom-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        <button
          type="button"
          onClick={dropOne}
          disabled={liveCount === 0}
          className="panel panel-interactive px-3 py-1.5 text-[0.6875rem] font-medium transition-colors disabled:pointer-events-none disabled:opacity-40 sm:text-xs"
        >
          {t.ui.simulateFailure}
        </button>
        {failed && (
          <button
            type="button"
            onClick={() => {
              // Reset here rather than in an effect watching `down`.
              setElapsed(0);
              setDown(new Set());
            }}
            className="panel panel-interactive px-3 py-1.5 text-[0.6875rem] font-medium transition-colors sm:text-xs"
          >
            {t.ui.restoreLink}
          </button>
        )}
        <p className="label text-[0.625rem]">
          {liveCount === 0 ? (
            <span className="text-warn">{t.ui.allUplinksDown}</span>
          ) : failed ? (
            <span className="text-live">
              {t.ui.failedOver(elapsed.toFixed(1), String(liveCount))}
            </span>
          ) : (
            t.ui.wansHealthy(String(liveCount))
          )}
        </p>
      </div>
    </figure>
  );
}
