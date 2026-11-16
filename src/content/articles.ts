import type { Locale } from "@/i18n/routing";

type Localized<T> = Record<Locale, T>;

export type Article = {
  id: string;
  title: Localized<string>;
  /** Where it was published: the conference or journal. */
  venue: Localized<string>;
  url: string;
  /** Sorting key, ISO. The UI formats it per locale. */
  date: string;
  /** Shown as written on the Persian record, so the source stays legible. */
  dateFa: string;
  dateEn: string;

  details: Localized<string>;
  keywords: string[];
};

export const articles: Article[] = [
  {
    id: "1899423",
    title: {
      fa: "بررسی وب اپلیکیشن‌های PWA، SPA و MPA",
      en: "A review of PWA, SPA and MPA web applications",
    },
    venue: {
      fa: "یازدهمین کنفرانس ملی ایده‌های نوین در علوم انسانی و مهندسی",
      en: "11th National Conference on New Ideas in Humanities and Engineering",
    },
    url: "https://civilica.com/doc/1899423/",
    date: "2024-01-31",
    dateFa: "۱۱ بهمن ۱۴۰۲",
    dateEn: "31 January 2024",
    details: {
      fa: "در این مقاله تفاوت‌ها، مزایا و معایب معماری‌های مختلف وب‌اپلیکیشن شامل SPA، PWA و MPA بررسی شده و کاربرد هر یک در توسعه وب مدرن تحلیل شده است.",
      en: "This article examines the differences, advantages, and disadvantages of major web application architectures, including SPA, PWA, and MPA, and analyzes where each approach fits in modern web development.",
    },
    keywords: ["SPA", "PWA", "MPA"],
  },
  {
    id: "1899467",
    title: {
      fa: "خانه‌های هوشمند در عصر اینترنت اشیا",
      en: "Smart homes in the age of the Internet of Things",
    },
    venue: {
      fa: "یازدهمین کنفرانس ملی ایده‌های نوین در علوم انسانی و مهندسی",
      en: "11th National Conference on New Ideas in Humanities and Engineering",
    },
    url: "https://civilica.com/doc/1899467/",
    date: "2024-01-31",
    dateFa: "۱۱ بهمن ۱۴۰۲",
    dateEn: "31 January 2024",
    details: {
      fa: "در این مقاله ساختار و عملکرد خانه‌های هوشمند مبتنی بر فناوری اینترنت اشیا (IoT) بررسی شده است. همچنین نحوه تعامل دستگاه‌ها، امنیت اطلاعات و تأثیر این فناوری بر رفاه کاربران و مصرف انرژی تحلیل شده است.",
      en: "This article explores the structure and operation of smart homes powered by the Internet of Things (IoT). It also examines how connected devices interact, how information is secured, and how this technology affects user comfort and energy consumption.",
    },
    keywords: ["IoT", "Smart Home"],
  },
  {
    id: "1736404",
    title: {
      fa: "فلاتر و کاربردهای آن در طراحی نرم‌افزار",
      en: "Flutter and its uses in software design",
    },
    venue: {
      fa: "دهمین کنفرانس ملی ایده‌های نوین در فنی و مهندسی",
      en: "10th National Conference on New Ideas in Engineering and Technology",
    },
    url: "https://civilica.com/doc/1736404/",
    date: "2023-08-22",
    dateFa: "۳۱ مرداد ۱۴۰۲",
    dateEn: "22 August 2023",
    details: {
      fa: "در این مقاله فریم‌ورک فلاتر و کاربردهای آن در طراحی و توسعه نرم‌افزار معرفی شده و مزایای آن در توسعه چندسکویی و پیاده‌سازی رابط کاربری بررسی شده است.",
      en: "This article introduces the Flutter framework and its applications in software design and development, highlighting its advantages for cross-platform development and user interface implementation.",
    },
    keywords: ["Flutter", "Dart"],
  },
];

/** Newest first, which is also the order the records were indexed. */
export const articlesByDate = [...articles].sort((a, b) => b.date.localeCompare(a.date));

export const languageNote: Localized<string | null> = {
  fa: null,
  en: "The papers are written in Persian; the English titles and summaries are translations.",
};
