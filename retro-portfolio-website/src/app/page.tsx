"use client";
// Retro-Cyber Portfolio v3 — Modernized, Terminal-immersive, with Mini-Arcade and Interactive Testimonials
// Drop this file into app/page.tsx. See bottom of this file for the Resend API route you must add.

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Gamepad2,
  TerminalSquare,
  Rocket,
  Code2,
  MonitorPlay,
  Star,
  Quote,
  Sparkles,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Terminal,
  Keyboard,
} from "lucide-react";
// import { button } from "@/components/ui/button";
// import { Card, div } from "@/components/ui/card";

// -------------------------------------------------
// Top-level Page
// -------------------------------------------------
export default function Page() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <ParallaxBackground />
      <Scanlines />
      <NavBar />
      <HeroAbout />
      <SkillsExperience />
      <ProjectsAndArcade />
      <Testimonials />
      <Contact />
      <Footer />
      <TerminalOverlay />
      <SoundToggle />
      <GlobalStyles />
    </div>
  );
}

// -------------------------------------------------
// Global sound state (simple event bus)
// -------------------------------------------------
const Sound = {
  muted: false,
  key: typeof window !== "undefined" ? new Audio("/sounds/key.mp3") : null,
  beep: typeof window !== "undefined" ? new Audio("/sounds/beep.mp3") : null,
  play(a: HTMLAudioElement | null) {
    if (!a || Sound.muted) return;
    try {
      a.currentTime = 0;
      a.play();
    } catch {}
  },
};

