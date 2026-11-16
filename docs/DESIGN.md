# MjavadH — portfolio design

**Positioning** — _From ideas to production._ Owner: MjavadH, full-stack software engineer.
Audience: Iranian employers and clients first, international second.

**Core principle** — **few things, done precisely.** One primary interactive element per
viewport. At least half of every viewport is empty. If nobody would miss it, it is not here.

This document is the design record: what was decided, what was rejected, and why. The
build lives beside it; every claim below is verifiable in the code.

---

## 1. Layout concept

### The grid is an octagram, not a column set

The eight-point star (two squares, one rotated 45°) is the site's only pattern. It is used as
a **structural grid**, not a texture:

- The star's outer radius maps to `--shell-max`; the inner octagon (0.62×) maps to the text
  measure. Sections align to those two radii, which is why headings sit consistently off the
  container edge.
- The eight-point star appears in the **monogram**, the **section labels** and the **CTA**. It is
  not the hero mark (see below) and it is not the divider's centre any more.
- The hero carries a **shamse** (see section 5): the illuminated rosette from the head of a Persian
  manuscript page, built from rings of overlapping arcs. It replaces both the khatam lattice, which
  read as a construction diagram, and the chahar bagh that briefly followed it, which read as a map.
  A medallion is the right shape behind a name; a plan is not.
- No full-page lattice wallpaper exists anywhere in the build. That was the first thing cut:
  a tiled background reads as filler and destroys the "one character" rule.

**Breakpoints** — 640 (density), 768 (nav links appear), 1024 (pinned projects, two-column
sections), 1280 (full shell). The pinned scene and the preview plate only exist ≥1024 with a
viewport ≥700px tall; below that they would trap the reader.

---

## 2. Palette — 60 / 30 / 10, and the one rule that matters

| Role | Light | Dark | Notes |
| --- | --- | --- | --- |
| Base 60% | `#f6f0e4` cream | `#0b1226` deep lapis | page, and the fill of every "not-a-card" panel |
| Structure 30% | `#1b2a4e` lapis | `#ece6d6` cream | text, hairlines, the hero medallion, the monogram |
| Accent 10% | `#0b8f9c` | `#2fc4cf` | rings, fills, the active marker — **decorative only** |
| Accent ink | `#076e78` | `#5fdfe6` | **the only turquoise allowed on text** |
| Gold | `#b8923a` | `#d9b45a` | the medallion's centre and the label stars, never text |
| Muted | `#55607e` | `#a3aecb` | secondary copy |

The accent is split in two because one turquoise cannot do both jobs: `#0b8f9c` on cream is
3.4:1 (fine for a 1px ring, failing for a 15px label), while `#076e78` is 5.3:1. Gold is
2.6:1 on cream — it is a detail colour, and the build never sets text in it.

Measured contrast (WCAG 2.2): body 12.4:1 light / 14.9:1 dark; muted 5.5 / 8.4; accent-ink
5.3 / 11.7; worst case anywhere — muted text over the glass fill above the turquoise orb —
**4.59:1**. Focus ring `--focus` is ≥3:1 against both page and glass.

---

## 3. Typography

Vazirmatn carries both languages; **Inter** is loaded for Latin only and applied by
`html[lang="en"]`. Persian body is `1.8` leading (Latin `1.65`), and Persian display is *not*
tightened — only the Latin display gets negative tracking (`-0.035em`). This is the single
most common bilingual web mistake: tightening Persian to make it look "designed" crushes the
joining strokes.

| Token | Size | LH | Weight | Use |
| --- | --- | --- | --- | --- |
| `--text-display` | clamp(3.4rem → 8.25rem) | 1.06 (fa 1.14) | 800 / 750 fa | the name, once |
| `--text-h1` | clamp(2.6 → 4.25rem) | 1.12 | 750 | contact heading, case-study title |
| `--text-h2` | clamp(2 → 3rem) | 1.15 | 700 | section headings |
| `--text-h3` | clamp(1.35 → 1.75rem) | 1.3 | 650 | project titles, chapters |
| `--text-lead` | clamp(1.125 → 1.375rem) | 1.62 | 400 | hero definition |
| `--text-body` | 1.0625rem | 1.8 | 400 | paragraphs |
| `--text-small` | 0.9375rem | 1.65 | 400 | list summaries, meta |
| `--text-micro` | 0.8125rem | 1.4 | 500 | labels, years, tags |

