"use client";

import { useLocale, useTranslations } from "next-intl";
import { Monogram } from "@/components/geometry/monogram";
import { GitHubIcon, LinkedInIcon, MailIcon, TelegramIcon } from "@/components/ui/brand-icons";
import type { Locale } from "@/i18n/routing";
import { localizeDigits } from "@/lib/project-display";
import { siteConfig } from "@/lib/site";

const LINKS = [
  { key: "emailLabel", href: `mailto:${siteConfig.email}`, Icon: MailIcon, external: false },
  { key: "telegramLabel", href: siteConfig.telegram, Icon: TelegramIcon, external: true },
  { key: "githubLabel", href: siteConfig.github, Icon: GitHubIcon, external: true },
  { key: "linkedinLabel", href: siteConfig.linkedin, Icon: LinkedInIcon, external: true },
] as const;

export function Footer() {
  const t = useTranslations("footer");
  const tc = useTranslations("contact");
  const locale = useLocale() as Locale;
  const fa = locale === "fa";
  const year = localizeDigits(String(new Date().getFullYear()), fa);

  return (
    <footer className="relative pb-28 pt-12 md:pb-8">
      <div className="shell relative">
        <div className="glass mx-auto flex w-full max-w-4xl flex-col items-center gap-5 rounded-[1.75rem] px-6 py-6 md:flex-row md:justify-between md:gap-6 md:rounded-full md:px-7 md:py-3.5">
          <div className="flex items-center gap-3 md:w-1/3">
            <Monogram className="size-8 text-fg" />
            <p className="small font-semibold" dir="ltr">
              MjavadH
            </p>
          </div>

          <nav className="md:w-1/3 md:place-items-center" aria-label={tc("elsewhere")}>
            <ul className="flex items-center gap-2">
              {LINKS.map(({ key, href, Icon, external }) => (
                <li key={key}>
                  <a
                    href={href}
                    aria-label={tc(key)}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="grid size-10 place-items-center rounded-full border border-(--glass-border) bg-(--glass-bg) text-muted shadow-[inset_0_1px_0_var(--glass-highlight)] transition-[color,border-color,translate] duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent-ink focus-visible:outline-offset-[3px]"
                  >
                    <Icon className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <p className="micro flex md:justify-end gap-x-2 text-muted md:w-1/3">
            <span className="tabular-nums" dir={fa ? "rtl" : "ltr"}>
              © {year}
            </span>
            <span>{t("rights")}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
