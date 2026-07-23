import type { CoverConfig } from "@/lib/cover/types";

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  published: boolean;
  cover?: CoverConfig;
  content: string;
};
