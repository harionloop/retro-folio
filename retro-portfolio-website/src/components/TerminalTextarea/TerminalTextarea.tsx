'use client";'

export default function TerminalTextarea({ label, name }: { label: string; name: string }) {
  return (
    <label className="grid gap-1">
      <span className="text-xs uppercase tracking-[0.25em] text-white/60">
        {label}
      </span>
      <textarea
        name={name}
        required
        rows={5}
        className="rounded-xl border border-white/10 bg-black px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-400/50"
      />
    </label>
  );
}
