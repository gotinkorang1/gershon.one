"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

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

const NODES: Node[] = [
  { id: "fibre", label: "Fibre", sub: "Primary WAN", x: 14, y: 20, kind: "wan" },
  { id: "starlink", label: "Starlink", sub: "Backup WAN", x: 14, y: 76, kind: "wan" },
  { id: "ccr", label: "CCR2004", sub: "RouterOS 7.x", x: 50, y: 48, kind: "router" },
  { id: "staff", label: "Staff", sub: "VLAN 10", x: 86, y: 14, kind: "leaf" },
  { id: "erp", label: "ERP", sub: "VLAN 20", x: 86, y: 38, kind: "leaf" },
  { id: "cctv", label: "CCTV", sub: "VLAN 30", x: 86, y: 62, kind: "leaf" },
  { id: "guest", label: "Guest", sub: "VLAN 40", x: 86, y: 86, kind: "leaf" },
];

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
  const [failed, setFailed] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Mirrors the real failover window: detection, then reroute.
  useEffect(() => {
    if (!failed) {
      setElapsed(0);
      return;
    }
    const start = Date.now();
    const id = setInterval(() => setElapsed((Date.now() - start) / 1000), 90);
    const stop = setTimeout(() => clearInterval(id), 8000);
    return () => {
      clearInterval(id);
      clearTimeout(stop);
    };
  }, [failed]);

  const activeWan = failed ? "starlink" : "fibre";

  return (
    <div className={cn("relative", className)}>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 size-full"
        aria-hidden
      >
        {LINKS.map((link) => {
          const a = byId(link.from);
          const b = byId(link.to);
          const isWanLink = a.kind === "wan";
          const isDown = isWanLink && failed && a.id === "fibre";
          const isCarrying = !isWanLink || a.id === activeWan;

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
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
          >
            <div
              className={cn(
                "panel flex flex-col items-center whitespace-nowrap px-2.5 py-1.5 transition-all duration-500 sm:px-3 sm:py-2",
                node.kind === "router" && "panel-raised px-3 py-2.5 sm:px-4 sm:py-3",
                isDown && "opacity-55",
                isActiveWan && "border-accent/40",
              )}
            >
              <span className="flex items-center gap-1.5 text-[0.6875rem] font-medium sm:text-xs">
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
              <span className="label mt-0.5 text-[0.5625rem] tracking-[0.08em]">
                {isDown ? "Link down" : node.sub}
              </span>
            </div>
          </motion.div>
        );
      })}

      {/* Control strip */}
      <div className="absolute inset-x-0 -bottom-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        <button
          type="button"
          onClick={() => setFailed((v) => !v)}
          className="panel panel-interactive px-3 py-1.5 text-[0.6875rem] font-medium transition-colors sm:text-xs"
        >
          {failed ? "Restore fibre link" : "Simulate fibre failure"}
        </button>
        <p className="label text-[0.625rem]">
          {failed ? (
            <span className="text-live">
              Failed over to Starlink · {elapsed.toFixed(1)}s
            </span>
          ) : (
            "Live · both WANs healthy"
          )}
        </p>
      </div>
    </div>
  );
}
