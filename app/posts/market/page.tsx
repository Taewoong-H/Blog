import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "주가관찰",
  description: "공개된 기준으로 매 거래일 기록한 국내 주식 스크리닝 아카이브입니다.",
};

function monthLabel(month: string) {
  const [year, monthNumber] = month.split("-");
  return `${year}년 ${Number(monthNumber)}월`;
}

function dayLabel(date: string) {
  const [, month, day] = date.split("-");
  return `${month}.${day}`;
}

function statusFor(post: { gate?: string; candidateCount?: number }) {
  if (post.gate === "FAIL") {
    return { className: "market-status-dot--fail", label: "시장 게이트 미통과" };
  }

  if (post.candidateCount === 0) {
    return { className: "market-status-dot--empty", label: "진입 후보 없음" };
  }

  return { className: "market-status-dot--normal", label: "진입 후보 있음" };
}

export default function MarketArchivePage() {
  const posts = getAllPosts().filter((post) => post.category === "market");
  const monthGroups = posts.reduce<Map<string, typeof posts>>((groups, post) => {
    const month = post.date.slice(0, 7);
    const monthPosts = groups.get(month) ?? [];
    monthPosts.push(post);
    groups.set(month, monthPosts);
    return groups;
  }, new Map());

  return (
    <div className="content-container market-archive">
      <header className="market-archive__header">
        <div>
          <div className="mono market-archive__eyebrow">DAILY SCREENING LOG</div>
          <h1>주가관찰</h1>
          <p>공개된 기준으로 남기는 국내 주식 스크리닝 기록입니다.</p>
        </div>
        <div className="market-archive__total" aria-label={`총 ${posts.length}일 기록`}>
          <strong>{posts.length}</strong>
          <span>기록일</span>
        </div>
      </header>

      <div className="market-archive__legend" aria-label="상태 범례">
        <span>
          <i className="market-status-dot market-status-dot--fail" aria-hidden="true" />
          게이트 미통과
        </span>
        <span>
          <i className="market-status-dot market-status-dot--empty" aria-hidden="true" />
          후보 없음
        </span>
        <span>
          <i className="market-status-dot market-status-dot--normal" aria-hidden="true" />
          후보 있음
        </span>
      </div>

      {posts.length > 0 ? (
        <div className="market-archive__months">
          {Array.from(monthGroups.entries()).map(([month, monthPosts]) => (
            <section key={month} className="market-month">
              <header className="market-month__header">
                <h2>{monthLabel(month)}</h2>
                <span>{monthPosts.length}일</span>
              </header>
              <div className="market-month__rows">
                {monthPosts.map((post) => {
                  const status = statusFor(post);

                  return (
                    <Link key={post.slug} href={`/posts/${post.slug}`} className="market-row">
                      <span
                        className={`market-status-dot ${status.className}`}
                        role="img"
                        aria-label={status.label}
                      />
                      <time dateTime={post.date}>{dayLabel(post.date)}</time>
                      <span className="market-row__summary">{post.description}</span>
                      <span
                        className="market-row__count"
                        aria-label={`진입 후보 ${post.candidateCount ?? "미집계"}개`}
                      >
                        {post.candidateCount ?? "—"}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="market-archive__empty">아직 쌓인 주가관찰 기록이 없습니다.</div>
      )}
    </div>
  );
}
