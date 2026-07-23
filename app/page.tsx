import Image from "next/image";
import Link from "next/link";
import PostCard from "@/components/PostCard";
import PostCover from "@/components/PostCover";
import { categories, getCategoryByLabel, getCategoryUpper } from "@/lib/categories";
import { getAllPosts } from "@/lib/posts";
import { getCoverSrc } from "@/lib/cover/resolve";

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

export default function Home() {
  const posts = getAllPosts();
  const featured = posts[0];
  const tags = Array.from(new Set(posts.flatMap((post) => post.tags))).slice(0, 12);

  return (
    <div>
      {featured ? (
        <section className="site-container" style={{ paddingTop: 44, paddingBottom: 12 }}>
          <Link href={`/posts/${featured.slug}`} className="home-featured">
            <div className="home-featured__body">
              <div className="home-featured__eyebrow">
                <span className="category-label">{getCategoryUpper(featured.category)}</span>
                <span
                  className="mono"
                  style={{
                    color: "var(--faint)",
                    fontSize: 11.5,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  ★ Featured
                </span>
              </div>
              <h1 className="home-featured__title">{featured.title}</h1>
              <p className="home-featured__excerpt">{featured.description}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span
                  style={{
                    display: "inline-flex",
                    width: 34,
                    height: 34,
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    borderRadius: "50%",
                    border: "1px solid var(--line-strong)",
                    background: "var(--card)",
                  }}
                >
                  <Image
                    src="/images/profile/img-5331.webp"
                    alt="Taewoong 프로필 사진"
                    width={34}
                    height={34}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </span>
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <span style={{ fontSize: 13.5, fontWeight: 600 }}>Taewoong</span>
                  <span className="mono" style={{ color: "var(--faint)", fontSize: 11.5 }}>
                    {formatDate(featured.date)} · {readingTime(featured.content)}
                  </span>
                </div>
              </div>
            </div>
            <PostCover
              src={getCoverSrc(featured)}
              className="cover home-featured__cover"
            />
          </Link>
        </section>
      ) : null}

      <div className="site-container home-layout">
        <main>
          {categories.map((category) => {
            const sectionPosts = posts.filter((post) => getCategoryByLabel(post.category)?.slug === category.slug);

            return (
              <section key={category.slug} style={{ marginBottom: 48 }}>
                <div className="section-head">
                  <div className="section-head__title">
                    <h2>{category.label}</h2>
                    <span className="section-head__meta">
                      {category.en} · {sectionPosts.length}
                    </span>
                  </div>
                  <Link
                    href={`/posts?category=${category.slug}`}
                    className="section-head__more"
                  >
                    더보기 →
                  </Link>
                </div>

                {sectionPosts.length > 0 ? (
                  <div className="post-grid">
                    {sectionPosts.slice(0, 4).map((post) => (
                      <PostCard key={post.slug} post={post} />
                    ))}
                  </div>
                ) : (
                  <div
                    style={{
                      border: "1px dashed var(--line-strong)",
                      borderRadius: 14,
                      background: "var(--card)",
                      color: "var(--muted)",
                      padding: 24,
                      fontSize: 14,
                      lineHeight: 1.7,
                    }}
                  >
                    아직 발행된 글이 없습니다. 곧 이 주제의 기록을 채워갈 예정입니다.
                  </div>
                )}
              </section>
            );
          })}
        </main>

        <aside className="sidebar">
          <section className="side-card">
            <div className="profile-row">
              <span className="profile-avatar">
                <Image
                  src="/images/profile/img-5331.webp"
                  alt="Taewoong 프로필 사진"
                  width={54}
                  height={54}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </span>
              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <span style={{ fontSize: 17, fontWeight: 800, letterSpacing: "-0.02em" }}>
                  Taewoong
                </span>
                <span className="mono" style={{ color: "var(--faint)", fontSize: 12 }}>
                  @taewoong
                </span>
              </div>
            </div>
            <p style={{ margin: "0 0 16px", color: "var(--muted)", fontSize: 13.5, lineHeight: 1.65 }}>
              프론트엔드 개발자. 코드와 여행, 일상, 돈에 대해 씁니다. 꾸준히 남기는
              개인 기록 저장소입니다.
            </p>
            <div className="stat-grid">
              <div>
                <div style={{ fontWeight: 800, fontSize: 16 }}>{posts.length}</div>
                <div className="mono" style={{ marginTop: 2, color: "var(--faint)", fontSize: 10.5 }}>
                  POSTS
                </div>
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 16 }}>{categories.length}</div>
                <div className="mono" style={{ marginTop: 2, color: "var(--faint)", fontSize: 10.5 }}>
                  TOPICS
                </div>
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 16 }}>2026</div>
                <div className="mono" style={{ marginTop: 2, color: "var(--faint)", fontSize: 10.5 }}>
                  SINCE
                </div>
              </div>
            </div>
            <Link href="/about" className="btn-ink w-full">
              소개 보기
            </Link>
          </section>

          <section className="side-card side-card--tight">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <h3 style={{ margin: 0, fontSize: 14, fontWeight: 800 }}>인기 글</h3>
              <span className="mono" style={{ color: "var(--faint)", fontSize: 10.5, letterSpacing: "0.06em" }}>
                RECENT
              </span>
            </div>
            <div className="flex flex-col gap-3.5">
              {posts.slice(0, 5).map((post, index) => (
                <Link
                  key={post.slug}
                  href={`/posts/${post.slug}`}
                  className="flex items-start gap-3 no-underline hover:opacity-70"
                >
                  <span className="mono w-[18px] shrink-0 text-[15px] font-semibold leading-[1.3] text-[var(--accent)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex flex-col gap-1">
                    <span className="text-[13.5px] font-semibold leading-[1.42] tracking-[-0.01em]">
                      {post.title}
                    </span>
                    <span className="mono text-[11px] text-[var(--faint)]">
                      {post.category} · {readingTime(post.content)}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <section className="side-card side-card--tight">
            <h3 className="m-0 mb-3.5 text-sm font-extrabold">태그</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[var(--line-strong)] px-3 py-1.5 text-[12.5px] text-[var(--muted)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>

          <section className="subscribe-card">
            <h3 className="m-0 mb-2 text-[15.5px] font-extrabold tracking-[-0.02em]">
              매주 화요일, 메일로
            </h3>
            <p className="mb-4 text-[13px] leading-[1.6] text-white/60">
              새 글과 그 주에 읽은 것들을 짧게 정리해 보냅니다.
            </p>
            <div className="flex flex-col gap-2">
              <div className="rounded-[9px] border border-white/15 bg-white/10 p-[10px_12px] text-[13px] text-white/45">
                name@email.com
              </div>
              <Link href="/about" className="btn-primary">
                구독하기
              </Link>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
