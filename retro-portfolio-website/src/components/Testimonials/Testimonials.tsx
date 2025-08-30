'use client";'

import { useEffect, useRef, useState } from "react";
import { Sound } from "@/utils/constants";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Terminal,
} from "lucide-react";
import Section from "../Section/Section";
import NeonCard from "../NeonCard/NeonCard";
import TypeLineOnce from "../TypeLineOnce/TypeLineOnce";

export default function Testimonials() {
  const items = [
    {
      handle: "@alice_dev",
      role: "PM",
      text: "Outstanding delivery with delightful micro-interactions.",
    },
    {
      handle: "@rahul_cto",
      role: "CTO",
      text: "Clean architecture, reliable releases, great comms.",
    },
    {
      handle: "@mina_design",
      role: "Designer",
      text: "Balances performance with polished visuals.",
    },
    {
      handle: "@lee_ops",
      role: "SRE",
      text: "Zero-downtime deploys and solid observability.",
    },
  ];
  const [idx, setIdx] = useState(0);
  const feedRef = useRef<HTMLDivElement | null>(null);

  // arrow keys & auto-scroll
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setIdx((i) => (i + 1) % items.length);
        Sound.play(Sound.key);
      }
      if (e.key === "ArrowLeft") {
        setIdx((i) => (i - 1 + items.length) % items.length);
        Sound.play(Sound.key);
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);
  useEffect(() => {
    const el = feedRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [idx]);

  return (
    <Section id="testimonials" className="py-24">
      <h2 className="text-3xl font-black mb-6 flex items-center gap-2">
        <Star className="h-6 w-6" /> Testimonials
      </h2>
      <NeonCard>
        <div className="p-0">
          <div className="flex items-center justify-between p-3 border-b border-white/10 text-xs uppercase tracking-[0.25em] text-white/60">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4" /> console://testimonials
            </div>
            <div className="flex items-center gap-1">
              <button
                className="icon-btn"
                onClick={() => {
                  setIdx((i) => (i - 1 + items.length) % items.length);
                  Sound.play(Sound.key);
                }}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                className="icon-btn"
                onClick={() => {
                  setIdx((i) => (i + 1) % items.length);
                  Sound.play(Sound.key);
                }}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div
            ref={feedRef}
            className="h-56 overflow-auto p-4 font-mono text-sm"
          >
            {[...Array(idx + 1)].map((_, i) => {
              const t = items[i % items.length];
              return (
                <div key={i} className="whitespace-pre-wrap mb-3">
                  <span className="text-emerald-300">{t.handle}</span>
                  <span className="text-white/50"> ({t.role})</span>
                  {": "}
                  <TypeLineOnce text={t.text} />
                </div>
              );
            })}
            <div className="text-white/40">▮</div>
          </div>
        </div>
      </NeonCard>
    </Section>
  );
}
