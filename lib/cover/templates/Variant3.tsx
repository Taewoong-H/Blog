import type { ResolvedCover } from "@/lib/cover/types";
import { T } from "@/lib/cover/tokens";
import { CoverFooter, CoverFrame, Eyebrow, headlineSize, headlineStyle } from "./primitives";

export function Variant3(cover: ResolvedCover) {
  return (
    <CoverFrame backgroundColor={T.accent}>
      <Eyebrow color={T.accentPale}>{cover.eyebrow}</Eyebrow>
      <svg
        width="190"
        height="127"
        viewBox="0 0 120 80"
        style={{ position: "absolute", right: 45, bottom: 103, opacity: 0.28 }}
      >
        <path d="M29 40 L83 16 M29 40 L93 40 M29 40 L83 64" fill="none" stroke={T.card} strokeWidth="2" />
        <circle cx="20" cy="40" r="9" fill={T.card} />
        <circle cx="90" cy="14" r="7" fill="none" stroke={T.card} strokeWidth="2" />
        <circle cx="100" cy="40" r="7" fill="none" stroke={T.card} strokeWidth="2" />
        <circle cx="90" cy="66" r="7" fill="none" stroke={T.card} strokeWidth="2" />
      </svg>
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 1040 }}>
        <div style={headlineStyle(headlineSize(cover.headlineLines, 70), T.card)}>
          {cover.headlineLines.map((line) => (
            <div key={line} style={{ display: "flex" }}>{line}</div>
          ))}
        </div>
        <div style={{ display: "flex", maxWidth: 840, marginTop: 20, color: T.accentTint, fontSize: 26, lineHeight: 1.35 }}>
          {cover.sub}
        </div>
      </div>
      <CoverFooter file={cover.file} handle={cover.handle} fileColor={T.accentSoft} handleColor={T.accentPale} />
    </CoverFrame>
  );
}
