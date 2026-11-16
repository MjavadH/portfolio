"use client";

import { motion, useReducedMotion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function LocaleSwitcher({ variant = "glyph" }: { variant?: "glyph" | "segmented" }) {
  const t = useTranslations("a11y");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const reduce = useReducedMotion();
  const [pending, startTransition] = useTransition();

  const go = (next: "fa" | "en") => {
    if (next === locale) return;
    startTransition(() => {
      const hash = window.location.hash;
      router.replace(`${pathname}${hash}`, { locale: next });
    });
  };

  if (variant === "segmented") {
    return (
      <div
        role="toolbar"
        aria-label={t("switchLanguage")}
        data-pending={pending || undefined}
        className="relative flex items-center rounded-full border border-line bg-(--bg-veil)/70 p-0.5
          transition-opacity duration-300 data-pending:opacity-60"
      >
        <span
          aria-hidden
          className={cn(
            "absolute inset-y-0.5 inset-s-0.5 w-[calc(50%-2px)] rounded-full bg-fg",
            "transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            locale === "en" && "translate-x-full rtl:-translate-x-full",
          )}
        />
        {(["fa", "en"] as const).map((l) => (
          <button
            key={l}
            type="button"
            lang={l}
            onClick={() => go(l)}
            aria-pressed={locale === l}
            className="relative z-10 grid h-8 min-w-12 place-items-center rounded-full text-[0.75rem]
              font-semibold transition-colors duration-200
              focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-(--focus)"
          >
            <span className={locale === l ? "text-bg" : "text-muted"}>
              {l === "fa" ? "فارسی" : "EN"}
            </span>
          </button>
        ))}
      </div>
    );
  }

  const next = locale === "fa" ? "en" : "fa";

  return (
    <button
      type="button"
      onClick={() => go(next)}
      lang={next}
      aria-label={t("switchLanguage")}
      data-pending={pending || undefined}
      className="group relative grid size-9 place-items-center rounded-full text-fg
        transition-colors duration-200 hover:text-accent-ink
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--focus)
        data-pending:pointer-events-none"
    >
      <span
        aria-hidden
        className="absolute inset-0 scale-50 rounded-full bg-(--accent)/12 opacity-0
          transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
          group-hover:scale-100 group-hover:opacity-100"
      />
      {pending ? (
        <span aria-hidden className="relative flex items-center gap-0.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="size-0.75 rounded-full bg-current"
              animate={reduce ? undefined : { opacity: [0.25, 1, 0.25] }}
              transition={{ duration: 0.9, repeat: Number.POSITIVE_INFINITY, delay: i * 0.13 }}
            />
          ))}
        </span>
      ) : (
        <span className="relative text-[0.75rem] font-semibold leading-none">
          {next === "fa" ? "فا" : "EN"}
        </span>
      )}
      <span
        aria-hidden
        className="absolute bottom-1.5 h-px w-0 bg-accent transition-[width] duration-300
          ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-3.5"
      />
    </button>
  );
}
