"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { categories, getCategoryHref } from "@/lib/categories";

const navItems = [
  { href: "/", label: "홈", match: "home" },
  ...categories.map((category) => ({
    href: getCategoryHref(category.slug),
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

    if (match === "market") {
      return (
        pathname === "/posts/market" ||
        pathname.startsWith("/posts/market/") ||
        (pathname === "/posts" && activeCategory === "market")
      );
    }

    return pathname === "/posts" && activeCategory === match;
  }

  return (
    <header className="site-header">
      <div className="site-container site-header__inner">
        <Link href="/" className="brand" aria-label="Taewoong.dev 홈">
          <span className="brand__text">
            Taewoong<span className="brand__accent">.dev</span>
          </span>
        </Link>

        <nav className="site-nav" aria-label="주요 메뉴">
          {navItems.map((item) => {
            const active = isActive(item.match);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`site-nav__link${active ? " site-nav__link--active" : ""}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="header-actions">
          <Link href="/posts" className="btn-primary">
            전체 글
          </Link>
        </div>
      </div>
    </header>
  );
}
