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

  /**
   * Not listed in `help`. These are the commands a network engineer types
   * without thinking, so the terminal answers them rather than erroring.
   */
  const hidden: Record<string, () => Line[]> = {
    sudo: () => [
      { kind: "err", text: "gershon is not in the sudoers file. This incident has been reported." },
    ],
    "sudo su": () => [
      { kind: "err", text: "Nice try. This incident has also been reported." },
    ],
    uptime: () => [
      {
        kind: "out",
        text: ` ${new Date().toTimeString().slice(0, 8)}  up 5 years, 2 users,  load average: 0.42, 0.31, 0.28`,
      },
    ],
    ping: () => [
      { kind: "out", text: "PING starlink (100.64.0.1): 56 data bytes" },
      { kind: "out", text: "64 bytes from 100.64.0.1: icmp_seq=0 ttl=54 time=38.2 ms" },
      { kind: "out", text: "64 bytes from 100.64.0.1: icmp_seq=1 ttl=54 time=41.7 ms" },
      { kind: "out", text: "--- starlink ping statistics ---" },
      { kind: "out", text: "2 packets transmitted, 2 received, 0% packet loss" },
    ],
    traceroute: () => [
      { kind: "out", text: "traceroute to opportunity (canada), 4 hops max" },
      { kind: "out", text: " 1  accra-gh            2.1 ms" },
      { kind: "out", text: " 2  knust-bsc-2024     18.4 ms" },
      { kind: "out", text: " 3  aws-ccp-2024       22.9 ms" },
      { kind: "out", text: " 4  st-johns-nl-2026   ** reachable August 2026 **" },
    ],
    neofetch: () => [
      { kind: "out", text: "       ___        gershon@portfolio" },
      { kind: "out", text: "      /   \\       -----------------" },
      { kind: "out", text: "     |  o  |      OS: RouterOS 7.x / Debian" },
      { kind: "out", text: "     |     |      Role: IT Systems & Network Administrator" },
      { kind: "out", text: "      \\___/       Uptime: 5 years" },
      { kind: "out", text: "                  WAN: fibre (primary), Starlink (backup)" },
      { kind: "out", text: "                  Shell: zsh" },
      { kind: "out", text: "                  Available: August 2026, St. John's NL" },
    ],
    ip: () => [
      { kind: "out", text: "1: lo    <LOOPBACK,UP>  inet 127.0.0.1/8" },
      { kind: "out", text: "2: ether1 <UP>          inet 10.0.0.1/24   comment: fibre WAN" },
      { kind: "out", text: "3: ether2 <UP>          inet 192.168.100.2/24  comment: starlink WAN" },
      { kind: "out", text: "4: bridge <UP>          inet 10.10.0.1/16  comment: VLAN trunk" },
    ],
    "rm -rf /": () => [
      { kind: "err", text: "Backups exist and have been restore-tested. Nothing to see here." },
    ],
    exit: () => [{ kind: "out", text: "There is no exit. Try `contact` instead." }],
    hire: () => [
      { kind: "out", text: "Excellent choice." },
      { kind: "out", text: `  ${site.email}` },
      { kind: "out", text: `  ${site.phone}` },
      { kind: "out", text: "  Available in Canada from August 2026." },
    ],
    "": () => [],
  };

  function submit(raw: string) {
    const input = raw.trim();
    const next: Line[] = [{ kind: "in", text: input }];

    if (input) {
      setHistory((h) => [input, ...h]);
      setCursor(-1);

      const key = input.toLowerCase();
      const cmd = commands[key];
      const secret = hidden[key] ?? hidden[key.split(" ")[0]];

      if (cmd) {
        const out = cmd.run();
        if (out) next.push(...out);
      } else if (secret) {
        next.push(...secret());
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
