"use client";

import { useState } from "react";
import { ArrowRight, Boxes } from "lucide-react";
import { portfolioFeatures } from "@/lib/site";
import { Badge } from "@/components/ui/badge";
import { Panel } from "@/components/ui/panel";
import { cn } from "@/lib/utils";

const content = portfolioFeatures.lab.architecture;

export function ArchitectureExplorer() {
  const [systemIndex, setSystemIndex] = useState(0);
  const [nodeIndex, setNodeIndex] = useState(0);
  const system = content.systems[systemIndex];
  const node = system.nodes[nodeIndex];

  function chooseSystem(index: number) {
    setSystemIndex(index);
    setNodeIndex(0);
  }

  return (
    <div>
      <div className="max-w-2xl">
        <h2 className="text-2xl font-semibold tracking-tight">{content.title}</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">{content.lede}</p>
      </div>

      <div className="focus-strip -mx-5 mt-7 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0">
        {content.systems.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => chooseSystem(index)}
            aria-pressed={systemIndex === index}
            className={cn(
              "tap shrink-0 rounded-full border px-4 py-2 text-sm transition-colors",
              systemIndex === index
                ? "border-accent/50 bg-accent-quiet text-accent"
                : "border-border bg-surface-1 text-muted-foreground hover:text-foreground",
            )}
          >
            {item.name}
          </button>
        ))}
      </div>

      <Panel className="trace-panel mt-6 overflow-hidden p-5 sm:p-7">
        <div className="flex items-start gap-3">
          <Boxes className="mt-1 size-5 shrink-0 text-accent" />
          <div>
            <h3 className="text-xl font-semibold tracking-tight">{system.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{system.summary}</p>
          </div>
        </div>

        <div className="focus-strip -mx-5 mt-8 flex items-stretch overflow-x-auto px-5 pb-3 sm:mx-0 sm:px-0">
          {system.nodes.map((item, index) => (
            <div key={item.id} className="flex shrink-0 items-center">
              <button
                type="button"
                onClick={() => setNodeIndex(index)}
                aria-pressed={nodeIndex === index}
                className={cn(
                  "min-h-28 w-40 rounded-xl border p-4 text-left transition-all",
                  nodeIndex === index
                    ? "border-accent/60 bg-accent-quiet shadow-[var(--shadow-glow)]"
                    : "border-border bg-surface-inset hover:border-border-strong",
                )}
              >
                <span className="label block">{item.kind}</span>
                <span className="mt-3 block text-sm font-medium">{item.label}</span>
                <span className="mt-1 block text-xs text-faint">{item.metric}</span>
              </button>
              {index < system.nodes.length - 1 && (
                <ArrowRight aria-hidden className="mx-2 size-4 shrink-0 text-faint" />
              )}
            </div>
          ))}
        </div>

        <div className="mt-5 border-t border-border pt-5" aria-live="polite">
          <p className="label">{content.selected}</p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <h4 className="text-lg font-semibold tracking-tight">{node.label}</h4>
            <Badge variant="accent">{node.metric}</Badge>
          </div>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {node.detail}
          </p>
        </div>
      </Panel>
    </div>
  );
}
