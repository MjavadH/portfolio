# وب‌سایت پورتفولیو

وب‌سایت شخصی و نمونه‌کار، دوزبانه (فارسی پیش‌فرض، انگلیسی) با حالت شب و روز.
[English README](./README.en.md)

## اجرا

```bash
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