// -------------------------------------------------
// UI Primitives
// -------------------------------------------------
function Section({
  id,
  children,
  className = "",
}: React.PropsWithChildren<{ id?: string; className?: string }>) {
  return (
    <section
      id={id}
      className={`relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </section>
  );
}

function NeonCard({ children }: React.PropsWithChildren) {
  return (
    <div className="relative rounded-3xl border border-white/10 bg-white/5 shadow-[0_0_0_3px_rgba(255,255,255,0.06),0_20px_80px_rgba(0,0,0,0.6)] overflow-hidden">
      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10" />
      <div className="absolute -inset-px rounded-3xl bg-[radial-gradient(60%_60%_at_50%_10%,rgba(56,189,248,0.15),rgba(0,0,0,0))]" />
      <div className="relative">{children}</div>
    </div>
  );
}

function ConsoleFrame({
  title,
  children,
}: React.PropsWithChildren<{ title: string }>) {
  return (
    <div className="relative rounded-2xl border border-white/15 bg-[#0a0a0a] p-3 shadow-[0_0_0_3px_#111]">
      <div className="mb-2 flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-red-500/80"></div>
        <div className="h-3 w-3 rounded-full bg-yellow-400/80"></div>
        <div className="h-3 w-3 rounded-full bg-emerald-400/80"></div>
        <div className="ml-3 text-xs uppercase tracking-[0.25em] text-white/60">
          {title}
        </div>
      </div>
      <div className="rounded-xl border border-white/10 bg-black p-3 pixelated">
        {children}
      </div>
    </div>
  );
}

// -------------------------------------------------
// Navigation
// -------------------------------------------------
function NavBar() {
  return (
    <nav className="sticky top-0 z-40 backdrop-blur bg-black/40 border-b border-white/10">
      <Section className="flex h-14 items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-grid place-items-center h-8 w-8 rounded-lg bg-white text-black font-black text-lg shadow-[0_0_0_3px_#000]">
            8
          </span>
          <div className="text-sm uppercase tracking-[0.25em] text-white/70">
            DevQuest
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <a href="#about" className="nav-link">
            About
          </a>
          <a href="#skills" className="nav-link">
            Skills
          </a>
          <a href="#projects" className="nav-link">
            Projects
          </a>
          <a href="#testimonials" className="nav-link">
            Testimonials
          </a>
          <a href="#contact" className="nav-link">
            Contact
          </a>
        </div>
        <div className="flex items-center gap-2">
          <IconLink Icon={Github} href="#" label="GitHub" />
          <IconLink Icon={Linkedin} href="#" label="LinkedIn" />
          <IconLink Icon={Mail} href="#contact" label="Email" />
        </div>
      </Section>
    </nav>
  );
}

function IconLink({
  Icon,
  href,
  label,
}: {
  Icon: unknown;
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10"
      onMouseEnter={() => Sound.play(Sound.key)}
    >
      <Icon className="h-4 w-4" />
    </a>
  );
}

// -------------------------------------------------
// Hero + About (Hologram resume)
// -------------------------------------------------
function HeroAbout() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div id="about" className="relative">
      <Section className="py-16 sm:py-24">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-6xl font-black leading-tight">
              Modern <span className="text-cyan-300">Retro</span> Portfolio for
              a<span className="text-fuchsia-300"> Software Developer</span>
            </h1>
            <TypeLines
              lines={[
                "Initializing profile…",
                "Loading modules: nextjs, ts, ai, arcade…",
                "System ready.",
              ]}
            />
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                className="rounded-2xl bg-lime-300 text-black hover:bg-lime-200"
                onMouseEnter={() => Sound.play(Sound.beep)}
              >
                <Rocket className="h-4 w-4 mr-2" />
                Hire Me
              </button>
              <button
                className="rounded-2xl bg-white/10 hover:bg-white/20"
                onMouseEnter={() => Sound.play(Sound.beep)}
              >
                <TerminalSquare className="h-4 w-4 mr-2" />
                Download CV
              </button>
            </div>
          </motion.div>

          <motion.div style={{ y }}>
            <NeonCard>
              <div className="grid grid-cols-2 gap-4 p-6">
                <div className="col-span-2">
                  <div className="text-xs uppercase tracking-[0.3em] text-white/60">
                    Hologram Resume
                  </div>
                  <div className="text-2xl font-black">RETRO RUNTIME v2.1</div>
                </div>
                <HoloKV k="Name" v="Hariom Sharma" />
                <HoloKV k="Role" v="Full-Stack Dev" />
                <HoloKV k="Focus" v="Next.js • AI • Edge" />
                <HoloKV k="Location" v="Jaipur, IN" />
                <div className="col-span-2">
                  <Progress label="Frontend" value={92} />
                  <Progress label="Backend" value={85} />
                  <Progress label="AI/ML" value={74} />
                </div>
              </div>
            </NeonCard>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}

function TypeLines({ lines }: { lines: string[] }) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  useEffect(() => {
    let i = 0;
    const line = lines[idx];
    setText("");
    const id = setInterval(() => {
      if (i < line.length) {
        setText((prev) => prev + line[i]);
        i++;
        Sound.play(Sound.key);
      } else {
        clearInterval(id);
        setTimeout(() => setIdx((idx + 1) % lines.length), 800);
      }
    }, 20 + Math.random() * 25);
    return () => clearInterval(id);
  }, [idx]);
  return (
    <p className="mt-4 text-white/80 max-w-prose font-mono">
      {"> "}
      {text}
      <span className="blink">▮</span>
    </p>
  );
}

function HoloKV({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/40 p-3">
      <div className="text-[10px] uppercase tracking-[0.25em] text-white/50">
        {k}
      </div>
      <div className="text-lg">{v}</div>
    </div>
  );
}

function Progress({ label, value }: { label: string; value: number }) {
  return (
    <div className="mt-3">
      <div className="flex justify-between text-xs text-white/70">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-white/10 overflow-hidden mt-1">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          transition={{ duration: 0.8 }}
          className="h-full bg-gradient-to-r from-cyan-400 to-fuchsia-400"
        />
      </div>
    </div>
  );
}

// -------------------------------------------------
// Skills & Experience (3D hover + terminal timeline)
// -------------------------------------------------
function SkillsExperience() {
  const skills = [
    { label: "React", hint: "Hooks, RSC, Suspense" },
    { label: "Next.js", hint: "App Router, ISR, Edge" },
    { label: "TypeScript", hint: "Strict, util types" },
    { label: "Node.js", hint: "Fastify, Workers" },
    { label: "Tailwind", hint: "Design systems" },
    { label: "AI/ML", hint: "LLMs, RAG, on-device" },
    { label: "Cloud", hint: "AWS, GCP, Vercel" },
    { label: "DevOps", hint: "CI/CD, Docker" },
  ];

  const timeline = [
    { year: "2025", line: "Built AI assistants + pixel arcade portfolio" },
    { year: "2024", line: "Scaled Next.js apps to millions of views" },
    { year: "2023", line: "Shipped healthcare & finance dashboards" },
  ];

  return (
    <Section id="skills" className="py-20">
      <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-start">
        <div>
          <h2 className="text-3xl font-black mb-6">Skills — Hover & Click</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {skills.map((s, i) => (
              <Skill3D key={i} label={s.label} hint={s.hint} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-black mb-3">Experience (Terminal)</h3>
          <ConsoleFrame title="dev@terminal — history">
            <TerminalTimeline timeline={timeline} />
          </ConsoleFrame>
        </div>
      </div>
    </Section>
  );
}

function Skill3D({ label, hint }: { label: string; hint: string }) {
  const [active, setActive] = useState(false);
  return (
    <motion.button
      onClick={() => {
        setActive((a) => !a);
        Sound.play(Sound.beep);
      }}
      whileHover={{ rotateX: -8, rotateY: 8, scale: 1.05 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={`relative h-28 rounded-2xl border border-white/10 bg-white/5 p-4 text-left overflow-hidden group`}
    >
      <div className="text-sm text-white/70">{hint}</div>
      <div className="text-2xl font-black">{label}</div>
      <motion.div
        animate={{ opacity: active ? 1 : 0 }}
        className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-fuchsia-400/20"
      />
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute -right-6 -bottom-6 h-24 w-24 rounded-full bg-white/10 blur-2xl"
      />
    </motion.button>
  );
}

function TerminalTimeline({
  timeline,
}: {
  timeline: { year: string; line: string }[];
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const id = setInterval(() => {
      el.scrollTop = el.scrollHeight;
    }, 1500);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      ref={ref}
      className="h-60 overflow-auto font-mono text-xs text-white/80 leading-6"
    >
      {timeline.map((t, i) => (
        <div key={i} className="whitespace-pre">
          <span className="text-emerald-300">$</span> echo &quot;{t.year} —{" "}
          {t.line}&quot;
        </div>
      ))}
      <div className="mt-2 animate-pulse">▮</div>
    </div>
  );
}

// -------------------------------------------------
// Projects + Mini Arcade (playable)
// -------------------------------------------------
function ProjectsAndArcade() {
  return (
    <Section id="projects" className="py-24">
      <h2 className="text-3xl font-black mb-8 flex items-center gap-2">
        <MonitorPlay className="h-6 w-6" /> Projects & Mini-Arcade
      </h2>

      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
        <div className="space-y-5">
          {[1, 2, 3].map((i) => (
            <ProjectCard key={i} i={i} />
          ))}
        </div>

        <Arcade />
      </div>
    </Section>
  );
}

function ProjectCard({ i }: { i: number }) {
  return (
    <NeonCard>
      <div className="p-6">
        <div className="flex items-center gap-3 text-white/70 text-xs uppercase tracking-[0.25em]">
          <Sparkles className="h-4 w-4" /> Featured Project
        </div>
        <motion.h3
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          className="text-2xl font-black mt-2"
        >
          Cyber Arcade App #{i}
        </motion.h3>
        <p className="text-white/80 mt-2">
          A modern app with a retro soul. Fast, accessible, and sprinkled with
          playful interactions.
        </p>
        <div className="mt-4 flex gap-2">
          <Badge>Next.js</Badge>
          <Badge>TypeScript</Badge>
          <Badge>Tailwind</Badge>
        </div>
        <div className="mt-6 flex gap-3">
          <button
            className="rounded-xl bg-white text-black hover:bg-white/90"
            onMouseEnter={() => Sound.play(Sound.key)}
          >
            <Code2 className="h-4 w-4 mr-2" />
            Source
          </button>
          <button
            className="rounded-xl bg-white/10 hover:bg-white/20"
            onMouseEnter={() => Sound.play(Sound.key)}
          >
            Live Demo
          </button>
        </div>
      </div>
    </NeonCard>
  );
}

function Badge({ children }: React.PropsWithChildren) {
  return (
    <span className="px-2 py-1 rounded-lg bg-white/10 border border-white/10 text-xs">
      {children}
    </span>
  );
}

// ---- Arcade ----
function Arcade() {
  type Tab = "Snake" | "Pong" | "Breakout" | "Tetris";
  const tabs: Tab[] = ["Snake", "Pong", "Breakout", "Tetris"];
  const [tab, setTab] = useState<Tab>("Snake");

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => {
              setTab(t);
              Sound.play(Sound.beep);
            }}
            className={`px-4 py-2 rounded-xl border ${
              tab === t
                ? "bg-white text-black border-white"
                : "bg-white/10 border-white/10 hover:bg-white/20"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <ConsoleFrame title={`arcade://${tab.toLowerCase()}`}>
        <div className="grid md:grid-cols-[minmax(0,1fr)_220px] gap-4">
          <div className="flex justify-center">
            {tab === "Snake" && <SnakeGame />}
            {tab === "Pong" && <PongGame />}
            {tab === "Breakout" && <BreakoutGame />}
            {tab === "Tetris" && <TetrisGame />}
          </div>
          <ArcadePanel tab={tab} />
        </div>
      </ConsoleFrame>
    </div>
  );
}

function ArcadePanel({ tab }: { tab: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm">
      <div className="text-white/70">Controls</div>
      {tab === "Snake" && <div>Arrow Keys — move</div>}
      {tab === "Pong" && <div>W/S (left), ↑/↓ (right)</div>}
      {tab === "Breakout" && <div>←/→ — move • Space — start</div>}
      {tab === "Tetris" && <div>←/→ — move • ↑ rotate • ↓ drop</div>}
      <div className="mt-3 text-white/60">
        Hint: Each game has Start/Stop and tracks score.
      </div>
    </div>
  );
}

// ----------------- Games: Snake -----------------
function SnakeGame() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const [running, setRunning] = useState(false);
  const [score, setScore] = useState(0);
  const size = 16,
    cells = 20,
    speed = 100;

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let snake = [{ x: 10, y: 10 }];
    let dir = { x: 1, y: 0 };
    let apple = { x: 14, y: 8 };
    let alive = running;
    let raf = 0;
    let t0 = 0;
    let acc = 0;

    const rnd = () => Math.floor(Math.random() * cells);
    const reset = () => {
      snake = [{ x: 10, y: 10 }];
      dir = { x: 1, y: 0 };
      apple = { x: rnd(), y: rnd() };
      setScore(0);
      alive = true;
    };
    const key = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" && dir.y !== 1) dir = { x: 0, y: -1 };
      if (e.key === "ArrowDown" && dir.y !== -1) dir = { x: 0, y: 1 };
      if (e.key === "ArrowLeft" && dir.x !== 1) dir = { x: -1, y: 0 };
      if (e.key === "ArrowRight" && dir.x !== -1) dir = { x: 1, y: 0 };
    };

    const draw = () => {
      ctx.imageSmoothingEnabled = false;
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgba(255,255,255,0.06)";
      for (let i = 0; i <= cells; i++) {
        ctx.beginPath();
        ctx.moveTo(i * size, 0);
        ctx.lineTo(i * size, cells * size);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i * size);
        ctx.lineTo(cells * size, i * size);
        ctx.stroke();
      }
      ctx.fillStyle = "#bef264";
      ctx.fillRect(apple.x * size, apple.y * size, size, size);
      ctx.fillStyle = "#22d3ee";
      snake.forEach((s) => ctx.fillRect(s.x * size, s.y * size, size, size));
      ctx.strokeStyle = "rgba(255,255,255,0.2)";
      ctx.lineWidth = 2;
      ctx.strokeRect(1, 1, cells * size - 2, cells * size - 2);
      ctx.fillStyle = "white";
      ctx.font = "10px monospace";
      ctx.fillText("SCORE " + score, 8, 12);
    };

    const step = (t: number) => {
      if (!alive) return;
      const dt = t - t0;
      t0 = t;
      acc += dt;
      while (acc >= speed) {
        acc -= speed;
        const head = {
          x: (snake[0].x + dir.x + cells) % cells,
          y: (snake[0].y + dir.y + cells) % cells,
        };
        if (snake.some((s) => s.x === head.x && s.y === head.y)) {
          alive = false;
          Sound.play(Sound.beep);
          break;
        }
        snake.unshift(head);
        if (head.x === apple.x && head.y === apple.y) {
          setScore((s) => s + 10);
          apple = { x: rnd(), y: rnd() };
          Sound.play(Sound.beep);
        } else {
          snake.pop();
        }
      }
      draw();
      raf = requestAnimationFrame(step);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      t0 = 0;
      acc = 0;
      alive = true;
      raf = requestAnimationFrame(step);
    };

    if (running) {
      reset();
      window.addEventListener("keydown", key);
      start();
    }
    return () => {
      window.removeEventListener("keydown", key);
      cancelAnimationFrame(raf);
    };
  }, [running]);

  return (
    <div className="grid grid-cols-1 place-items-center gap-3">
      <canvas
        ref={ref}
        width={320}
        height={320}
        className="pixelated rounded-lg border border-white/20"
      />
      <div className="flex gap-2">
        <button
          className="rounded-xl bg-white text-black"
          onClick={() => {
            setRunning(true);
            Sound.play(Sound.beep);
          }}
        >
          Start
        </button>
        <button
          className="rounded-xl bg-white/10"
          onClick={() => {
            setRunning(false);
            Sound.play(Sound.key);
          }}
        >
          Stop
        </button>
      </div>
    </div>
  );
}

