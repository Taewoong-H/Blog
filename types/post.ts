import type { CoverConfig } from "@/lib/cover/types";

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  published: boolean;
  gate?: string;
  candidateCount?: number;
  commentary?: "ai_draft" | "edited";
  cover?: CoverConfig;
  content: string;
};
