"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ variant = "glyph" }: { variant?: "glyph" | "segmented" }) {
  const t = useTranslations("a11y");
  const reduce = useReducedMotion();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  const isDark = mounted && resolvedTheme === "dark";

  if (variant === "segmented") {
    return (
      <fieldset
        data-active={mounted ? (isDark ? "dark" : "light") : undefined}
        className="relative m-0 flex min-w-0 items-center rounded-full border
          border-line bg-(--bg-veil)/70 p-0.5"
      >
        <legend className="sr-only">{t("toggleTheme")}</legend>
        <span
          aria-hidden
          className={cn(
            "absolute inset-y-0.5 inset-s-0.5 w-[calc(50%-2px)] rounded-full bg-fg",
            "transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            isDark && "translate-x-full rtl:-translate-x-full",
            !mounted && "opacity-0",
          )}
        />
        <button
          type="button"
          onClick={() => setTheme("light")}
          aria-pressed={!isDark}
          aria-label={t("themeLight")}
          className="relative z-10 grid h-8 w-12 place-items-center rounded-full
            focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-(--focus)"
        >
          <span className={isDark ? "text-muted" : "text-bg"}>
            <Sun className="size-3.75" />
          </span>
        </button>
        <button
          type="button"
          onClick={() => setTheme("dark")}
          aria-pressed={isDark}
          aria-label={t("themeDark")}
          className="relative z-10 grid h-8 w-12 place-items-center rounded-full
            focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-(--focus)"
        >
          <span className={isDark ? "text-bg" : "text-muted"}>
            <Moon className="size-3.75" />
          </span>
        </button>
      </fieldset>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={
        mounted ? (isDark ? t("toggleThemeLight") : t("toggleThemeDark")) : t("toggleTheme")
      }
      aria-pressed={isDark}
      className="group relative grid size-9 place-items-center rounded-full text-fg
        transition-colors duration-200 hover:text-accent-ink
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--focus)"
    >
      <span
        aria-hidden
        className="absolute inset-0 scale-50 rounded-full bg-(--accent)/12 opacity-0
          transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
          group-hover:scale-100 group-hover:opacity-100"
      />
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "moon" : "sun"}
          aria-hidden
          initial={reduce ? false : { rotate: isDark ? -70 : 70, scale: 0.4, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={reduce ? undefined : { rotate: isDark ? 70 : -70, scale: 0.4, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative block size-3.75"
        >
          {isDark ? <Moon className="size-full" /> : <Sun className="size-full" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

function Sun({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
    >
      <circle cx="10" cy="10" r="3.4" />
      <path d="M10 1.8v1.9M10 16.3v1.9M1.8 10h1.9M16.3 10h1.9M4.2 4.2l1.4 1.4M14.4 14.4l1.4 1.4M15.8 4.2l-1.4 1.4M5.6 14.4l-1.4 1.4" />
    </svg>
  );
}

function Moon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
    >
      <path d="M16 12.2A6.4 6.4 0 0 1 7.8 4a6.5 6.5 0 1 0 8.2 8.2Z" />
    </svg>
  );
}
