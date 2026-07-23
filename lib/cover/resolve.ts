import type { Post } from "@/types/post";
import type { CoverConfig, CoverVariant, ResolvedCover } from "@/lib/cover/types";

const HANDLE = "@teo";

export function variantFromSlug(slug: string): CoverVariant {
  let hash = 0;

  for (let index = 0; index < slug.length; index += 1) {
    hash = (hash * 31 + slug.charCodeAt(index)) >>> 0;
  }

  return ((hash % 4) + 1) as CoverVariant;
}

export function resolveCover(post: {
  slug: string;
  title: string;
  description: string;
  category?: string;
  cover?: CoverConfig;
}): ResolvedCover {
  const config = post.cover ?? {};
  const headline = config.headline ?? post.title.split(" — ")[0];

  return {
    variant: config.variant ?? variantFromSlug(post.slug),
    eyebrow: config.eyebrow ?? (post.category ?? "DEV").toUpperCase(),
    headlineLines: headline.split("|").map((line) => line.trim()).filter(Boolean),
    accentPart: config.accentPart ?? null,
    sub: config.sub ?? post.description,
    file: config.file ?? `${post.slug.split("/").at(-1)}.mdx`,
    badge: config.badge ?? null,
    handle: HANDLE,
  };
}

export function getCoverSrc(post: Pick<Post, "slug" | "cover">): string {
  return post.cover?.image ?? `/og/${post.slug}`;
}

