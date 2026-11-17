"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Rosette, StarMark } from "@/components/geometry/monogram";
import { PatternDivider, SectionMark } from "@/components/geometry/pattern-divider";
import { EASE, Reveal } from "@/components/motion/reveal";
import { type SkillGroup, skillGroups } from "@/content/skills";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const ARABIC_SCRIPT = /[\u0600-\u06FF]/;

export function Skills() {
  const t = useTranslations("skills");
  const locale = useLocale() as Locale;
  const reduce = !!useReducedMotion();
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const previous = useRef(active);

  useEffect(() => {
    if (previous.current === active) return;
    previous.current = active;
    tabs.current[active]?.scrollIntoView({
      block: "nearest",
      inline: "center",
      behavior: reduce ? "auto" : "smooth",
    });
  }, [active, reduce]);

  function onKeyDown(e: React.KeyboardEvent, i: number) {
    const last = skillGroups.length - 1;
    const rtl = document.documentElement.dir === "rtl";
    const next = rtl ? "ArrowLeft" : "ArrowRight";
    const prev = rtl ? "ArrowRight" : "ArrowLeft";

    let to = -1;
    if (e.key === "ArrowDown" || e.key === next) to = i === last ? 0 : i + 1;
    else if (e.key === "ArrowUp" || e.key === prev) to = i === 0 ? last : i - 1;
    else if (e.key === "Home") to = 0;
    else if (e.key === "End") to = last;
    if (to < 0) return;

    e.preventDefault();
    setActive(to);
    tabs.current[to]?.focus();
  }

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="section-y relative scroll-mt-24"
    >
      <div className="shell relative">
        <PatternDivider className="mb-[clamp(5rem,10vh,8rem)] opacity-80" />
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16">
          <Reveal>
            <SectionMark>{t("title")}</SectionMark>
            <h2 id="skills-heading" className="h2 mt-5 max-w-[18ch]">
              {t("heading")}
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="small max-w-136 text-muted">{t("intro")}</p>
          </Reveal>
        </div>

        <Reveal className="block-y">
          <div className="glass overflow-x-clip rounded-3xl lg:grid lg:grid-cols-[minmax(0,19rem)_minmax(0,1fr)]">
            <div
              role="tablist"
              aria-label={t("heading")}
              className={cn(
                "flex gap-2 overflow-x-auto p-3 snap-x snap-proximity",
                "border-b border-(--glass-edge)",
                "max-lg:mask-[linear-gradient(to_right,transparent,#000_1.25rem,#000_calc(100%-1.25rem),transparent)]",
                "lg:flex-col lg:gap-1 lg:overflow-visible lg:border-b-0 lg:border-e lg:p-4 lg:mask-none",
              )}
            >
              {skillGroups.map((group, i) => {
                const selected = i === active;
                return (
                  <button
                    key={group.id}
                    ref={(el) => {
                      tabs.current[i] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`skills-tab-${group.id}`}
                    aria-selected={selected}
                    aria-controls={`skills-panel-${group.id}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActive(i)}
                    onKeyDown={(e) => onKeyDown(e, i)}
                    className={cn(
                      "group/tab relative isolate flex shrink-0 snap-start items-center gap-3 whitespace-nowrap rounded-2xl px-4 py-2.5 text-start",
                      "lg:w-full lg:gap-3.5 lg:px-4 lg:py-3.5",
                      "text-muted transition-colors duration-300 hover:text-fg aria-selected:text-fg",
                      "focus-visible:outline-offset-[-3px]",
                    )}
                  >
                    {selected && (
                      <motion.span
                        layoutId="skills-active"
                        aria-hidden
                        style={{ borderRadius: 16 }}
                        transition={
                          reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }
                        }
                        className="absolute inset-0 -z-10 bg-accent/12 ring-1 ring-inset ring-accent/25"
                      />
                    )}
                    <StarMark
                      size={12}
                      className="shrink-0 text-muted/50 transition-[transform,color] duration-500 group-aria-selected/tab:rotate-45 group-aria-selected/tab:scale-125 group-aria-selected/tab:text-gold"
                    />
                    <span className="small font-semibold">{group.title[locale]}</span>
                  </button>
                );
              })}
            </div>

            {/* Open group */}
            <div className="relative">
              <motion.div
                aria-hidden
                initial={false}
                animate={{ rotate: reduce ? 0 : active * 45 }}
                transition={
                  reduce ? { duration: 0 } : { type: "spring", stiffness: 50, damping: 14 }
                }
                className="pointer-events-none absolute -inset-e-12 -top-12 size-52 text-(--geometry) sm:size-64 lg:-inset-e-20 lg:-top-20 lg:size-96"
              >
                <Rosette size={null} />
              </motion.div>

              <div className="relative grid">
                {skillGroups.map((group, i) => (
                  <Panel
                    key={group.id}
                    group={group}
                    locale={locale}
                    active={i === active}
                    reduce={reduce}
                  />
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Panel({
  group,
  locale,
  active,
  reduce,
}: {
  group: SkillGroup;
  locale: Locale;
  active: boolean;
  reduce: boolean;
}) {
  const lift = reduce ? 0 : 16;

  const container: Variants = {
    hide: { transition: { duration: 0 } },
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.05,
        delayChildren: reduce ? 0 : 0.05,
      },
    },
  };
  const rise: Variants = {
    hide: { opacity: 0, y: lift, scale: reduce ? 1 : 0.96, transition: { duration: 0 } },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: reduce ? 0 : 0.55, ease: EASE },
    },
  };
  const rule: Variants = {
    hide: { scaleX: 0, transition: { duration: 0 } },
    show: { scaleX: 1, transition: { duration: reduce ? 0 : 0.8, ease: EASE } },
  };

  return (
    <motion.div
      role="tabpanel"
      id={`skills-panel-${group.id}`}
      aria-labelledby={`skills-tab-${group.id}`}
      tabIndex={active ? 0 : -1}
      initial={false}
      animate={active ? "show" : "hide"}
      variants={container}
      className={cn(
        "col-start-1 row-start-1 p-5 sm:p-8 lg:p-12",
        !active && "pointer-events-none invisible",
      )}
    >
      <motion.p variants={rise} className="lead max-w-[34ch]">
        {group.summary[locale]}
      </motion.p>

      <motion.span
        aria-hidden
        variants={rule}
        className="mt-7 block h-px w-full bg-linear-to-r from-gold/70 via-(--glass-edge) to-transparent ltr:origin-left rtl:origin-right rtl:bg-linear-to-l"
      />

      <ul className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {group.items.map((item) => {
          const text = item[locale];
          return (
            <motion.li key={item.en} variants={rise}>
              <div className="group/tile flex h-full min-h-22 flex-col justify-between gap-5 rounded-2xl border border-(--glass-border) bg-(--glass-bg) p-4 shadow-[inset_0_1px_0_var(--glass-highlight)] transition-[translate,border-color] duration-300 hover:-translate-y-0.5 hover:border-accent/50 sm:p-5">
                <span
                  aria-hidden
                  className="size-2 rotate-45 bg-gold transition-[transform,background-color] duration-300 group-hover/tile:scale-150 group-hover/tile:bg-accent"
                />
                <span
                  dir={ARABIC_SCRIPT.test(text) ? undefined : "ltr"}
                  className="self-start text-[1.0625rem] font-medium leading-snug"
                >
                  {text}
                </span>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </motion.div>
  );
}