// ----------------- Games: Pong -----------------
function PongGame() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const [running, setRunning] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    let raf = 0;
    let t0 = 0;
    let alive = running;
    const W = 320,
      H = 320;
    const paddleH = 40,
      paddleW = 6;
    let ball = { x: W / 2, y: H / 2, vx: 2, vy: 1.5 };
    const L = { x: 8, y: H / 2 - paddleH / 2 },
      R = { x: W - 8 - paddleW, y: H / 2 - paddleH / 2 };
    const keys: Record<string, boolean> = {};
    const kd = (e: KeyboardEvent) => (keys[e.key] = true),
      ku = (e: KeyboardEvent) => (keys[e.key] = false);

    const reset = () => {
      ball = {
        x: W / 2,
        y: H / 2,
        vx: 2 * (Math.random() > 0.5 ? 1 : -1),
        vy: (1 + Math.random()) * (Math.random() > 0.5 ? 1 : -1),
      };
      L.y = H / 2 - paddleH / 2;
      R.y = L.y;
      setScore(0);
    };

    const draw = () => {
      ctx.imageSmoothingEnabled = false;
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = "rgba(255,255,255,0.06)";
      for (let i = 0; i <= H; i += 16) {
        ctx.beginPath();
        ctx.moveTo(W / 2, i);
        ctx.lineTo(W / 2, i + 8);
        ctx.stroke();
      }
      ctx.fillStyle = "#22d3ee";
      ctx.fillRect(L.x, L.y, paddleW, paddleH);
      ctx.fillStyle = "#bef264";
      ctx.fillRect(R.x, R.y, paddleW, paddleH);
      ctx.fillStyle = "#fff";
      ctx.fillRect(ball.x - 3, ball.y - 3, 6, 6);
      ctx.fillStyle = "white";
      ctx.font = "10px monospace";
      ctx.fillText("SCORE " + score, 8, 12);
    };

    const step = (t: number) => {
      if (!alive) return;
      const dt = (t - t0) / 16.67;
      t0 = t;
      if (keys["w"]) L.y -= 3 * dt;
      if (keys["s"]) L.y += 3 * dt;
      L.y = Math.max(2, Math.min(H - paddleH - 2, L.y));
      if (keys["ArrowUp"]) R.y -= 3 * dt;
      if (keys["ArrowDown"]) R.y += 3 * dt;
      R.y = Math.max(2, Math.min(H - paddleH - 2, R.y));
      ball.x += ball.vx * 2 * dt;
      ball.y += ball.vy * 2 * dt;
      if (ball.y < 2 || ball.y > H - 2) {
        ball.vy *= -1;
      }
      if (ball.x < L.x + paddleW && ball.y > L.y && ball.y < L.y + paddleH) {
        ball.vx = Math.abs(ball.vx) + 0.2;
        ball.vy += (ball.y - (L.y + paddleH / 2)) / 20;
        setScore((s) => s + 1);
        Sound.play(Sound.beep);
      }
      if (ball.x > R.x && ball.y > R.y && ball.y < R.y + paddleH) {
        ball.vx = -Math.abs(ball.vx) - 0.2;
        ball.vy += (ball.y - (R.y + paddleH / 2)) / 20;
        setScore((s) => s + 1);
        Sound.play(Sound.beep);
      }
      if (ball.x < 0 || ball.x > W) {
        reset();
      }
      draw();
      raf = requestAnimationFrame(step);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      t0 = 0;
      alive = true;
      raf = requestAnimationFrame(step);
    };

    if (running) {
      reset();
      window.addEventListener("keydown", kd);
      window.addEventListener("keyup", ku);
      start();
    }
    return () => {
      window.removeEventListener("keydown", kd);
      window.removeEventListener("keyup", ku);
      cancelAnimationFrame(raf);
    };
  }, [running]);

  return (
    <div className="grid place-items-center gap-3">
      <canvas
        ref={ref}
        width={320}
        height={320}
        className="pixelated rounded-lg border border-white/20"
      />
      <div className="flex gap-2">
        <button
          className="rounded-xl bg-white text-black"
          onClick={() => {
            setRunning(true);
            Sound.play(Sound.beep);
          }}
        >
          Start
        </button>
        <button
          className="rounded-xl bg-white/10"
          onClick={() => {
            setRunning(false);
            Sound.play(Sound.key);
          }}
        >
          Stop
        </button>
      </div>
    </div>
  );
}

