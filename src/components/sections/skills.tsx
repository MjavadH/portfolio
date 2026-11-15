import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/reveal";

export function Skills() {
  const t = useTranslations("skills");

  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <h2 className="text-3xl font-bold md:text-4xl">{t("title")}</h2>
      </Reveal>
    </section>
  );
}
