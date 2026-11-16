"use client";

import { motion, useReducedMotion } from "motion/react";
import { useLocale } from "next-intl";
import { createElement } from "react";

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  distance?: number;
  as?: "div" | "section" | "header" | "li" | "p";
};

export const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({ children, delay = 0, className, distance = 20, as = "div" }: RevealProps) {
  const reduce = useReducedMotion();
  const locale = useLocale();
  const dx = locale === "fa" ? distance : -distance;

  if (reduce) {
    return createElement(as, { className }, children);
  }

  const Comp = motion[as];

  return (
    <Comp
      className={className}
      initial={{ opacity: 0, x: dx }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.5, delay, ease: EASE }}
    >
      {children}
    </Comp>
  );
}
