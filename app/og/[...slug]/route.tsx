import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/posts";
import { site } from "@/lib/site";

export const runtime = "nodejs";

const size = {
  width: 1200,
  height: 630,
};

type OgRouteContext = {
  params: Promise<{ slug: string[] }>;
};

export async function GET(_request: Request, { params }: OgRouteContext) {
  const { slug } = await params;
  const post = getPostBySlug(slug.join("/"));
  const title = post?.title ?? site.title;
  const category = post?.category ?? site.name;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f6f4ef",
          border: "1px solid #dedbd2",
          padding: 72,
          color: "#171717",
          fontFamily: "Arial",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 28,
            fontWeight: 700,
            color: "#2463eb",
          }}
        >
          <span>{site.name}</span>
          <span style={{ color: "#74706a" }}>{category}</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
          }}
        >
          <div
            style={{
              maxWidth: 980,
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 1.12,
              letterSpacing: "-0.03em",
            }}
          >
            {title}
          </div>
          <div
            style={{
              width: 104,
              height: 8,
              background: "#2463eb",
              borderRadius: 999,
            }}
          />
        </div>
        <div style={{ fontSize: 26, color: "#74706a" }}>{site.url.replace("https://", "")}</div>
      </div>
    ),
    size,
  );
}
