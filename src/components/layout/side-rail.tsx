"use client";

import { motion, useReducedMotion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { Monogram } from "@/components/geometry/monogram";
import { NAV_ICONS } from "@/components/layout/nav-icons";
import { useActiveSection } from "@/hooks/use-active-section";
import { homeHref, SECTION_IDS, useSectionNav } from "@/lib/section-nav";
import { cn } from "@/lib/utils";
import { LocaleSwitcher } from "./locale-switcher";
import { ThemeToggle } from "./theme-toggle";

const EASE = [0.22, 1, 0.36, 1] as const;

export function SideRail() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const reduce = useReducedMotion();
  const active = useActiveSection(SECTION_IDS);
  const navTo = useSectionNav();

  return (
    <header className="fixed inset-s-3 top-1/2 z-50 hidden -translate-y-1/2 xl:block">
      <motion.div
        initial={reduce ? false : { opacity: 0, x: locale === "fa" ? 20 : -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.55, ease: EASE, delay: 0.12 }}
        className="glass rail-scroll relative flex max-h-[calc(100svh-1.5rem)] w-12 flex-col
          items-center gap-1 overflow-y-auto rounded-3xl py-2.5"
      >
        <a
          href={locale === "fa" ? "/" : "/en"}
          aria-label="MjavadH"
          className="group grid size-9 shrink-0 place-items-center rounded-full text-fg
            transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:rotate-45
            focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-(--focus)"
        >
          <Monogram className="size-6" />
        </a>

        <span aria-hidden className="h-px w-5 shrink-0 bg-line" />

        <nav aria-label={t("label")} className="shrink-0">
          <ul className="flex flex-col items-center gap-0.5">
            {SECTION_IDS.map((id) => {
              const Icon = NAV_ICONS[id];
              const isActive = active === id;
              return (
                <li key={id}>
                  <a
                    href={homeHref(locale, id)}
                    onClick={(e) => navTo(id, e)}
                    aria-label={t(id)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative grid size-10 place-items-center rounded-full",
                      "transition-colors duration-200 hover:bg-bg-veil",
                      "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-(--focus)",
                      isActive ? "text-fg" : "text-muted hover:text-fg",
                    )}
                  >
                    <Icon className="size-4.5" />
                    {isActive && (
                      <motion.span
                        layoutId="rail-mark"
                        aria-hidden
                        className="absolute inset-x-0 bottom-0.5 mx-auto size-1.25 rounded-full bg-accent"
                        transition={{ type: "spring", stiffness: 480, damping: 32 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <span aria-hidden className="h-px w-5 shrink-0 bg-line" />

        <div className="flex shrink-0 flex-col items-center">
          <LocaleSwitcher />
          <ThemeToggle />
        </div>
      </motion.div>
    </header>
  );
}
