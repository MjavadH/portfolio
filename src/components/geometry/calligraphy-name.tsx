"use client";

import { motion, useReducedMotion } from "motion/react";

export function CalligraphyName({
  children,
  locale,
  className,
}: {
  children: React.ReactNode;
  locale: "fa" | "en";
  className?: string;
}) {
  const reduce = useReducedMotion();

  const path = (
    <>
      <path
        d="M3 27C48 9 96 6 149 11c49 5 94 13 145 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
    </>
  );

  return (
    <span className={className}>
      <span className="relative inline-block">
        <span className="relative z-10">{children}</span>

        <svg
          viewBox="0 0 300 40"
          aria-hidden
          preserveAspectRatio="none"
          className={
            locale === "fa"
              ? "absolute bottom-[-0.16em] right-[-2%] h-[0.34em] w-[104%] text-accent"
              : "absolute bottom-[-0.2em] left-[-1%] h-[0.26em] w-[102%] text-accent"
          }
        >
          {reduce ? (
            path
          ) : (
            <motion.path
              d="M3 27C48 9 96 6 149 11c49 5 94 13 145 4"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.4"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 1.1,
                delay: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          )}
        </svg>
      </span>
    </span>
  );
}
