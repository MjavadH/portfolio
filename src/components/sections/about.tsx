import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/reveal";

export function About() {
  const t = useTranslations("about");

  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <h2 className="text-3xl font-bold md:text-4xl">{t("title")}</h2>
        <p className="text-muted mt-6 max-w-2xl">{t("body")}</p>
      </Reveal>
    </section>
  );
}
