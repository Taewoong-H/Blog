import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MdxContent from "@/components/MdxContent";
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";

export const runtime = "nodejs";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

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
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto w-full max-w-3xl px-5 py-16">
      <header>
        <div className="flex flex-wrap items-center gap-2 text-sm text-stone-500">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true">/</span>
          <span>{post.category}</span>
        </div>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-5 text-lg leading-8 text-stone-600">{post.description}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-stone-200/70 px-2.5 py-1 text-xs font-medium text-stone-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>
      <MdxContent source={post.content} />
    </article>
  );
}
