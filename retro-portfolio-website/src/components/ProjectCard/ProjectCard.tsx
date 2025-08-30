'use client";'

import { Sparkles } from "lucide-react";
import NeonCard from "../NeonCard/NeonCard";
import { Code2 } from "lucide-react";
import Badge from "../Badge/Badge";
import { motion } from "framer-motion";
import { Sound } from "@/utils/constants";

export default function ProjectCard({ i }: { i: number }) {
  return (
    <NeonCard>
      <div className="p-6">
        <div className="flex items-center gap-3 text-white/70 text-xs uppercase tracking-[0.25em]">
          <Sparkles className="h-4 w-4" /> Featured Project
        </div>
        <motion.h3
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          className="text-2xl font-black mt-2"
        >
          Cyber Arcade App #{i}
        </motion.h3>
        <p className="text-white/80 mt-2">
          A modern app with a retro soul. Fast, accessible, and sprinkled with
          playful interactions.
        </p>
        <div className="mt-4 flex gap-2">
          <Badge>Next.js</Badge>
          <Badge>TypeScript</Badge>
          <Badge>Tailwind</Badge>
        </div>
        <div className="mt-6 flex gap-3">
          <button
            className="rounded-xl bg-white text-black hover:bg-white/90 flex align-items-center p-2"
            onMouseEnter={() => Sound.play(Sound.key)}
          >
            <Code2 className="h-4 w-4 mr-2" />
            Source
          </button>
          <button
            className="rounded-xl bg-white/10 hover:bg-white/20 p-2"
            onMouseEnter={() => Sound.play(Sound.key)}
          >
            Live Demo
          </button>
        </div>
      </div>
    </NeonCard>
  );
}
