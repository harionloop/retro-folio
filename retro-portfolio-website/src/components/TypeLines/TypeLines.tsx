'use client";'

import { Sound } from "@/utils/constants";
import { useEffect, useState } from "react";

export default function TypeLines({ lines }: { lines: string[] }) {
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
