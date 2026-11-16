"use client";

import { useLocale, useTranslations } from "next-intl";
import { useId } from "react";
import { SectionMark } from "@/components/geometry/pattern-divider";
import { Shamse } from "@/components/geometry/shamse";
import { GsapReveal } from "@/components/motion/gsap-reveal";
import { Reveal } from "@/components/motion/reveal";
import { articlesByDate, languageNote } from "@/content/articles";
import type { Locale } from "@/i18n/routing";

const STAR = Array.from({ length: 16 }, (_, i) => {
  const a = (i * Math.PI) / 8;
  const r = i % 2 ? 4.6 : 10;
  return `${(12 + r * Math.sin(a)).toFixed(2)},${(12 - r * Math.cos(a)).toFixed(2)}`;
}).join(" ");

export function Articles() {
  const t = useTranslations("articles");
  const locale = useLocale() as Locale;
  const uid = useId();
  const note = languageNote[locale];

  return (
    <section
      id="articles"
      aria-labelledby="articles-heading"
      className="section-y relative scroll-mt-24"
    >
      <div className="shell relative">
        <Shamse className="-inset-e-16 -top-20 size-88 sm:-inset-e-28 sm:size-136" />
        <Shamse
          direction={-1}
          className="-bottom-24 -inset-s-16 size-64 sm:-inset-s-24 sm:size-96"
        />

        <Reveal>
          <SectionMark>{t("title")}</SectionMark>
          <h2 id="articles-heading" className="h2 mt-5 max-w-[20ch]">
            {t("heading")}
          </h2>
          {note && <p className="small mt-4 max-w-2xl text-muted">{note}</p>}
        </Reveal>

        <div className="glass block-y overflow-hidden rounded-3xl">
          <GsapReveal as="ol" selector="[data-article]" stagger={0.1} distance={18}>
            {articlesByDate.map((article) => {
              const titleId = `${uid}-${article.id}-title`;
              const venueId = `${uid}-${article.id}-venue`;
              const openId = `${uid}-${article.id}-open`;

              return (
                <li
                  key={article.id}
                  data-article
                  className="border-t border-(--glass-edge) shadow-[inset_0_1px_0_var(--glass-highlight)] first:border-t-0 first:shadow-none"
                >
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-labelledby={titleId}
                    aria-describedby={`${venueId} ${openId}`}
                    className="group/paper grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-8 gap-y-4 px-6 py-7 focus-visible:-outline-offset-4 sm:grid-cols-[9.5rem_minmax(0,1fr)_auto] sm:px-8 sm:py-8"
                  >
                    <span className="col-start-1 row-start-1 flex items-center gap-2 pt-1.5">
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className="size-3 shrink-0 fill-gold transition-transform duration-500 group-hover/paper:rotate-[22.5deg]"
                      >
                        <polygon points={STAR} />
                      </svg>
                      <time dateTime={article.date} className="micro tabular-nums text-muted">
                        {locale === "fa" ? article.dateFa : article.dateEn}
                      </time>
                    </span>

                    <div className="col-span-2 row-start-2 min-w-0 sm:col-span-1 sm:col-start-2 sm:row-start-1">
                      <h3
                        id={titleId}
                        className="h3 text-balance transition-colors duration-300 group-hover/paper:text-accent-ink group-focus-visible/paper:text-accent-ink"
                      >
                        {article.title[locale]}
                      </h3>

                      <p id={venueId} className="small mt-2 text-muted">
                        {article.venue[locale]}
                      </p>

                      <p className="small mt-3 max-w-2xl leading-[1.7]">
                        {article.details[locale]}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {article.keywords.map((keyword) => (
                          <span
                            key={keyword}
                            dir="ltr"
                            className="micro rounded-full border border-(--glass-border) bg-(--glass-bg) px-2.5 py-0.5 text-muted shadow-[inset_0_1px_0_var(--glass-highlight)]"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>

                    <span className="col-start-2 row-start-1 inline-flex items-center gap-3 text-accent-ink sm:col-start-3">
                      <span id={openId} className="micro sr-only lg:not-sr-only">
                        {t("open")}
                      </span>
                      <span
                        aria-hidden
                        className="grid size-9 place-items-center rounded-full border border-(--glass-border) bg-(--glass-bg) shadow-[inset_0_1px_0_var(--glass-highlight)] transition-colors duration-300 group-hover/paper:border-accent group-hover/paper:bg-accent group-hover/paper:text-bg group-focus-visible/paper:border-(--accent) group-focus-visible/paper:bg-(--accent) group-focus-visible/paper:text-bg"
                      >
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="size-3.5 transition-transform duration-300 group-hover/paper:-translate-y-px group-hover/paper:translate-x-px rtl:-scale-x-100 rtl:group-hover/paper:-translate-x-px"
                        >
                          <path
                            d="M7 17 17 7M9 7h8v8"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </span>
                  </a>
                </li>
              );
            })}
          </GsapReveal>
        </div>
      </div>
    </section>
  );
}
