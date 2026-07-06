import type { Post } from "@/types/post";
import { site } from "@/lib/site";

export function absoluteUrl(path: string) {
  return new URL(path, site.url).toString();
}

export function postUrl(post: Pick<Post, "slug">) {
  return absoluteUrl(`/posts/${post.slug}`);
}
