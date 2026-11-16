"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { useRef } from "react";
import { CalligraphyName } from "@/components/geometry/calligraphy-name";
import { HeroGeometry } from "@/components/geometry/hero-geometry";
import { GitHubIcon, LinkedInIcon, MailIcon, TelegramIcon } from "@/components/ui/brand-icons";
import { siteConfig } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-9%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const starY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  const enter = (i: number) =>
    reduce
      ? {
          initial: false as const,
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0 },
        }
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay: 0.1 + i * 0.08, ease: EASE },
        };

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex min-h-svh items-center overflow-hidden pb-28 pt-28 md:pb-24 md:pt-32"
    >
      <motion.div
        aria-hidden
        initial={reduce ? false : { opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.2, ease: EASE }}
        className="pointer-events-none absolute inset-e-[-9%] top-1/2 hidden aspect-square w-[68%]
          -translate-y-1/2 opacity-[0.5]
          [mask-image:linear-gradient(to_right,transparent_0%,black_58%)]
          rtl:[mask-image:linear-gradient(to_left,transparent_0%,black_58%)]
          sm:block
          lg:inset-e-[-3%] lg:w-[62%] lg:max-w-184 lg:opacity-90
          lg:mask-[linear-gradient(to_right,transparent_0%,black_26%)]
          lg:rtl:mask-[linear-gradient(to_left,transparent_0%,black_26%)]"
        style={reduce ? undefined : { y: starY }}
      >
        <HeroGeometry className="h-full w-full" />
      </motion.div>

      <div className="shell relative z-10 w-full">
        <div className="max-w-152">
          <motion.p {...enter(0)} className="text-muted small flex items-center gap-2.5">
            <span aria-hidden className="relative flex size-1.5 shrink-0">
              <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-50 motion-reduce:animate-none" />
              <span className="relative size-1.5 rounded-full bg-accent" />
            </span>
            {t("availability")}
          </motion.p>

          <motion.h1
            {...enter(1)}
            style={reduce ? undefined : { y, opacity: fade }}
            className="mt-5 md:mt-6"
          >
            <CalligraphyName locale={locale as "fa" | "en"} className="h-display block">
              {t("name")}
            </CalligraphyName>
          </motion.h1>

          <motion.p {...enter(2)} className="lead text-muted mt-4 max-w-[26ch] md:mt-5">
            {t("tagline")}
          </motion.p>

          <motion.div {...enter(3)} className="mt-9 md:mt-11">
            <a
              href="/resume/mjavadh-resume.pdf"
              download
              className="glass glass-tint accent-shift group inline-flex h-12 items-center gap-3
                rounded-full px-6 text-[0.9375rem] font-medium no-underline
                transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
                hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-3
                focus-visible:outline-(--focus)"
            >
              {t("resume")}
              <svg
                viewBox="0 0 24 24"
                aria-hidden
                className="size-4 opacity-70 transition-transform duration-400
                  ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0.5"
                fill="none"
              >
                <path
                  d="M12 4v11m0 0 4-4m-4 4-4-4M5 19h14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </a>
          </motion.div>

          <motion.ul
            {...enter(4)}
            className="text-muted small mt-8 flex flex-wrap items-center gap-x-5 gap-y-2"
          >
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="link-quiet inline-flex items-center gap-2"
                dir="ltr"
              >
                <MailIcon className="size-3.75 opacity-70" />
                {siteConfig.email}
              </a>
            </li>
            <li aria-hidden className="hidden h-3 w-px bg-line-strong sm:block" />
            <li>
              <a
                href={siteConfig.telegram}
                target="_blank"
                rel="noreferrer"
                className="link-quiet inline-flex items-center gap-2"
              >
                <TelegramIcon className="size-3.75 opacity-70" />
                Telegram
              </a>
            </li>
            <li>
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noreferrer"
                className="link-quiet inline-flex items-center gap-2"
              >
                <GitHubIcon className="size-3.75 opacity-70" />
                GitHub
              </a>
            </li>
            <li>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noreferrer"
                className="link-quiet inline-flex items-center gap-2"
              >
                <LinkedInIcon className="size-3.75 opacity-70" />
                LinkedIn
              </a>
            </li>
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
