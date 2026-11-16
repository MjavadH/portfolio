"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const dotEl = dot.current;
    const ringEl = ring.current;
    if (!dotEl || !ringEl) return;

    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let rot = 0;
    let hot = false;
    let shown = false;
    let raf = 0;

    const setHot = (next: boolean) => {
      if (next === hot) return;
      hot = next;
      ringEl.dataset.hot = String(hot);
    };

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;

      if (!shown) {
        shown = true;
        dotEl.style.opacity = "1";
        ringEl.style.opacity = "1";
      }

      const target = e.target as Element | null;
      setHot(
        Boolean(
          target?.closest(
            "a, button, [role='button'], input, textarea, select, summary, label, [data-cursor='hot']",
          ),
        ),
      );
    };

    const onLeave = () => {
      shown = false;
      dotEl.style.opacity = "0";
      ringEl.style.opacity = "0";
      setHot(false);
    };

    const tick = () => {
      rx += (mx - rx) * 0.22;
      ry += (my - ry) * 0.22;
      rot += hot ? 1.6 : 0.25;

      dotEl.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      ringEl.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) rotate(${rot}deg) scale(${hot ? 1.5 : 1})`;

      raf = requestAnimationFrame(tick);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <div aria-hidden className={cn(!enabled && "hidden")}>
      {/* dot: filled star, pinned to the point */}
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-100 size-2.25 opacity-0
          text-accent-ink transition-opacity duration-150"
      >
        <Star filled />
      </div>

      {/* ring: hairline octagram, trailing */}
      <div
        ref={ring}
        data-hot="false"
        className="pointer-events-none fixed left-0 top-0 z-100 size-7.5 opacity-0
          text-(--muted) transition-colors duration-200
          data-[hot=true]:text-(--accent) motion-reduce:transition-none"
      >
        <Star />
      </div>
    </div>
  );
}

function Star({ filled }: { filled?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-full">
      <path
        d="M12 1.8 15.4 8.6 22.2 12 15.4 15.4 12 22.2 8.6 15.4 1.8 12 8.6 8.6z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={filled ? 0 : 1.1}
        strokeLinejoin="round"
      />
    </svg>
  );
}
