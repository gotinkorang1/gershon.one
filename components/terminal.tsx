"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { site, experience, skillGroups, credentials } from "@/lib/site";
import { cn } from "@/lib/utils";

type Line = { kind: "in" | "out" | "err"; text: string };

const BANNER: Line[] = [
  { kind: "out", text: `${site.name} — ${site.role}` },
  { kind: "out", text: `${site.location} · relocating to ${site.relocation.to}, ${site.relocation.when}` },
  { kind: "out", text: "" },
  { kind: "out", text: "Type `help` for available commands." },
];

export function Terminal({ className }: { className?: string }) {
  const [lines, setLines] = useState<Line[]>(BANNER);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const commands: Record<string, { help: string; run: () => Line[] | void }> = {
    help: {
      help: "List available commands",
      run: () => [
        { kind: "out", text: "" },
        ...Object.entries(commands).map(([name, c]) => ({
          kind: "out" as const,
          text: `  ${name.padEnd(12)}${c.help}`,
        })),
        { kind: "out", text: "" },
      ],
    },
    whoami: {
      help: "Who I am, briefly",
      run: () => [
        { kind: "out", text: site.name },
        { kind: "out", text: site.role },
        { kind: "out", text: "" },
        { kind: "out", text: site.summary },
      ],
    },
    experience: {
      help: "Employment history",
      run: () =>
        experience.map((j) => ({
          kind: "out" as const,
          text: `${j.start}  ${(j.end ?? "now").padEnd(9)}${j.role} — ${j.company}`,
        })),
    },
    skills: {
      help: "Technical capabilities",
      run: () =>
        skillGroups.flatMap((g) => [
          { kind: "out" as const, text: "" },
          { kind: "out" as const, text: `${g.title}:` },
          { kind: "out" as const, text: `  ${g.skills.join(", ")}` },
        ]),
    },
    certs: {
      help: "Education and certifications",
      run: () =>
        credentials.map((c) => ({
          kind: "out" as const,
          text: `${c.date.slice(0, 4)}  ${c.title} — ${c.issuer}`,
        })),
    },
    contact: {
      help: "How to reach me",
      run: () => [
        { kind: "out", text: `email    ${site.email}` },
        { kind: "out", text: `phone    ${site.phone}` },
        { kind: "out", text: `linkedin ${site.socials.linkedin}` },
        { kind: "out", text: `github   ${site.socials.github}` },
      ],
    },
    cv: {
      help: "Download my CV",
      run: () => {
        window.open(site.resumeUrl, "_blank");
        return [{ kind: "out", text: "Opening CV…" }];
      },
    },
    theme: {
      help: "Toggle light and dark",
      run: () => {
        const next = resolvedTheme === "dark" ? "light" : "dark";
        setTheme(next);
        return [{ kind: "out", text: `Theme set to ${next}.` }];
      },
    },
    clear: {
      help: "Clear the screen",
      run: () => {
        setLines([]);
      },
    },
  };

  function submit(raw: string) {
    const input = raw.trim();
    const next: Line[] = [{ kind: "in", text: input }];

    if (input) {
      setHistory((h) => [input, ...h]);
      setCursor(-1);

      const cmd = commands[input.toLowerCase()];
      if (cmd) {
        const out = cmd.run();
        if (out) next.push(...out);
      } else {
        next.push({
          kind: "err",
          text: `command not found: ${input}. Try \`help\`.`,
        });
      }
    }

    setLines((l) => (input.toLowerCase() === "clear" ? [] : [...l, ...next]));
    setValue("");
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      submit(value);
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const i = Math.min(cursor + 1, history.length - 1);
      if (history[i] !== undefined) {
        setCursor(i);
        setValue(history[i]);
      }
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const i = cursor - 1;
      setCursor(i);
      setValue(i >= 0 ? (history[i] ?? "") : "");
    }
    if (e.key === "Tab") {
      e.preventDefault();
      const match = Object.keys(commands).find((c) => c.startsWith(value.toLowerCase()));
      if (match) setValue(match);
    }
  }

  return (
    <div
      className={cn("panel panel-raised flex flex-col overflow-hidden", className)}
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center gap-2 border-b border-border px-3.5 py-2.5">
        <span className="size-2.5 rounded-full bg-border-strong" />
        <span className="size-2.5 rounded-full bg-border-strong" />
        <span className="size-2.5 rounded-full bg-border-strong" />
        <span className="label ml-2 text-[0.625rem]">gershon@portfolio — zsh</span>
      </div>

      <div
        ref={scrollRef}
        className="min-h-0 flex-1 overflow-y-auto p-3.5 font-mono text-[0.8125rem] leading-relaxed"
      >
        {lines.map((line, i) => (
          <p
            key={i}
            className={cn(
              "whitespace-pre-wrap break-words",
              line.kind === "in" && "text-foreground",
              line.kind === "out" && "text-muted-foreground",
              line.kind === "err" && "text-warn",
            )}
          >
            {line.kind === "in" && <span className="mr-2 text-accent">$</span>}
            {line.text}
          </p>
        ))}

        <div className="flex items-center">
          <span className="mr-2 text-accent">$</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            spellCheck={false}
            autoComplete="off"
            aria-label="Terminal input"
            className="w-full bg-transparent font-mono text-[0.8125rem] text-foreground outline-none"
          />
        </div>
      </div>
    </div>
  );
}
