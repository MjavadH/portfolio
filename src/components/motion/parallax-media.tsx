"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";
import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "./use-isomorphic-layout-effect";

export function ParallaxMedia({
  children,
  className,
  strength = 4,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const mover = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    const el = frame.current;
    const inner = mover.current;
    if (!el || !inner || reduce) return;

    gsap.registerPlugin(ScrollTrigger);

    const cover = 1 + (strength * 2 + 2) / 100;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        inner,
        { yPercent: -strength, scale: cover },
        {
          yPercent: strength,
          scale: cover,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [reduce, strength]);

  return (
    <div ref={frame} className={className}>
      <div ref={mover} className="relative size-full">
        {children}
      </div>
    </div>
  );
}
