import Link from "next/link";
import PostCover from "@/components/PostCover";
import type { Post } from "@/types/post";
import { getCoverSrc } from "@/lib/cover/resolve";
import { getCategoryUpper } from "@/lib/categories";

type PostCardProps = {
  post: Post;
  compact?: boolean;
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
  const words = content.replace(/\s+/g, " ").trim().length;
  return `${Math.max(1, Math.ceil(words / 650))}분`;
}

export default function PostCard({ post, compact = false }: PostCardProps) {
  if (compact) {
    return (
      <Link href={`/posts/${post.slug}`} className="archive-card">
        <PostCover src={getCoverSrc(post)} className="archive-card__cover" />
        <div style={{ display: "flex", minWidth: 0, flexDirection: "column", gap: 8, padding: "4px 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9, flexWrap: "wrap" }}>
            <span
              className="mono"
              style={{
                color: "var(--accent)",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.03em",
              }}
            >
              {getCategoryUpper(post.category)}
            </span>
            <span className="mono" style={{ color: "var(--faint)", fontSize: 11 }}>
              {formatDate(post.date)} · {readingTime(post.content)}
            </span>
          </div>
          <h3
            style={{
              margin: 0,
              color: "var(--ink)",
              fontSize: 19,
              fontWeight: 700,
              lineHeight: 1.35,
              letterSpacing: "-0.02em",
            }}
          >
            {post.title}
          </h3>
          <p
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              overflow: "hidden",
              margin: 0,
              color: "var(--muted)",
              fontSize: 14,
              lineHeight: 1.6,
            }}
          >
            {post.description}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/posts/${post.slug}`} className="post-card">
      <PostCover src={getCoverSrc(post)} className="post-card__cover" />
      <div style={{ display: "flex", flex: 1, flexDirection: "column", gap: 9, padding: "16px 18px 17px" }}>
        <h3
          style={{
            margin: 0,
            color: "var(--ink)",
            fontSize: 16.5,
            fontWeight: 700,
            lineHeight: 1.42,
            letterSpacing: "-0.012em",
          }}
        >
          {post.title}
        </h3>
        <p
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",
            margin: 0,
            color: "var(--muted)",
            fontSize: 13.5,
            lineHeight: 1.6,
          }}
        >
          {post.description}
        </p>
        <div
          className="mono"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginTop: "auto",
            paddingTop: 4,
            color: "var(--faint)",
            fontSize: 11.5,
          }}
        >
          <span>{formatDate(post.date)}</span>
          <span>·</span>
          <span>{readingTime(post.content)}</span>
        </div>
      </div>
    </Link>
  );
}
