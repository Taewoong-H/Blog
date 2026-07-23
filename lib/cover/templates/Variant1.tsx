import type { ResolvedCover } from "@/lib/cover/types";
import { T } from "@/lib/cover/tokens";
import { CoverFooter, CoverFrame, Eyebrow, headlineSize, headlineStyle } from "./primitives";

export function Variant1(cover: ResolvedCover) {
  return (
    <CoverFrame backgroundColor={T.ink}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Eyebrow color={T.accentLight}>{cover.eyebrow}</Eyebrow>
        {cover.badge ? (
          <div
            style={{
              display: "flex",
              width: 58,
              height: 58,
              alignItems: "center",
              justifyContent: "center",
              border: `1px solid ${T.hairline}`,
              borderRadius: 999,
              color: T.muted,
              fontFamily: "JetBrains Mono",
              fontSize: 19,
              fontWeight: 500,
            }}
          >
            {cover.badge}
          </div>
        ) : null}
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={headlineStyle(headlineSize(cover.headlineLines, 76), T.card)}>
          {cover.headlineLines.map((line) => (
            <div key={line} style={{ display: "flex" }}>{line}</div>
          ))}
        </div>
        <div style={{ display: "flex", marginTop: 20, color: T.faint, fontSize: 26, lineHeight: 1.35 }}>
          {cover.sub}
        </div>
      </div>
      <CoverFooter file={cover.file} handle={cover.handle} fileColor={T.accentLight} handleColor={T.muted} />
    </CoverFrame>
  );
}

