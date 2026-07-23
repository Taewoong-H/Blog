import type { ResolvedCover } from "@/lib/cover/types";
import { T } from "@/lib/cover/tokens";
import { CoverFooter, CoverFrame, Eyebrow, headlineSize, headlineStyle } from "./primitives";

function AccentLine({ line, accentPart }: { line: string; accentPart: string | null }) {
  if (!accentPart || !line.includes(accentPart)) {
    return <div style={{ display: "flex" }}>{line}</div>;
  }

  const parts = line.split(accentPart);
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {parts.map((part, index) => (
        <span key={`${part}-${index}`} style={{ color: index === 0 ? T.ink : T.accent }}>
          {index > 0 ? accentPart.replaceAll(" ", "\u00a0") : null}
          {part.replaceAll(" ", "\u00a0")}
        </span>
      ))}
    </div>
  );
}

export function Variant2(cover: ResolvedCover) {
  return (
    <CoverFrame backgroundColor={T.card} border={`1px solid ${T.line}`}>
      <Eyebrow color={T.faint}>{cover.eyebrow}</Eyebrow>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <div style={headlineStyle(headlineSize(cover.headlineLines, 79), T.ink)}>
          {cover.headlineLines.map((line) => (
            <AccentLine key={line} line={line} accentPart={cover.accentPart} />
          ))}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 22,
            borderRadius: 8,
            backgroundColor: T.accentSoft,
            color: T.accent,
            padding: "10px 24px",
            fontSize: 29,
            fontWeight: 700,
            lineHeight: 1.35,
          }}
        >
          {cover.sub}
        </div>
      </div>
      <CoverFooter file={cover.file} handle={cover.handle} fileColor={T.accent} handleColor={T.faint} />
    </CoverFrame>
  );
}
