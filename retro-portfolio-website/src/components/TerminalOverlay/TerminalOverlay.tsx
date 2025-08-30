'use client";'

import { useEffect, useMemo, useRef, useState } from "react";

export default function TerminalOverlay() {
  const [history, setHistory] = useState<string[]>([
    "> portfolio shell ready",
    "> type 'help' for commands",
  ]);
  const [cmd, setCmd] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const commands = useMemo(
    () => ({
      help: () => [
        "help — list commands",
        "whoami — about me",
        "goto <section>",
        "launch arcade",
        "play <snake|pong|breakout|tetris>",
        "mute <on|off>",
        "resume",
      ],
      whoami: () => [
        "name: Hariom Sharma",
        "role: Full-Stack Dev",
        "stack: nextjs, ts, node, ai",
      ],
      resume: () => ["opening resume… (todo: link to /resume.pdf)"],
      mute: (arg: string) => {
        Sound.muted = arg === "on";
        return ["mute: " + (Sound.muted ? "on" : "off")];
      },
      launch: (app: string) =>
        app === "arcade"
          ? ["launching arcade… scroll to Projects"]
          : ["unknown app"],
      play: (g: string) => ["switching arcade tab to " + g],
      goto: (s: string) => ["navigating to #" + s],
      clear: () => {
        setHistory([]);
        return [];
      },
    }),
    []
  );

  useEffect(() => {
    const konami = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];
    let buf: string[] = [];
    const h = (e: KeyboardEvent) => {
      buf.push(e.key);
      buf = buf.slice(-10);
      if (konami.every((k, i) => buf[i] === k)) {
        setHistory((h) => [...h, "> secret: unlocked mini-arcade perk!"]);
        Sound.play(Sound.beep);
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  function run(raw: string) {
    const parts = raw.trim().split(/\s+/);
    const c = parts[0];
    const arg = parts[1];
    if (!c) return;
    Sound.play(Sound.key);
    const out = commands[c as keyof typeof commands];
    setHistory((h) => [...h, `$ ${raw}`]);
    if (!out) {
      setHistory((h) => [...h, `command not found: ${c}`]);
      return;
    }
    const lines = (out as unknown)(arg);
    if (Array.isArray(lines)) setHistory((h) => [...h, ...lines]);

    // side-effects
    if (c === "goto" && arg) {
      document.querySelector("#" + arg)?.scrollIntoView({ behavior: "smooth" });
    }
    if (c === "launch" && arg === "arcade") {
      document
        .querySelector("#projects")
        ?.scrollIntoView({ behavior: "smooth" });
    }
    if (c === "play" && arg) {
      // flip arcade tab via custom event
      window.dispatchEvent(new CustomEvent("arcade:setTab", { detail: arg }));
      document
        .querySelector("#projects")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <div className="fixed left-0 right-0 bottom-0 z-50">
      <div className="mx-auto max-w-4xl m-3 rounded-2xl border border-white/10 bg-black/70 backdrop-blur">
        <div
          className="p-3 font-mono text-xs h-32 overflow-auto"
          id="terminal-history"
        >
          {history.map((l, i) => (
            <div key={i}>{l}</div>
          ))}
        </div>
        <div className="flex items-center gap-2 border-t border-white/10 p-2">
          <span className="text-emerald-300 text-sm">user@devquest:$</span>
          <input
            ref={inputRef}
            value={cmd}
            onChange={(e) => setCmd(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                run(cmd);
                setCmd("");
              }
            }}
            className="flex-1 bg-transparent outline-none text-sm"
            placeholder="type a command…"
          />
        </div>
      </div>
    </div>
  );
}
