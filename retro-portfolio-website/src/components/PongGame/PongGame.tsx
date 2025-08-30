'use client";'

import { useEffect, useRef, useState } from "react";
import { Sound } from "@/utils/constants";

export default function PongGame() {
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
          className="rounded-xl bg-white text-black p-2"
          onClick={() => {
            setRunning(true);
            Sound.play(Sound.beep);
          }}
        >
          Start
        </button>
        <button
          className="rounded-xl bg-white/10 p-2"
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
