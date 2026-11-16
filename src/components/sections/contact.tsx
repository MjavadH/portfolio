"use client";

import { useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { Rosette } from "@/components/geometry/monogram";
import { SectionMark } from "@/components/geometry/pattern-divider";
import { Reveal } from "@/components/motion/reveal";
import { GitHubIcon, LinkedInIcon, MailIcon, TelegramIcon } from "@/components/ui/brand-icons";
import { siteConfig } from "@/lib/site";

const SPRING = "ease-[cubic-bezier(0.22,1,0.36,1)]";

function OutArrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      fill="none"
      className={`size-4 shrink-0 text-muted transition-[translate,color] duration-300 ${SPRING}
        rtl:-scale-x-100 group-hover/row:-translate-y-0.5 group-hover/row:translate-x-0.5
        group-hover/row:text-accent-ink rtl:group-hover/row:-translate-x-0.5`}
    >
      <path
        d="M7 17 17 7m0 0H8m9 0v9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DownloadArrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      fill="none"
      className={`size-4 shrink-0 text-muted transition-[translate,color] duration-300 ${SPRING}
        group-hover/row:translate-y-0.5 group-hover/row:text-accent-ink`}
    >
      <path
        d="M12 4v11m0 0 4-4m-4 4-4-4M5 19h14"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Contact() {
  const t = useTranslations("contact");
  const reduce = useReducedMotion();

  const elsewhere = [
    {
      key: "email",
      href: `mailto:${siteConfig.email}`,
      Icon: MailIcon,
      label: t("emailLabel"),
    },
    {
      key: "github",
      href: siteConfig.github,
      Icon: GitHubIcon,
      label: t("githubLabel"),
      external: true,
    },
    {
      key: "linkedin",
      href: siteConfig.linkedin,
      Icon: LinkedInIcon,
      label: t("linkedinLabel"),
      external: true,
    },
    {
      key: "resume",
      href: "/resume/mjavadh-resume.pdf",
      Icon: null,
      label: t("resumeLabel"),
      download: true,
    },
  ];

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--sx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--sy", `${e.clientY - r.top}px`);
  }

  return (
    <section id="contact" className="section-y relative scroll-mt-24">
      <div className="shell">
        <div
          onPointerMove={onPointerMove}
          className="contact-plate group/card relative overflow-hidden rounded-[1.75rem] px-5 py-8 sm:px-10 sm:py-12 lg:px-14 lg:py-16"
        >
          {!reduce && (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
              style={{
                background:
                  "radial-gradient(420px circle at var(--sx, 50%) var(--sy, 0%), color-mix(in oklab, var(--accent) 13%, transparent), transparent 65%)",
              }}
            />
          )}

          <Rosette
            size={null}
            className="pointer-events-none absolute -bottom-16 -inset-s-16 size-56 text-accent opacity-[0.07] sm:size-72 lg:-bottom-28 lg:-inset-s-24 lg:size-104"
          />

          <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center lg:gap-16">
            <div>
              <Reveal>
                <SectionMark>{t("title")}</SectionMark>
                <h2 className="h2 mt-4 max-w-[18ch] text-balance">{t("heading")}</h2>
              </Reveal>

              <Reveal delay={0.08}>
                <p className="body-text mt-5 max-w-[48ch] text-muted">{t("body")}</p>
              </Reveal>

              <Reveal
                delay={0.14}
                className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 sm:mt-10"
              >
                <a
                  href={siteConfig.telegram}
                  target="_blank"
                  rel="noreferrer"
                  className={`group/cta flex w-full items-center gap-4 rounded-full bg-accent-ink py-2 ps-2 pe-6
                    text-bg no-underline transition-[translate,box-shadow] duration-300 ${SPRING}
                    hover:-translate-y-0.5 hover:shadow-[0_16px_34px_-14px_var(--accent-ink)]
                    focus-visible:outline-(--focus) sm:w-auto`}
                >
                  <span
                    aria-hidden
                    className="grid size-12 shrink-0 place-items-center rounded-full bg-(--bg)/15"
                  >
                    <TelegramIcon className="size-5" />
                  </span>
                  <span className="min-w-0 text-start">
                    <span className="micro block opacity-80">{t("ctaLabel")}</span>
                    <span className="block text-[1rem] font-semibold leading-snug sm:text-[1.0625rem]">
                      {t("cta")}
                    </span>
                  </span>
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden
                    fill="none"
                    className={`ms-auto size-5 shrink-0 transition-[translate] duration-300 ${SPRING}
                      rtl:-scale-x-100 group-hover/cta:translate-x-1 rtl:group-hover/cta:-translate-x-1 sm:ms-2`}
                  >
                    <path
                      d="M5 12h13m0 0-5-5m5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>

                <span className="micro tabular-nums text-muted" dir="ltr">
                  {siteConfig.telegramHandle}
                </span>
              </Reveal>
            </div>

            {/* Other ways to reach me */}
            <Reveal delay={0.2}>
              <div className="rounded-3xl border border-line bg-bg p-2 sm:p-3">
                <p className="micro px-3 pb-2 pt-2 text-muted">{t("elsewhere")}</p>
                <ul className="flex flex-col gap-1">
                  {elsewhere.map(({ key, href, Icon, label, external, download }) => (
                    <li key={key}>
                      <a
                        href={href}
                        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                        {...(download ? { download: true } : {})}
                        className="group/row flex items-center gap-3.5 rounded-2xl px-3 py-3 no-underline
                          transition-colors duration-300
                          hover:bg-[color-mix(in_oklab,var(--accent)_9%,var(--bg))]
                          focus-visible:-outline-offset-2 focus-visible:outline-(--focus)"
                      >
                        <span
                          aria-hidden
                          className="grid size-10 shrink-0 place-items-center rounded-xl border border-line
                            text-muted transition-colors duration-300
                            group-hover/row:border-accent group-hover/row:text-accent-ink"
                        >
                          {Icon ? <Icon className="size-4.5" /> : <DownloadGlyph />}
                        </span>
                        <span className="small min-w-0 flex-1 truncate font-medium">{label}</span>
                        {download ? <DownloadArrow /> : <OutArrow />}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function DownloadGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden fill="none" className="size-4.5">
      <path
        d="M7 3h7l4 4v14H7V3Zm7 0v4h4M10 12h5M10 16h5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
