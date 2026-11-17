"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { useRef } from "react";
import { SectionMark } from "@/components/geometry/pattern-divider";
import { Shamse } from "@/components/geometry/shamse";
import { Reveal } from "@/components/motion/reveal";
import { useIsomorphicLayoutEffect } from "@/components/motion/use-isomorphic-layout-effect";
import { degrees } from "@/content/education";
import { cn } from "@/lib/utils";

type Locale = "fa" | "en";

const periodKey = (s: string) => Number(s.replace("/", ""));

export function Education() {
  const t = useTranslations("education");
  const locale = useLocale() as Locale;
  const reduce = useReducedMotion();
  const list = useRef<HTMLOListElement>(null);

  const ordered = degrees.slice().sort((a, b) => periodKey(a.from) - periodKey(b.from));

  useIsomorphicLayoutEffect(() => {
    const root = list.current;
    if (!root) return;

    const rows = gsap.utils.toArray<HTMLElement>("[data-row]", root);
    const nodeOf = (row: HTMLElement) => row.querySelector<HTMLElement>("[data-node]");
    const fillOf = (row: HTMLElement) => row.querySelector<HTMLElement>("[data-fill]");
    const bodyOf = (row: HTMLElement) => row.querySelector<HTMLElement>("[data-body]");

    if (reduce) {
      for (const row of rows) {
        nodeOf(row)?.setAttribute("data-active", "true");
        const fill = fillOf(row);
        if (fill) gsap.set(fill, { scaleY: 1 });
      }
      return () => {
        for (const row of rows) nodeOf(row)?.removeAttribute("data-active");
      };
    }

    gsap.registerPlugin(ScrollTrigger);

    const rtl = document.documentElement.dir === "rtl";
    const x = rtl ? 28 : -28;

    const ctx = gsap.context(() => {
      for (const row of rows) {
        const node = nodeOf(row);
        const fill = fillOf(row);
        const body = bodyOf(row);

        if (body) gsap.set(body, { autoAlpha: 0, x });

        ScrollTrigger.create({
          trigger: row,
          start: "top 70%",
          onEnter: () => {
            node?.setAttribute("data-active", "true");
            if (body) {
              gsap.to(body, {
                autoAlpha: 1,
                x: 0,
                duration: 0.7,
                ease: "power3.out",
                overwrite: true,
              });
            }
          },
          onLeaveBack: () => {
            node?.removeAttribute("data-active");
          },
        });

        if (fill) {
          gsap.fromTo(
            fill,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: row,
                start: "top 70%",
                end: "bottom 70%",
                scrub: 0.5,
              },
            },
          );
        }
      }
    }, root);

    return () => {
      ctx.revert();
      for (const row of rows) nodeOf(row)?.removeAttribute("data-active");
    };
  }, [reduce, ordered.length]);

  return (
    <section id="education" className="section-y-lead relative scroll-mt-24 overflow-x-clip">
      <div className="shell">
        <Shamse className="-inset-e-16 top-30 size-80 sm:inset-e-20 sm:size-136" />
        <Reveal>
          <SectionMark>{t("title")}</SectionMark>
          <h2 className="h2 mt-5 max-w-[18ch]">{t("heading")}</h2>
        </Reveal>

        <ol ref={list} className="mt-14 sm:mt-16">
          {ordered.map((d, i) => {
            const current = d.to === null;
            const last = i === ordered.length - 1;
            const hasLine = !last || current;

            return (
              <li
                key={d.id}
                data-row
                className={cn("relative ps-10 sm:ps-14", current ? "pb-24" : "pb-12")}
              >
                {hasLine && (
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-s-1.25 top-1.75 w-px",
                      current ? "bottom-0" : "-bottom-1.75 bg-line-strong",
                    )}
                  >
                    <span
                      data-fill
                      className={cn(
                        "absolute inset-0 origin-top",
                        current
                          ? "bg-linear-to-b from-accent via-(--accent)/45 to-transparent"
                          : "bg-accent",
                      )}
                    />
                  </span>
                )}

                <span
                  aria-hidden
                  data-node
                  className={cn(
                    "absolute inset-s-0 top-1.75 z-10 size-2.75 rounded-full border border-line-strong bg-bg",
                    "transition-[background-color,border-color,box-shadow] duration-500",
                    "data-[active=true]:border-accent data-[active=true]:bg-accent",
                    "data-[active=true]:ring-4 data-[active=true]:ring-(--accent-soft)",
                  )}
                />

                <div data-body>
                  <p className="micro text-muted tabular-nums">
                    <Period from={d.from} to={d.to} present={t("present")} fa={locale === "fa"} />
                  </p>
                  <h3 className="h3 mt-2.5">{d.degree[locale]}</h3>
                  <p className="body-text mt-1.5 font-medium">{d.field[locale]}</p>
                  <p className="small mt-1 text-muted">{d.institution[locale]}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function Period({
  from,
  to,
  present,
  fa,
}: {
  from: string;
  to: string | null;
  present: string;
  fa: boolean;
}) {
  const d = (s: string) => (fa ? s.replace(/\d/g, (x) => "۰۱۲۳۴۵۶۷۸۹"[Number(x)]) : s);
  return (
    <span className="inline-flex flex-wrap items-center gap-x-1.5" dir={fa ? "rtl" : "ltr"}>
      <span>{d(from)}</span>
      <span aria-hidden className="h-px w-2.5 bg-line-strong" />
      <span className={to ? undefined : "text-accent-ink"}>{to ? d(to) : present}</span>
    </span>
  );
}
