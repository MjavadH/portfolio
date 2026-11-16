"use client";

import { useTranslations } from "next-intl";

export function SkipLink() {
  const t = useTranslations("a11y");
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:inset-s-4 focus:top-4 focus:z-60
        focus:rounded-full focus:bg-fg focus:px-5 focus:py-2.5 focus:text-bg focus:outline-2
        focus:outline-offset-2 focus:outline-(--focus)"
    >
      {t("skipToContent")}
    </a>
  );
}
