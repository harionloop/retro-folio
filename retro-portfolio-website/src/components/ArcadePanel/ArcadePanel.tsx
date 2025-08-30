'use client";'

export default function ArcadePanel({ tab }: { tab: string }) {
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
