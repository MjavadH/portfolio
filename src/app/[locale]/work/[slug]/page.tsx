import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SectionMark } from "@/components/geometry/pattern-divider";
import { Shamse } from "@/components/geometry/shamse";
import { GsapReveal } from "@/components/motion/gsap-reveal";
import { ParallaxMedia } from "@/components/motion/parallax-media";
import { Reveal } from "@/components/motion/reveal";
import { GitHubIcon } from "@/components/ui/brand-icons";
import { CaseChapters } from "@/components/ui/case-chapters";
import { NextProjectLink } from "@/components/ui/next-project-link";
import { ProjectYears } from "@/components/ui/project-years";
import { projects } from "@/content/projects";
import { Link } from "@/i18n/navigation";
import { type Locale, routing } from "@/i18n/routing";
import { formatPosition, localizeDigits } from "@/lib/project-display";

type Props = { params: Promise<{ locale: string; slug: string }> };

const actionClass =
  "inline-flex min-h-11 items-center gap-2.5 rounded-full border border-(--glass-border) bg-(--glass-bg) px-5 text-fg shadow-[inset_0_1px_0_var(--glass-highlight)] transition-colors duration-300 hover:border-accent hover:text-accent-ink focus-visible:outline-offset-[3px]";

const chipClass =
  "small rounded-full border border-(--glass-border) bg-(--glass-bg) px-3 py-1 shadow-[inset_0_1px_0_var(--glass-highlight)]";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => projects.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  const l = locale as Locale;
  const path = (target: Locale) => (target === "fa" ? `/work/${slug}` : `/en/work/${slug}`);
  const title = project.title[l];
  const description = project.summary[l];

  return {
    title,
    description,
    alternates: {
      canonical: path(l),
      languages: { fa: path("fa"), en: path("en") },
    },
    openGraph: {
      type: "article",
      title,
      description,
      locale: l === "fa" ? "fa_IR" : "en_US",
      images: [
        {
          url: project.image.src,
          width: project.image.width,
          height: project.image.height,
          alt: project.image.alt[l],
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [project.image.src],
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!routing.locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);

  const l = locale as Locale;
  const fa = l === "fa";

  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const nextIndex = (index + 1) % projects.length;
  const next = projects.length > 1 ? projects[nextIndex] : null;

  const [t, td] = await Promise.all([
    getTranslations({ locale, namespace: "projects" }),
    getTranslations({ locale, namespace: "projects.detail" }),
  ]);

  const liveHost = project.url ? new URL(project.url).hostname.replace(/^www\./, "") : null;

  const chapters = [
    { id: "problem", title: t("problem"), body: project.problem[l] },
    { id: "role", title: t("role"), body: project.role[l] },
    { id: "outcome", title: t("outcome"), body: project.outcome[l] },
  ];

  return (
    <article className="pt-28 sm:pt-32">
      <header className="shell relative">
        <Shamse className="-inset-e-24 top-20 size-104 sm:-inset-e-32 sm:size-160" />

        <Reveal>
          <Link href="/#projects" className="link-quiet micro text-muted">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="size-3 rtl:-scale-x-100"
              fill="none"
            >
              <path d="M19 12H5m6-6-6 6 6 6" stroke="currentColor" strokeWidth="1.6" />
            </svg>
            <span className="ms-2">{t("backToProjects")}</span>
          </Link>
        </Reveal>

        <div className="glass mt-6 rounded-3xl p-2.5">
          <ParallaxMedia
            strength={3}
            className="relative aspect-16/10 overflow-hidden rounded-[0.875rem] border border-line bg-bg-veil sm:aspect-2/1"
          >
            <Image
              src={project.image.src}
              alt={project.image.alt[l]}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 72rem"
              quality={90}
              className="object-cover"
            />
          </ParallaxMedia>

          <div className="grid gap-x-12 gap-y-8 px-4 pb-4 pt-7 sm:px-6 sm:pb-6 lg:grid-cols-[minmax(0,1fr)_17rem]">
            <Reveal delay={0.1}>
              <p className="micro flex items-center gap-x-2.5 text-muted">
                <ProjectYears value={project.year} fa={fa} />
                <span aria-hidden="true" className="h-2.5 w-px bg-line-strong" />
                <span aria-hidden="true" className="tabular-nums" dir={fa ? "rtl" : "ltr"}>
                  {formatPosition(index + 1, projects.length, fa)}
                </span>
              </p>

              <h1 className="h1 mt-4 max-w-[22ch] text-balance">{project.title[l]}</h1>
              <p className="lead mt-5 max-w-2xl text-muted">{project.summary[l]}</p>
            </Reveal>

            <Reveal
              delay={0.18}
              className="border-t border-(--glass-edge) pt-6 lg:border-s lg:border-t-0 lg:ps-8 lg:pt-0"
            >
              <dl className="space-y-5">
                <Fact label={td("license")}>
                  <span dir="ltr">{project.license}</span>
                </Fact>
                <Fact label={t("tech")}>
                  <GsapReveal
                    selector="[data-chip]"
                    stagger={0.045}
                    distance={10}
                    className="flex flex-wrap gap-2"
                  >
                    {project.stack.map((item) => (
                      <span key={item} data-chip dir="ltr" className={chipClass}>
                        {item}
                      </span>
                    ))}
                  </GsapReveal>
                </Fact>
              </dl>

              <div className="mt-6 flex flex-wrap gap-2.5">
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={actionClass}
                >
                  <GitHubIcon className="size-4 opacity-80" />
                  <span className="small">{t("repo")}</span>
                </a>

                {project.url && liveHost && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={actionClass}
                  >
                    <span className="small" dir="ltr">
                      {liveHost}
                    </span>
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="size-3.5 opacity-80 rtl:-scale-x-100"
                    >
                      <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.7" />
                    </svg>
                  </a>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </header>

      <div className="shell relative mt-14 grid gap-x-16 gap-y-12 sm:mt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]">
        <CaseChapters chapters={chapters} />

        <aside aria-label={t("approach")} className="lg:sticky lg:top-28 lg:self-start">
          <div className="glass rounded-3xl p-6 sm:p-7">
            <SectionMark>{t("approach")}</SectionMark>

            <GsapReveal
              as="ol"
              selector="li"
              stagger={0.1}
              distance={16}
              className="mt-5 space-y-4"
            >
              {project.approach[l].map((step, i) => (
                <li key={step} className="flex gap-3.5">
                  <span
                    aria-hidden="true"
                    className="micro mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border border-(--glass-border) bg-(--glass-bg) tabular-nums text-accent-ink shadow-[inset_0_1px_0_var(--glass-highlight)]"
                  >
                    {localizeDigits(String(i + 1), fa)}
                  </span>
                  <span className="small leading-[1.7]">{step}</span>
                </li>
              ))}
            </GsapReveal>
          </div>
        </aside>
      </div>

      {next && (
        <div className="shell relative mt-20 pb-24 sm:mt-24 sm:pb-28">
          <div className="relative mt-8">
            <Shamse
              direction={-1}
              className="-inset-s-16 -top-20 size-72 sm:-inset-s-24 sm:size-104"
            />
            <NextProjectLink project={next} position={nextIndex + 1} total={projects.length} />
          </div>
        </div>
      )}
    </article>
  );
}

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="micro text-muted">{label}</dt>
      <dd className="small mt-1.5 leading-relaxed">{children}</dd>
    </div>
  );
}