// --------------- Games: Breakout ---------------
function BreakoutGame() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const [running, setRunning] = useState(false);
  const [score, setScore] = useState(0);
  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    const W = 320,
      H = 320;
    let raf = 0;
    let alive = running;
    const paddle = { x: W / 2 - 20, y: H - 20, w: 40, h: 6, v: 3 };
    let ball = { x: W / 2, y: H - 40, vx: 2, vy: -2 };
    const cols = 8,
      rows = 5,
      bw = (W - 20) / cols,
      bh = 12;
    const bricks: boolean[][] = [];
    for (let r = 0; r < rows; r++) {
      bricks[r] = Array(cols).fill(true);
    }
    const keys: Record<string, boolean> = {};
    const kd = (e: KeyboardEvent) => {
      if (e.code === "Space" && !alive) {
        alive = true;
      }
      keys[e.key] = true;
    };
    const ku = (e: KeyboardEvent) => (keys[e.key] = false);
    const reset = () => {
      for (let r = 0; r < rows; r++) bricks[r] = Array(cols).fill(true);
      paddle.x = W / 2 - 20;
      ball = { x: W / 2, y: H - 40, vx: 2, vy: -2 };
      setScore(0);
    };

    const draw = () => {
      ctx.imageSmoothingEnabled = false;
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = "rgba(255,255,255,0.06)";
      for (let i = 0; i <= H; i += 16) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(W, i);
        ctx.stroke();
      }
      for (let r = 0; r < rows; r++)
        for (let c0 = 0; c0 < cols; c0++) {
          if (!bricks[r][c0]) continue;
          ctx.fillStyle = r % 2 ? "#22d3ee" : "#bef264";
          ctx.fillRect(10 + c0 * bw + 2, 10 + r * (bh + 4), bw - 4, bh);
        }
      ctx.fillStyle = "#f0abfc";
      ctx.fillRect(paddle.x, paddle.y, paddle.w, paddle.h);
      ctx.fillStyle = "#fff";
      ctx.fillRect(ball.x - 3, ball.y - 3, 6, 6);
      ctx.fillStyle = "white";
      ctx.font = "10px monospace";
      ctx.fillText("SCORE " + score, 8, 12);
      ctx.fillText("Space to start", W - 100, 12);
    };

    const step = () => {
      if (!alive) {
        draw();
        return;
      }
      if (keys["ArrowLeft"]) paddle.x -= paddle.v;
      if (keys["ArrowRight"]) paddle.x += paddle.v;
      paddle.x = Math.max(2, Math.min(W - paddle.w - 2, paddle.x));
      ball.x += ball.vx;
      ball.y += ball.vy;
      if (ball.x < 2 || ball.x > W - 2) ball.vx *= -1;
      if (ball.y < 2) ball.vy *= -1;
      if (ball.y > H) {
        reset();
        alive = false;
      }
      if (
        ball.y + 3 >= paddle.y &&
        ball.x >= paddle.x &&
        ball.x <= paddle.x + paddle.w
      ) {
        ball.vy *= -1;
        ball.vx += (ball.x - (paddle.x + paddle.w / 2)) / 20;
        Sound.play(Sound.beep);
      }
      for (let r = 0; r < rows; r++)
        for (let c0 = 0; c0 < cols; c0++) {
          if (!bricks[r][c0]) continue;
          const x = 10 + c0 * bw + 2,
            y = 10 + r * (bh + 4),
            w = bw - 4,
            h = bh;
          if (
            ball.x >= x &&
            ball.x <= x + w &&
            ball.y >= y &&
            ball.y <= y + h
          ) {
            bricks[r][c0] = false;
            ball.vy *= -1;
            setScore((s) => s + 5);
            Sound.play(Sound.beep);
          }
        }
      draw();
      raf = requestAnimationFrame(step);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      alive = true;
      raf = requestAnimationFrame(step);
    };

    if (running) {
      reset();
      window.addEventListener("keydown", kd);
      window.addEventListener("keyup", ku);
      start();
    }
    return () => {
      window.removeEventListener("keydown", kd);
      window.removeEventListener("keyup", ku);
      cancelAnimationFrame(raf);
    };
  }, [running]);
  return (
    <div className="grid place-items-center gap-3">
      <canvas
        ref={ref}
        width={320}
        height={320}
        className="pixelated rounded-lg border border-white/20"
      />
      <div className="flex gap-2">
        <button
          className="rounded-xl bg-white text-black"
          onClick={() => {
            setRunning(true);
            Sound.play(Sound.beep);
          }}
        >
          Start
        </button>
        <button
          className="rounded-xl bg-white/10"
          onClick={() => {
            setRunning(false);
            Sound.play(Sound.key);
          }}
        >
          Stop
        </button>
      </div>
    </div>
  );
}

