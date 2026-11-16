"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";
import { scrollToTop } from "@/lib/section-nav";

const RESTORE_WINDOW_MS = 500;

export function ScrollToTopOnRoute() {
  const pathname = usePathname();
  const previous = useRef<string | null>(null);
  const lastPop = useRef(0);

  useEffect(() => {
    const onPop = () => {
      lastPop.current = Date.now();
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useLayoutEffect(() => {
    const was = previous.current;
    previous.current = pathname;

    if (was === null || was === pathname) return;

    if (Date.now() - lastPop.current < RESTORE_WINDOW_MS) return;

    if (window.scrollY > 8) scrollToTop({ smooth: true });
  }, [pathname]);

  return null;
}
