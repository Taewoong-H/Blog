---
name: taewoong.log
description: A developer's field notebook — editorial Korean prose on paper-grey, with every fact typed in monospace.
colors:
  signal-blue: "#2f54ff"
  signal-blue-hover: "#2746e0"
  signal-blue-soft: "#edf0ff"
  ink: "#15151a"
  ink-deep: "#0f1117"
  paper: "#f7f7f9"
  card: "#ffffff"
  prose-ink: "#26262c"
  prose-ink-soft: "#33333a"
  muted: "#6b6b76"
  faint: "#70707b"
  line: "#ededf1"
  line-strong: "#e0e0e7"
  cover-accent-light: "#7d93ff"
  cover-accent-pale: "#c9d3ff"
  cover-accent-tint: "#dfe5ff"
  cover-hairline: "#34343c"
  term-dim: "#565968"
  term-green: "#4a9d6e"
  code-chrome: "#1d1f27"
  code-hairline: "#2a2d36"
  code-text: "#e8e8ea"
  code-label: "#aeb4c2"
typography:
  display:
    fontFamily: "Pretendard, Pretendard Variable, -apple-system, BlinkMacSystemFont, Apple SD Gothic Neo, system-ui, sans-serif"
    fontSize: "39px"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Pretendard, Pretendard Variable, -apple-system, BlinkMacSystemFont, Apple SD Gothic Neo, system-ui, sans-serif"
    fontSize: "36px"
    fontWeight: 800
    lineHeight: 1.22
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Pretendard, Pretendard Variable, -apple-system, BlinkMacSystemFont, Apple SD Gothic Neo, system-ui, sans-serif"
    fontSize: "25px"
    fontWeight: 800
    lineHeight: 1.35
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Pretendard, Pretendard Variable, -apple-system, BlinkMacSystemFont, Apple SD Gothic Neo, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.85
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, SFMono-Regular, Consolas, ui-monospace, monospace"
    fontSize: "11.5px"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "0.06em"
rounded:
  xs: "6px"
  sm: "8px"
  md: "10px"
  lg: "14px"
  xl: "16px"
  2xl: "20px"
  full: "999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "20px"
  lg: "32px"
  xl: "48px"
  2xl: "72px"
components:
  button-primary:
    backgroundColor: "{colors.signal-blue}"
    textColor: "{colors.card}"
    rounded: "{rounded.md}"
    padding: "10px 16px"
  button-primary-hover:
    backgroundColor: "{colors.signal-blue-hover}"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.card}"
    rounded: "{rounded.md}"
    padding: "11px 18px"
  button-ghost:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "11px 18px"
  button-ghost-hover:
    textColor: "{colors.signal-blue}"
  category-label:
    backgroundColor: "{colors.signal-blue-soft}"
    textColor: "{colors.signal-blue}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "5px 10px"
  filter-chip:
    backgroundColor: "{colors.card}"
    textColor: "{colors.muted}"
    rounded: "{rounded.full}"
    padding: "8px 16px"
  filter-chip-active:
    backgroundColor: "{colors.signal-blue}"
    textColor: "{colors.card}"
    rounded: "{rounded.full}"
    padding: "8px 16px"
  tag-chip:
    textColor: "{colors.muted}"
    rounded: "{rounded.full}"
    padding: "6px 12px"
  post-card:
    backgroundColor: "{colors.card}"
    rounded: "{rounded.lg}"
    padding: "16px 18px 17px"
  side-card:
    backgroundColor: "{colors.card}"
    rounded: "{rounded.xl}"
    padding: "22px"
  subscribe-card:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.card}"
    rounded: "{rounded.xl}"
    padding: "22px"
  code-block:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.code-text}"
    rounded: "13px"
    padding: "18px 20px"
---

# Design System: taewoong.log

## Overview

**Creative North Star: "The Developer's Field Notebook"**

