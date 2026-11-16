"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";
import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/components/motion/use-isomorphic-layout-effect";
import { cn } from "@/lib/utils";

const W = 1400;
const H = 400;
const CX = W / 2;
const CY = H / 2;

type Pt = readonly [number, number];
type Place = (p: Pt) => Pt;

type Draw = { d: string; t: number; dur: number; w: number; o: number };
type Pop = { d: string; at: Pt; t: number };
type Bead = { at: Pt; r: number; t: number; jewel?: boolean };

const f = (n: number) => n.toFixed(1);
const xy = ([x, y]: Pt) => `${f(x)} ${f(y)}`;
const same: Place = (p) => p;
const flip: Place = ([x, y]) => [2 * CX - x, y];

/** Coordinates along (x) and across (y) a direction `a`, starting at `o`. */
const frame =
  (o: Pt, a: number, place: Place) =>
  (x: number, y: number): Pt =>
    place([o[0] + x * Math.cos(a) - y * Math.sin(a), o[1] + x * Math.sin(a) + y * Math.cos(a)]);

/** A pointed ogee leaf: round shoulders, concave sweep into a sharp tip. */
const leaf = (o: Pt, a: number, len: number, w: number, place: Place = same) => {
  const at = frame(o, a, place);
  const p = (t: number, y: number) => xy(at(t * len, y));
  return (
    `M${p(0, 0)}C${p(0.18, 1.25 * w)} ${p(0.58, 0.14 * w)} ${p(1, 0)}` +
    `C${p(0.58, -0.14 * w)} ${p(0.18, -1.25 * w)} ${p(0, 0)}Z`
  );
};

const polyline = (pts: Pt[], place: Place) =>
  pts.map((p, i) => `${i === 0 ? "M" : "L"}${xy(place(p))}`).join("");

/**
 * A curl whose curvature grows steadily (an Euler spiral): it leaves the stem
 * gently and winds tighter and tighter, the way a calligrapher's pen would.
 */
const spiral = (o: Pt, heading: number, turn: number, rs: number, re: number, sign: 1 | -1) => {
  const n = 80;
  const ks = 1 / rs;
  const ke = 1 / re;
  const ds = (2 * turn) / (ks + ke) / n;
  const pts: Pt[] = [o];
  const dirs: number[] = [heading];
  let x = o[0];
  let y = o[1];
  let a = heading;
  for (let i = 0; i < n; i++) {
    a += sign * (ks + ((ke - ks) * (i + 0.5)) / n) * ds;
    x += Math.cos(a) * ds;
    y += Math.sin(a) * ds;
    pts.push([x, y]);
    dirs.push(a);
  }
  return { pts, dirs, n };
};

/** The toranj: a lozenge with four pointed ends and ogee sides. */
const lozenge = (scale: number) => {
  const hh = 118 * scale;
  const ww = 64 * scale;
  const pt = (x: number, y: number) => xy([CX + x * ww, CY + y * hh]);
  const side = (c1: Pt, c2: Pt, b: Pt) => `C${pt(...c1)} ${pt(...c2)} ${pt(...b)}`;
  return (
    `M${pt(0, -1)}` +
    side([0.1, -0.6], [0.62, -0.2], [1, 0]) +
    side([0.62, 0.2], [0.1, 0.6], [0, 1]) +
    side([-0.1, 0.6], [-0.62, 0.2], [-1, 0]) +
    side([-0.62, -0.2], [-0.1, -0.6], [0, -1]) +
    "Z"
  );
};

