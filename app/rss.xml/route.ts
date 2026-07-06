import { getAllPosts } from "@/lib/posts";
import { site } from "@/lib/site";
import { absoluteUrl, postUrl } from "@/lib/urls";

export const dynamic = "force-static";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function GET() {
  const posts = getAllPosts();
  const latestPostDate = posts[0]?.date;
  const lastBuildDate = new Date(latestPostDate ?? Date.now()).toUTCString();

  const items = posts
    .map((post) => {
      const url = postUrl(post);

      return [
        "    <item>",
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${escapeXml(url)}</link>`,
        `      <description>${escapeXml(post.description)}</description>`,
        `      <pubDate>${new Date(post.date).toUTCString()}</pubDate>`,
        `      <guid isPermaLink="true">${escapeXml(url)}</guid>`,
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    "  <channel>",
    `    <title>${escapeXml(site.title)}</title>`,
    `    <link>${escapeXml(site.url)}</link>`,
    `    <description>${escapeXml(site.description)}</description>`,
    `    <language>${escapeXml(site.locale.replace("_", "-"))}</language>`,
    `    <lastBuildDate>${lastBuildDate}</lastBuildDate>`,
    `    <atom:link xmlns:atom="http://www.w3.org/2005/Atom" href="${escapeXml(absoluteUrl("/rss.xml"))}" rel="self" type="application/rss+xml" />`,
    items,
    "  </channel>",
    "</rss>",
  ].join("\n");

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
