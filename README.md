# وب‌سایت پورتفولیو

وب‌سایت شخصی و نمونه‌کار، دوزبانه (فارسی پیش‌فرض، انگلیسی) با حالت شب و روز.
[English README](./README.en.md)

## تکنولوژی‌ها

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- next-intl (مسیریابی دوزبانه: فارسی در `/` و انگلیسی در `/en`)
- next-themes (حالت شب و روز)
- Motion (Framer Motion) برای انیمیشن رابط
- GSAP + ScrollTrigger برای سناریوهای اسکرول
- Lenis برای اسکرول نرم
- فونت وزیرمتن (self-host از طریق `@fontsource-variable/vazirmatn`)
- Biome برای لینت و فرمت (جایگزین ESLint و Prettier)
- pnpm به‌عنوان پکیج‌منیجر
- سیستم طراحی شیشه‌ای (Glassmorphism / Liquid Glass) با CSS خالص

## اجرا

نیازمندی‌ها: Node.js 22 به بالا و pnpm.

```bash
corepack enable
pnpm install
pnpm check:fix   # یک بار، برای هم‌سان‌سازی فرمت
pnpm dev
```

سپس `http://localhost:3000` را باز کنید.

## دستورها

| دستور            | کار                                     |
| ---------------- | --------------------------------------- |
| `pnpm dev`       | اجرای محیط توسعه                        |
| `pnpm build`     | ساخت نسخه production                    |
| `pnpm start`     | اجرای نسخه ساخته‌شده                     |
| `pnpm check`     | لینت + فرمت + مرتب‌سازی importها (Biome) |
| `pnpm check:fix` | همان، با اصلاح خودکار                    |
| `pnpm typecheck` | بررسی TypeScript                        |

## ساختار پوشه‌ها

```
src/
  app/[locale]/        صفحات و layout (هر دو زبان)
  components/
    ui/                کامپوننت‌های پایه (دکمه، کارت...)
    sections/          Hero, About, Projects, Skills, Contact
    motion/            wrapperهای انیمیشن
    geometry/          الگوهای هندسی اسلیمی
    layout/            Header, Footer, تغییر زبان و تم
    providers/         Theme و SmoothScroll
  content/             محتوای پروژه‌ها (جدا از کد)
  hooks/ lib/ types/
  i18n/                تنظیمات next-intl
messages/              متن‌های رابط (fa.json, en.json)
public/                فونت، تصویر، رزومه
docs/                  تصمیم‌های طراحی و فنی
```

## قواعد کار

- متن رابط فقط در `messages/` نوشته شود، نه داخل کامپوننت.
- از کلاس‌های logical در Tailwind استفاده شود (`ms-`, `me-`, `ps-`, `pe-`, `start-`, `end-`) نه `ml-`/`mr-`.
- انیمیشن متن فارسی فقط کلمه‌به‌کلمه، نه حرف‌به‌حرف.
- هر المان را فقط یک کتابخانه انیمیشن کنترل کند.
- `prefers-reduced-motion` و `prefers-reduced-transparency` همیشه رعایت شود.
- سطح شیشه‌ای (`glass`) را کم استفاده کن: `backdrop-filter` پرهزینه است و روی هم‌گذاشتن شیشه‌ها اثر خوبی ندارد.

## شاخه‌ها و کامیت

`main` برابر production است. هر قابلیت در `feature/...` ساخته می‌شود. پیام کامیت به‌صورت Conventional Commits (`feat:`, `fix:`, `chore:`...).

## دیپلوی

ریپو را به Vercel وصل کنید. متغیر `NEXT_PUBLIC_SITE_URL` را در تنظیمات پروژه بگذارید.
