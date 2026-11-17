"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { NAV_ICONS, SETTINGS_ICON } from "@/components/layout/nav-icons";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { useActiveSection } from "@/hooks/use-active-section";
import { homeHref, SECTION_IDS, useSectionNav } from "@/lib/section-nav";
import { cn } from "@/lib/utils";

export function MobileDock() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const reduce = useReducedMotion();
  const active = useActiveSection(SECTION_IDS);
  const navTo = useSectionNav();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!settingsOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSettingsOpen(false);
    };
    const onPointer = (e: PointerEvent) => {
      if (panel.current && !panel.current.contains(e.target as Node)) setSettingsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    // next frame, so the opening tap itself does not close it
    const id = window.setTimeout(() => document.addEventListener("pointerdown", onPointer), 0);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      window.clearTimeout(id);
    };
  }, [settingsOpen]);

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 md:hidden">
      <AnimatePresence>
        {settingsOpen && (
          <motion.div
            ref={panel}
            id="settings-panel"
            role="dialog"
            aria-modal="false"
            aria-label={t("settings")}
            initial={reduce ? false : { opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="glass mx-auto mb-2 w-[min(19rem,calc(100vw-1.5rem))] rounded-[1.25rem] p-3"
            style={{ transformOrigin: "bottom center" }}
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="micro text-muted">{t("language")}</p>
                <p className="text-[0.9375rem]">{locale === "fa" ? "فارسی" : "English"}</p>
              </div>
              <LocaleSwitcher variant="segmented" />
            </div>

            <div className="mt-3 flex items-center justify-between gap-3 border-t border-line pt-3">
              <div>
                <p className="micro text-muted">{t("theme")}</p>
                <p className="text-[0.9375rem]">{t("themeHint")}</p>
              </div>
              <ThemeToggle variant="segmented" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className="glass mx-auto mb-[max(0.5rem,env(safe-area-inset-bottom))]
          flex w-[min(22rem,calc(100vw-0.75rem))] items-center justify-between rounded-full px-1.5 py-1.5"
      >
        {SECTION_IDS.map((id) => {
          const Icon = NAV_ICONS[id];
          const isActive = active === id;
          return (
            <a
              key={id}
              href={homeHref(locale, id)}
              onClick={(e) => navTo(id, e)}
              aria-label={t(id)}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "relative grid size-11 place-items-center rounded-full transition-colors duration-300 max-[360px]:size-10",
                "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-(--focus)",
                isActive ? "text-accent-ink" : "text-muted",
              )}
            >
              <Icon className="size-5.25" />
              {isActive && (
                <motion.span
                  layoutId="dock-mark"
                  aria-hidden
                  className="absolute inset-x-0 bottom-0.5 mx-auto size-1.25 rounded-full bg-accent"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
            </a>
          );
        })}

        <span aria-hidden className="mx-0.5 h-6 w-px bg-line" />

        <button
          type="button"
          onClick={() => setSettingsOpen((v) => !v)}
          aria-expanded={settingsOpen}
          aria-controls="settings-panel"
          aria-label={t("settings")}
          className={cn(
            "grid size-11 place-items-center rounded-full transition-colors duration-300 max-[360px]:size-10",
            "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-(--focus)",
            settingsOpen ? "text-accent-ink" : "text-muted",
          )}
        >
          <motion.span
            animate={{ rotate: settingsOpen && !reduce ? 45 : 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="grid place-items-center"
          >
            <SETTINGS_ICON className="size-5.25" />
          </motion.span>
        </button>
      </div>
    </div>
  );
}