This is a notebook someone actually wrote in while the work was happening — not a finished document about it. The page is paper-grey (#f7f7f9), never white; white is reserved for the cards and article surfaces that sit *on* the paper, so every content block reads as something placed on a desk rather than printed into the background. Headlines are Pretendard at weight 800 with tight negative tracking, the visual equivalent of pressing hard with the pen. Everything factual — the date, the category, the reading time, the post count, the filename, the breadcrumb, the handle — is typed in JetBrains Mono, like margin annotations in a hand that isn't trying to be pretty.

The system is flat and hairline-ruled. Depth comes from 1px borders (#ededf1) and the tonal step between paper and card, not from shadow. A shadow appears only when you touch something. One chromatic color exists in the entire system — Signal Blue (#2f54ff) — and it earns its rarity by marking only what is actionable or structural: links, the active nav tab, list markers, inline code, the featured accent bar.

The blog's writing keeps its wrong turns in, and the interface matches that: nothing is glossed, nothing is oversold. Its purpose is to hold a long Korean article and let someone who arrived from a search result read it to the end.

**Key Characteristics:**
- Paper-grey ground, white content surfaces, near-black ink — a three-step neutral system
- Exactly one chromatic color, used sparingly and always meaningfully
- Monospace for every fact; proportional sans for every sentence
- Flat at rest; shadow is a response to touch, never decoration
- 1px hairlines as the primary structural device, with one 2px ink rule reserved for section heads
- Tight negative letter-spacing (-0.02em to -0.035em) on all headings; generous 1.85 line-height in prose

## Colors

A three-step neutral ground carrying a single electric blue, with a dark chrome sub-palette reserved for code and cover art.

### Primary

- **Signal Blue** (`{colors.signal-blue}`): The only chromatic color in the interface. It marks links, the active nav item and its 2px underline tab, the primary button, list markers in prose, inline code text, the featured eyebrow, the ranked numbers in the popular-posts list, and the accent half of the wordmark (`Taewoong` + `.dev`). Its hover state (`{colors.signal-blue-hover}`) is the same hue darkened, used only on filled surfaces.
- **Signal Blue Soft** (`{colors.signal-blue-soft}`): The 4%-tint wash. Backs category labels, inline code, blockquotes, table headers, and the avatar monogram circle. This is how the accent appears on large surfaces — never the full-strength blue as a background except on buttons and the active chip.

### Tertiary

- **Terminal Green** (`{colors.term-green}`): Confined entirely to the comment line in Variant 4 cover art. It exists because a terminal is being depicted, not because the palette needs a second accent. **Never introduce it into the interface.**

### Neutral

- **Paper** (`{colors.paper}`): The page ground, on `html` and `body`. The header floats over it at 82% opacity with a 14px backdrop blur.
- **Card** (`{colors.card}`): Pure white. Every raised surface: post cards, sidebar cards, footer, buttons' ghost variant, table cells. The paper/card step is the system's primary depth cue.
- **Ink** (`{colors.ink}`): Headings, the dark button, the subscribe card, and code block backgrounds. Not pure black — it carries a trace of blue-violet.
- **Ink Deep** (`{colors.ink-deep}`): Deeper than Ink, used only as the Variant 4 terminal cover ground so the "screen" reads darker than a page heading.
- **Prose Ink** (`{colors.prose-ink}`): Body copy inside articles. Deliberately one step lighter than Ink so headings stay dominant across a long read. **Prose Ink Soft** (`{colors.prose-ink-soft}`) carries blockquote and table-cell text.
- **Muted** (`{colors.muted}`): Descriptions, excerpts, secondary nav, inactive chips.
- **Faint** (`{colors.faint}`): Monospace metadata, section-head counters, footer text, placeholder states. The quietest step that still clears WCAG AA — 4.57:1 on Paper, 4.89:1 on Card. It carries real information (dates, reading times, counts) at 10–12px, so it is body text by the contrast rules and may never be lightened past this value.
- **Line** (`{colors.line}`) / **Line Strong** (`{colors.line-strong}`): The two hairline weights. Line divides content from content (card borders, dividers, footer rules). Line Strong bounds interactive things (ghost buttons, chips, the keyboard cap, table cells) and reads as slightly more deliberate.

### Code & Cover Chrome

`{colors.code-chrome}` backs the language label bar above code blocks, `{colors.code-hairline}` rules it, `{colors.code-label}` sets the uppercase language name, and `{colors.code-text}` is the default code foreground under the `github-dark` Shiki theme. On cover art, `{colors.cover-accent-light}` and `{colors.cover-accent-pale}` carry Signal Blue readably onto dark and full-accent grounds, `{colors.cover-accent-tint}` sets body text on the blue ground, `{colors.cover-hairline}` is the dark-ground border, and `{colors.term-dim}` the dimmed terminal text.

### Named Rules

**The One Blue Rule.** Signal Blue is the system's only chromatic color. If a screen seems to need a second hue to be legible, the hierarchy is wrong — fix the hierarchy. New states express themselves through the neutral ramp, the blue tint, or weight, never a new color. The sole interface exception is 주가관찰 data: Korean equity convention requires 상승 and `FAIL` to use a restrained red while 하락 keeps Signal Blue. This red stays inside market-specific status and report surfaces; it is not a reusable site accent.

**The Paper-Never-White Rule.** The page ground is always `{colors.paper}`. White means "this is a surface holding content." Painting a full-bleed section white erases the system's primary depth cue.

**The Green Stays In The Terminal Rule.** Terminal Green exists only inside Variant 4 cover art, depicting a shell comment. It is not an interface color and never signals success, validity, or positive state.

## Typography

**Display / Body Font:** Pretendard (with `Pretendard Variable`, `-apple-system`, `Apple SD Gothic Neo`, `system-ui` fallbacks)
**Label / Mono Font:** JetBrains Mono (with `SFMono-Regular`, `Consolas`, `ui-monospace` fallbacks)

**Character:** One Korean-first proportional face doing all the writing, one monospace face doing all the accounting. Pretendard's even Hangul rhythm holds a 1.85 line-height without feeling loose; JetBrains Mono, always at small sizes with open letter-spacing, makes every timestamp and count read as recorded data rather than design garnish. The contrast between the two is the system's core typographic idea.

### Hierarchy

- **Display** (800, 39px, 1.2, -0.035em): Article and page H1. Ranges 36–46px by page — 46px on About, 42px on Archive, 39px on the article, 36px on the featured card — collapsing to 30–36px below 640px. `text-wrap: balance` on the featured title and article H1.
- **Headline** (800, 36px, 1.22, -0.035em): The featured post title on the home page; the largest thing a first-time visitor sees.
- **Title** (800, 23–25px, 1.35, -0.025em): Section heads on the home page (23px) and `##` headings inside prose (25px, with `scroll-margin-top: 90px` to clear the sticky header). `###` steps down to 21px / -0.02em.
- **Body** (400, 17px, 1.85): Article prose, with `word-break: keep-all` so Korean lines break at word boundaries. Drops to 16px / 1.78 below 640px. Paragraph spacing is 22px.
- **Label** (500–700, 10.5–12px, 0.03em–0.1em, frequently uppercase): All monospace metadata. Letter-spacing widens as size drops.

Card titles sit between Title and Body: 19px/700/-0.02em in archive rows, 16.5px/700/-0.012em in grid cards.

### Named Rules

**The Mono Metadata Rule.** Every fact about a post is set in JetBrains Mono: date, category, reading time, counts, filename, breadcrumb, handle, section counters, footer copyright. Every sentence a human wrote is set in Pretendard. The typeface is the signal for "data, not writing" — never mix them.

**The Tight-Head Rule.** All headings carry negative letter-spacing that increases with size (-0.012em at card scale, -0.035em at display). Headings never sit at default tracking; a heading at `letter-spacing: normal` reads as a bug.

**The Weight-800 Rule.** Headings are 800, not 700. 700 is the card-title and inline-strong weight. The two-step gap is what keeps hierarchy legible without a size jump.

## Layout

Two container widths, both centered with a symmetric gutter: `site-container` at `min(100% - 48px, 1200px)` for the home page and header/footer, `content-container` at `min(100% - 48px, 1080px)` for reading surfaces. The gutter narrows to 32px below 900px.

The home page runs an asymmetric two-column layout — `1fr / 320px` with a 52px gap — where the sidebar is `position: sticky` at `top: 90px`. The article page inverts the ratio to `1fr / 196px`, the narrow rail holding a sticky table of contents that disappears below the `lg` breakpoint. The featured slot is a `1.05fr / 0.95fr` split — text marginally wider than its cover.

The home route is an editorial index, not a uniform card grid. A cover-led split hero introduces the newest directly authored post, then the four authored categories form numbered sections from `01` to `04`. Each pairs one lead card with a compact list of the next entries. An unnumbered 주가관찰 ledger closes the main column as dense date/title/status rows rather than a lead card. The archive stays a single-column list of `172px / 1fr` cover-plus-text rows.

The article column resolves to roughly 828px at desktop width. Paragraphs, lists, blockquotes, code blocks, tables, and images all use that full column so prose aligns with the cover and media edges. Below the structural breakpoint the column naturally contracts with the viewport gutter.

**Breakpoints:** 640px (prose type scale), 768px (`md`, related-post grids), 900px (the main structural collapse — all multi-column layouts flatten, the header's actions hide and nav becomes a horizontally scrolling row, sidebars unstick), 1024px (`lg`, table of contents hides).

Vertical rhythm is driven by section: 48px between home sections, 72px between About sections, 38–42px around block elements in prose, 22px between paragraphs.

### Named Rules

**The Ink Rule Rule.** Section heads are underscored by a 2px solid `{colors.ink}` line — the single heaviest line in the system, and the only place a border exceeds 1px. It marks the start of a content region and nothing else. Every other division is a 1px hairline.

**The Sticky-90 Rule.** The header is 66px tall and sticky. Anything else that sticks anchors at `top: 90px`, and prose headings carry `scroll-margin-top: 90px` so anchor links never land under the header.

**The Market-Nav, Author-Led Rule.** 주가관찰 is the first category in global navigation but the final, unnumbered ledger on the home route. Automated market posts never populate the authored featured hero, authored category sections, or recent-post sidebar.

## Elevation & Depth

The system is flat at rest. There is no ambient shadow anywhere: depth is built entirely from 1px hairlines and the tonal step from paper (#f7f7f9) to card (#ffffff). Shadow exists only as a response to pointer hover, paired with a small upward translate, so it reads as the surface lifting toward the cursor rather than as a rendering style. The one atmospheric effect in the system is the sticky header's 82%-opacity background with a 14px backdrop blur, which lets content dissolve under it while scrolling.

### Shadow Vocabulary

- **Card lift** (`box-shadow: 0 14px 30px rgb(20 20 30 / 8%)`): Post cards on hover, paired with `translateY(-3px)` and a border step from Line to Line Strong. Transition 0.18s ease.
- **Featured lift** (`box-shadow: 0 18px 44px rgb(20 20 30 / 9%)`): The home featured card on hover. Larger blur and offset because the surface is larger; no translate. Transition 0.2s ease.

### Named Rules

**The Flat-At-Rest Rule.** No element carries a shadow in its default state. If a surface needs to look raised while idle, use the card/paper tonal step and a hairline — not a shadow. Shadows are strictly state feedback.

**The Lift-Is-Earned Rule.** A hover shadow only belongs on something that navigates. Non-interactive cards (sidebar, author bio, stat grids) stay flat on hover.

## Shapes

Rounded rectangles throughout, with radius scaling to surface size: 6–8px for inline and small elements (code, keyboard caps, category labels, the brand mark), 10px for controls (buttons, search pill), 13–14px for content surfaces (post cards, article images, code blocks, prev/next cards), 16px for sidebar cards, and 20px for the featured container. Fully round (`999px`) is reserved for chips, avatars, and the terminal dots on Variant 4 covers.

Borders are the system's structural language, not shadow: nearly every surface carries a 1px border, and the border color — not the border width — is what changes on hover. Empty states use the same 1px geometry with `border-style: dashed`, which is the only dashed line in the system and reads unmistakably as "nothing here yet."

Cover art is fixed at 1200×630 (the OG standard), and every surface that displays a cover — grid thumbnails, archive rows, the article hero — preserves that aspect ratio.

### Named Rules

**The Border-Shift Rule.** Hover changes border *color* (Line → Line Strong, or → Signal Blue on ghost controls and chips), never border width. Width changes cause layout shift; color changes cost nothing.

**The Dashed-Means-Empty Rule.** A dashed border means and only means an empty state. Never use it decoratively.

## Components

### Buttons

- **Shape:** Consistently rounded (10px), never pill, never square.
- **Primary:** Signal Blue fill, white text, 14px/700, 10px 16px padding. Darkens to Signal Blue Hover over 0.15s ease. Used for the single most important action in a region.
- **Ink:** Ink fill, white text, 14px/700, 11px 18px padding. The high-contrast alternative when blue would compete with nearby accents — the sidebar CTA and the About page's GitHub link.
- **Ghost:** White fill, 1px Line Strong border, Ink text at 600. On hover, border *and* text both shift to Signal Blue over 0.15s. The default for secondary actions.
- **Focus:** Not currently customized; the browser default ring applies.

### Chips

- **Category label:** Signal Blue Soft ground, Signal Blue text, monospace 11.5px/700 uppercase with 0.04em tracking, 7px radius. Marks a post's category on the article page and featured card.
- **Filter chip (archive):** Fully round. Inactive is white with a Line Strong border and Muted text; active is a solid Signal Blue fill with white text. Each carries its post count in monospace at 60% opacity. Hover on inactive shifts border and text to Signal Blue.
- **Tag chip:** Fully round, transparent ground, Line Strong border, Muted text at 12.5–13px. Never filled — tags are not filters here, so they must not look pressable.

### Cards / Containers

- **Post card (grid):** 14px radius, white, 1px Line border, cover on top at 1200:630 with a hairline beneath it, body padded 16px 18px 17px. Title 16.5px/700, excerpt clamped to 2 lines via `-webkit-line-clamp`, monospace date and reading time pinned to the bottom with `margin-top: auto`. Hovers with the card lift.
- **Archive row (compact):** No border, no radius at rest — a `172px / 1fr` band whose only hover treatment is a white background wash over the paper ground (0.15s). Its cover carries an 11px radius and 1px border. Deliberately quieter than the grid card, because the archive is a scanning surface.
- **Sidebar card:** 16px radius, white, 1px Line border, 22px padding. Flat on hover.
- **Subscribe card:** Ink ground, white text, 16px radius. The only inverted surface in the interface, and the only place white-alpha values (`white/60`, `white/15`, `white/10`) are used.

### Navigation

Sticky, 66px tall, translucent paper at 82% with a 14px blur and a 1px Line bottom border. Links are 15px/600 in Ink, shifting to Signal Blue on hover over 0.15s. The active link additionally draws a 2px Signal Blue bar inset 12px from each side, 3px above the baseline of the header. Below 900px the actions cluster hides, while the brand and horizontally scrollable navigation remain on one clipped row.

Category navigation is market-first: 주가관찰 appears before the directly authored categories, and this order stays stable across responsive layouts. The primary header action remains the route to the complete post archive.

Breadcrumbs on the article page are monospace 12px in Faint, slash-separated. The trailing crumb is the post title in Muted — set in Pretendard, not mono, because it is a human-written title rather than a fact, and truncated with an ellipsis so a long title cannot push the row.

The article's table of contents is a sticky rail of `##` headings, each on a 1px Line Strong left border that shifts to Signal Blue with the text on hover. **It carries no active state**: the page is server-rendered with no scroll tracking, so highlighting any single entry would assert a position the page does not actually know.

### Prose (signature surface)

The article body is the system's most developed component and the reason the rest exists.

- **Links:** Signal Blue, 600 weight, underlined, `text-underline-offset: 0.18em`, 1px thickness.
- **List markers:** `::marker` in Signal Blue at 700 — one of the smallest and most characteristic accent placements in the system. Items are gapped 9px.
- **Blockquote:** Signal Blue Soft ground with a 3px solid Signal Blue left border and asymmetric radius (`0 10px 10px 0`), so it reads as attached to the margin rather than floating. **This is a confirmed, deliberate exception.** A colored side border above 1px is normally refused as a generic-UI tell, and detectors flag it; the author chose it, and it stays. The `side-tab` rule is scoped off for `app/globals.css` in `.impeccable/config.json` for exactly this reason. Do not "fix" it, and do not extend the pattern to cards, list items, or callouts — the blockquote is the only place it is earned.
- **Inline code:** Signal Blue Soft ground, Signal Blue text at 0.86em, 6px radius.
- **Code block:** Ink ground with a 13px radius and a 1px `{colors.code-hairline}` border, syntax-highlighted by Shiki's `github-dark`. A generated chrome bar sits on top — `{colors.code-chrome}` ground, uppercase monospace 11px language label in `{colors.code-label}`, 0.08em tracking — produced from `rehype-pretty-code`'s `data-language` attribute via a CSS `::before`. Horizontally scrollable on overflow.
- **Table:** `display: block` with `overflow-x: auto` so wide tables scroll instead of breaking the page. Signal Blue Soft header cells at 800, white body cells, Line Strong borders throughout, `white-space: nowrap`.
- **Image:** 14px radius, 1px Line border, centered with 30px vertical margin.

### Cover system (signature component)

Four templates rendered at 1200×630 through Satori, serving both grid thumbnails and OG share images from one artifact. `cover.variant` in frontmatter picks one; absent that, a deterministic hash of the slug assigns 1–4, so a given post always gets the same cover. A `cover.image` path overrides everything.

All four share a frame: 58px 66px padding, `space-between` column layout, a monospace eyebrow at 22px/0.08em on top, and a monospace footer at 20px pairing the source filename against the `@teo` handle. Headline size auto-shrinks by 9 or 16 points as the longest line exceeds 21 or 28 characters. The `|` character in a headline is an explicit line break.

- **Variant 1 — Ink:** Ink ground, white headline at 76px, Cover Accent Light eyebrow, optional 58px circular monospace badge top-right.
- **Variant 2 — Paper:** White ground with a Line border, Ink headline at 79px, and a `cover.accentPart` substring recolored to Signal Blue. The subtitle sits in a Signal Blue Soft pill.
- **Variant 3 — Signal:** Full Signal Blue ground, white headline at 70px, with a hand-drawn node-graph SVG at 28% opacity in the upper right.
- **Variant 4 — Terminal:** Ink Deep ground, three window dots, a monospace prompt line (`~/blog $ agent --with <keyword>`), the headline prefixed `>` with a solid Signal Blue block cursor, and the subtitle as a `#` comment in Terminal Green.

**Satori cannot read CSS custom properties**, so these values are duplicated as literal constants in `lib/cover/tokens.ts`. That file and the `:root` block in `app/globals.css` are two halves of one source of truth and must be edited together.

### Market scan report

The automated 주가관찰 post is a dense record, not a promotional stock dashboard. The market gate leads, sector `score` is visually primary while persistence, Stage2 ratio, and momentum remain subordinate reference values, and candidates never share a table with stocks that failed a condition. Home and monthly archive rows stay compact and use frontmatter-derived status dots. Empty candidate output is a meaningful cash-holding result and uses the system's dashed empty-state treatment.

## Do's and Don'ts

### Do:

- **Do** keep the page ground at `{colors.paper}` and reserve `{colors.card}` for surfaces that hold content.
- **Do** set every factual value — dates, counts, reading times, filenames, breadcrumbs — in JetBrains Mono, and every human sentence in Pretendard.
- **Do** apply negative letter-spacing to every heading, scaling from -0.012em at card size to -0.035em at display size.
- **Do** express hover as a border-color change, optionally with a shadow and a ≤3px translate, over 0.15–0.2s ease.
- **Do** reserve the 2px ink rule for section heads, and use 1px hairlines everywhere else.
- **Do** update `lib/cover/tokens.ts` and the `:root` block in `app/globals.css` in the same change; Satori cannot resolve CSS variables.
- **Do** give any horizontally overflowing block — tables, code, nav on mobile — its own scroll container, never the page body.
- **Do** anchor sticky elements at `top: 90px` and give scroll targets a matching `scroll-margin-top`.

### Don't:

- **Don't** introduce a second chromatic color outside the scoped 주가관찰 rise/`FAIL` convention. Signal Blue is the default hue; Terminal Green belongs to Variant 4 cover art and nowhere else.
- **Don't** put a shadow on anything in its resting state, or on a card that doesn't navigate.
- **Don't** change border width on hover — only border color.
- **Don't** use a dashed border for anything but an empty state.
- **Don't** build a dark-neon developer aesthetic, marketing-landing-page rhetoric, generic platform-blog card grids, or decorative card clutter. All four are confirmed anti-references.
- **Don't** ship a non-functional affordance, and don't label a control for something the product doesn't do — there is no newsletter, so nothing may say 구독 except a control that actually subscribes. The search pill is the single sanctioned exception: a deliberately deferred control, which must be marked disabled in code with a comment naming it as planned. The home sidebar's subscribe card and its email field remain an outstanding cleanup target.
- **Don't** set a heading at default tracking or at weight 700; 800 is the heading weight.
- **Don't** fill a tag chip. Tags don't filter, so they must not look pressable.
