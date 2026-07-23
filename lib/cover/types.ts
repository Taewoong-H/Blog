export type CoverVariant = 1 | 2 | 3 | 4;

/**
 * MDX 프론트매터의 `cover` 설정.
 *
 * 모든 필드는 선택 사항이다. `cover` 자체가 없으면 글의 slug와 메타데이터로
 * 커버를 자동 생성하며, `image`가 있으면 생성 템플릿보다 직접 만든 이미지를 우선한다.
 *
 * @example
 * cover:
 *   variant: 2
 *   eyebrow: "AGENT / AI"
 *   headline: "LangChain|안 쓰면 큰일 나요?"
 *   accentPart: "큰일 나요?"
 *   sub: "— 아니요, 몰라도 됩니다."
 *   file: "agent.mdx"
 */
export interface CoverConfig {
  /** 사용할 템플릿 번호. 생략하면 slug 해시로 1~4 중 하나를 결정한다. */
  variant?: CoverVariant;

  /** 커버 상단의 작은 분류 문구. 생략하면 대문자로 변환한 category를 사용한다. */
  eyebrow?: string;

  /** 커버의 큰 제목. `|`로 줄바꿈하며, 생략하면 title의 ` — ` 앞부분을 사용한다. */
  headline?: string;

  /** Variant 2에서 accent 색상으로 강조할 headline의 일부 문자열. */
  accentPart?: string;

  /** 제목 아래 보조 문구. 생략하면 글의 description을 사용한다. */
  sub?: string;

  /** 커버 하단의 파일명. 생략하면 slug의 마지막 경로에 `.mdx`를 붙인다. */
  file?: string;

  /** Variant 1 우측 상단의 원형 배지 문구. 생략하면 배지를 표시하지 않는다. */
  badge?: string;

  /** 직접 만든 이미지 경로. 지정하면 카드·히어로·OG에서 생성 템플릿보다 우선한다. */
  image?: string;
}

/** 글 메타데이터와 CoverConfig의 기본값 처리를 끝낸 템플릿 렌더링용 데이터. */
export interface ResolvedCover {
  variant: CoverVariant;
  eyebrow: string;
  headlineLines: string[];
  accentPart: string | null;
  sub: string;
  file: string;
  badge: string | null;
  handle: string;
}
