import { Rosette } from "./monogram";

export function PatternDivider({ className }: { className?: string }) {
  return (
    <div aria-hidden className={className}>
      <div className="flex items-center gap-4">
        <span className="divider-rule h-px flex-1" />
        <Rosette size={60} className="text-line-strong sm:hidden" />
        <Rosette size={50} className="hidden text-line-strong sm:block" />
        <span className="divider-rule h-px flex-1" />
      </div>
    </div>
  );
}

export function SectionMark({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-muted micro flex items-center gap-2.5">
      <Rosette size={15} className="text-gold" />
      <span>{children}</span>
    </p>
  );
}
