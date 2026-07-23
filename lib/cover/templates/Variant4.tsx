import type { ResolvedCover } from "@/lib/cover/types";
import { T } from "@/lib/cover/tokens";
import { CoverFooter, CoverFrame } from "./primitives";

function promptKeyword(slug: string) {
  const fileSlug = slug.split("/").at(-1) ?? slug;
  return fileSlug.split(/[-_]/).find((part) => part && !/^\d+$/.test(part)) ?? fileSlug;
}

export function Variant4({ cover, slug }: { cover: ResolvedCover; slug: string }) {
  const headline = cover.headlineLines[0] ?? "Untitled";

  return (
    <CoverFrame backgroundColor={T.inkDeep}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {[0, 1, 2].map((dot) => (
          <span
            key={dot}
            style={{ width: 19, height: 19, marginRight: dot < 2 ? 12 : 0, borderRadius: 999, backgroundColor: "#2b2d36" }}
          />
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", fontFamily: "JetBrains Mono" }}>
        <div style={{ display: "flex", color: T.termDim, fontSize: 24, fontWeight: 500 }}>
          ~/blog $ agent --with {promptKeyword(slug)}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 24,
            color: T.card,
            fontSize: headline.length > 42 ? 44 : 52,
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
          }}
        >
          <span>&gt;&nbsp;{headline}</span>
          <span style={{ width: 24, height: 48, marginLeft: 13, backgroundColor: T.accent }} />
        </div>
        <div style={{ display: "flex", marginTop: 34, color: T.termGreen, fontSize: 26, fontWeight: 500, lineHeight: 1.35 }}>
          # {cover.sub}
        </div>
      </div>
      <CoverFooter file={cover.file} handle={cover.handle} fileColor={T.termDim} handleColor={T.termDim} />
    </CoverFrame>
  );
}