// ----------------- Games: Tetris -----------------
function TetrisGame() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const [running, setRunning] = useState(false);
  const [score, setScore] = useState(0);
  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    const COLS = 10,
      ROWS = 20,
      SIZE = 16;
    let grid = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
    const pieces = [
      [[1, 1, 1, 1]],
      [
        [1, 1],
        [1, 1],
      ],
      [
        [0, 1, 0],
        [1, 1, 1],
      ],
      [
        [1, 0, 0],
        [1, 1, 1],
      ],
      [
        [0, 0, 1],
        [1, 1, 1],
      ],
      [
        [1, 1, 0],
        [0, 1, 1],
      ],
      [
        [0, 1, 1],
        [1, 1, 0],
      ],
    ];
    const colors = [
      "#22d3ee",
      "#bef264",
      "#f0abfc",
      "#93c5fd",
      "#86efac",
      "#fca5a5",
      "#fde68a",
    ];

    let cur = { m: pieces[2], x: 3, y: 0, c: 2 };
    let t0 = 0,
      acc = 0,
      // eslint-disable-next-line prefer-const
      speed = 500;
    let alive = running;
    let raf = 0;

    const rndPiece = () => {
      const i = Math.floor(Math.random() * pieces.length);
      return { m: pieces[i], x: 3, y: 0, c: i };
    };
    const rotate = (m: number[][]) =>
      m[0].map((_, i) => m.map((r) => r[i]).reverse());
    const collide = (m: number[][], offX: number, offY: number) => {
      for (let y = 0; y < m.length; y++)
        for (let x = 0; x < m[y].length; x++) {
          if (!m[y][x]) continue;
          const nx = offX + x,
            ny = offY + y;
          if (nx < 0 || nx >= COLS || ny >= ROWS || (ny >= 0 && grid[ny][nx]))
            return true;
        }
      return false;
    };
    const merge = () => {
      for (let y = 0; y < cur.m.length; y++)
        for (let x = 0; x < cur.m[y].length; x++) {
          if (cur.m[y][x]) grid[cur.y + y][cur.x + x] = cur.c + 1;
        }
    };
    const sweep = () => {
      let rows = 0;
      for (let y = ROWS - 1; y >= 0; y--) {
        if (grid[y].every((v) => v)) {
          grid.splice(y, 1);
          grid.unshift(Array(COLS).fill(0));
          rows++;
          y++;
        }
      }
      setScore((s) => s + rows * 10);
      if (rows) Sound.play(Sound.beep);
    };

    const drawCell = (x: number, y: number, val: number) => {
      const px = x * SIZE,
        py = y * SIZE;
      ctx.fillStyle = val ? colors[val - 1] : "#111";
      ctx.fillRect(px, py, SIZE - 1, SIZE - 1);
    };
    const draw = () => {
      ctx.imageSmoothingEnabled = false;
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, COLS * SIZE, ROWS * SIZE);
      for (let y = 0; y < ROWS; y++)
        for (let x = 0; x < COLS; x++) drawCell(x, y, grid[y][x]);
      for (let y = 0; y < cur.m.length; y++)
        for (let x = 0; x < cur.m[y].length; x++)
          if (cur.m[y][x]) drawCell(cur.x + x, cur.y + y, cur.c + 1);
      ctx.fillStyle = "white";
      ctx.font = "10px monospace";
      ctx.fillText("SCORE " + score, 4, 12);
    };

    const drop = () => {
      if (!collide(cur.m, cur.x, cur.y + 1)) cur.y++;
      else {
        merge();
        sweep();
        cur = rndPiece();
        if (collide(cur.m, cur.x, cur.y)) {
          grid = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
          setScore(0);
          Sound.play(Sound.beep);
        }
      }
    };
    const move = (dx: number) => {
      if (!collide(cur.m, cur.x + dx, cur.y)) cur.x += dx;
    };
    const rot = () => {
      const nm = rotate(cur.m);
      if (!collide(nm, cur.x, cur.y)) cur.m = nm;
    };

    const key = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") move(-1);
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowUp") rot();
      if (e.key === "ArrowDown") drop();
    };

    const step = (t: number) => {
      if (!alive) return;
      const dt = t - t0;
      t0 = t;
      acc += dt;
      if (acc > speed) {
        acc = 0;
        drop();
      }
      draw();
      raf = requestAnimationFrame(step);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      cur = rndPiece();
      t0 = 0;
      acc = 0;
      alive = true;
      raf = requestAnimationFrame(step);
    };

    if (running) {
      window.addEventListener("keydown", key);
      start();
    }
    return () => {
      window.removeEventListener("keydown", key);
      cancelAnimationFrame(raf);
    };
  }, [running]);

  return (
    <div className="grid place-items-center gap-3">
      <canvas
        ref={ref}
        width={160}
        height={320}
        className="pixelated rounded-lg border border-white/20"
      />
      <div className="flex gap-2">
        <button
          className="rounded-xl bg-white text-black"
          onClick={() => {
            setRunning(true);
            Sound.play(Sound.beep);
          }}
        >
          Start
        </button>
        <button
          className="rounded-xl bg-white/10"
          onClick={() => {
            setRunning(false);
            Sound.play(Sound.key);
          }}
        >
          Stop
        </button>
      </div>
    </div>
  );
}

