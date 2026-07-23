import { ImageResponse } from "next/og";
import { getFonts } from "@/lib/cover/fonts";
import { resolveCover } from "@/lib/cover/resolve";
import { CoverTemplate } from "@/lib/cover/templates";
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";
import { site } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-static";

const size = {
  width: 1200,
  height: 630,
};

type OgRouteContext = {
  params: Promise<{ slug: string[] }>;
};

export function generateStaticParams() {
  return ["site", ...getAllPostSlugs()].map((slug) => ({ slug: slug.split("/") }));
}

export async function GET(_request: Request, { params }: OgRouteContext) {
  const { slug } = await params;
  const slugPath = slug.join("/");
  const post = getPostBySlug(slugPath);
  const cover = resolveCover(
    post ?? {
      slug: "site",
      title: site.title,
      description: site.description,
      category: "BLOG",
      cover: {
        variant: 3,
        eyebrow: "TAEWOONG.LOG",
        headline: "개발과 일상을|꾸준히 기록합니다",
        file: "taewoong.dev",
      },
    },
  );

  return new ImageResponse(
    <CoverTemplate cover={cover} slug={slugPath} />,
    { ...size, fonts: await getFonts() },
  );
}
