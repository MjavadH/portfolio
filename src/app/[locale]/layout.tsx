import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import "@fontsource-variable/vazirmatn";
import "@fontsource-variable/inter";
import "../globals.css";

import { Footer } from "@/components/layout/footer";
import { MobileDock } from "@/components/layout/mobile-dock";
import { SideRail } from "@/components/layout/side-rail";
import { SkipLink } from "@/components/layout/skip-link";
import { TopBar } from "@/components/layout/top-bar";
import { HashArrival } from "@/components/providers/hash-arrival";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { ScrollToTopOnRoute } from "@/components/ui/scroll-to-top-on-route";
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
    title: { default: t("title"), template: `%s · ${siteConfig.name}` },
    description: t("description"),
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.name, url: siteConfig.github }],
    alternates: {
      canonical: locale === "fa" ? "/" : "/en",
      languages: { fa: "/", en: "/en" },
    },
    openGraph: {
      type: "website",
      title: t("title"),
      description: t("description"),
      siteName: siteConfig.name,
      locale: locale === "fa" ? "fa_IR" : "en_US",
    },
    twitter: { card: "summary_large_image" },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f0e4" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1226" },
  ],
  colorScheme: "light dark",
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html lang={locale} dir={localeDirection[locale]} suppressHydrationWarning>
      <body>
        <div aria-hidden className="ambient" />
        <div aria-hidden className="grain" />
        <NextIntlClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange={false}
          >
            <SmoothScroll>
              <ScrollToTopOnRoute />
              <HashArrival />
              <SkipLink />
              <CustomCursor />
              <TopBar />
              <SideRail />
              <main id="main">{children}</main>
              <Footer />
              <MobileDock />
            </SmoothScroll>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
