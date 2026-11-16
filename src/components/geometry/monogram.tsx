import { cn } from "@/lib/utils";

export function Monogram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden className={cn("size-8", className)}>
      <g stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
        <path d="M13.9 13.9h20.2v20.2H13.9z" opacity="0.55" />
        <path d="M24 9.7 38.3 24 24 38.3 9.7 24z" />
      </g>
      <path
        d="M16.4 31.2V19.6L24 27.4l7.6-7.8v11.6"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="27.4" r="1.55" fill="var(--gold)" />
    </svg>
  );
}

const STAR = (outer: number, inner: number, turn = 0) =>
  Array.from({ length: 16 }, (_, i) => {
    const r = i % 2 === 0 ? outer : inner;
    const a = -Math.PI / 2 + turn + (i * Math.PI) / 8;
    return `${(24 + r * Math.cos(a)).toFixed(2)},${(24 + r * Math.sin(a)).toFixed(2)}`;
  }).join(" ");

const STAR_OUTER = STAR(12.6, 6.3);
const STAR_INNER = STAR(7.4, 3.7, Math.PI / 8);

export function Rosette({
  className,
  size = 12,
}: {
  className?: string;
  size?: number | null;
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden
      style={size === null ? undefined : { inlineSize: size, blockSize: size }}
      className={cn("shrink-0", className)}
    >
      <polygon points={STAR_OUTER} fill="none" stroke="currentColor" strokeWidth="1.7" />
      <polygon points={STAR_INNER} fill="none" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

export function StarMark({ className, size = 10 }: { className?: string; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden className={className}>
      <path
        d="M12 2.6 15.1 8.9 21.4 12 15.1 15.1 12 21.4 8.9 15.1 2.6 12 8.9 8.9z"
        fill="currentColor"
      />
    </svg>
  );
}
