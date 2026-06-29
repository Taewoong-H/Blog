import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MdxContent, { extractHeadings } from "@/components/MdxContent";
import PostCard from "@/components/PostCard";
import { getCategorySlugByLabel, getCategoryUpper } from "@/lib/categories";
import { getAllPostSlugs, getAllPosts, getPostBySlug } from "@/lib/posts";

export const runtime = "nodejs";

type PostPageProps = {
  params: Promise<{ slug: string[] }>;
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(new Date(date))
    .replaceAll(". ", ".")
    .replace(/\.$/, "");
}

function readingTime(content: string) {
  return `${Math.max(1, Math.ceil(content.replace(/\s+/g, " ").trim().length / 650))}분`;
}

function getSlugPath(slug: string[]) {
  return slug.join("/");
}

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug: slug.split("/") }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(getSlugPath(slug));

  if (!post) {
    return {
      title: "글을 찾을 수 없습니다",
    };
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(getSlugPath(slug));

  if (!post) {
    notFound();
  }

  const posts = getAllPosts();
  const currentIndex = posts.findIndex((item) => item.slug === post.slug);
  const prev = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const next = currentIndex >= 0 && currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;
  const related = posts
    .filter((item) => item.category === post.category && item.slug !== post.slug)
    .slice(0, 3);
  const headings = extractHeadings(post.content);
  const categorySlug = getCategorySlugByLabel(post.category);

  return (
    <div>
      <div className="content-container pt-4">
        <div className="mono flex items-center gap-2 text-xs text-[var(--faint)]">
          <Link href="/" className="hover:text-[var(--accent)]">
            홈
          </Link>
          <span>/</span>
          <Link href={`/posts?category=${categorySlug}`} className="hover:text-[var(--accent)]">
            {post.category}
          </Link>
          <span>/</span>
          <span className="text-[var(--muted)]">{post.slug.split("/").at(-1)}</span>
        </div>
      </div>

      <article className="content-container grid items-start gap-14 py-7 pb-24 lg:grid-cols-[1fr_196px]">
        <div className="min-w-0">
          <span className="category-label mb-[18px]">{getCategoryUpper(post.category)}</span>
          <h1 className="m-0 mb-[18px] text-[39px] font-extrabold leading-[1.2] tracking-[-0.035em] text-balance max-sm:text-3xl">
            {post.title}
          </h1>
          <p className="m-0 mb-6 text-lg leading-[1.6] text-[var(--muted)]">{post.description}</p>
          <div className="mb-[30px] flex items-center gap-3 border-b border-[var(--line)] pb-6">
            <span className="flex size-10 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[15px] font-extrabold text-[var(--accent)]">
              T
            </span>
            <div className="flex flex-1 flex-col gap-0.5">
              <span className="text-sm font-bold">Taewoong</span>
              <span className="mono text-[11.5px] text-[var(--faint)]">
                {formatDate(post.date)} · {readingTime(post.content)} 읽기
              </span>
            </div>
          </div>

          <div className="cover mb-[38px] h-[380px] rounded-[14px] max-sm:h-[220px]" />

          <MdxContent source={post.content} />

          <div className="my-9 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[var(--line-strong)] px-3 py-1.5 text-[13px] text-[var(--muted)]"
              >
                #{tag}
              </span>
            ))}
          </div>

          <section className="mb-9 flex items-start gap-4 rounded-2xl border border-[var(--line)] bg-[var(--card)] p-[22px]">
            <span className="flex size-[52px] shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] text-lg font-extrabold text-[var(--accent)]">
              T
            </span>
            <div className="flex-1">
              <div className="mb-1.5 flex items-center justify-between gap-3">
                <span className="text-[15px] font-extrabold">Taewoong</span>
                <Link href="/about" className="btn-primary px-3.5 py-2 text-[12.5px]">
                  구독
                </Link>
              </div>
              <p className="m-0 text-[13.5px] leading-[1.6] text-[var(--muted)]">
                프론트엔드 개발자이자 여행·기록·경제에 관심이 많은 사람. 직접 겪은
                것만 씁니다.
              </p>
            </div>
          </section>

          <nav className="mb-12 grid gap-4 sm:grid-cols-2" aria-label="이전 다음 글">
            {prev ? (
              <Link
                href={`/posts/${prev.slug}`}
                className="rounded-[13px] border border-[var(--line)] bg-[var(--card)] p-4 no-underline hover:border-[var(--line-strong)]"
              >
                <div className="mono mb-2 text-[11px] text-[var(--faint)]">← 이전 글</div>
                <div className="text-[14.5px] font-bold leading-[1.4]">{prev.title}</div>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/posts/${next.slug}`}
                className="rounded-[13px] border border-[var(--line)] bg-[var(--card)] p-4 text-right no-underline hover:border-[var(--line-strong)]"
              >
                <div className="mono mb-2 text-[11px] text-[var(--faint)]">다음 글 →</div>
                <div className="text-[14.5px] font-bold leading-[1.4]">{next.title}</div>
              </Link>
            ) : null}
          </nav>

          {related.length > 0 ? (
            <section>
              <h2 className="m-0 mb-[18px] text-lg font-extrabold tracking-[-0.02em]">
                함께 읽으면 좋은 글
              </h2>
              <div className="grid gap-4 md:grid-cols-3">
                {related.map((item) => (
                  <PostCard key={item.slug} post={item} />
                ))}
              </div>
            </section>
          ) : null}
        </div>

        <aside className="sticky top-[90px] max-lg:hidden">
          <div className="mono mb-3.5 border-b border-[var(--line)] pb-2.5 text-[11px] tracking-[0.08em] text-[var(--faint)]">
            목차
          </div>
          <nav className="flex flex-col gap-3" aria-label="본문 목차">
            {headings.length > 0 ? (
              headings.map((heading, index) => (
                <a
                  key={heading.id}
                  href={`#${heading.id}`}
                  className={`border-l-2 py-0.5 pl-3 text-[13px] leading-[1.45] text-[var(--muted)] no-underline hover:text-[var(--accent)] ${
                    index === 0 ? "border-[var(--accent)]" : "border-[var(--line-strong)]"
                  }`}
                >
                  {heading.title}
                </a>
              ))
            ) : (
              <span className="text-[13px] leading-6 text-[var(--muted)]">목차가 없습니다.</span>
            )}
          </nav>
          <div className="mt-6 flex gap-2 border-t border-[var(--line)] pt-[18px]">
            <button className="flex-1 rounded-[9px] border border-[var(--line-strong)] bg-[var(--card)] p-2.5 text-[12.5px] font-semibold text-[var(--muted)]">
              ♡ 좋아요
            </button>
            <button className="flex-1 rounded-[9px] border border-[var(--line-strong)] bg-[var(--card)] p-2.5 text-[12.5px] font-semibold text-[var(--muted)]">
              ↗ 공유
            </button>
          </div>
        </aside>
      </article>
    </div>
  );
}