// -------------------------------------------------
// Testimonials — interactive terminal feed
// -------------------------------------------------
function Testimonials() {
  const items = [
    {
      handle: "@alice_dev",
      role: "PM",
      text: "Outstanding delivery with delightful micro-interactions.",
    },
    {
      handle: "@rahul_cto",
      role: "CTO",
      text: "Clean architecture, reliable releases, great comms.",
    },
    {
      handle: "@mina_design",
      role: "Designer",
      text: "Balances performance with polished visuals.",
    },
    {
      handle: "@lee_ops",
      role: "SRE",
      text: "Zero-downtime deploys and solid observability.",
    },
  ];
  const [idx, setIdx] = useState(0);
  const feedRef = useRef<HTMLDivElement | null>(null);

  // arrow keys & auto-scroll
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setIdx((i) => (i + 1) % items.length);
        Sound.play(Sound.key);
      }
      if (e.key === "ArrowLeft") {
        setIdx((i) => (i - 1 + items.length) % items.length);
        Sound.play(Sound.key);
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);
  useEffect(() => {
    const el = feedRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [idx]);

  return (
    <Section id="testimonials" className="py-24">
      <h2 className="text-3xl font-black mb-6 flex items-center gap-2">
        <Star className="h-6 w-6" /> Testimonials
      </h2>
      <NeonCard>
        <div className="p-0">
          <div className="flex items-center justify-between p-3 border-b border-white/10 text-xs uppercase tracking-[0.25em] text-white/60">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4" /> console://testimonials
            </div>
            <div className="flex items-center gap-1">
              <button
                className="icon-btn"
                onClick={() => {
                  setIdx((i) => (i - 1 + items.length) % items.length);
                  Sound.play(Sound.key);
                }}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                className="icon-btn"
                onClick={() => {
                  setIdx((i) => (i + 1) % items.length);
                  Sound.play(Sound.key);
                }}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div
            ref={feedRef}
            className="h-56 overflow-auto p-4 font-mono text-sm"
          >
            {[...Array(idx + 1)].map((_, i) => {
              const t = items[i % items.length];
              return (
                <div key={i} className="whitespace-pre-wrap mb-3">
                  <span className="text-emerald-300">{t.handle}</span>
                  <span className="text-white/50"> ({t.role})</span>
                  {": "}
                  <TypeLineOnce text={t.text} />
                </div>
              );
            })}
            <div className="text-white/40">▮</div>
          </div>
        </div>
      </NeonCard>
    </Section>
  );
}

