"use client";

import { Keyboard } from "lucide-react";
import Section from "../Section/Section";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <Section className="flex items-center justify-between">
        <div className="text-sm text-white/60">
          © 2025 DevQuest. Built with Next.js • Tailwind • Framer Motion.
        </div>
        <div className="flex items-center gap-2 text-xs text-white/50">
          <Keyboard className="h-4 w-4" /> Try:{" "}
          <kbd className="kbd">whoami</kbd>,{" "}
          <kbd className="kbd">goto projects</kbd>,{" "}
          <kbd className="kbd">play snake</kbd>
        </div>
      </Section>
    </footer>
  );
}
