import type { Metadata } from "next";
import Link from "next/link";
import PostCard from "@/components/PostCard";
import { categories, getCategoryByLabel, getCategoryBySlug } from "@/lib/categories";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Archive",
  description: "Taewoong.dev의 전체 글 목록입니다.",
};

type PostsPageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const { category } = await searchParams;
  const selectedCategory = getCategoryBySlug(category);
  const posts = getAllPosts();
  const filteredPosts = selectedCategory
    ? posts.filter((post) => getCategoryByLabel(post.category)?.slug === selectedCategory.slug)
    : posts;

  return (
    <div className="content-container py-12 pb-24">
      <header className="mb-7">
        <div className="mono mb-3 text-xs tracking-[0.08em] text-[var(--accent)]">ARCHIVE</div>
        <h1 className="m-0 mb-2.5 text-[42px] font-extrabold tracking-[-0.035em] max-sm:text-4xl">
          {selectedCategory ? selectedCategory.label : "전체 글"}
        </h1>
        <p className="m-0 text-base text-[var(--muted)]">
          {selectedCategory
            ? selectedCategory.description
            : "개발부터 경제까지, 지금까지 쓴 모든 글"}{" "}
          · 총 {filteredPosts.length}편
        </p>
      </header>

      <nav className="mb-8 flex flex-wrap gap-1.5 border-b border-[var(--line)] pb-4" aria-label="글 카테고리">
        <Link
          href="/posts"
          className={`rounded-full border px-4 py-2 text-sm font-semibold no-underline transition-colors ${
            !selectedCategory
              ? "border-[var(--accent)] bg-[var(--accent)] text-white"
              : "border-[var(--line-strong)] bg-[var(--card)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
          }`}
        >
          전체 <span className="mono text-[11.5px] opacity-60">{posts.length}</span>
        </Link>
        {categories.map((item) => {
          const count = posts.filter((post) => getCategoryByLabel(post.category)?.slug === item.slug).length;
          const active = selectedCategory?.slug === item.slug;

          return (
            <Link
              key={item.slug}
              href={`/posts?category=${item.slug}`}
              className={`rounded-full border px-4 py-2 text-sm font-semibold no-underline transition-colors ${
                active
                  ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                  : "border-[var(--line-strong)] bg-[var(--card)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
              }`}
            >
              {item.label} <span className="mono text-[11.5px] opacity-60">{count}</span>
            </Link>
          );
        })}
      </nav>

      {filteredPosts.length > 0 ? (
        <div className="flex flex-col gap-1">
          {filteredPosts.map((post) => (
            <PostCard key={post.slug} post={post} compact />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-[var(--line-strong)] bg-[var(--card)] p-8 text-[var(--muted)]">
          아직 이 카테고리에 발행된 글이 없습니다.
        </div>
      )}
    </div>
  );
}