function TypeLineOnce({ text }: { text: string }) {
  const [out, setOut] = useState("");
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      if (i < text.length) {
        setOut((prev) => prev + text[i]);
        i++;
        Sound.play(Sound.key);
      } else clearInterval(id);
    }, 12 + Math.random() * 20);
    return () => clearInterval(id);
  }, []);
  return <span>{out}</span>;
}

// -------------------------------------------------
// Contact (terminal-style form) wired to /api/contact (Resend)
// -------------------------------------------------
function Contact() {
  const [sent, setSent] = useState(false);
  const [log, setLog] = useState<string[]>([]);
  const logPush = (l: string) => setLog((v) => [...v, l]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    setSent(true);
    // Simulated transmission log + real call
    logPush("$ transmit --secure contact.json");
    logPush("[handshake] initializing…");
    Sound.play(Sound.beep);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        logPush("[200] delivered to relay: ok");
        logPush('result: "message queued"');
      } else {
        logPush(`[${res.status}] error: ${data?.error || "unknown"}`);
        logPush("fallback: email me at your@email");
      }
    } catch (err: unknown) {
      logPush("[net] transport failed");
      logPush("fallback: email me at your@email");
    }
    logPush("done.");
  }

  return (
    <Section id="contact" className="py-24">
      <h2 className="text-3xl font-black mb-8 flex items-center gap-2">
        <Mail className="h-6 w-6" /> Contact
      </h2>
      <NeonCard>
        <div className="p-6">
          {!sent ? (
            <form className="grid gap-4 max-w-xl" onSubmit={onSubmit}>
              <TerminalInput label="Your Name" name="name" />
              <TerminalInput label="Your Email" name="email" type="email" />
              <TerminalInput label="Subject" name="subject" />
              <TerminalTextarea label="Your Message" name="message" />
              <button
                className="rounded-xl bg-white text-black hover:bg-white/90 w-max"
                onMouseEnter={() => Sound.play(Sound.key)}
              >
                <Mail className="h-4 w-4 mr-2" />
                Send
              </button>
            </form>
          ) : (
            <ConsoleFrame title="tx://contact">
              <div className="font-mono text-sm space-y-1">
                {log.map((l, i) => (
                  <div key={i}>{l}</div>
                ))}
                <div className="text-white/40">▮</div>
              </div>
            </ConsoleFrame>
          )}
        </div>
      </NeonCard>
    </Section>
  );
}

