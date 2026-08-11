<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Product and design truth

Two files at the repo root are authoritative. Read the relevant one before writing code; do not infer these facts from the existing code alone.

- **`PRODUCT.md`** — who this is for and what must stay true. Read it before changing content, copy, navigation, categories, or anything a reader sees. It records which existing copy is already known to be stale or inaccurate, and which facts must never be fabricated.
- **`DESIGN.md`** — the visual system: tokens, type roles, spacing, components, and named rules. Read it before writing or editing any UI. Its Do's and Don'ts are binding.

Notes that catch people out:

- The primary reader arrives from a search engine directly on `/posts/<category>/<slug>`, not the home page. When a tradeoff appears, the article reading experience wins.
- Design tokens live in `:root` in `app/globals.css`. `lib/cover/tokens.ts` duplicates them as literal constants because Satori cannot resolve CSS variables — **change both together or covers drift from the site.**
- `lib/categories.ts` is the only authority on categories (개발 / 일상 / 여행 / 경제). The topic lists in `README.md` and `lib/site.ts` are stale and must not be treated as truth.
- DESIGN.md currently describes the intended state in one respect: it bans non-functional affordances, and the subscribe card's email field and the article's ♡/↗ buttons still violate that. Don't add more; removing them is welcome.

If a change makes one of these files wrong, say so rather than silently diverging.
