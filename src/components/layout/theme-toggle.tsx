"use client";

import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const t = useTranslations("a11y");
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label={t("toggleTheme")}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="border-(--glass-border) bg-(--glass-bg) hover:text-accent border inline-flex size-10 items-center justify-center rounded-full transition-colors"
    >
      {/* both rendered; CSS picks one, so no hydration mismatch */}
      <span aria-hidden className="dark:hidden">
        ☾
      </span>
      <span aria-hidden className="hidden dark:inline">
        ☀
      </span>
    </button>
  );
}
