"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";
import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/components/motion/use-isomorphic-layout-effect";
import { cn } from "@/lib/utils";

const C = 200;
const N = 12;
const TAU = Math.PI * 2;

type Pt = readonly [number, number];

const f = (n: number) => n.toFixed(2);
const fmt = ([x, y]: Pt) => `${f(x)} ${f(y)}`;

const spoke = (i: number, n: number, offset = 0) => -Math.PI / 2 + offset + (i * TAU) / n;

const local = (x: number, y: number, a: number): Pt => [
  C + x * Math.cos(a) - y * Math.sin(a),
  C + x * Math.sin(a) + y * Math.cos(a),
];

const petal = (r0: number, r1: number, w: number, a: number) => {
  const L = r1 - r0;
  const p = (t: number, y: number) => fmt(local(r0 + t * L, y, a));
  return (
    `M${p(0, 0)}C${p(0.18, 1.25 * w)} ${p(0.58, 0.14 * w)} ${p(1, 0)}` +
    `C${p(0.58, -0.14 * w)} ${p(0.18, -1.25 * w)} ${p(0, 0)}Z`
  );
};

const line = (r0: number, r1: number, a: number) =>
  `M${fmt(local(r0, 0, a))}L${fmt(local(r1, 0, a))}`;

const star = (n: number, outer: number, inner: number) =>
  Array.from({ length: n * 2 }, (_, i) => {
    const a = -Math.PI / 2 + (i * Math.PI) / n;
    const [x, y] = local(i % 2 === 0 ? outer : inner, 0, a);
    return `${f(x)},${f(y)}`;
  }).join(" ");

const ring = <T,>(n: number, offset: number, make: (a: number) => T) =>
  Array.from({ length: n }, (_, i) => make(spoke(i, n, offset)));

const HALF = TAU / (N * 2);

const PETALS = ring(N, 0, (a) => petal(70, 176, 36, a));
const ECHOES = ring(N, 0, (a) => petal(86, 151, 22, a));
const VEINS = ring(N, 0, (a) => line(94, 138, a));
const BUDS = ring(N, HALF, (a) => petal(110, 160, 13, a));
const ROSETTE = ring(N, HALF, (a) => petal(18, 42, 10, a));

const FINIALS = ring(N, 0, (a) => local(186, 0, a));
const SEEDS = ring(N, HALF, (a) => local(181, 0, a));

const STAR = star(N, 67, 47);

export function Shamse({ className, direction = 1 }: { className?: string; direction?: 1 | -1 }) {
  const root = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el || reduce) return;

    const outer = el.querySelector("[data-ring='outer']");
    const inner = el.querySelector("[data-ring='inner']");
    if (!outer || !inner) return;

    gsap.registerPlugin(ScrollTrigger);

    const scrub = () => ({
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      scrub: 0.8,
    });

    const ctx = gsap.context(() => {
      gsap.to(outer, {
        rotation: 30 * direction,
        svgOrigin: `${C} ${C}`,
        ease: "none",
        scrollTrigger: scrub(),
      });
      gsap.to(inner, {
        rotation: -30 * direction,
        svgOrigin: `${C} ${C}`,
        ease: "none",
        scrollTrigger: scrub(),
      });
    }, el);

    return () => ctx.revert();
  }, [reduce, direction]);

  return (
    <div ref={root} aria-hidden className={cn("pointer-events-none absolute -z-10", className)}>
      <svg
        role="presentation"
        aria-hidden
        viewBox="0 0 400 400"
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
        className="size-full overflow-visible **:[vector-effect:non-scaling-stroke]"
      >
        <g data-ring="outer" className="stroke-(--geometry-strong)">
          <circle cx={C} cy={C} r={194} strokeOpacity={0.35} />

          {PETALS.map((d) => (
            <path key={d} d={d} />
          ))}
          {BUDS.map((d) => (
            <path key={d} d={d} strokeOpacity={0.7} />
          ))}
          {ECHOES.map((d) => (
            <path key={d} d={d} strokeOpacity={0.55} />
          ))}
          {VEINS.map((d) => (
            <path key={d} d={d} strokeOpacity={0.4} />
          ))}

          <g className="fill-(--geometry-strong) stroke-none">
            {FINIALS.map(([x, y]) => (
              <circle key={`${x}-${y}`} cx={f(x)} cy={f(y)} r={2.4} />
            ))}
            {SEEDS.map(([x, y]) => (
              <circle key={`${x}-${y}`} cx={f(x)} cy={f(y)} r={1.4} opacity={0.7} />
            ))}
          </g>
        </g>

        <g data-ring="inner" className="stroke-(--geometry)">
          <polygon points={STAR} />
          {ROSETTE.map((d) => (
            <path key={d} d={d} />
          ))}
          <circle cx={C} cy={C} r={10} />
        </g>

        <circle cx={C} cy={C} r={3.5} className="fill-gold stroke-none" />
      </svg>
    </div>
  );
}
