import type { CSSProperties, ReactNode } from "react";

type CoverFrameProps = {
  backgroundColor: string;
  children: ReactNode;
  border?: string;
};

export function CoverFrame({ backgroundColor, border, children }: CoverFrameProps) {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
        ...(border ? { border } : {}),
        backgroundColor,
        padding: "58px 66px",
      }}
    >
      {children}
    </div>
  );
}

export function Eyebrow({ children, color }: { children: ReactNode; color: string }) {
  return (
    <div
      style={{
        display: "flex",
        color,
        fontFamily: "JetBrains Mono",
        fontSize: 22,
        fontWeight: 500,
        letterSpacing: "0.08em",
      }}
    >
      {children}
    </div>
  );
}

export function CoverFooter({
  file,
  handle,
  fileColor,
  handleColor,
}: {
  file: string;
  handle: string;
  fileColor: string;
  handleColor: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontFamily: "JetBrains Mono",
        fontSize: 20,
        fontWeight: 500,
      }}
    >
      <span style={{ color: fileColor }}>{file}</span>
      <span style={{ color: handleColor }}>{handle}</span>
    </div>
  );
}

export function headlineSize(lines: string[], preferred: number) {
  const longest = Math.max(...lines.map((line) => line.length), 0);
  if (longest > 28) return preferred - 16;
  if (longest > 21) return preferred - 9;
  return preferred;
}

export const headlineStyle = (fontSize: number, color: string): CSSProperties => ({
  display: "flex",
  flexDirection: "column",
  color,
  fontFamily: "Pretendard",
  fontSize,
  fontWeight: 700,
  letterSpacing: "-0.01em",
  lineHeight: 1.12,
});
