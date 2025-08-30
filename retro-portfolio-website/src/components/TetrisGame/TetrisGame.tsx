'use client";'

import { useEffect, useRef, useState } from "react";
import { Sound } from "@/utils/constants";

export default function TetrisGame() {
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
