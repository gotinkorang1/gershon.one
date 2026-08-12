"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, CircleAlert, RotateCcw, XCircle } from "lucide-react";
import { portfolioFeatures } from "@/lib/site";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { cn } from "@/lib/utils";

const content = portfolioFeatures.lab.troubleshooting;

export function TroubleshootingLab() {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [choiceIndex, setChoiceIndex] = useState<number | null>(null);
  const [complete, setComplete] = useState(false);

  const scenario = content.scenarios[scenarioIndex];
  const step = scenario.checks[stepIndex];
  const choice = choiceIndex === null ? null : step.choices[choiceIndex];

  function chooseScenario(index: number) {
    setScenarioIndex(index);
    setStepIndex(0);
    setChoiceIndex(null);
    setComplete(false);
  }

  function advance() {
    if (stepIndex === scenario.checks.length - 1) {
      setComplete(true);
      return;
    }
    setStepIndex((current) => current + 1);
    setChoiceIndex(null);
  }

  function restart() {
    setStepIndex(0);
    setChoiceIndex(null);
    setComplete(false);
  }

  return (
    <div>
      <div className="max-w-2xl">
        <h2 className="text-2xl font-semibold tracking-tight">{content.title}</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">{content.lede}</p>
      </div>

      <div className="focus-strip -mx-5 mt-7 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0">
        {content.scenarios.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => chooseScenario(index)}
            aria-pressed={scenarioIndex === index}
            className={cn(
              "tap shrink-0 rounded-full border px-4 py-2 text-sm transition-colors",
              scenarioIndex === index
                ? "border-accent/50 bg-accent-quiet text-accent"
                : "border-border bg-surface-1 text-muted-foreground hover:text-foreground",
            )}
          >
            {item.title}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <Panel className="trace-panel overflow-hidden p-5 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Badge variant="accent">{scenario.environment}</Badge>
            <span className="label">
              {content.progress} · {complete ? scenario.checks.length : stepIndex + 1}/
              {scenario.checks.length}
            </span>
          </div>

          <h3 className="mt-6 text-xl font-semibold tracking-tight">{scenario.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{scenario.symptom}</p>

          {complete ? (
            <div className="mt-8" aria-live="polite">
              <div className="flex items-center gap-2 text-live">
                <CheckCircle2 className="size-5" />
                <p className="font-medium">{content.complete}</p>
              </div>
              <p className="mt-4 leading-relaxed text-muted-foreground">{scenario.resolution}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href={scenario.proofHref} className="link inline-flex items-center gap-2 text-sm text-accent">
                  {scenario.proofLabel} <ArrowRight className="size-4" />
                </Link>
                <Button type="button" variant="outline" size="sm" onClick={restart}>
                  <RotateCcw /> {content.restart}
                </Button>
              </div>
            </div>
          ) : (
            <div className="mt-8">
              <p className="font-medium">{step.prompt}</p>
              <div className="mt-4 grid gap-2">
                {step.choices.map((option, index) => {
                  const selected = choiceIndex === index;
                  return (
                    <button
                      key={option.label}
                      type="button"
                      onClick={() => setChoiceIndex(index)}
                      className={cn(
                        "min-h-12 rounded-lg border px-4 py-3 text-left text-sm transition-colors",
                        selected && option.correct && "border-live/50 bg-live/10 text-foreground",
                        selected && !option.correct && "border-warn/50 bg-warn/10 text-foreground",
                        !selected && "border-border bg-surface-inset text-muted-foreground hover:border-border-strong hover:text-foreground",
                      )}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>

              {choice && (
                <div
                  className={cn(
                    "mt-4 flex items-start gap-3 rounded-lg border p-4 text-sm",
                    choice.correct
                      ? "border-live/40 bg-live/10 text-live"
                      : "border-warn/40 bg-warn/10 text-warn",
                  )}
                  aria-live="polite"
                >
                  {choice.correct ? (
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
                  ) : (
                    <XCircle className="mt-0.5 size-4 shrink-0" />
                  )}
                  <p>{choice.feedback}</p>
                </div>
              )}

              {choice?.correct && (
                <Button type="button" variant="accent" className="mt-5" onClick={advance}>
                  {content.next} <ArrowRight />
                </Button>
              )}
            </div>
          )}
        </Panel>

        <Panel inset className="h-fit p-5">
          <CircleAlert className="size-5 text-accent" />
          <p className="mt-4 text-sm font-medium">{content.principleTitle}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {complete
              ? scenario.resolution
              : content.principle}
          </p>
        </Panel>
      </div>
    </div>
  );
}
