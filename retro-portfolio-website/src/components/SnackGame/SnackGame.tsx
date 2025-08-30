'use client";'

import { useEffect, useRef, useState } from "react";
import { Sound } from "@/utils/constants";

export default function SnakeGame() {
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
