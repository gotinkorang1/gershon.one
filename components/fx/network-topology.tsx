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

// Eight terminals in one column feed the router, so every uplink fans in on
// its own curve instead of crossing behind a second column of nodes. Each
// terminal is a single-line pill, which is what lets eight of them stack.
// The chain runs along the terminals' centre line and the four destinations fan back out on the
// right, symmetric about the centre line.
// Ends at 83 so the controls row under the figure has clear space.
const WAN_Y = [6, 17, 28, 39, 50, 61, 72, 83];
const NODES: Node[] = [
  ...WAN_Y.map((y, i) => ({
    id: `sat${i + 1}`,
    label: String(i + 1),
    sub: "Starlink",
    x: 8,
    y,
    kind: "wan" as const,
  })),
  { id: "router", label: "MikroTik", sub: "8 × WAN", x: 40, y: 44.5, kind: "router" },
  { id: "switch", label: "S5735", sub: "Huawei", x: 58, y: 44.5, kind: "router" },
  { id: "gpon", label: "GPON", sub: "1:4 split", x: 74, y: 44.5, kind: "router" },
  { id: "factory", label: "Factories", sub: "Fibre", x: 92, y: 17.5, kind: "leaf" },
  { id: "cctv", label: "CCTV", sub: "Fibre", x: 92, y: 35.5, kind: "leaf" },
  { id: "pos", label: "POS", sub: "Fibre", x: 92, y: 53.5, kind: "leaf" },
  { id: "remote", label: "Off-site", sub: "P2P + VPN", x: 92, y: 71.5, kind: "leaf" },
];

// Narrow screens run top-to-bottom: terminals in two rows of four, the chain
// down the middle, destinations in a row at the foot.
const MOBILE_POSITIONS: Record<string, { x: number; y: number }> = {
  sat1: { x: 13, y: 5 }, sat2: { x: 38, y: 5 },
  sat3: { x: 62, y: 5 }, sat4: { x: 87, y: 5 },
  sat5: { x: 13, y: 17 }, sat6: { x: 38, y: 17 },
  sat7: { x: 62, y: 17 }, sat8: { x: 87, y: 17 },
  router: { x: 50, y: 33 },
  switch: { x: 50, y: 47 },
  gpon: { x: 50, y: 61 },
  // Leaves stop at 75%: on phones the controls wrap to two lines beneath.
  factory: { x: 13, y: 75 }, cctv: { x: 38, y: 75 },
  pos: { x: 62, y: 75 }, remote: { x: 87, y: 75 },
};

/**
 * A smooth S-curve between two points. Horizontal layouts bend through the
 * mid x, vertical ones through the mid y, so links leave and arrive square to
 * the node rather than at an angle.
 */
function curve(a: { x: number; y: number }, b: { x: number; y: number }, vertical: boolean) {
  if (vertical) {
    const my = (a.y + b.y) / 2;
    return `M${a.x} ${a.y} C${a.x} ${my} ${b.x} ${my} ${b.x} ${b.y}`;
  }
  const mx = (a.x + b.x) / 2;
  return `M${a.x} ${a.y} C${mx} ${a.y} ${mx} ${b.y} ${b.x} ${b.y}`;
}

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
              <path
                d={curve(a, b, compact)}
                fill="none"
                vectorEffect="non-scaling-stroke"
                strokeWidth={1.25}
                className={cn(
                  "transition-all duration-500",
                  isDown
                    ? "stroke-warn opacity-50"
                    : isCarrying
                      ? "stroke-accent opacity-45"
                      : "stroke-border-strong opacity-50",
                )}
                strokeDasharray={isDown ? "3 3" : undefined}
              />
              {isCarrying && !reduced && (
                <path
                  d={curve(a, b, compact)}
                  fill="none"
                  vectorEffect="non-scaling-stroke"
                  strokeWidth={2}
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

        return (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.05 * NODES.indexOf(node) }}
            style={{ left: `${pos(node).x}%`, top: `${pos(node).y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
          >
            {node.kind === "wan" ? (
              <div
                className={cn(
                  "panel flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[0.625rem] font-medium transition-all duration-500 sm:text-xs",
                  isDown ? "border-warn/50 opacity-60" : "border-accent/30",
                )}
              >
                <span
                  className={cn(
                    "size-1.5 shrink-0 rounded-full transition-colors duration-300",
                    isDown ? "bg-warn" : "bg-live",
                  )}
                />
                <span className="hidden sm:inline">{node.sub}</span> {node.label}
                {isDown && <span className="sr-only">{t.ui.terminalDown}</span>}
              </div>
            ) : (
            <div
              className={cn(
                "panel flex flex-col items-center whitespace-nowrap px-2 py-1 transition-all duration-500 sm:px-3 sm:py-2",
                node.kind === "router" && "panel-raised border-accent/40 px-2.5 py-1.5 sm:px-4 sm:py-2.5",
              )}
            >
              <span className="text-[0.625rem] font-medium sm:text-xs">{node.label}</span>
              <span className="label mt-0.5 hidden text-[0.5625rem] tracking-[0.08em] sm:block">
                {isDown
                  ? t.ui.terminalDown
                  : node.id === "router"
                    ? t.ui.uplinkCount(String(liveCount))
                    : node.sub}
              </span>
            </div>
            )}
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
