'use client";'

export default function NeonCard({ children }: React.PropsWithChildren) {
  return (
    <div className="relative rounded-3xl border border-white/10 bg-white/5 shadow-[0_0_0_3px_rgba(255,255,255,0.06),0_20px_80px_rgba(0,0,0,0.6)] overflow-hidden">
      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10" />
      <div className="absolute -inset-px rounded-3xl bg-[radial-gradient(60%_60%_at_50%_10%,rgba(56,189,248,0.15),rgba(0,0,0,0))]" />
      <div className="relative">{children}</div>
    </div>
  );
}
