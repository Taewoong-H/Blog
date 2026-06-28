import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Post } from "@/types/post";

const POSTS_DIRECTORY = path.join(process.cwd(), "content", "posts");

type PostFrontmatter = Omit<Post, "slug" | "content">;

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function parsePostFrontmatter(data: Record<string, unknown>, slug: string): PostFrontmatter {
  const { title, description, date, category, tags, published, coverImage } = data;

  if (
    typeof title !== "string" ||
    typeof description !== "string" ||
    typeof date !== "string" ||
    typeof category !== "string" ||
    !isStringArray(tags) ||
    typeof published !== "boolean" ||
    typeof coverImage !== "string"
  ) {
    throw new Error(`Invalid frontmatter in content/posts/${slug}.mdx`);
  }

  return {
    title,
    description,
    date,
    category,
    tags,
    published,
    coverImage,
  };
}

function getPostFileNames(): string[] {
  if (!fs.existsSync(POSTS_DIRECTORY)) {
    return [];
  }

  function walk(directory: string): string[] {
    return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
      const fullPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        return walk(fullPath);
      }

      if (!entry.isFile() || !entry.name.endsWith(".mdx")) {
        return [];
      }

      return path.relative(POSTS_DIRECTORY, fullPath);
    });
  }

  return walk(POSTS_DIRECTORY);
}

function readPost(fileName: string): Post {
  const slug = fileName.replace(/\.mdx$/, "").split(path.sep).join("/");
  const fullPath = path.join(POSTS_DIRECTORY, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const frontmatter = parsePostFrontmatter(data, slug);

  return {
    slug,
    ...frontmatter,
    content,
  };
}

export function getAllPosts(): Post[] {
  return getPostFileNames()
    .map(readPost)
    .filter((post) => post.published)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(slug: string): Post | null {
  if (slug.split("/").some((segment) => segment === ".." || segment === "")) {
    return null;
  }

  const fileName = `${slug}.mdx`;
  const fullPath = path.join(POSTS_DIRECTORY, fileName);
  const relativePath = path.relative(POSTS_DIRECTORY, fullPath);

  if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
    return null;
  }

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const post = readPost(fileName);

  return post.published ? post : null;
}

export function getRecentPosts(limit: number): Post[] {
  return getAllPosts().slice(0, limit);
}

export function getAllPostSlugs(): string[] {
  return getAllPosts().map((post) => post.slug);
}
