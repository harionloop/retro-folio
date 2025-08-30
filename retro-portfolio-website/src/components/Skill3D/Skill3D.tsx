'use client";'

import { Sound } from "@/utils/constants";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Skill3D({ label, hint }: { label: string; hint: string }) {
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
