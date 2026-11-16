"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Monogram } from "@/components/geometry/monogram";
import { NAV_ICONS } from "@/components/layout/nav-icons";
import { useActiveSection } from "@/hooks/use-active-section";
import { homeHref, SECTION_IDS, useSectionNav } from "@/lib/section-nav";
import { cn } from "@/lib/utils";
import { LocaleSwitcher } from "./locale-switcher";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const reduce = useReducedMotion();
  const active = useActiveSection(SECTION_IDS);
  const navTo = useSectionNav();
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });
  const width = useTransform(progress, (v) => `${Math.max(v * 100, 0.5)}%`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-3 z-50 hidden justify-center px-4 md:flex">
      <motion.div
        initial={reduce ? false : { y: -18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
        data-scrolled={scrolled || undefined}
        className="glass relative flex items-center gap-1 rounded-full p-1
          transition-shadow duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]
          data-scrolled:shadow-[0_6px_18px_rgb(0_0_0/0.07)]"
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

        <span aria-hidden className="mx-0.5 h-5 w-px bg-line" />

        <nav aria-label={t("label")}>
          <ul className="flex items-center">
            {SECTION_IDS.map((id) => {
              const Icon = NAV_ICONS[id];
              const isActive = active === id;
              return (
                <li key={id}>
                  <a
                    href={homeHref(locale, id)}
                    onClick={(e) => navTo(id, e)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative flex h-9 items-center gap-2 rounded-full px-2.5 text-[0.8125rem]",
                      "transition-colors duration-200 hover:bg-bg-veil",
                      "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-(--focus)",
                      isActive ? "text-fg" : "text-muted hover:text-fg",
                    )}
                  >
                    <Icon className="size-4.25 shrink-0" />
                    <span className="whitespace-nowrap">{t(id)}</span>
                    {isActive && (
                      <motion.span
                        layoutId="nav-dot"
                        aria-hidden
                        className="absolute inset-x-0 bottom-0.75 mx-auto size-0.75 rounded-full bg-accent"
                        transition={{ type: "spring", stiffness: 480, damping: 30 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <span aria-hidden className="mx-0.5 h-5 w-px bg-line" />

        <div className="flex items-center gap-0.5 pe-0.5">
          <LocaleSwitcher />
          <ThemeToggle />
        </div>

        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-4 bottom-0 h-px overflow-hidden opacity-80"
        >
          <motion.span
            className="block h-full bg-accent"
            style={{ width: reduce ? "0%" : width }}
          />
        </span>
      </motion.div>
    </header>
  );
}
