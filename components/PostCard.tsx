import Link from "next/link";
import type { Post } from "@/types/post";

type PostCardProps = {
  post: Post;
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="border-t border-stone-200 py-7 first:border-t-0 first:pt-0">
      <div className="mb-3 flex flex-wrap items-center gap-2 text-sm text-stone-500">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden="true">/</span>
        <span>{post.category}</span>
      </div>
      <h2 className="text-2xl font-semibold tracking-tight text-stone-950">
        <Link href={`/posts/${post.slug}`} className="hover:underline">
          {post.title}
        </Link>
      </h2>
      <p className="mt-3 max-w-2xl text-base leading-7 text-stone-600">{post.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-stone-200/70 px-2.5 py-1 text-xs font-medium text-stone-700"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
