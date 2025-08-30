'use client";'

export default function Scanlines() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 mix-blend-overlay opacity-[0.12]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
        backgroundSize: "100% 3px",
      }}
    />
  );
}
