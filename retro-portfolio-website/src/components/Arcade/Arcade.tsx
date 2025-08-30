'use client";'

import { useState } from "react";
import { Sound } from "@/utils/constants";
import SnakeGame from "../SnackGame/SnackGame";
import PongGame from "../PongGame/PongGame";
import BreakoutGame from "../BreakoutGame/BreakoutGame";
import TetrisGame from "../TetrisGame/TetrisGame";
import ConsoleFrame from "../ConsoleFrame/ConsoleFrame";
import ArcadePanel from "../ArcadePanel/ArcadePanel";

export default function Arcade() {
  type Tab = "Snake" | "Pong" | "Breakout" | "Tetris";
  const tabs: Tab[] = ["Snake", "Pong", "Breakout", "Tetris"];
  const [tab, setTab] = useState<Tab>("Snake");

  return (
    <div className="space-y-4 w-[600px]">
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
