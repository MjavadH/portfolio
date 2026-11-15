import { useTranslations } from "next-intl";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section id="hero" className="mx-auto flex min-h-[85vh] max-w-6xl items-center px-6">
      <div>
        <h1 className="text-5xl font-bold md:text-7xl">{t("name")}</h1>
        <p className="text-muted mt-6 max-w-xl text-lg">{t("tagline")}</p>
        <div className="mt-10 flex gap-4">
          <a
            href="#projects"
            className="glass glass-tint rounded-full px-6 py-3 font-medium transition-transform hover:-translate-y-0.5"
          >
            {t("cta")}
          </a>
          <a
            href="/resume/resume.pdf"
            className="glass rounded-full px-6 py-3 transition-transform hover:-translate-y-0.5"
          >
            {t("resume")}
          </a>
        </div>
      </div>
      {/* TODO: interactive geometry from components/geometry */}
    </section>
  );
}
