'use client";'

import { Sound } from "@/utils/constants";
import { Volume2, VolumeX } from "lucide-react";
import { useState } from "react";

export default function SoundToggle() {
  const [on, setOn] =  useState(!Sound.muted);
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
