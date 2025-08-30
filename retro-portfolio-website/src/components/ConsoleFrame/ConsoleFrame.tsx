'use client";'

export default function ConsoleFrame({
  title,
  children,
}: React.PropsWithChildren<{ title: string }>) {
  return (
    <div className="relative rounded-2xl border border-white/15 bg-[#0a0a0a] p-3 shadow-[0_0_0_3px_#111]">
      <div className="mb-2 flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-red-500/80"></div>
        <div className="h-3 w-3 rounded-full bg-yellow-400/80"></div>
        <div className="h-3 w-3 rounded-full bg-emerald-400/80"></div>
        <div className="ml-3 text-xs uppercase tracking-[0.25em] text-white/60">
          {title}
        </div>
      </div>
      <div className="rounded-xl border border-white/10 bg-black p-3 pixelated">
        {children}
      </div>
    </div>
  );
}
