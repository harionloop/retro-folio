'use client";'

import { useEffect, useState } from "react";
import { Sound } from "@/utils/constants";

export default function TypeLineOnce({ text }: { text: string }) {
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