`micro` is deliberately **not** uppercase and **not** letterspaced. The tracked-caps eyebrow is
the loudest generic-template tell, and it breaks Persian completely (Arabic-script caps do not
exist; tracking pulls joined letters apart).

The implementation of the hero mark is `src/components/geometry/hero-geometry.tsx`, which draws a
shamse the way a tile cutter makes one: a ring of overlapping circles, keeping only the arcs that
fall inside the rim. Eighteen circles of radius 92 on a ring of 168 make the outer crown; eighteen
more of radius 53 on a ring of 96, turned half a step, make the inner one. The two interlace where
their arcs cross, which is the reason the figure reads as a construction and not as a flower. The
heart is two eight-point stars a half step apart, the rim is cusped, and one gold point marks the
centre. Every visible curve is a piece of one of those circles.

It is a desktop mark. Phase 14 showed it on small screens; phase 15 took it off
again, because at 390px it crowded the headline rather than framing it. Below `sm` the
section is type, rule and button only. On desktop it grew to `lg:w-[62%] max-w-[46rem]`
with the mask tightened from 58% to 26%, so the medallion reads larger while covering
less of the name than it did at the old size.

**The one calligraphic moment.** The hero name is set in Vazirmatn — no faux-nastaliq font —
and a single tapered stroke is *drawn* beneath it with SVG `pathLength` (1.1s, `--ease-out`). One line, one gesture, then it is finished; nothing else on the page
draws itself. Persian text is never animated per letter, anywhere: entrances are per line or
per block (`Reveal`, `RevealLines`).

---

## 4. Glass

Glass is only glass when something is behind it. The build keeps three backdrop layers:
ambient orbs + grain → the geometry → the surface.

**Anatomy** — translucent fill · `backdrop-filter: blur(20px) saturate(1.7)` · 1px light border
· inset top highlight + inset bottom edge · soft two-stop shadow · a specular sheen
(`::before` radial that reads `--mx/--my`, animated by the pointer on the header and CTA).

| Variant | Fill | Contains |
| --- | --- | --- |
| `glass` | 40% white / 5.5% white | header, short labels, buttons |
| `glass glass-strong` | 82% / 72% | anything with a paragraph in it |
| `glass glass-tint` | accent 14% + strong | the primary CTA only |

