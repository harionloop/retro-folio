'use client";'

export default function Badge({ children }: React.PropsWithChildren) {
  return (
    <span className="px-2 py-1 rounded-lg bg-white/10 border border-white/10 text-xs">
      {children}
    </span>
  );
}
