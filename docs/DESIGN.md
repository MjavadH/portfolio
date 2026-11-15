# Design decisions

## Principle: "less, but precise"

- Only one primary interactive element active at a time.
- The Islamic geometry has a single "character" (one pattern that reacts), not a filler texture.
- At least half of every screen is breathing room.
- Removal rule: if removing an animation goes unnoticed, remove it.

## Visual language

- Geometry (khatam / girih) as the invisible grid: thin line patterns, built progressively on scroll
  (line -> eight-point star -> full lattice).
- Typography (Vazirmatn) is the main carrier; one limited calligraphic moment (e.g. the name in Hero).
- Glass (glassmorphism with a liquid-glass sheen) is the material for UI surfaces: header, buttons, cards.

## Palette (60 / 30 / 10)

| Role                 | Light               | Dark                 |
| -------------------- | ------------------- | -------------------- |
| Background (60%)     | cream `#f6f0e4`     | deep lapis `#0b1226` |
| Structure/text (30%) | lapis `#1b2a4e`     | cream `#ece6d6`      |
| Accent (10%)         | turquoise `#0b8f9c` | turquoise `#2fc4cf`  |
| Detail (tiny)        | gold `#b8923a`      | gold `#d9b45a`       |

Tokens live in `src/app/globals.css`.

## Glass system

Glass only reads as glass when there is something colourful behind it. Three layers:

1. **Backdrop**: `.ambient` (soft turquoise / gold / lapis light) now; the Islamic geometry pattern later.
2. **Surface**: `glass`, `glass glass-strong` (text-heavy cards), `glass glass-tint` (primary buttons).
   Anatomy: translucent fill + `backdrop-filter` blur/saturate + 1px light border + inner top highlight
   - soft shadow + a specular sheen (`::before`).
3. **Content**: text must stay readable. Use `glass-strong` for any paragraph-length text.

Rules:

- Max ~3 glass surfaces visible at once (cost + the "less is more" rule).
- Never nest glass: an inner `backdrop-filter` only sees its parent, so it blurs nothing. Inside a glass
  container use flat translucent styling.
- Animate only `transform` / `opacity`. Never animate blur radius.
- Respect `prefers-reduced-transparency` (opaque fallback is built in) and keep contrast >= 4.5:1.
- The geometry lines should be visible _through_ the glass: that is the signature of this site.

### Possible upgrades (not included, on purpose)

- Pointer-following highlight: set `--mx` / `--my` from a `pointermove` handler (Motion value), the sheen
  already reads them.
- Real refraction: SVG `feDisplacementMap` used via `backdrop-filter: url(#filter)`. Only works in
  Chromium, so treat it as an optional enhancement behind a feature check.

## Library responsibilities

| Library                   | Responsibility                                                        |
| ------------------------- | --------------------------------------------------------------------- |
| Lenis                     | smooth scrolling only                                                 |
| Motion                    | entrances, hover/tap, route transitions, micro-interactions           |
| GSAP + ScrollTrigger      | the signature scroll scenario (pattern construction, pinned projects) |
| SVG (Canvas 2D if needed) | interactive geometry                                                  |

## Persian typography notes

- Line height ~1.8 for body.
- Never split Persian text by letter. Animate per word or per line.
- Pick Persian or Latin digits and stay consistent.
