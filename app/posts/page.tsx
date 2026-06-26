import type { Metadata } from "next";
import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Posts",
  description: "taewoong.log의 전체 글 목록입니다.",
};

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto w-full max-w-4xl px-5 py-16">
      <header className="max-w-2xl">
        <p className="text-sm font-semibold text-stone-500">Posts</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-stone-950">전체 글</h1>
        <p className="mt-5 text-lg leading-8 text-stone-600">
          MDX 파일로 작성한 공개 글을 최신순으로 모았습니다.
        </p>
      </header>
      <div className="mt-12">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
