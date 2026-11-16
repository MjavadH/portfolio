import type { Locale } from "@/i18n/routing";

type Localized<T> = Record<Locale, T>;

export type SkillGroup = {
  id: string;
  title: Localized<string>;
  summary: Localized<string>;
  items: Localized<string>[];
};

const same = (value: string): Localized<string> => ({ fa: value, en: value });

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    title: { fa: "فرانت‌اند و رابط کاربری", en: "Frontend & interface" },
    summary: {
      fa: "رابط‌های سریع و در دسترس، با پشتیبانی دقیق از زبان فارسی و RTL",
      en: "Fast, accessible interfaces with first-class RTL support",
    },
    items: [
      same("React & Next.js"),
      same("TypeScript"),
      same("Tailwind CSS"),
      same("Framer Motion & GSAP"),
      { fa: "طراحی واکنش‌گرا و راست‌چین", en: "Responsive and RTL" },
    ],
  },
  {
    id: "backend",
    title: { fa: "بک‌اند و داده", en: "Backend & data" },
    summary: {
      fa: "API، ذخیره‌سازی و پردازش پس‌زمینه برای محصولات واقعی",
      en: "APIs, persistence and background processing for production products",
    },
    items: [
      same("Node.js"),
      same("NestJS"),
      same("PostgreSQL"),
      same("Prisma"),
      same("Redis & BullMQ"),
      same("Meilisearch"),
    ],
  },
  {
    id: "platforms",
    title: { fa: "فراتر از مرورگر", en: "Beyond the browser" },
    summary: {
      fa: "نرم‌افزار دسکتاپ، ربات، افزونه و بازی",
      en: "Desktop apps, bots, plugins and games.",
    },
    items: [
      same("Rust & Tauri"),
      same("C# & .NET"),
      same("Python & aiogram"),
      { fa: "افزونه‌های Obsidian", en: "Obsidian plugins" },
      same("Godot & GDScript"),
    ],
  },
  {
    id: "design",
    title: { fa: "طراحی و تجربه کاربری", en: "Design & experience" },
    summary: {
      fa: "طراحی رابط و تعامل، یکپارچه از ایده تا کد",
      en: "Interface and interaction design, consistent from concept to code",
    },
    items: [
      { fa: "طراحی رابط کاربری (UI)", en: "UI Design" },
      { fa: "تجربه کاربری (UX)", en: "UX" },
      { fa: "طراحی با کمک هوش مصنوعی", en: "AI-Assisted Design" },
      same("Design systems"),
    ],
  },
  {
    id: "ai",
    title: { fa: "توسعه با کمک هوش مصنوعی", en: "AI-assisted development" },
    summary: {
      fa: "هوش مصنوعی به‌عنوان همکار در نمونه‌سازی، طراحی و کدنویسی",
      en: "AI as a collaborator across prototyping, design and code",
    },
    items: [
      same("Claude"),
      same("ChatGPT"),
      same("Gemini"),
      same("Vibe coding"),
      same("prompt engineering"),
    ],
  },
  {
    id: "workflow",
    title: { fa: "گردش‌کار و استقرار", en: "Workflow & delivery" },
    summary: {
      fa: "کنترل نسخه، کانتینر و تست برای انتشار قابل‌اعتماد",
      en: "Version control, containers and tests for dependable releases",
    },
    items: [same("Git & GitHub"), same("Docker"), same("Vitest"), same("pnpm"), same("npm")],
  },
];
