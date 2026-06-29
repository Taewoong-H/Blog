"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { categories } from "@/lib/categories";

const navItems = [
  { href: "/", label: "홈", match: "home" },
  ...categories.map((category) => ({
    href: `/posts?category=${category.slug}`,
    label: category.label,
    match: category.slug,
  })),
  { href: "/about", label: "소개", match: "about" },
];

export default function Header() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");

  function isActive(match: string) {
    if (match === "home") {
      return pathname === "/";
    }

    if (match === "about") {
      return pathname === "/about";
    }

    return pathname === "/posts" && activeCategory === match;
  }

  return (
    <header className="site-header">
      <div className="site-container site-header__inner">
        <Link href="/" className="brand" aria-label="Taewoong.dev 홈">
          <span className="brand__mark">T</span>
          <span className="brand__text">
            Taewoong<span className="brand__accent">.dev</span>
          </span>
        </Link>

        <nav className="site-nav" aria-label="주요 메뉴">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`site-nav__link${isActive(item.match) ? " site-nav__link--active" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <div className="search-pill" aria-hidden="true">
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
              <line
                x1="10.8"
                y1="10.8"
                x2="14"
                y2="14"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.5"
              />
            </svg>
            <span>검색...</span>
            <span className="kbd">⌘K</span>
          </div>
          <Link href="/about" className="btn-primary">
            구독
          </Link>
        </div>
      </div>
    </header>
  );
}
