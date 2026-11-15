"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export function LocaleSwitcher() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const next = locale === "fa" ? "en" : "fa";

  return (
    <button
      type="button"
      aria-label={t("a11y.switchLanguage")}
      onClick={() => router.replace(pathname, { locale: next })}
      className="border-(--glass-border) bg-(--glass-bg) hover:text-accent border inline-flex h-10 min-w-10 items-center justify-center rounded-full px-3 text-sm transition-colors"
    >
      {t("common.switchLanguageLabel")}
    </button>
  );
}
