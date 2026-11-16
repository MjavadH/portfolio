"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/components/motion/use-isomorphic-layout-effect";
import { cn } from "@/lib/utils";

const C = 400;

/** Outer crown: eighteen arcs on this ring. Inner crown: eighteen on that one. */
const CROWN = { n: 18, ring: 168, r: 92, opacity: 0.19 };
const INNER = { n: 18, ring: 96, r: 53, opacity: 0.12 };

/** Medallion radii, outside in. */
const RIM = 232;
const RIM_OUTER = 240;
const HEART = 100;
const HEART_STAR = 88;
const HEART_STAR_IN = 66;
const BOSS = 30;

const f = (n: number) => n.toFixed(2);

const pt = (r: number, a: number): [number, number] => [C + r * Math.cos(a), C + r * Math.sin(a)];

/** One circle per step, a half step off vertical so no arc sits on an axis. */
const crownCircles = ({ n, ring, r }: typeof CROWN, offset = 0) =>
  Array.from({ length: n }, (_, i) => {
    const [cx, cy] = pt(ring, -Math.PI / 2 + offset + (i * 2 * Math.PI) / n);
    return { key: `${cx.toFixed(1)}-${cy.toFixed(1)}`, cx, cy, r };
  });

/** A star polygon from alternating radii, points up by default. */
const star = (n: number, outer: number, inner: number, turn = 0) =>
  Array.from({ length: n * 2 }, (_, i) =>
    pt(i % 2 === 0 ? outer : inner, -Math.PI / 2 + turn + (i * Math.PI) / n)
      .map(f)
      .join(","),
  ).join(" ");

/** The cusped rim: q curves bulging outward, one per step. */
const cuspedRim = (r: number, n: number, bulge: number) =>
  Array.from({ length: n }, (_, i) => {
    const a0 = -Math.PI / 2 + (i * 2 * Math.PI) / n;
    const a1 = a0 + (2 * Math.PI) / n;
    const am = (a0 + a1) / 2;
    const [x0, y0] = pt(r, a0);
    const [x1, y1] = pt(r, a1);
    const [xm, ym] = pt(r + bulge, am);
    return `M${f(x0)} ${f(y0)}Q${f(xm)} ${f(ym)} ${f(x1)} ${f(y1)}`;
  }).join("");

const OUTER_CROWN = crownCircles(CROWN);
const INNER_CROWN = crownCircles(INNER, Math.PI / CROWN.n);

export function HeroGeometry({ className }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.fromTo(
        "[data-rim]",
        { autoAlpha: 0, scale: 0.94, svgOrigin: "400 400" },
        { autoAlpha: 1, scale: 1, duration: 0.8, ease: "power3.out" },
      )
        .fromTo(
          "[data-crown='inner']",
          { autoAlpha: 0, scale: 0.7, svgOrigin: "400 400" },
          { autoAlpha: 1, scale: 1, duration: 0.9, ease: "power3.out" },
          0.35,
        )
        .fromTo(
          "[data-crown='outer']",
          { autoAlpha: 0, scale: 0.84, svgOrigin: "400 400" },
          { autoAlpha: 1, scale: 1, duration: 1, ease: "power3.out" },
          0.5,
        )
        .fromTo(
          "[data-heart]",
          { autoAlpha: 0, scale: 0.6, svgOrigin: "400 400" },
          { autoAlpha: 1, scale: 1, duration: 0.75, ease: "power3.out" },
          1.15,
        );

      const scrub = {
        trigger: document.documentElement,
        start: "top top",
        end: "62% top",
        scrub: 0.8,
      };
      gsap.to("[data-crown='outer']", {
        rotate: 40,
        svgOrigin: "400 400",
        ease: "none",
        scrollTrigger: scrub,
      });
      gsap.to("[data-crown='inner']", {
        rotate: -35,
        svgOrigin: "400 400",
        ease: "none",
        scrollTrigger: scrub,
      });
      gsap.to("[data-heart]", {
        rotate: 22.5,
        svgOrigin: "400 400",
        ease: "none",
        scrollTrigger: scrub,
      });
    }, el);

    let release = () => {};
    const sheen = el.querySelector<SVGCircleElement>("[data-sheen]");
    if (sheen && window.matchMedia("(pointer: fine)").matches) {
      const xTo = gsap.quickTo(sheen, "x", { duration: 1.2, ease: "power3.out" });
      const yTo = gsap.quickTo(sheen, "y", { duration: 1.2, ease: "power3.out" });

      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        xTo(((e.clientX - r.left) / r.width - 0.5) * 70);
        yTo(((e.clientY - r.top) / r.height - 0.5) * 70);
      };
      const onLeave = () => {
        xTo(0);
        yTo(0);
      };

      document.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
      release = () => {
        document.removeEventListener("pointermove", onMove);
        document.documentElement.removeEventListener("pointerleave", onLeave);
      };
    }

    return () => {
      release();
      ctx.revert();
    };
  }, []);

  return (
    <div ref={root} className={cn("pointer-events-none select-none", className)} aria-hidden>
      <svg viewBox="0 0 800 800" fill="none" aria-hidden className="h-full w-full">
        <defs>
          <clipPath id="shamse-body">
            <circle cx={C} cy={C} r={RIM} />
          </clipPath>
          <mask id="shamse-band">
            <rect width="800" height="800" fill="white" />
            <circle cx={C} cy={C} r={HEART} fill="black" />
          </mask>
          <radialGradient id="shamse-sheen">
            <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.16" />
            <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g data-rim stroke="var(--geometry-strong)">
          <path d={cuspedRim(RIM_OUTER, 36, 11)} strokeWidth="0.9" opacity="0.45" />
          <circle cx={C} cy={C} r={RIM} strokeWidth="1.3" opacity="0.85" />
        </g>

        <g clipPath="url(#shamse-body)" mask="url(#shamse-band)">
          <g data-crown="outer" stroke="var(--geometry-strong)">
            {OUTER_CROWN.map((c) => (
              <circle
                key={c.key}
                cx={f(c.cx)}
                cy={f(c.cy)}
                r={c.r}
                strokeWidth="1"
                opacity={CROWN.opacity}
              />
            ))}
          </g>

          <g data-crown="inner" stroke="var(--geometry-strong)">
            {INNER_CROWN.map((c) => (
              <circle
                key={c.key}
                cx={f(c.cx)}
                cy={f(c.cy)}
                r={c.r}
                strokeWidth="1"
                opacity={INNER.opacity}
              />
            ))}
          </g>
        </g>

        <g data-heart>
          <circle
            cx={C}
            cy={C}
            r={HEART}
            stroke="var(--geometry-strong)"
            strokeWidth="1.1"
            opacity="0.5"
          />
          <polygon
            points={star(8, HEART_STAR, HEART_STAR_IN)}
            stroke="var(--geometry-strong)"
            strokeWidth="1"
            opacity="0.5"
          />
          <polygon
            points={star(8, HEART_STAR, HEART_STAR_IN, Math.PI / 8)}
            stroke="var(--geometry-strong)"
            strokeWidth="0.8"
            opacity="0.15"
          />
          <circle
            cx={C}
            cy={C}
            r={BOSS}
            stroke="var(--geometry-strong)"
            strokeWidth="0.9"
            opacity="0.35"
          />
          <circle cx={C} cy={C} r="3.4" fill="var(--gold)" opacity="0.9" />
        </g>

        <circle data-sheen cx={C} cy={C} r={RIM * 0.8} fill="url(#shamse-sheen)" opacity="0.5" />
      </svg>
    </div>
  );
}
