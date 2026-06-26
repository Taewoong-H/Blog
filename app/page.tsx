import Link from "next/link";
import PostCard from "@/components/PostCard";
import { getRecentPosts } from "@/lib/posts";

export default function Home() {
  const recentPosts = getRecentPosts(3);

  return (
    <div className="mx-auto w-full max-w-4xl px-5 py-16 sm:py-24">
      <section className="max-w-3xl">
        <p className="text-sm font-semibold text-stone-500">개발자의 기록 저장소</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl">
          만들고, 다녀오고, 배우고, 움직인 것을 남깁니다.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-600">
          프론트엔드 개발을 중심으로 여행, 투자, 운동에서 배운 것을 정리하는 개인
          블로그입니다. 완벽한 기능보다 꾸준히 공개할 수 있는 기록을 우선합니다.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/posts"
            className="rounded-md bg-stone-950 px-4 py-2.5 text-sm font-semibold text-stone-50 transition-colors hover:bg-stone-800"
          >
            글 목록 보기
          </Link>
          <Link
            href="/about"
            className="rounded-md border border-stone-300 px-4 py-2.5 text-sm font-semibold text-stone-700 transition-colors hover:border-stone-400 hover:bg-stone-100"
          >
            소개 보기
          </Link>
        </div>
      </section>

      <section className="mt-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-stone-500">Recent Posts</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-stone-950">최근 글</h2>
          </div>
          <Link href="/posts" className="text-sm font-semibold text-stone-700 hover:underline">
            전체 보기
          </Link>
        </div>
        <div>
          {recentPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
