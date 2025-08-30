'use client";'

export default function HoloKV({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/40 p-3">
      <div className="text-[10px] uppercase tracking-[0.25em] text-white/50">
        {k}
      </div>
      <div className="text-lg">{v}</div>
    </div>
  );
}
