"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useMediaQuery, usePrefersReducedMotion } from "@/lib/use-media-query";
import { useI18n } from "@/components/locale-provider";

/**
 * The dual-WAN topology from the Greenhouse deployment, drawn to scale of the
 * real thing: two upstreams into a CCR2004, VLAN-segmented downstream.
 *
 * Clicking "simulate failure" cuts the fibre link and moves traffic to
 * Starlink — the same behaviour the netwatch script performs in production.
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
const NODES: Node[] = [
  { id: "fibre", label: "Fibre", sub: "Primary WAN", x: 13, y: 30, kind: "wan" },
  { id: "starlink", label: "Starlink", sub: "Backup WAN", x: 13, y: 70, kind: "wan" },
  { id: "ccr", label: "CCR2004", sub: "RouterOS 7.x", x: 50, y: 50, kind: "router" },
  { id: "staff", label: "Staff", sub: "VLAN 10", x: 86, y: 14, kind: "leaf" },
  { id: "erp", label: "ERP", sub: "VLAN 20", x: 86, y: 38, kind: "leaf" },
  { id: "cctv", label: "CCTV", sub: "VLAN 30", x: 86, y: 62, kind: "leaf" },
  { id: "guest", label: "Guest", sub: "VLAN 40", x: 86, y: 86, kind: "leaf" },
];

// Narrow screens: WANs across the top, router in the middle, VLANs in a row
// beneath. Same graph, laid out top-to-bottom so nothing overlaps.
const MOBILE_POSITIONS: Record<string, { x: number; y: number }> = {
  fibre: { x: 26, y: 8 },
  starlink: { x: 76, y: 8 },
  ccr: { x: 50, y: 44 },
  staff: { x: 13, y: 84 },
  erp: { x: 38, y: 84 },
  cctv: { x: 63, y: 84 },
  guest: { x: 88, y: 84 },
};

const LINKS: { from: string; to: string; id: string }[] = [
  { id: "fibre-ccr", from: "fibre", to: "ccr" },
  { id: "starlink-ccr", from: "starlink", to: "ccr" },
  { id: "ccr-staff", from: "ccr", to: "staff" },
  { id: "ccr-erp", from: "ccr", to: "erp" },
  { id: "ccr-cctv", from: "ccr", to: "cctv" },
  { id: "ccr-guest", from: "ccr", to: "guest" },
];

const byId = (id: string) => NODES.find((n) => n.id === id)!;

export function NetworkTopology({ className }: { className?: string }) {
  const { t } = useI18n();
  const compact = useMediaQuery("(max-width: 640px)");
  const [failed, setFailed] = useState(false);
  const reduced = usePrefersReducedMotion();
  const [elapsed, setElapsed] = useState(0);

  // Mirrors the real failover window: detection, then reroute.
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

  const activeWan = failed ? "starlink" : "fibre";

  const pos = (node: Node) =>
    compact ? (MOBILE_POSITIONS[node.id] ?? { x: node.x, y: node.y }) : { x: node.x, y: node.y };

  const description = failed ? t.ui.topologyDescFailed : t.ui.topologyDescHealthy;

  return (
    <figure
      className={cn("relative m-0", className)}
      role="group"
      aria-label={t.ui.topologyLabel}
    >
      <figcaption className="sr-only">{description}</figcaption>

      {/* State changes are announced, not just shown. */}
      <p aria-live="polite" className="sr-only">
        {failed
          ? t.ui.failedOverAnnounce(elapsed.toFixed(1))
          : t.ui.wansHealthy}
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
          const isDown = isWanLink && failed && aNode.id === "fibre";
          const isCarrying = !isWanLink || aNode.id === activeWan;

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
                  style={{ animation: "dash 2.4s linear infinite" }}
                />
              )}
            </g>
          );
        })}
      </svg>

      {NODES.map((node) => {
        const isDown = failed && node.id === "fibre";
        const isActiveWan = node.kind === "wan" && node.id === activeWan;

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
                {isDown ? t.ui.linkDown : node.sub}
              </span>
            </div>
          </motion.div>
        );
      })}

      {/* Control strip */}
      <div className="absolute inset-x-0 -bottom-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        <button
          type="button"
          onClick={() => {
            // Reset here rather than in an effect watching `failed`.
            setElapsed(0);
            setFailed((v) => !v);
          }}
          aria-pressed={failed}
          className="panel panel-interactive px-3 py-1.5 text-[0.6875rem] font-medium transition-colors sm:text-xs"
        >
          {failed ? t.ui.restoreLink : t.ui.simulateFailure}
        </button>
        <p className="label text-[0.625rem]">
          {failed ? (
            <span className="text-live">{t.ui.failedOver(elapsed.toFixed(1))}</span>
          ) : (
            t.ui.wansHealthy
          )}
        </p>
      </div>
    </figure>
  );
}
