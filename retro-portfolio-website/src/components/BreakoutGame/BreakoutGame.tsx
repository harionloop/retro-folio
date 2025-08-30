'use client";'

import { useEffect, useRef, useState } from "react";
import { Sound } from "@/utils/constants";


export default function BreakoutGame() {
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
