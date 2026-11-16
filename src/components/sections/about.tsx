"use client";

import { useReducedMotion } from "motion/react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { StarMark } from "@/components/geometry/monogram";
import { PatternDivider, SectionMark } from "@/components/geometry/pattern-divider";
import { Reveal } from "@/components/motion/reveal";

export function About() {
  const t = useTranslations("about");
  const reduceMotion = useReducedMotion();
  const portraitCaption = t("portraitCaption");

  return (
    <section id="about" className="section-y relative scroll-mt-24">
      <div className="shell">
        <Reveal>
          <SectionMark>{t("title")}</SectionMark>
        </Reveal>

        <div className="block-y grid items-start gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div>
            <Reveal delay={0.05}>
              <h2 className="h2 max-w-[26ch]">{t("lead")}</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="body-text text-muted mt-7 max-w-xl">{t("body")}</p>
              <p className="body-text text-muted mt-4 max-w-xl">{t("body2")}</p>
            </Reveal>
          </div>

          {reduceMotion ? (
            <div className="order-first lg:order-0">
              <PortraitPlate caption={portraitCaption} alt={t("portraitAlt")} />
            </div>
          ) : (
            <Reveal delay={0.12} className="order-first lg:order-0">
              <PortraitPlate caption={portraitCaption} alt={t("portraitAlt")} />
            </Reveal>
          )}
        </div>

        <PatternDivider className="mt-[clamp(5rem,10vh,8rem)] opacity-80" />
      </div>
    </section>
  );
}

function PortraitPlate({ caption, alt }: { caption: string; alt: string }) {
  return (
    <figure className="relative mx-auto w-full max-w-[20rem] lg:ms-auto lg:max-w-88">
      <div className="relative aspect-4/5 overflow-hidden rounded-3xl border border-line">
        <Image
          src="/images/profile.jpg"
          alt={alt}
          width={704}
          height={880}
          sizes="(max-width: 1024px) 320px, 352px"
          className="size-full object-cover object-[50%_38%]"
        />

        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden bg-(--bg)/25 dark:block"
        />
      </div>

      <figcaption className="text-muted micro mt-3 flex items-center gap-2">
        <StarMark size={8} className="text-gold" />
        {caption}
      </figcaption>
    </figure>
  );
}
