"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useId } from "react";
import { SectionMark } from "@/components/geometry/pattern-divider";
import { Reveal } from "@/components/motion/reveal";
import { ProjectYears } from "@/components/ui/project-years";
import { type Project, projects } from "@/content/projects";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function Projects() {
  const t = useTranslations("projects");
  const locale = useLocale() as Locale;

  return (
    <section id="projects" aria-labelledby="projects-heading" className="relative scroll-mt-24">
      <div className="shell">
        <Reveal>
          <SectionMark>{t("title")}</SectionMark>
          <h2 id="projects-heading" className="h2 mt-5">
            {t("heading")}
          </h2>
        </Reveal>

        <ul className="block-y grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal
              key={project.slug}
              as="li"
              distance={14}
              delay={i === 0 ? 0 : ((i - 1) % 3) * 0.07}
              className={cn("flex", i === 0 && "sm:col-span-2 lg:col-span-3")}
            >
              <ProjectCard project={project} locale={locale} featured={i === 0} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

type CardProps = {
  project: Project;
  locale: Locale;
  featured: boolean;
};

function ProjectCard({ project, locale, featured }: CardProps) {
  const t = useTranslations("projects");
  const uid = useId();
  const titleId = `${uid}-title`;
  const summaryId = `${uid}-summary`;
  const ctaId = `${uid}-cta`;
  const fa = locale === "fa";

  return (
    <Link
      href={`/work/${project.slug}`}
      aria-labelledby={titleId}
      aria-describedby={`${summaryId} ${ctaId}`}
      className={cn(
        "group/card glass glass-strong relative isolate flex w-full flex-col gap-5 rounded-[1.375rem] p-2.5",
        "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:hover:-translate-y-0.5",
        "focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-(--focus)",
        featured && "md:flex-row md:gap-8",
      )}
    >
      <div
        className={cn(
          "relative aspect-16/10 overflow-hidden rounded-xl border border-line bg-bg-veil",
          featured && "md:aspect-auto md:min-h-76 md:w-[56%] md:flex-none",
        )}
      >
        <Image
          src={project.image.src}
          alt={project.image.alt[locale]}
          fill
          sizes={
            featured
              ? "(max-width: 768px) 100vw, (max-width: 1280px) 60vw, 700px"
              : "(max-width: 640px) 100vw, (max-width: 1024px) 46vw, 30vw"
          }
          quality={82}
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover/card:scale-100"
        />
      </div>

      <div
        className={cn(
          "flex min-w-0 flex-1 flex-col px-2.5 pb-2.5",
          featured && "md:justify-center md:px-0 md:py-3 md:pe-4",
        )}
      >
        <h3
          id={titleId}
          className="h3 transition-colors duration-300 group-hover/card:text-accent-ink group-focus-visible/card:text-accent-ink"
        >
          {project.title[locale]}
        </h3>

        <p id={summaryId} className={cn("small mt-2.5 text-muted", !featured && "line-clamp-3")}>
          {project.summary[locale]}
        </p>

        <StackTags items={project.stack} max={featured ? 5 : 3} />

        <div className="micro mt-auto flex items-center gap-x-2.5 pt-5 text-muted">
          <ProjectYears value={project.year} fa={fa} />
          <span aria-hidden className="h-2.5 w-px bg-line-strong" />
          <span dir="ltr">{project.license}</span>

          <span className="ms-auto inline-flex items-center gap-1.5 text-accent-ink">
            <span id={ctaId} className={featured ? undefined : "sr-only"}>
              {t("caseStudy")}
            </span>
            <svg
              viewBox="0 0 24 24"
              aria-hidden
              fill="none"
              className="size-3 transition-transform duration-300 group-hover/card:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover/card:-translate-x-0.5"
            >
              <path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

function StackTags({ items, max }: { items: string[]; max: number }) {
  return (
    <div className="mt-4 flex flex-wrap gap-1.5">
      {items.slice(0, max).map((item) => (
        <span
          key={item}
          dir="ltr"
          className="micro rounded-full border border-line bg-bg-veil px-2.5 py-0.5 text-muted"
        >
          {item}
        </span>
      ))}
    </div>
  );
}
