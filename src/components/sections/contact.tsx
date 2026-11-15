import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/reveal";

export function Contact() {
  const t = useTranslations("contact");

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <h2 className="text-3xl font-bold md:text-4xl">{t("title")}</h2>
        <a
          href="mailto:you@example.com"
          className="text-accent mt-6 inline-block text-xl underline-offset-8 hover:underline"
        >
          {t("email")}
        </a>
      </Reveal>
    </section>
  );
}
