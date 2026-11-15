# Portfolio Website

Personal portfolio, bilingual (Persian default, English) with light/dark mode.

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · next-intl · next-themes · Motion (Framer Motion) · GSAP + ScrollTrigger · Lenis · Vazirmatn (self-hosted) · Biome · pnpm · glass UI (pure CSS)

## Getting started

Requires Node.js 22+ and pnpm.

```bash
corepack enable
pnpm install
pnpm check:fix   # once, to normalise formatting
pnpm dev
```

Persian is served at `/`, English at `/en`.

## Scripts

`dev`, `build`, `start`, `check` / `check:fix` (Biome lint + format), `typecheck`

## Conventions

- UI strings live in `messages/*.json`; project content lives in `src/content`.
- Use logical Tailwind utilities (`ms-`, `me-`, `ps-`, `pe-`) for RTL/LTR.
- Animate Persian text per word, never per letter (it breaks letter joining).
- One animation library per element. Respect `prefers-reduced-motion` and `prefers-reduced-transparency`.
- Use `glass` sparingly; `backdrop-filter` is costly and nested glass doesn't blur.
- Branches: `main` (production), `feature/*`. Conventional Commits.