const circle = (r: number) =>
  `M${f(CX - r)} ${f(CY)}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;

/** Seconds at which the stem segment k starts to grow. */
const STEM_AT = (k: number) => 0.9 + k * 0.4;

const JUNCTIONS = 5;
const JX: number[] = [CX + 64];
for (let k = 0; k < JUNCTIONS; k++) JX.push((JX[k] ?? 0) + 118 * 0.9 ** k);

const vine = (place: Place) => {
  const draws: Draw[] = [];
  const pops: Pop[] = [];
  const beads: Bead[] = [];

  for (let k = 0; k < JUNCTIONS; k++) {
    const x0 = JX[k] ?? 0;
    const x1 = JX[k + 1] ?? 0;
    const crest = k % 2 === 0 ? 1 : -1;
    const amp = 22 * 0.9 ** k;
    const stem = Array.from({ length: 25 }, (_, i): Pt => {
      const u = i / 24;
      return [x0 + (x1 - x0) * u, CY + crest * amp * Math.sin(Math.PI * u)];
    });
    draws.push({ d: polyline(stem, place), t: STEM_AT(k), dur: 0.6, w: 1.6, o: 1 });
  }

  for (let k = 1; k < JUNCTIONS; k++) {
    const j: Pt = [JX[k] ?? 0, CY];
    const dir = k % 2 === 1 ? -1 : 1;
    const s = 1.1 * 0.92 ** (k - 1);
    const t0 = STEM_AT(k - 1) + 0.5;
    const dur = 1.4;

    const curl = spiral(j, (dir * Math.PI) / 3, 2.1 * Math.PI, 62 * s, 17 * s, dir);
    draws.push({ d: polyline(curl.pts, place), t: t0, dur, w: 1.5, o: 1 });

    // Leaves on the outer coil, growing as the line passes them.
    [0.1, 0.26, 0.42].forEach((fr, i) => {
      const idx = Math.round(fr * curl.n);
      const p = curl.pts[idx] ?? j;
      const a = (curl.dirs[idx] ?? 0) - dir * 0.95;
      pops.push({
        d: leaf(p, a, (36 - i * 6) * s, (10 - i * 1.2) * s, place),
        at: place(p),
        t: t0 + dur * fr * 0.9 + 0.2,
      });
    });

    // Five-petal blossom in the eye of the curl.
    const end = curl.pts[curl.n] ?? j;
    const endDir = curl.dirs[curl.n] ?? 0;
    const eye: Pt = [
      end[0] + 17 * s * Math.cos(endDir + (dir * Math.PI) / 2),
      end[1] + 17 * s * Math.sin(endDir + (dir * Math.PI) / 2),
    ];
    const R = 15 * s;
    for (let i = 0; i < 5; i++) {
      pops.push({
        d: leaf(eye, endDir + (i * 2 * Math.PI) / 5, R * 1.2, R * 0.6, place),
        at: place(eye),
        t: t0 + dur,
      });
    }
    beads.push({ at: place(eye), r: 1.8, t: t0 + dur + 0.1 });

    // A leaf on the other side of the stem, forking away from the curl.
    const la = -dir * Math.PI * 0.3;
    const len = 40 * s;
    pops.push({ d: leaf(j, la, len, 11 * s, place), at: place(j), t: t0 + 0.35 });
    beads.push({ at: frame(j, la, place)(len + 7, 0), r: 1.6, t: t0 + 0.7 });
  }

  // Tip of the vine: a leaf along the axis and three diminishing beads.
  const tip: Pt = [JX[JUNCTIONS] ?? 0, CY];
  const tipAt = STEM_AT(JUNCTIONS - 1) + 0.6;
  pops.push({ d: leaf(tip, 0, 46, 13, place), at: place(tip), t: tipAt });
  [
    [58, 2.4],
    [68, 1.8],
    [77, 1.2],
  ].forEach(([dx, r], i) => {
    beads.push({ at: place([tip[0] + (dx ?? 0), CY]), r: r ?? 1, t: tipAt + 0.25 + i * 0.12 });
  });

  return { draws, pops, beads };
};

const RIGHT = vine(same);
const LEFT = vine(flip);

const HH = 118;

const DRAWS: Draw[] = [
  { d: lozenge(1), t: 0, dur: 1.3, w: 1.6, o: 1 },
  { d: lozenge(0.8), t: 0.15, dur: 1.3, w: 1.1, o: 0.7 },
  { d: lozenge(0.58), t: 0.3, dur: 1.3, w: 0.9, o: 0.5 },
  { d: circle(9), t: 0.9, dur: 0.6, w: 0.9, o: 0.8 },
  ...RIGHT.draws,
  ...LEFT.draws,
];

const POPS: Pop[] = [
  // Lotus bud in the heart of the toranj.
  { d: leaf([CX, CY], -Math.PI / 2, 50, 16), at: [CX, CY], t: 1.0 },
  { d: leaf([CX, CY], Math.PI / 2, 50, 16), at: [CX, CY], t: 1.0 },
  { d: leaf([CX, CY], 0, 30, 9), at: [CX, CY], t: 1.15 },
  { d: leaf([CX, CY], Math.PI, 30, 9), at: [CX, CY], t: 1.15 },
  // Pendants above and below the lozenge.
  { d: leaf([CX, CY - HH], -Math.PI / 2, 30, 8), at: [CX, CY - HH], t: 1.2 },
  { d: leaf([CX, CY + HH], Math.PI / 2, 30, 8), at: [CX, CY + HH], t: 1.2 },
  ...RIGHT.pops,
  ...LEFT.pops,
];

const BEADS: Bead[] = [
  { at: [CX, CY], r: 4, t: 1.3, jewel: true },
  { at: [CX, CY - HH - 40], r: 2.4, t: 1.4 },
  { at: [CX, CY + HH + 40], r: 2.4, t: 1.4 },
  ...RIGHT.beads,
  ...LEFT.beads,
];

const origin = (at: Pt) => `${f(at[0])} ${f(at[1])}`;
const num = (el: SVGElement, key: string) => Number(el.dataset[key] ?? 0);

export function TazhibBand({ className }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el || reduce) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const draws = gsap.utils.toArray<SVGGeometryElement>("[data-draw]");
      const pops = gsap.utils.toArray<SVGElement>("[data-pop]");
      const beads = gsap.utils.toArray<SVGElement>("[data-bead]");

      gsap.set(draws, {
        strokeDasharray: (_: number, t: SVGGeometryElement) => {
          const len = t.getTotalLength();
          return `${len} ${len + 2}`;
        },
        strokeDashoffset: (_: number, t: SVGGeometryElement) => t.getTotalLength() + 1,
      });
      gsap.set(pops, {
        autoAlpha: 0,
        scale: 0.2,
        svgOrigin: (_: number, t: SVGElement) => t.dataset.o ?? "0 0",
      });

      const twinkle = gsap.to(beads, {
        opacity: 0.35,
        duration: 2.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.3, from: "center" },
        paused: true,
      });
      const breathe = gsap.to("[data-jewel]", {
        scale: 1.4,
        svgOrigin: `${CX} ${CY}`,
        duration: 2.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        paused: true,
      });

      const tl = gsap.timeline({ paused: true });
      for (const p of draws) {
        tl.to(
          p,
          { strokeDashoffset: 0, duration: num(p, "dur"), ease: "power2.inOut" },
          num(p, "t"),
        );
      }
      for (const p of pops) {
        tl.to(p, { autoAlpha: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" }, num(p, "t"));
      }
      tl.add(() => {
        gsap.set(draws, { clearProps: "strokeDasharray,strokeDashoffset" });
        twinkle.play();
        breathe.play();
      });

      ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        once: true,
        onEnter: () => tl.play(),
      });
    }, el);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <div ref={root} aria-hidden className={cn("pointer-events-none select-none", className)}>
      <svg
        role="presentation"
        aria-hidden
        viewBox={`0 0 ${W} ${H}`}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-auto w-full overflow-visible"
      >
        <g className="stroke-(--geometry-strong)">
          {DRAWS.map((p) => (
            <path
              key={p.d}
              d={p.d}
              strokeWidth={p.w}
              strokeOpacity={p.o}
              data-draw
              data-t={p.t}
              data-dur={p.dur}
            />
          ))}
        </g>

        <g className="fill-gold stroke-(--geometry)" strokeWidth={1.1} fillOpacity={0.1}>
          {POPS.map((p) => (
            <path key={p.d} d={p.d} data-pop data-t={p.t} data-o={origin(p.at)} />
          ))}
        </g>

        <g className="fill-gold stroke-none">
          {BEADS.map((b) => (
            <circle
              key={origin(b.at)}
              cx={f(b.at[0])}
              cy={f(b.at[1])}
              r={b.r}
              data-pop
              data-t={b.t}
              data-o={origin(b.at)}
              {...(b.jewel ? { "data-jewel": true } : { "data-bead": true })}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
