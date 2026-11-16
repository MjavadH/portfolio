import { Fragment } from "react";
import { localizeDigits } from "@/lib/project-display";

export function ProjectYears({ value, fa }: { value: string; fa: boolean }) {
  const parts = value.split(/[–-]/).map((part) => localizeDigits(part.trim(), fa));

  return (
    <span className="inline-flex items-center gap-x-1.5 tabular-nums" dir={fa ? "rtl" : "ltr"}>
      {parts.map((part, i) => (
        <Fragment key={i === 0 ? "from" : "to"}>
          {i > 0 && (
            <>
              <span className="sr-only">{fa ? "تا" : "to"}</span>
              <span aria-hidden className="h-px w-2.5 bg-line-strong" />
            </>
          )}
          <span>{part}</span>
        </Fragment>
      ))}
    </span>
  );
}