**Rules, enforced in the build:** at most 3 glass surfaces visible per viewport (hero has 0
besides the header — that is the point of the hero); glass never nests (inside a glass panel,
use a flat `--bg-veil` inset, as the preview card's plate does); long text uses `strong`; the
geometry is visible *through* the glass or the material is pointless.

**Degradation** — `prefers-reduced-transparency: reduce` drops blur and switches to the opaque
`--bg` with a real border; browsers without `backdrop-filter` get the same opaque fill; the
grain layer disappears under both. Contrast never depends on the blur.

---

## 5. Sections — the decisions

**Hero — one statement, one door.** A shamse carries this section on its own: two crowns of arcs, a
cusped rim, a two-star heart and a gold centre. It loads by being struck outward, rim first, then
the two crowns, then the heart. On scroll the crowns **counter-rotate**, by 40 degrees outward and 35
inward: when the bands turn against each other you can see they are separate rings of arcs and not
one printed pattern, which is the one thing a static image cannot say. The heart turns 22.5 degrees,
its own symmetry step, so it lands back on itself. Light crosses the medallion against the pointer
and the geometry stays still. Reduced motion draws the finished medallion.
Beside it: one glass button (résumé) and the contact links, each with its mark.**About.** Quiet. The portrait is the real photograph, cropped 4:5 and framed with the plate alone —
no ornament on the corner; the photograph is the whole event here. The three facts sit in a
hairline-ruled row, not three identical rounded cards.

**Projects.** Three real, public repositories (Readory, Linka, PrayerChime), stated with only
verifiable facts: stack from the manifests, licence from the repo, distribution from the
marketplace. No invented performance numbers anywhere.

The layout is a **shelf of cards**: three peers in a grid that goes one column on a phone, two on
a tablet and three on desktop. Each card carries exactly what a visitor needs to decide whether to
open the project: the owner's artwork on a fixed 16:10 frame, the title, one sentence, and quiet
metadata (year, licence). The entire card is a single anchor, so the click target is the card and
there is no competing target inside it.

Why cards, after two earlier layouts. The first hid the substance in a hover-only preview, which a
phone could never reach. The second put every project on the page in full, which was honest but made
the home page a document and left the detail page redundant. Cards are the honest middle: the home
page is an index, and the detail page is where the detail lives. Uniformity across the three is
deliberate here, because they are peers and they are what a shelf looks like; this is not a feature
grid where hierarchy would carry meaning.

**Project detail.** Opens on the project's own artwork, directly under the title, rather than on a
decorative construction drawing. In reading order: title block, artwork with a caption stating what
the image actually is, the one-line outcome set as the loudest text on the page, the facts as a
rule-separated row instead of a floating card, three chapters (problem, role, outcome), how it was
built as a numbered list beside the stack, the repository as a button-shaped link, and the next
project as a full card with its own artwork. Everything on it exists in the project record; nothing
is invented to fill the template.

**Education.** A rail, not a chart. One hairline runs down the inline-start edge with a
node where each degree begins, and the rail keeps going past the last node and
dissolves, because the master's degree has not ended. That is the only fact the
drawing states, and it is the fact a list cannot show.

An earlier version of this section drew each degree as a segment sized by its
duration. It was removed: 1401 to 1405 and 1405 to now resolve to one full segment
and one zero-width segment on a shared axis, so the bar said something false while
looking precise, and two points cannot make a scale in the first place. A minimum
width would have hidden the defect instead of fixing it.

Degree, field and institution are the content, in that order, both times, with the
years above them. Shape carries state twice: a filled accent dot with a halo for the
degree in progress, a hollow ring for the finished one. The rail is decorative and
hidden from assistive tech; everything it encodes is in the text.

Persian academic years render as ۱۴۰۱ and ۱۴۰۵ in Persian digits, English as 1401 and 1405, from one
source, so a reader outside Iran need not convert in their head. The rule between the two years is a
drawn hairline rather than a dash, so it sits on the baseline identically in both scripts and cannot be
reordered by the bidi algorithm. No GPA, no invented honours.

**Articles.** Three conference papers, published on Civilica. A **list, not a card grid**, and the
reason is the content: three papers are a record with a fixed set of fields, and a record reads best
as rows on a shared baseline. Cards would imply these are products to browse.

Every row carries the title, the venue in full, the publication date, the details that let a reader
judge it (page count, language, what it covers), and keywords. **Authors, the national document id and
the publisher's name are not shown**: they were removed at the owner's request. Since the whole row is
still one anchor, and the publisher's badge was what used to signal that, an open mark with an arrow
now sits under the date in the end column. The date moves to that column on `sm` so the rows scan
vertically.

Two honesty rules govern the copy here. First, every fact comes from the Civilica record: titles,
venues, page counts, authors and IDs were read off the pages, not invented. Second, the papers are
written in Persian and the English titles are translations, which the section says in one line
above the list. Without that line an English reader would reasonably assume they are reading the
published titles.

Dates are Jalali, so each record stores the date twice: the ISO date for the `datetime` attribute
and the Jalali date for Persian readers (۱۴۰۲), with the Gregorian long date for English readers.
The two 1402 dates were converted and then cross-checked against a second implementation before
they were written down.

**Skills.** Three columns divided by hairlines, grouped by where the work happens
(frontend / backend / practice). No logo cloud, no proficiency bars, no boxes — the section
must not look like a second project grid.

**Contact.** Not a row: a destination. The last screen is one enclosed plate with its own edge, because
every section above it is a two-column layout, and repeating that at the bottom makes the end of the
page feel like another list item. This is the one screen that asks for something, so it is built as one
object.

Three registers, in order of size:

1. **The offer.** A display-size line, the largest type after the hero name.
2. **The door.** One full-width row on Telegram: the label, the address printed in it, and an arrow
   that moves only on hover. A row rather than a floating pill, so it reads as the thing to press.
3. **The rest.** Email, GitHub, LinkedIn and the résumé as four ruled cells in a strip. Equal and
   clearly secondary.

The surface is a **flat 6% tint, not glass**: the page keeps its one-glass-surface rule. The tints are
stored as theme tokens (`--plate`, `--plate-door`, `--plate-cell`) with precomputed hex values rather
than `color-mix`, because Tailwind emits a bare `var(--accent)` fallback first and a browser without
`color-mix` would then paint the plate solid turquoise at 3.65:1. Measured on the plate: body 11.6,
muted 5.1, accent-ink 4.9 in light; 13.6 / 7.7 / 10.7 in dark.

The door opens the **Telegram private chat**, not email. Email is still listed, but as one of the four
secondary cells rather than the primary route, because a chat window is where a conversation starts and
an email client is where it stalls. The label says what it does ("Message me on Telegram") instead of a
generic "Start a conversation".

**Navigation.** Icon **and** label together, always — no hover reveal, no measuring. Two
placements: a floating glass pill at the top on desktop, and a floating **icon dock pinned to the
bottom** on mobile with no hamburger and nothing to open. The fifth dock button opens a small
settings sheet (language + theme); its mark is a row of sliders, not a gear, because a gear means
"configure the machinery" and the button's real scope is two preferences.

Section links are not `#hash` anchors. They resolve to the locale home + hash
(`/#skills`, `/en/#skills`) and a shared handler scrolls with Lenis on the home page, or lets the
navigation happen on any other page and scrolls on arrival. This was a real bug: bare `#skills`
handed to next-intl's `<Link>` is prefixed verbatim, so on `/work/[slug]` the URL became
`/work/[slug]#skills` — a hash on the case study instead of a trip home. The theme control is a single 30px glyph that morphs (sun rotates out, moon scales
in); the language control is a single glyph showing the language you would switch **to**, with
an accent underline on hover and an animated ellipsis while the route changes. Both replace the
old two-segment tracks, which cost ~120px of header for two binary states.

**Section divider, rebuilt.** The divider was one SVG with a 1200x48 viewBox and
`preserveAspectRatio="none"`, which stretches the geometry to fill both axes: at 350px the centre
mark was squashed to about a third of its width, a lozenge rather than a star. Two things changed.
The rules are now HTML (two `divider-rule` gradients that flex), and the mark is its own square SVG
at a fixed pixel size, so nothing is ever stretched and the mark is identical at 320px and 1440px.
The mark itself is **two eight-point stars interlocked**, an outer one and a smaller one turned half a
step so its points fall in the outer star's notches. Enlarging a single star only made its one outline
look stretched; the second ring is what gives the extra size something to be. It measures 26px above
`sm` and 22px below, with 15px in the section labels. An arc rosette was tried first and rendered at
22px and 13px, where it turned to mush and then to a grey dot, so the label keeps the star.

**Top fade.** Whatever scrolls to the top of the viewport dissolves into the page background instead
of being cut off by it. The first attempt put a mask on each section, which was wrong twice: a section
carries 72 to 136px of top padding, so the band sat over empty air, and the mask travelled with the
section, so no text ever crossed it. It is now one fixed 96px gradient at `z-30`, under the header's
`z-50` so the bar stays crisp, and it applies to every route without touching a section component.
Pure CSS: no scroll listener, nothing to desynchronise.

**Footer.** Monogram, one line, three links, year. The monogram is derived from the same
octagram (two squares + a one-stroke M whose vertex is a gold dot) and doubles as the favicon.

---

## 6. Rejected on purpose

| Rejected | Why |
| --- | --- |
| Tiled khatam wallpaper | filler texture; kills "one pattern, one character" |
| Faux-nastaliq webfont for the name | almost always badly hinted; the drawn stroke is honest |
| Letter-by-letter Persian animation | breaks joining; never, anywhere |
| Numbered 01/02/03 on non-sequences | projects genuinely are a sequence — kept *only* there |
| Tracked ALL-CAPS eyebrows | generic-template tell; breaks Persian |
| A card for every section | "identical rounded cards everywhere" is the tell the brief bans |
| Progress bars for skills | meaningless precision, and a second loud element |
| Hover-only project previews | touch devices would never see it — inline on mobile instead |
| Three.js / WebGL | out of scope, and the geometry is stronger as honest SVG line-work |
| Khatam star as the hero mark | a construction diagram, and a motif that reads as "Islamic ornament" across a dozen countries rather than as Iran |
| Persian carpet / flag / samovar / poetry on the hero | the ornament shortcut; the medallion states the idea through construction instead |
| A garden plan as the hero mark | read as a map, which is the wrong thing behind a name; the medallion is a page form |
| Arc rosette at label size | tested at 22px and 13px: mush and a grey dot. The label uses a star polygon, which survives 13px |
| A radial vignette on the hero mark | it was built for a round star; it erases the corners of a square plan, wall and bastions included |

---

## 7. Component inventory

| Component | Variants | States |
| --- | --- | --- |
| Glass panel | `default` / `strong` / `tint` | static · pointer sheen (`--mx/--my`) · reduced-transparency fallback |
| Contact door | one | default, hover (tint steps up, arrow leaves), focus-visible |
| Article row | default / co-authored | default, hover (title goes accent-ink), focus-visible (2px ring, 4px offset) |
| Project block | desktop (alternating) / mobile (plate first) | default, hover (plate turns, title goes accent-ink), focus-visible |
| Education entry | complete / in progress | default, focus-visible (node filled = studying, hollow = done) |
| Preview plate | one per active row | cross-fade+y between projects; static when reduced |
| Theme toggle | two glyphs, one knob | light, dark, focus, pressed (`aria-pressed`) |
| Language switch | segmented | fa selected, en selected, pending (60% opacity while the route changes) |
| Header pill | — | at top, scrolled (tighter shadow), active section, focus, reduced motion |
| Mobile sheet | — | closed, open (Escape / backdrop / link closes it; scroll locked) |
| Form / CTA surface | Telegram chat CTA (no dead form) | default, hover, focus |
| Case-study chapter | — | static, entrance reveal |

No contact form is shipped. A form that goes nowhere is worse than an email link that works;
the CTA opens a pre-addressed mail client and the address is visible as text.

---

## 8. Motion spec

Every animation is transform/opacity only. Durations 200–700ms. Default easing
`--ease-out` = `cubic-bezier(0.22, 1, 0.36, 1)`.

| # | Animation | Trigger | Duration / easing | Library |
| --- | --- | --- | --- | --- |
| 1 | Header enters (y −20 → 0) | page load | 600ms / ease-out, 200ms delay | Motion |
| 2 | Nav active pill slides | section in view | spring 420/34 | Motion (`layoutId`) |
| 3 | Scroll progress hairline width | scroll | spring 120/24 | Motion |
| 4 | Hero lines rise (y 20 → 0) | load, staggered 80ms | 700ms / ease-out | Motion |
| 5 | Name stroke drawn (`pathLength`) | after hero appears | 1100ms / ease-out, 500ms delay | Motion |
| 6 | Hero plan draws in draughting order: wall, axes, pool, beds, annotation | load, 200ms delay | 650–2050ms, staggered | GSAP |
| 8 | Pool turns 22.5°; water brightens to 0.9 | scroll, 0 → 58% of document | scrub 0.7 | GSAP + ScrollTrigger |
| 9 | Sheen crosses the pool, ±24/±16 px, nothing else follows | pointermove | quickTo 1.2s | GSAP `quickTo` |
| 10 | Hero plan parallaxes up 10% with the hero | scroll | over the section | Motion `useScroll` |
| 10b | Project plate turns toward the pointer, inner square counter-drifts | loop pointermove | 900ms / 1100ms power3 | GSAP |
| 10c | Project plate parallaxes against its text | scroll through block | ±6% | Motion `useScroll` |
| 10d | Education rail is static; entries rise 24px from the inline-start edge | scroll into section | 500ms stagger, GSAP | GSAP |
| 10e | Projects rail fills down the inline-start edge | scroll through list | scrub | Motion `useScroll` |
| 12 | Preview plate cross-fade (y 10) | row hover/focus | 300ms / ease-out | Motion + `AnimatePresence` |
| 13 | Active marker grows (`scale-y`) | row active | 500ms / ease-out | CSS |
| 14 | Row arrow rotates −45° | row active | 400ms / ease-out | CSS |
| 15 | Section reveals (y/x 20 → 0) | in view | 500ms / ease-out | Motion |
| 16 | Button hover lift (−1px) | hover | 300ms | CSS |
| 17 | Locale knob slides | switch | 300ms / ease-out | CSS |
| 18 | Theme knob slides + glyph swap | toggle | 320ms / ease-out | Motion |
| 19 | Mobile sheet (x 12% → 0, fade) | menu open | 380ms / ease-out | Motion |
| 20 | CTA fill shift + star rotate | hover | 400–500ms | CSS |
| 21 | Cursor dot pinned to point; ring trails | pointermove | per-frame lerp 0.22 | rAF |
| 22 | Cursor ring scales 1.5× + rotates, turns accent | over interactive element | continuous | rAF |

**RTL rule.** Directional motion always comes from the inline start: rows and reveals enter
from the right in Persian and from the left in English (`x: locale === "fa" ? +26 : -26`), the
language knob translates along the inline axis, and the active marker grows from `inset-inline-start`.
Symmetric motions (scale, rotate, opacity) are untouched by direction.

**Reduced motion.** Lenis is not started; GSAP scenes are not created (the pattern renders
finished — every ring at rest, the M carved and visible — the projects column unpins); every
entrance renders as plain markup with no
transform; the custom cursor is not installed; the name stroke is present without drawing.
Everything stays *visible* — nothing is hidden behind an animation that never runs.

---

## 9. Accessibility

- **Contrast** measured, not assumed: see §2. Worst text case 4.59:1; gold is never text.
- **Focus** — one visible ring everywhere (`--focus`, 2px, 3px offset). Skip link is the first
  tab stop. Project rows are real links; ArrowUp/ArrowDown move between them; the mobile sheet
  closes on Escape and locks scroll.
- **Keyboard** — no interactive element depends on hover. The hover preview is duplicated as
  inline content under 1024px, so the same information is reachable by touch and by keyboard
  focus (`onFocus` activates the plate).
- **Semantics** — one `h1` per page, sections are `<section aria-labelledby>`, the list is a
  `<ul>`, the facts are a `<dl>`, decorative SVG is `aria-hidden`, and the theme toggle reports
  `aria-pressed`.
- **Reduced motion / transparency** — both honoured, both keep every byte of content.
- **Direction** — `dir` and `lang` are set on `<html>` per locale; the site is not "LTR with
  flipped bits". Persian digits (`۰۱`) are used in Persian and Latin digits in English, never
  mixed.
- **Touch** — no hover-only affordance; 44px minimum targets on the pill controls.

---

## 10. Performance

Target: Lighthouse mobile > 90.

- Two variable fonts, Latin loaded for English only; no icon font.
- One raster on the site (the portrait), served through `next/image` as AVIF/WebP with a trimmed
  width ladder: ~20KB at display size instead of the 736KB source. Lazy, async-decoded, box reserved.
- Custom cursor is two SVG elements animated with a single rAF loop and transform only; it is
  never installed on coarse pointers or under reduced motion.
- Geometry is inline SVG with 1px strokes — cheaper than any bitmap, and it needs no request.
- Only `transform`/`opacity` are animated; blur radius is never animated.
- At most 3 `backdrop-filter` surfaces per viewport (header is the only permanent one).
- GSAP and ScrollTrigger load only inside the two scenes that use them; Motion is the only
  always-on animation library.
- No raster images in the build at all — the portrait plate is a drawn placeholder until a real
  photograph is dropped in.