function TerminalInput({
  label,
  name,
  type = "text",
}: {
  label: string;
  name: string;
  type?: string;
}) {
  return (
    <label className="grid gap-1">
      <span className="text-xs uppercase tracking-[0.25em] text-white/60">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required
        className="rounded-xl border border-white/10 bg-black px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-400/50"
      />
    </label>
  );
}
function TerminalTextarea({ label, name }: { label: string; name: string }) {
  return (
    <label className="grid gap-1">
      <span className="text-xs uppercase tracking-[0.25em] text-white/60">
        {label}
      </span>
      <textarea
        name={name}
        required
        rows={5}
        className="rounded-xl border border-white/10 bg-black px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-400/50"
      />
    </label>
  );
}

// -------------------------------------------------
// Footer
// -------------------------------------------------
function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <Section className="flex items-center justify-between">
        <div className="text-sm text-white/60">
          © 2025 DevQuest. Built with Next.js • Tailwind • Framer Motion.
        </div>
        <div className="flex items-center gap-2 text-xs text-white/50">
          <Keyboard className="h-4 w-4" /> Try:{" "}
          <kbd className="kbd">whoami</kbd>,{" "}
          <kbd className="kbd">goto projects</kbd>,{" "}
          <kbd className="kbd">play snake</kbd>
        </div>
      </Section>
    </footer>
  );
}

// -------------------------------------------------
// Terminal Overlay (bottom command-line)
// -------------------------------------------------
function TerminalOverlay() {
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

// -------------------------------------------------
// Sound toggle (global)
// -------------------------------------------------
function SoundToggle() {
  const [on, setOn] = useState(!Sound.muted);
  return (
    <button
      className="fixed right-4 bottom-40 z-50 p-3 rounded-full border border-white/10 bg-white/10 hover:bg-white/20"
      onClick={() => {
        Sound.muted = !Sound.muted;
        setOn(!Sound.muted);
      }}
      aria-label="Toggle sound"
    >
      {on ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
    </button>
  );
}

// -------------------------------------------------
// Background FX
// -------------------------------------------------
function ParallaxBackground() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 800], [0, 60]);
  const y2 = useTransform(scrollY, [0, 800], [0, 120]);
  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{ y: y2 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.12),transparent_60%)]" />
      </motion.div>
      <motion.canvas
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 opacity-60 pixelated"
        style={{ y: y1 }}
        ref={(node) => {
          if (!node) return;
          const ctx = node.getContext("2d")!;
          const resize = () => {
            node.width = window.innerWidth;
            node.height = window.innerHeight;
          };
          resize();
          const dots = Array.from({ length: 140 }, () => ({
            x: Math.random() * node.width,
            y: Math.random() * node.height,
            s: 1 + Math.random() * 1.5,
            vy: 0.1 + Math.random() * 0.4,
          }));
          let raf = 0;
          const step = () => {
            ctx.clearRect(0, 0, node.width, node.height);
            ctx.fillStyle = "rgba(255,255,255,0.05)";
            dots.forEach((d) => {
              d.y += d.vy;
              if (d.y > node.height) d.y = -4;
              ctx.fillRect(d.x, d.y, d.s, d.s);
            });
            raf = requestAnimationFrame(step);
          };
          step();
          const onR = () => resize();
          window.addEventListener("resize", onR);
          return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", onR);
          };
        }}
      />
    </>
  );
}
function Scanlines() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 mix-blend-overlay opacity-[0.12]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
        backgroundSize: "100% 3px",
      }}
    />
  );
}

function GlobalStyles() {
  return (
    <style jsx global>{`
      html,
      body {
        background: #000;
      }
      .pixelated {
        image-rendering: pixelated;
        image-rendering: crisp-edges;
      }
      .nav-link {
        padding: 6px 10px;
        border-radius: 10px;
        border: 1px solid transparent;
      }
      .nav-link:hover {
        background: rgba(255, 255, 255, 0.08);
        border-color: rgba(255, 255, 255, 0.12);
      }
      .blink {
        animation: blink 1s steps(2, start) infinite;
      }
      @keyframes blink {
        to {
          visibility: hidden;
        }
      }
      .icon-btn {
        display: inline-grid;
        place-items: center;
        height: 28px;
        width: 28px;
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.12);
      }
      .icon-btn:hover {
        background: rgba(255, 255, 255, 0.12);
      }
      .kbd {
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.15);
        padding: 0.15rem 0.4rem;
        border-radius: 0.4rem;
      }
    `}</style>
  );
}

/* =============================================================
   CREATE THIS FILE: app/api/contact/route.ts (Resend email)
   =============================================================
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();
    const r = await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: ['your.email@domain.com'],
      subject: subject || 'New Contact Submission',
      reply_to: email,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });
    if (r.error) return NextResponse.json({ error: r.error }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch (e:any) {
    return NextResponse.json({ error: e?.message || 'error' }, { status: 500 });
  }
}

// .env.local:
// RESEND_API_KEY=your_key_here
// ============================================================= */
