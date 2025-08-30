'use client";'

import { motion } from "framer-motion";

export default function Progress({ label, value }: { label: string; value: number }) {
  return (
    <div className="mt-3">
      <div className="flex justify-between text-xs text-white/70">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-white/10 overflow-hidden mt-1">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          transition={{ duration: 0.8 }}
          className="h-full bg-gradient-to-r from-cyan-400 to-fuchsia-400"
        />
      </div>
    </div>
  );
}
