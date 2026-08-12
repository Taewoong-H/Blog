import Image from "next/image";
import Link from "next/link";
import PostCover from "@/components/PostCover";
import {
  categories,
  getCategoryByValue,
  getCategoryHref,
  getCategoryUpper,
} from "@/lib/categories";
import { getCoverSrc } from "@/lib/cover/resolve";
import { getAllPosts } from "@/lib/posts";
import type { Post } from "@/types/post";

const HOME_DESIGN_CONTRACT = `<!--
THESIS: Authored categories lead the home while daily market scans close it as a compact ledger; reject the market hero card.
OWN-WORLD: Paper grey, white hairline surfaces, signal blue, numbered editorial sections, and cover-led stories.
STORY: Meet the latest authored post, browse each writing category, then scan the newest market records.
FIRST VIEWPORT: Market-first navigation above a split authored story with the primary archive action in the header.
FORM: Approved Taewoong.dev.dc.html (2) composition; seed home-dc-20260812-market-ledger.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
-->`;

const dateFormatter = new Intl.DateTimeFormat("ko-KR", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

function formatDate(date: string) {
  return dateFormatter
    .format(new Date(date))
    .replaceAll(". ", ".")
    .replace(/\.$/, "");
}

function readingTime(content: string) {
  return `${Math.max(1, Math.ceil(content.replace(/\s+/g, " ").trim().length / 650))}분`;
}

function MoreLink({ href }: { href: string }) {
  return (
    <Link href={href} className="home-section-head__more">
      <span>더보기</span>
      <svg aria-hidden="true" viewBox="0 0 16 16">
        <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" />
      </svg>
    </Link>
  );
}

function HomeFeedList({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return (
      <div className="home-feed-list home-feed-list--empty">
        <strong>이전 기록은 아직 없습니다.</strong>
        <span>새 기록이 발행되면 이곳에 이어집니다.</span>
      </div>
    );
  }

  return (
    <div className="home-feed-list">
      {posts.map((post) => (
        <Link key={post.slug} href={`/posts/${post.slug}`} className="home-feed-row">
          <span className="home-feed-row__title-line">
            <strong>{post.title}</strong>
          </span>
          <span className="home-feed-row__excerpt">{post.description}</span>
          <span className="home-feed-row__meta">
            {formatDate(post.date)} · {readingTime(post.content)}
          </span>
        </Link>
      ))}
    </div>
  );
}

function marketState(post: Post) {
  if (post.gate === "FAIL") return "fail";
  if (post.candidateCount === 0) return "empty";
  return "normal";
}

function MarketSection({ posts }: { posts: Post[] }) {
  return (
    <section className="home-section home-market-section" aria-labelledby="home-market-heading">
      <header className="home-section-head home-section-head--market">
        <h2 id="home-market-heading">주가관찰</h2>
        <span className="home-section-head__meta">STOCK SCREENER · {posts.length}</span>
        <MoreLink href="/posts/market" />
      </header>

      {posts.length > 0 ? (
        <div className="home-market-list">
          {posts.slice(0, 5).map((post) => (
            <Link key={post.slug} href={`/posts/${post.slug}`} className="home-market-row">
              <i
                className={`home-market-dot home-market-dot--${marketState(post)}`}
                aria-hidden="true"
              />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <strong>{post.title}</strong>
              <span>
                후보 {post.candidateCount ?? "—"}개 · 게이트 {post.gate ?? "미집계"}
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="home-section-empty">
          <strong>아직 주가관찰 기록이 없습니다.</strong>
          <span>첫 거래일 기록이 발행되면 이곳에 표시됩니다.</span>
        </div>
      )}
    </section>
  );
}

function CategorySection({
  index,
  category,
  posts,
}: {
  index: number;
  category: (typeof categories)[number];
  posts: Post[];
}) {
  const [lead, ...rest] = posts;

  return (
    <section className="home-section" aria-labelledby={`home-${category.slug}-heading`}>
      <header className="home-section-head">
        <span className="home-section-head__index">{String(index).padStart(2, "0")}</span>
        <h2 id={`home-${category.slug}-heading`}>{category.label}</h2>
        <span className="home-section-head__meta">
          {category.en.toUpperCase()} · {posts.length}
        </span>
        <MoreLink href={getCategoryHref(category.slug)} />
      </header>

      {lead ? (
        <div className="home-section-grid">
          <Link href={`/posts/${lead.slug}`} className="home-lead-card">
            <PostCover src={getCoverSrc(lead)} className="home-lead-card__cover" />
            <div className="home-lead-card__body">
              <h3>{lead.title}</h3>
              <p>{lead.description}</p>
              <span className="home-lead-card__meta">
                {formatDate(lead.date)} · {readingTime(lead.content)}
              </span>
            </div>
          </Link>
          <HomeFeedList posts={rest.slice(0, 3)} />
        </div>
      ) : (
        <div className="home-section-empty">
          <strong>아직 발행된 글이 없습니다.</strong>
          <span>곧 이 주제의 기록을 채워갈 예정입니다.</span>
        </div>
      )}
    </section>
  );
}

export default function Home() {
  const allPosts = getAllPosts();
  const marketPosts = allPosts.filter((post) => post.category === "market");
  const authoredPosts = allPosts.filter((post) => post.category !== "market");
  const homeCategories = categories.filter((category) => category.slug !== "market");
  const featured = authoredPosts[0];
  const tags = Array.from(new Set(authoredPosts.flatMap((post) => post.tags))).slice(0, 12);

  return (
    <div className="home-page">
      <template
        data-design-contract="home-dc-20260812-market-ledger"
        dangerouslySetInnerHTML={{ __html: HOME_DESIGN_CONTRACT }}
      />

      {featured ? (
        <section className="site-container home-featured-section">
          <Link href={`/posts/${featured.slug}`} className="home-featured">
            <span className="home-featured__index" aria-hidden="true">
              01
            </span>
            <div className="home-featured__body">
              <div className="home-featured__eyebrow">
                <span className="category-label">{getCategoryUpper(featured.category)}</span>
                <span className="home-featured__flag">FEATURED</span>
              </div>
              <h1 className="home-featured__title">{featured.title}</h1>
              <p className="home-featured__excerpt">{featured.description}</p>
              <div className="home-featured__author">
                <span className="home-featured__avatar">
                  <Image
                    src="/images/profile/img-5331.webp"
                    alt=""
                    width={34}
                    height={34}
                    priority
                  />
                </span>
                <span className="home-featured__author-copy">
                  <strong>Taewoong</strong>
                  <span>{formatDate(featured.date)} · {readingTime(featured.content)}</span>
                </span>
              </div>
            </div>
            <PostCover src={getCoverSrc(featured)} className="cover home-featured__cover" />
          </Link>
        </section>
      ) : null}

      <div className="site-container home-layout">
        <main className="home-main">
          {homeCategories.map((category, index) => {
            const sectionPosts = authoredPosts.filter(
              (post) => getCategoryByValue(post.category)?.slug === category.slug,
            );

            return (
              <CategorySection
                key={category.slug}
                index={index + 1}
                category={category}
                posts={sectionPosts}
              />
            );
          })}
          <MarketSection posts={marketPosts} />
        </main>

        <aside className="sidebar home-sidebar">
          <section className="side-card">
            <div className="profile-row">
              <span className="profile-avatar">
                <Image
                  src="/images/profile/img-5331.webp"
                  alt="Taewoong 프로필 사진"
                  width={54}
                  height={54}
                />
              </span>
              <div className="home-profile-copy">
                <strong>Taewoong</strong>
                <span>@taewoong</span>
              </div>
            </div>
            <p className="home-profile-description">
              프론트엔드 개발자. 코드와 여행, 일상, 돈에 대해 씁니다. 꾸준히 남기는 개인
              기록 저장소입니다.
            </p>
            <div className="stat-grid">
              <div>
                <strong>{allPosts.length}</strong>
                <span>POSTS</span>
              </div>
              <div>
                <strong>{categories.length}</strong>
                <span>TOPICS</span>
              </div>
              <div>
                <strong>2026</strong>
                <span>SINCE</span>
              </div>
            </div>
            <Link href="/about" className="btn-ink w-full">
              소개 보기
            </Link>
          </section>

          <section className="side-card side-card--tight">
            <div className="home-side-heading">
              <h3>최근 글</h3>
              <span>RECENT</span>
            </div>
            <div className="home-recent-list">
              {authoredPosts.slice(0, 5).map((post, index) => (
                <Link key={post.slug} href={`/posts/${post.slug}`} className="home-recent-link">
                  <span className="home-recent-link__rank">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="home-recent-link__copy">
                    <strong>{post.title}</strong>
                    <span>
                      {getCategoryByValue(post.category)?.label ?? post.category} ·{" "}
                      {readingTime(post.content)}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <section className="side-card side-card--tight">
            <div className="home-side-heading home-side-heading--tags">
              <h3>태그</h3>
            </div>
            <div className="home-tag-list">
              {tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </section>

          <section className="home-rss-card">
            <h3>RSS로 새 글 받기</h3>
            <p>새 글이 발행되면 원하는 리더에서 바로 확인할 수 있습니다.</p>
            <Link href="/rss.xml">RSS 피드 열기</Link>
          </section>
        </aside>
      </div>
    </div>
  );
}
