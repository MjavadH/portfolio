import type { Locale } from "@/i18n/routing";

type Localized<T> = Record<Locale, T>;

export type Project = {
  slug: string;
  year: string;
  license: string;
  stack: string[];
  url?: string;
  repo: string;
  image: { src: string; width: number; height: number; alt: Localized<string> };
  title: Localized<string>;
  summary: Localized<string>;
  problem: Localized<string>;
  role: Localized<string>;
  approach: Localized<string[]>;
  outcome: Localized<string>;
};

export const projects: Project[] = [
  {
    slug: "readory",
    year: "2026",
    license: "AGPL-3.0",
    stack: [
      "Next.js",
      "TypeScript",
      "NestJS",
      "Prisma",
      "PostgreSQL",
      "Redis",
      "BullMQ",
      "Meilisearch",
      "S3",
      "Docker",
    ],
    repo: "https://github.com/MjavadH/Readory",
    image: {
      src: "/images/projects/readory.jpg",
      width: 1200,
      height: 627,
      alt: {
        fa: "تصویر معرفی Readory؛ پلتفرم کتاب‌خوانی و فروشگاه کتاب دیجیتال",
        en: "Readory project artwork: a digital bookstore and serialized reading platform",
      },
    },
    title: { fa: "Readory", en: "Readory" },
    summary: {
      fa: "پلتفرم کتاب‌خوانی و فروشگاه کتاب دیجیتال برای کشف، خرید و مطالعه مانگا، کمیک، رمان و لایت‌ناول؛ همراه با کتابخانه شخصی و پنل مدیریت",
      en: "A digital bookstore and reading platform for discovering, purchasing, and reading manga, comics, novels, and light novels, with a personal library and an administration workspace",
    },
    problem: {
      fa: "مطالعه و مدیریت محتوای سریالی معمولاً میان فروشگاه، کتاب‌خوان و ابزارهای جداگانه تقسیم می‌شود. Readory این تجربه‌ها را در یک سامانه یکپارچه گرد هم می‌آورد و ابزارهای مدیریتی لازم برای اداره کاتالوگ و کاربران را نیز فراهم می‌کند",
      en: "Serialized digital reading often spans disconnected storefronts, readers, and account tools. Readory brings discovery, purchasing, reading, and library management into one platform while giving administrators a unified way to operate the catalog and its users",
    },
    role: {
      fa: "طراحی معماری و توسعه فول‌استک پلتفرم، شامل فرانت‌اند، API، تجربه مطالعه، پنل مدیریت و زیرساخت اجرایی",
      en: "Product architecture and full-stack development across the frontend, API, reading experience, administration workspace, and deployment infrastructure",
    },
    approach: {
      fa: [
        "ساختار monorepo مبتنی بر npm workspaces با اپلیکیشن Next.js، سرور NestJS و پکیج TypeScript مشترک",
        "مدیریت داده با PostgreSQL و Prisma؛ استفاده از Redis و BullMQ برای کش، صف‌ها و پردازش‌های پس‌زمینه",
        "جست‌وجو با Meilisearch و نگهداری رسانه و محتوای فصل‌ها در فضای ذخیره‌سازی سازگار با S3",
      ],
      en: [
        "An npm-workspaces monorepo containing a Next.js app, a NestJS API, and a shared TypeScript package",
        "PostgreSQL and Prisma for persistence, with Redis and BullMQ for caching, queues, and background workloads",
        "Meilisearch for catalog search and S3-compatible object storage for media and chapter content",
      ],
    },
    outcome: {
      fa: "یک سامانه یکپارچه با صفحات عمومی کشف کتاب، جریان‌های حساب کاربری، کیف پول و پرداخت، کتابخانه و تاریخچه مطالعه، اعلان‌ها و مجموعه‌ای از ابزارهای مدیریتی برای اداره محتوا و کاربران",
      en: "An integrated platform with public catalog discovery, account and wallet flows, payment handling, personal libraries and reading history, notifications, and administration tools for managing content and users",
    },
  },
  {
    slug: "linka",
    year: "2026",
    license: "MIT",
    stack: ["Python", "aiogram 3", "SQLAlchemy", "Alembic", "PostgreSQL", "Docker"],
    repo: "https://github.com/MjavadH/Linka",
    image: {
      src: "/images/projects/linka.png",
      width: 1672,
      height: 941,
      alt: {
        fa: "بنر Linka",
        en: "Linka banner",
      },
    },
    title: { fa: "Linka", en: "Linka" },
    summary: {
      fa: "پلتفرم متن‌باز و Self-Hosted برای تحویل خودکار فایل در تلگرام، با لینک‌های عمیق، دسترسی پریمیوم، بررسی عضویت اسپانسر و آرشیو مبتنی بر تلگرام",
      en: "An open-source, self-hosted Telegram file-delivery platform with deep links, premium access, sponsor membership checks, and Telegram-native archive storage",
    },
    problem: {
      fa: "مدیریت فایل‌های قابل دانلود در تلگرام به ابزارهایی برای سازمان‌دهی محتوا، کنترل دسترسی، بررسی عضویت کانال‌ها و سنجش میزان استفاده نیاز دارد. Linka این گردش کار را در قالب یک ربات و پنل مدیریتی متمرکز می‌کند",
      en: "Running a Telegram-based file distribution service requires coordinated content management, access control, channel-membership checks, and usage reporting. Linka consolidates these workflows into a single bot and administration system",
    },
    role: {
      fa: "طراحی و توسعه سامانه، شامل ربات تلگرام، مدل داده، پنل مدیریت، ابزارهای نظارت و استقرار مبتنی بر Docker",
      en: "System design and implementation, including the Telegram bot, data model, administration panel, operational tools, and Docker-based deployment",
    },
    approach: {
      fa: [
        "پیاده‌سازی ربات با aiogram 3 و لایه داده async مبتنی بر SQLAlchemy و مهاجرت‌های Alembic",
        "استفاده از Telegram file_id و کانال آرشیو برای نگهداری فایل‌ها بدون انتقال محتوای فایل به فضای ذخیره‌سازی جداگانه",
        "پیاده‌سازی کنترل دسترسی پریمیوم، کمپین‌های اسپانسر، ارسال همگانی محدودشده و ثبت رویدادهای مدیریتی",
      ],
      en: [
        "An aiogram 3 bot backed by asynchronous SQLAlchemy data access and Alembic migrations",
        "Telegram file_id references and an archive channel keep file payloads within Telegram rather than a separate file store",
        "Premium access controls, sponsor campaigns, rate-limited broadcasts, analytics, and administrative audit logging",
      ],
    },
    outcome: {
      fa: "ابزار یکپارچه‌ای برای انتشار و تحویل فایل، مدیریت محتوای چندنسخه‌ای، کنترل اشتراک‌ها و اسپانسرها، پیگیری دانلودها و نگهداری سامانه؛ قابل استقرار به‌صورت Self-Hosted با Docker Compose",
      en: "A unified system for publishing and delivering files, managing content variants and subscriptions, enforcing sponsor requirements, tracking downloads, and operating the service through a self-hosted Docker Compose deployment",
    },
  },
  {
    slug: "prayerchime",
    year: "2024–2026",
    license: "MIT",
    stack: ["TypeScript", "Obsidian API"],
    repo: "https://github.com/MjavadH/PrayerChime",
    image: {
      src: "/images/projects/prayerchime.jpg",
      width: 1536,
      height: 1024,
      alt: {
        fa: "بنر معرفی PrayerChime برای نمایش اوقات شرعی در Obsidian.",
        en: "PrayerChime project banner for displaying prayer times in Obsidian.",
      },
    },
    title: { fa: "PrayerChime", en: "PrayerChime" },
    summary: {
      fa: "پلاگین فارسی‌محور و آفلاین Obsidian برای محاسبه و نمایش اوقات شرعی شهرهای ایران، همراه با تاریخ شمسی، زمان بعدی و شمارش معکوس",
      en: "An offline, Persian-first Obsidian plugin that calculates and displays prayer times for Iranian cities, with the Persian date, next prayer, and a countdown",
    },
    problem: {
      fa: "ابزارهای مبتنی بر سرویس‌های آنلاین برای نمایش اوقات شرعی به اتصال شبکه وابسته‌اند و ممکن است داده مکانی کاربر را به سرویس بیرونی ارسال کنند. PrayerChime محاسبات و داده شهرها را داخل خود پلاگین نگه می‌دارد",
      en: "Online prayer-time tools depend on network access and may send location data to external services. PrayerChime bundles its city data and calculation logic with the plugin, keeping normal use offline",
    },
    role: {
      fa: "طراحی و توسعه پلاگین Obsidian، شامل داده شهرها، منطق محاسبه، رابط راست‌چین و فارسی، تنظیمات و تست‌ها",
      en: "Obsidian plugin design and development, covering the city dataset, calculation logic, Persian RTL interface, settings, and tests",
    },
    approach: {
      fa: [
        "استفاده از مجموعه‌داده محلی شهرهای ایران و محاسبه اوقات بر اساس مختصات و روش محاسباتی انتخاب‌شده",
        "ارائه نمای اختصاصی در سایدبار، نمایش در نوار وضعیت، جست‌وجوی شهرها و مدیریت شهرهای محبوب",
        "پیاده‌سازی تنظیمات روش محاسبه و زمان‌های قابل نمایش، با تست‌های خودکار و بدون API خارجی در زمان اجرا",
      ],
      en: [
        "A bundled Iranian city dataset with local calculations based on coordinates and the selected calculation method",
        "A dedicated sidebar view, optional status-bar display, city search, and favorite-city management",
        "Configurable calculation methods and displayed prayer events, backed by automated tests and no external runtime API",
      ],
    },
    outcome: {
      fa: "پلاگینی قابل نصب از Obsidian Community Plugins که اوقات شرعی را بدون درخواست شبکه محاسبه می‌کند و رابط فارسی و راست‌چین را در محیط یادداشت‌برداری Obsidian ارائه می‌دهد",
      en: "A plugin available through Obsidian Community Plugins that calculates prayer times without network requests and brings a Persian RTL interface directly into the Obsidian workspace",
    },
  },
  {
    slug: "stondodge",
    year: "2025",
    license: "GPL-3.0",
    stack: ["Godot Engine 4", "GDScript"],
    repo: "https://github.com/MjavadH/StonDodge",
    url: "https://myket.ir/app/ir.MjavadH.stondodge",
    image: {
      src: "/images/projects/stondodge.jpg",
      width: 1280,
      height: 720,
      alt: {
        fa: "تصویر معرفی بازی StonDodge؛ بازی اکشن فضایی دوبعدی با سفینه و شهاب‌سنگ‌ها.",
        en: "StonDodge game artwork showing a 2D space action game with a starship and meteors.",
      },
    },
    title: { fa: "StonDodge", en: "StonDodge" },
    summary: {
      fa: "بازی اکشن و شوتر آرکید دوبعدی برای موبایل؛ با کنترل تک‌انگشتی، موج‌های بی‌پایان شهاب‌سنگ، نبردهای باس و سفینه‌های قابل ارتقا",
      en: "A 2D mobile arcade action shooter featuring one-handed controls, endless meteor waves, boss encounters, and upgradeable spaceships",
    },
    problem: {
      fa: "هدف پروژه ساخت یک بازی آرکید موبایلی با کنترل ساده اما چالش رو به افزایش است؛ تجربه‌ای که در آن بازیکن بتواند در زمان کوتاه وارد بازی شود و با پیشرفت در مراحل، حالت‌ها و قابلیت‌های تازه‌ای را تجربه کند",
      en: "The project explores a mobile arcade experience that is easy to pick up but increasingly challenging, letting players jump into short sessions while unlocking new modes and progression options over time",
    },
    role: {
      fa: "توسعه بازی با Godot، از پیاده‌سازی گیم‌پلی و حالت‌های بازی تا سیستم سفینه‌ها، ارتقاها و پشتیبانی چندزبانه",
      en: "Game development with Godot, spanning gameplay, game modes, ship progression and upgrades, and multilingual support",
    },
    approach: {
      fa: [
        "طراحی کنترل تک‌انگشتی در حالت عمودی برای تجربه آرکید موبایل",
        "پیاده‌سازی پنج حالت بازی شامل Classic، Survival، Boss Rush، Blackout و Payload Escort",
        "طراحی چند سفینه با توانایی‌های متفاوت، مسیرهای ارتقا و نبرد با باس‌های فضایی",
      ],
      en: [
        "One-handed controls and portrait-oriented gameplay for mobile arcade sessions",
        "Five modes: Classic, Survival, Boss Rush, Blackout, and Payload Escort",
        "Multiple ships with distinct abilities and upgrade paths, alongside space-boss encounters",
      ],
    },
    outcome: {
      fa: "بازی قابل اجرا روی موبایل با پنج حالت بازی، بیش از پنج باس و بیش از پنج سفینه قابل انتخاب؛ دارای رابط و محتوای فارسی و انگلیسی و در دسترس از طریق فروشگاه مایکت",
      en: "A mobile game featuring five modes, more than five bosses and more than five selectable ships, with Persian and English support and availability through the Myket store",
    },
  },
  {
    slug: "bastehyab",
    year: "2026",
    license: "MIT",
    stack: ["Rust", "Tauri 2", "React", "TypeScript", "Vite", "Cargo"],
    repo: "https://github.com/MjavadH/BastehYab",
    image: {
      src: "/images/projects/bastehyab.png",
      width: 1024,
      height: 1024,
      alt: {
        fa: "تصویر معرفی BastehYab؛ برنامه دسکتاپ فارسی برای بررسی و مقایسه بسته‌های اینترنت موبایل.",
        en: "BastehYab project artwork: a Persian desktop app for browsing and comparing mobile data packages.",
      },
    },
    title: { fa: "BastehYab", en: "BastehYab" },
    summary: {
      fa: "برنامه دسکتاپ متن‌باز و Local-first برای جمع‌آوری، جست‌وجو، فیلتر و مقایسه بسته‌های اینترنت اپراتورهای ایران، بدون نیاز به حساب کاربری یا سرور مرکزی",
      en: "An open-source, local-first desktop app for collecting, searching, filtering, and comparing mobile data packages from Iranian carriers, without an account or central server",
    },
    problem: {
      fa: "اطلاعات بسته‌های اینترنت میان وب‌سایت‌ها و اپراتورهای مختلف پراکنده است و مقایسه قیمت، حجم و اعتبار آن‌ها دشوار می‌شود. BastehYab داده‌ها را در یک محیط دسکتاپ فارسی گردآوری و به قالبی قابل مقایسه تبدیل می‌کند",
      en: "Mobile data offers are scattered across carrier websites and are difficult to compare consistently by price, allowance, and validity. BastehYab brings the available offers into one Persian desktop interface and normalizes them for comparison",
    },
    role: {
      fa: "طراحی معماری و توسعه برنامه دسکتاپ، شامل هسته Rust، رابط React، گردآورنده‌های مستقل اپراتورها و منطق فیلتر و پیشنهاد",
      en: "Desktop application architecture and development, including the Rust core, React interface, independent carrier collectors, and filtering and recommendation logic",
    },
    approach: {
      fa: [
        "استفاده از Tauri 2 برای پوسته دسکتاپ و Rust برای دریافت داده، عادی‌سازی، اعتبارسنجی و منطق دامنه",
        "رابط React و TypeScript با ارتباط تایپ‌شده از طریق Tauri IPC",
        "کش محلی و پردازش مستقل هر اپراتور برای حفظ داده قبلی و محدود کردن اثر خطای یک منبع بر سایر منابع",
      ],
      en: [
        "Tauri 2 for the desktop shell and Rust for data collection, normalization, validation, and domain logic",
        "A React and TypeScript interface communicating with the core through typed Tauri IPC commands",
        "Local caching and isolated carrier collectors to preserve previous data and contain source-specific failures",
      ],
    },
    outcome: {
      fa: "برنامه‌ای برای بررسی بسته‌های همراه اول، ایرانسل، رایتل و سامانتل، با مقایسه هم‌زمان بسته‌ها، پیشنهادهای قابل توضیح و نمایش وضعیت و تازگی داده هر اپراتور",
      en: "A desktop workspace for browsing offers from MCI, Irancell, Rightel, and Samantel, with side-by-side comparisons, explainable recommendations, and per-carrier data freshness status",
    },
  },
  {
    slug: "advanced-lock",
    year: "2023–2025",
    license: "Apache-2.0",
    stack: ["C#", ".NET Framework", "Windows Forms"],
    repo: "https://github.com/MjavadH/Advanced-Lock",
    image: {
      src: "/images/projects/advanced-lock.png",
      width: 1672,
      height: 941,
      alt: {
        fa: "تصویر معرفی Advanced-Lock؛ نرم‌افزار ویندوزی مدیریت عملیات رمزگذاری و رمزگشایی فایل و متن.",
        en: "Advanced-Lock project artwork: a Windows utility for text and file encryption and decryption workflows.",
      },
    },
    title: { fa: "Advanced-Lock", en: "Advanced-Lock" },
    summary: {
      fa: "نرم‌افزار دسکتاپ ویندوز برای اجرای عملیات رمزگذاری و رمزگشایی متن، فایل و پوشه، همراه با تاریخچه، قفل برنامه و رابط چندزبانه",
      en: "A Windows desktop utility for encrypting and decrypting text, files, and folders, with history, application locking, and a multilingual interface",
    },
    problem: {
      fa: "مدیریت عملیات رمزگذاری و رمزگشایی فایل‌ها و متن از طریق ابزارهای جداگانه می‌تواند پراکنده باشد. Advanced-Lock این عملیات و گزینه‌های مرتبط با مدیریت فایل را در یک برنامه ویندوزی جمع می‌کند",
      en: "Encrypting and decrypting text and files across separate utilities can make routine file-handling workflows fragmented. Advanced-Lock brings these operations and related file-management options into one Windows application",
    },
    role: {
      fa: "توسعه نرم‌افزار دسکتاپ ویندوز با تمرکز بر جریان‌های رمزگذاری و رمزگشایی، مدیریت فایل، تنظیمات و رابط کاربری چندزبانه",
      en: "Windows desktop application development, focusing on encryption and decryption workflows, file handling, settings, and a multilingual user interface",
    },
    approach: {
      fa: [
        "پیاده‌سازی ابزارهای رمزگذاری و رمزگشایی برای متن، فایل و پوشه در برنامه دسکتاپ C#",
        "افزودن اتصال پسوند فایل، گزینه‌های منوی راست‌کلیک ویندوز و قابلیت ذخیره و بازیابی تاریخچه",
        "ارائه پوسته روشن و تیره، قفل برنامه با گذرواژه و رابط با پشتیبانی از هفت زبان",
      ],
      en: [
        "C# desktop workflows for encrypting and decrypting text, individual files, and folders",
        "File associations, Windows context-menu actions, and saveable operation history",
        "Light and dark themes, password-based application locking, and a seven-language interface",
      ],
    },
    outcome: {
      fa: "یک ابزار ویندوزی با امکانات مدیریت عملیات رمزگذاری و رمزگشایی و یکپارچگی با محیط فایل ویندوز. مخزن در مهر ۱۴۰۴ آرشیو شده است",
      en: "A Windows utility combining encryption and decryption workflows with file-system integration. The repository was archived in September 2025",
    },
  },
  {
    slug: "number",
    year: "2022",
    license: "MIT",
    stack: ["C#", ".NET Framework", "Windows Forms"],
    repo: "https://github.com/MjavadH/Number",
    image: {
      src: "/images/projects/number.png",
      width: 1280,
      height: 640,
      alt: {
        fa: "تصویر معرفی Number؛ نرم‌افزار ویندوزی ساخت و مدیریت شمارنده‌های رویداد.",
        en: "Number project artwork: a Windows app for creating and managing event counters.",
      },
    },
    title: { fa: "Number", en: "Number" },
    summary: {
      fa: "نرم‌افزار شمارنده رویداد برای ویندوز؛ با امکان ساخت و مدیریت چند شمارنده، ذخیره وضعیت، میانبرهای صفحه‌کلید و شخصی‌سازی ظاهر",
      en: "A Windows event-counter application for creating and managing multiple counters, saving state, configuring keyboard shortcuts, and customizing the interface",
    },
    problem: {
      fa: "ثبت تکرار رویدادهای روزمره یا فرایندهای کاری به شمارنده‌هایی نیاز دارد که به‌سادگی قابل تنظیم و بازیابی باشند. Number امکان ساخت چند شمارنده مستقل و مدیریت مقدار آن‌ها را در یک محیط دسکتاپ فراهم می‌کند",
      en: "Tracking repeated events or routine activities calls for counters that are easy to configure and restore. Number provides a desktop workspace for creating multiple independent counters and managing their values",
    },
    role: {
      fa: "طراحی و توسعه نرم‌افزار دسکتاپ ویندوز، شامل منطق شمارنده‌ها، ذخیره‌سازی وضعیت، میانبرها و گزینه‌های شخصی‌سازی رابط",
      en: "Windows desktop application design and development, covering counter logic, state persistence, keyboard shortcuts, and interface customization",
    },
    approach: {
      fa: [
        "امکان افزودن، ویرایش، حذف، مرتب‌سازی و بازنشانی شمارنده‌های مستقل",
        "ذخیره و بازیابی شمارنده‌ها و نمایش مقدار آن‌ها در نوار وظیفه ویندوز",
        "شخصی‌سازی رنگ پس‌زمینه و فونت، شمارش خودکار، میانبرهای قابل تنظیم و اعلان صوتی",
      ],
      en: [
        "Create, edit, remove, reorder, and reset independent counters",
        "Persist and restore counter state, with counter values surfaced in the Windows taskbar",
        "Custom colors and fonts, automatic counting, configurable shortcuts, and notification sounds",
      ],
    },
    outcome: {
      fa: "یک ابزار شمارش قابل شخصی‌سازی برای ویندوز که چند رویداد را به‌صورت مستقل ثبت می‌کند و وضعیت شمارنده‌ها را برای استفاده بعدی نگه می‌دارد",
      en: "A customizable Windows counting utility that tracks multiple events independently and preserves counter state between sessions",
    },
  },
];
