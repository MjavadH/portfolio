"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { type MouseEvent, useCallback, useId } from "react";
import { ProjectYears } from "@/components/ui/project-years";
import type { Project } from "@/content/projects";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { formatPosition, STAR_POINTS } from "@/lib/project-display";
import { scrollToTop } from "@/lib/section-nav";

const MotionLink = motion.create(Link);

export function NextProjectLink({
  project,
  position,
  total,
}: {
  project: Project;
  position: number;
  total: number;
}) {
  const t = useTranslations("projects");
  const locale = useLocale() as Locale;
  const reduce = useReducedMotion();
  const uid = useId();
  const labelId = `${uid}-label`;
  const titleId = `${uid}-title`;
  const summaryId = `${uid}-summary`;
  const ctaId = `${uid}-cta`;
  const fa = locale === "fa";

  const onClick = useCallback((event: MouseEvent) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    scrollToTop({ smooth: true });
  }, []);

  return (
    <MotionLink
      href={`/work/${project.slug}`}
      onClick={onClick}
      aria-labelledby={`${labelId} ${titleId}`}
      aria-describedby={`${summaryId} ${ctaId}`}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      whileHover={reduce ? undefined : { y: -4 }}
      whileTap={reduce ? undefined : { scale: 0.985 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className="group/card glass flex flex-col gap-6 rounded-3xl p-2.5 focus-visible:outline-offset-[3px] md:flex-row md:items-stretch md:gap-8"
    >
      <div className="relative aspect-16/10 overflow-hidden rounded-[0.875rem] border border-line bg-bg-veil md:aspect-auto md:min-h-60 md:w-[44%] md:flex-none">
        <Image
          src={project.image.src}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 40vw"
          quality={80}
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover/card:scale-100"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col px-3 pb-3 md:py-4 md:pe-5 md:ps-0">
        <p className="micro flex items-center gap-2 text-muted">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="size-3 shrink-0 fill-gold transition-transform duration-500 group-hover/card:rotate-[22.5deg]"
          >
            <polygon points={STAR_POINTS} />
          </svg>
          <span id={labelId}>{t("nextProject")}</span>
          <span aria-hidden="true" className="ms-auto tabular-nums" dir={fa ? "rtl" : "ltr"}>
            {formatPosition(position, total, fa)}
          </span>
        </p>

        <h2
          id={titleId}
          className="h2 mt-4 transition-colors duration-300 group-hover/card:text-accent-ink group-focus-visible/card:text-accent-ink"
        >
          {project.title[locale]}
        </h2>

        <p id={summaryId} className="small mt-3 line-clamp-3 max-w-152 text-muted">
          {project.summary[locale]}
        </p>

        <div className="micro mt-auto flex items-center gap-x-2.5 pt-6 text-muted">
          <ProjectYears value={project.year} fa={fa} />
          <span aria-hidden="true" className="h-2.5 w-px bg-line-strong" />
          <span dir="ltr">{project.license}</span>

          <span className="ms-auto inline-flex items-center gap-1.5 text-accent-ink">
            <span id={ctaId}>{t("caseStudy")}</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              className="size-3 transition-transform duration-300 group-hover/card:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover/card:-translate-x-0.5"
            >
              <path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.7" />
            </svg>
          </span>
        </div>
      </div>
    </MotionLink>
  );
}
