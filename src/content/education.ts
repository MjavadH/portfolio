import type { Locale } from "@/i18n/routing";

type Localized<T> = Record<Locale, T>;

export type Degree = {
  /** Stable key for React and for ordering. */
  id: string;
  degree: Localized<string>;
  field: Localized<string>;
  institution: Localized<string>;
  /** Persian-calendar dates in YYYY/MM format. */
  from: string;
  /** null = currently studying. */
  to: string | null;
};

export const degrees: Degree[] = [
  {
    id: "msc",
    degree: {
      fa: "کارشناسی ارشد",
      en: "Master's degree",
    },
    field: {
      fa: "کامپیوتر، هوش مصنوعی",
      en: "Computer Science, Artificial Intelligence",
    },
    institution: {
      fa: "دانشگاه صنعتی شاهرود",
      en: "Shahrood University of Technology",
    },
    from: "1405/07",
    to: null,
  },
  {
    id: "bsc",
    degree: {
      fa: "کارشناسی",
      en: "Bachelor's degree",
    },
    field: {
      fa: "کامپیوتر، نرم‌افزار",
      en: "Computer Science, Software",
    },
    institution: {
      fa: "دانشگاه فنی حرفه‌ای رشت",
      en: "Rasht Technical and Vocational University",
    },
    from: "1403/07",
    to: "1405/03",
  },
  {
    id: "associate",
    degree: {
      fa: "کاردانی",
      en: "Associate degree",
    },
    field: {
      fa: "کامپیوتر، نرم‌افزار",
      en: "Computer Science, Software",
    },
    institution: {
      fa: "دانشگاه فنی حرفه‌ای رشت",
      en: "Rasht Technical and Vocational University",
    },
    from: "1401/07",
    to: "1403/03",
  },
];
