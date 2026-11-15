import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import "@fontsource-variable/vazirmatn";
import "@fontsource-variable/inter";
import "../globals.css";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { localeDirection, routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(siteConfig.url),
    title: t("title"),
    description: t("description"),
    alternates: { languages: { fa: "/", en: "/en" } },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html lang={locale} dir={localeDirection[locale]} suppressHydrationWarning>
      <body>
        <div aria-hidden className="ambient" />
        <NextIntlClientProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <SmoothScroll>
              <Header />
              <main>{children}</main>
              <Footer />
            </SmoothScroll>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
