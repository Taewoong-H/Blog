import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MdxContent, { extractHeadings } from "@/components/MdxContent";
import PostCard from "@/components/PostCard";
import PostCover from "@/components/PostCover";
import { getCategorySlugByLabel, getCategoryUpper } from "@/lib/categories";
import { getAllPostSlugs, getAllPosts, getPostBySlug } from "@/lib/posts";
import { getCoverSrc } from "@/lib/cover/resolve";
import { site } from "@/lib/site";
import { postUrl } from "@/lib/urls";

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

  const url = postUrl(post);
  const image = getCoverSrc(post);

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: url,
    },
    authors: [{ name: site.author }],
    openGraph: {
      type: "article",
      siteName: site.name,
      locale: site.locale,
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      authors: [site.author],
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [image],
    },
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
  // getAllPosts() is sorted newest first, so the next index is the older post.
  const olderPost =
    currentIndex >= 0 && currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;
  const newerPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const related = posts
    .filter((item) => item.category === post.category && item.slug !== post.slug)
    .slice(0, 3);
  const headings = extractHeadings(post.content);
  const categorySlug = getCategorySlugByLabel(post.category);

  return (
    <div>
      <div className="content-container pt-4">
        <nav
          className="mono flex min-w-0 items-center gap-2 text-xs text-[var(--faint)]"
          aria-label="현재 위치"
        >
          <Link href="/" className="shrink-0 transition-colors hover:text-[var(--accent)]">
            홈
          </Link>
          <span className="shrink-0" aria-hidden="true">
            /
          </span>
          <Link
            href={`/posts?category=${categorySlug}`}
            className="shrink-0 transition-colors hover:text-[var(--accent)]"
          >
            {post.category}
          </Link>
          <span className="shrink-0" aria-hidden="true">
            /
          </span>
          <span className="min-w-0 truncate font-sans text-[var(--muted)]" aria-current="page">
            {post.title}
          </span>
        </nav>
      </div>

      <article className="content-container grid items-start gap-14 py-7 pb-24 lg:grid-cols-[1fr_196px]">
        <div className="min-w-0">
          <span className="category-label mb-[18px]">{getCategoryUpper(post.category)}</span>
          <h1 className="m-0 mb-[18px] text-[39px] font-extrabold leading-[1.2] tracking-[-0.035em] break-keep text-balance max-sm:text-3xl">
            {post.title}
          </h1>
          <p className="m-0 mb-6 text-lg leading-[1.6] break-keep text-[var(--muted)]">
            {post.description}
          </p>
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

          <PostCover
            src={getCoverSrc(post)}
            className="cover mb-[38px] aspect-[1200/630] rounded-[14px]"
          />

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
                  소개
                </Link>
              </div>
              <p className="m-0 text-[13.5px] leading-[1.6] text-[var(--muted)]">
                프론트엔드 개발자이자 여행·기록·경제에 관심이 많은 사람. 직접 겪은
                것만 씁니다.
              </p>
            </div>
          </section>

          <nav className="mb-12 grid gap-4 sm:grid-cols-2" aria-label="이전 다음 글">
            {olderPost ? (
              <Link
                href={`/posts/${olderPost.slug}`}
                className="rounded-[13px] border border-[var(--line)] bg-[var(--card)] p-4 no-underline transition-colors hover:border-[var(--line-strong)]"
              >
                <div className="mono mb-2 text-[11px] text-[var(--faint)]">← 이전 글</div>
                <div className="text-[14.5px] font-bold leading-[1.4]">{olderPost.title}</div>
              </Link>
            ) : (
              <span aria-hidden="true" />
            )}
            {newerPost ? (
              <Link
                href={`/posts/${newerPost.slug}`}
                className="rounded-[13px] border border-[var(--line)] bg-[var(--card)] p-4 text-right no-underline transition-colors hover:border-[var(--line-strong)]"
              >
                <div className="mono mb-2 text-[11px] text-[var(--faint)]">다음 글 →</div>
                <div className="text-[14.5px] font-bold leading-[1.4]">{newerPost.title}</div>
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
              headings.map((heading) => (
                <a
                  key={heading.id}
                  href={`#${heading.id}`}
                  className="border-l border-[var(--line-strong)] py-0.5 pl-3 text-[13px] leading-[1.45] text-[var(--muted)] no-underline transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  {heading.title}
                </a>
              ))
            ) : (
              <span className="text-[13px] leading-6 text-[var(--muted)]">목차가 없습니다.</span>
            )}
          </nav>
        </aside>
      </article>
    </div>
  );
}
