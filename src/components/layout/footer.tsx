"use client";

import { useTranslations } from "next-intl";
import { Monogram } from "@/components/geometry/monogram";
import { GitHubIcon, LinkedInIcon, MailIcon, TelegramIcon } from "@/components/ui/brand-icons";
import { siteConfig } from "@/lib/site";
import { TazhibBand } from "@/components/geometry/tazhib-band";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line pb-24 md:pb-0">
      <div className="shell flex flex-col gap-7 py-9 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Monogram className="size-8 text-fg" />
          <div>
            <p className="small font-semibold" dir="ltr">
              MjavadH
            </p>
            <p className="micro text-muted">{t("tagline")}</p>
          </div>
        </div>

        <div className="micro text-muted flex flex-wrap items-center gap-x-5 gap-y-2">
          <a
            href={`mailto:${siteConfig.email}`}
            className="link-quiet inline-flex items-center gap-1.5"
            dir="ltr"
          >
            <MailIcon className="size-3.5 opacity-70" />
            {siteConfig.email}
          </a>
          <a
            href={siteConfig.telegram}
            target="_blank"
            rel="noreferrer"
            className="link-quiet inline-flex items-center gap-1.5"
          >
            <TelegramIcon className="size-3.5 opacity-70" />
            Telegram
          </a>
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noreferrer"
            className="link-quiet inline-flex items-center gap-1.5"
          >
            <GitHubIcon className="size-3.5 opacity-70" />
            GitHub
          </a>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noreferrer"
            className="link-quiet inline-flex items-center gap-1.5"
          >
            <LinkedInIcon className="size-3.5 opacity-70" />
            LinkedIn
          </a>
          <span aria-hidden className="hidden h-3 w-px bg-line-strong sm:block" />
          <span className="tabular-nums">© {year}</span>
        </div>
      </div>
    </footer>
  );
}
