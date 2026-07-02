import type { CSSProperties } from "react";

type PostCoverProps = {
  src: string;
  className: string;
  style?: CSSProperties;
};

export default function PostCover({ src, className, style }: PostCoverProps) {
  const hasImage = src.trim().length > 0;

  return (
    <div
      className={`${className}${hasImage ? " cover--image" : ""}`}
      style={{
        ...style,
        ...(hasImage ? { backgroundImage: `url("${src}")` } : {}),
      }}
    />
  );
}
