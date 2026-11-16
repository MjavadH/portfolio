"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";
import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/components/motion/use-isomorphic-layout-effect";
import { cn } from "@/lib/utils";

type Chapter = { id: string; title: string; body: string };

export function CaseChapters({ chapters }: { chapters: Chapter[] }) {
  const list = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();

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
    const x = rtl ? 22 : -22;

    const ctx = gsap.context(() => {
      for (const row of rows) {
        const node = nodeOf(row);
        const fill = fillOf(row);
        const body = bodyOf(row);

        if (body) gsap.set(body, { autoAlpha: 0, x });

        ScrollTrigger.create({
          trigger: row,
          start: "top 72%",
          onEnter: () => {
            node?.setAttribute("data-active", "true");
            if (body) {
              gsap.to(body, { autoAlpha: 1, x: 0, duration: 0.7, ease: "power3.out", overwrite: true });
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
                start: "top 72%",
                end: "bottom 72%",
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
  }, [reduce, chapters.length]);

  return (
    <ol ref={list} className="min-w-0">
      {chapters.map((chapter, i) => {
        const last = i === chapters.length - 1;

        return (
          <li
            key={chapter.id}
            data-row
            className={cn("relative ps-10 sm:ps-12", last ? "pb-0" : "pb-14")}
          >
            {!last && (
              <span
                aria-hidden
                className="absolute inset-s-1.25 top-3.75 -bottom-3.75 w-px bg-line-strong"
              >
                <span data-fill className="absolute inset-0 origin-top bg-accent" />
              </span>
            )}

            <span
              aria-hidden
              data-node
              className={cn(
                "absolute inset-s-0 top-[0.6rem] z-10 size-2.75 rounded-full border border-line-strong bg-bg",
                "transition-[background-color,border-color,box-shadow] duration-500",
                "data-[active=true]:border-accent data-[active=true]:bg-accent",
                "data-[active=true]:ring-4 data-[active=true]:ring-(--accent-soft)",
              )}
            />

            <div data-body>
              <h2 className="body-text font-semibold">{chapter.title}</h2>
              <p className="body-text mt-3 max-w-160 text-muted">{chapter.body}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
