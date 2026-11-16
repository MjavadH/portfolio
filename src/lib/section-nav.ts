"use client";

import { useEffect } from "react";
import { usePathname } from "@/i18n/navigation";

type LenisLike = {
  scrollTo: (
    target: HTMLElement | number,
    opts?: { offset?: number; immediate?: boolean; duration?: number },
  ) => void;
  stop: () => void;
  start: () => void;
};

let instance: LenisLike | null = null;

export function registerLenis(l: LenisLike | null) {
  instance = l;
}

export function getLenis() {
  return instance;
}

export const SECTION_IDS = [
  "about",
  "projects",
  "articles",
  "skills",
  "education",
  "contact",
] as const;
export type SectionId = (typeof SECTION_IDS)[number];

export function homeHref(locale: string, id: string) {
  return `${locale === "fa" ? "" : "/en"}/#${id}`;
}

const NAV_OFFSET = -72;

const TOP_DURATION = 0.8;

export function scrollToTop({ smooth = true }: { smooth?: boolean } = {}) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const animate = smooth && !reduce;

  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(0, animate ? { duration: TOP_DURATION } : { immediate: true });
    return;
  }
  window.scrollTo({ top: 0, behavior: animate ? "smooth" : ("instant" as ScrollBehavior) });
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return false;

  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(el, { offset: NAV_OFFSET });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY + NAV_OFFSET;
    window.scrollTo({ top, behavior: "instant" as ScrollBehavior });
  }
  return true;
}

export function useIsHome() {
  const pathname = usePathname();
  return pathname === "/" || pathname === "";
}

export function useHashArrival() {
  useEffect(() => {
    const id = window.location.hash.replace("#", "");
    if (!id) return;

    const run = () =>
      requestAnimationFrame(() => {
        if (scrollToId(id)) {
          history.replaceState(null, "", window.location.pathname + window.location.search);
        }
      });

    if (document.readyState === "complete") run();
    else window.addEventListener("load", run, { once: true });

    return () => window.removeEventListener("load", run);
  }, []);
}

export function useSectionNav() {
  const isHome = useIsHome();

  return (id: string, event?: React.MouseEvent) => {
    if (isHome) {
      event?.preventDefault();
      if (scrollToId(id)) {
        history.replaceState(null, "", `#${id}`);
      }
    }
    // Not home: let the anchor navigate to `/#id`; the arrival effect scrolls.
  };
}
