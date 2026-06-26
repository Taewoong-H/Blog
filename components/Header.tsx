import Link from "next/link";

const navItems = [
  { href: "/", label: "홈" },
  { href: "/posts", label: "Posts" },
  { href: "/about", label: "About" },
];

export default function Header() {
  return (
    <header className="border-b border-stone-200 bg-stone-50/90">
      <div className="mx-auto flex w-full max-w-4xl items-center justify-between px-5 py-5">
        <Link href="/" className="text-base font-semibold tracking-tight text-stone-950">
          taewoong.log
        </Link>
        <nav aria-label="주요 메뉴" className="flex items-center gap-1 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 font-medium text-stone-600 transition-colors hover:bg-stone-200/70 hover:text-stone-950"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
