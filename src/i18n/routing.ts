import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fa", "en"],
  defaultLocale: "fa",
  // Persian lives at "/", English at "/en"
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];

export const localeDirection: Record<Locale, "rtl" | "ltr"> = {
  fa: "rtl",
  en: "ltr",
};
