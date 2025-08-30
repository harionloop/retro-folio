'use client";'

export default function IconLink({
  Icon,
  href,
  label,
}: {
  Icon: unknown;
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10"
      onMouseEnter={() => Sound.play(Sound.key)}
    >
      <Icon className="h-4 w-4" />
    </a>
  );
}
