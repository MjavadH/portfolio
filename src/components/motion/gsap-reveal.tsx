"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";
import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "./use-isomorphic-layout-effect";

export function GsapReveal({
  children,
  className,
  as = "div",
  stagger = 0.07,
  distance = 24,
  delay = 0,
  selector,
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "ul" | "ol" | "header" | "dl";
  stagger?: number;
  distance?: number;
  delay?: number;
  selector?: string;
}) {
  const root = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el || reduce) return;

    const targets = selector ? Array.from(el.querySelectorAll(selector)) : Array.from(el.children);
    if (targets.length === 0) return;

    const rtl = document.documentElement.dir === "rtl";
    const x = rtl ? distance : -distance;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { autoAlpha: 0, x },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.6,
          delay,
          stagger,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [reduce, stagger, distance, delay, selector]);

  const Comp = as;
  return (
    <Comp ref={root as React.Ref<never>} className={className}>
      {children}
    </Comp>
  );
}
