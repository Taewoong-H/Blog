import Link from "next/link";
import { categories } from "@/lib/categories";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-container site-footer__inner">
        <div>
          <div className="mb-2 text-lg font-extrabold tracking-[-0.03em]">
            Taewoong<span className="text-[var(--accent)]">.dev</span>
          </div>
          <p className="max-w-[30ch] text-[13px] leading-6 text-[var(--faint)]">
            개발 · 여행 · 일상 · 경제.
            <br />
            매주 화요일 발행하는 개인 기록.
          </p>
        </div>

        <div className="flex flex-wrap gap-12">
          <div className="flex flex-col gap-2.5">
            <span className="mono mb-1 text-[11px] tracking-[0.06em] text-[var(--faint)]">
              PAGES
            </span>
            <Link className="text-[13.5px] text-[var(--muted)] hover:text-[var(--accent)]" href="/">
              홈
            </Link>
            <Link
              className="text-[13.5px] text-[var(--muted)] hover:text-[var(--accent)]"
              href="/posts"
            >
              아카이브
            </Link>
            <Link
              className="text-[13.5px] text-[var(--muted)] hover:text-[var(--accent)]"
              href="/about"
            >
              소개
            </Link>
          </div>

          <div className="flex flex-col gap-2.5">
            <span className="mono mb-1 text-[11px] tracking-[0.06em] text-[var(--faint)]">
              TOPICS
            </span>
            {categories.map((category) => (
              <Link
                key={category.slug}
                className="text-[13.5px] text-[var(--muted)] hover:text-[var(--accent)]"
                href={`/posts?category=${category.slug}`}
              >
                {category.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="site-footer__bottom">© 2026 Taewoong.dev · Built with care</div>
    </footer>
  );
}
