import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/reveal";

export function Projects() {
  const t = useTranslations("projects");

  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <h2 className="text-3xl font-bold md:text-4xl">{t("title")}</h2>
        <p className="text-muted mt-6">{t("empty")}</p>
      </Reveal>
    </section>
  );
}
