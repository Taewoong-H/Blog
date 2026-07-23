import type { CSSProperties } from "react";

type PostCoverProps = {
  src: string;
  className: string;
  style?: CSSProperties;
};

export default function PostCover({ src, className, style }: PostCoverProps) {
  return (
    <div
      aria-hidden="true"
      className={`${className} cover--image`}
      style={{
        ...style,
        backgroundImage: `url("${src}")`,
      }}
    />
  );
}
