'use client";'

import { useEffect, useRef } from "react";

export default function TerminalTimeline({
  timeline,
}: {
  timeline: { year: string; line: string }[];
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const id = setInterval(() => {
      el.scrollTop = el.scrollHeight;
    }, 1500);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      ref={ref}
      className="h-60 overflow-auto font-mono text-xs text-white/80 leading-6"
    >
      {timeline.map((t, i) => (
        <div key={i} className="whitespace-pre">
          <span className="text-emerald-300">$</span> echo &quot;{t.year} —{" "}
          {t.line}&quot;
        </div>
      ))}
      <div className="mt-2 animate-pulse">▮</div>
    </div>
  );
}
