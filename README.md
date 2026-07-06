# taewoong.log

개발 · 여행 · 투자 · 운동 · 일상을 기록하는 개인 블로그.
**완벽한 블로그보다 운영 중인 블로그**를 목표로, DB나 CMS 없이 MDX 파일만으로 운영한다.

🔗 **[taewoong.dev](https://taewoong.dev)**

---

## 소개

글 하나가 곧 파일 하나(`.mdx`)인 정적 블로그다. 데이터베이스, 관리자 페이지, 로그인이 없다. 글은 에디터에서 파일로 쓰고, 배포는 push 한 번으로 끝난다. 운영 비용은 0에 수렴하고, 모든 콘텐츠 히스토리는 git에 남는다.

기능을 늘리기보다 **공개하고 꾸준히 쌓는 것**을 우선한다.

## 기술 스택

- **프레임워크**: Next.js (App Router)
- **스타일**: Tailwind CSS v4
- **콘텐츠**: MDX — 렌더링은 [`next-mdx-remote-client/rsc`](https://github.com/ipikuka/next-mdx-remote-client), frontmatter 파싱은 `gray-matter`
- **마크다운 확장**: `remark-gfm` (표 등)
- **이미지**: `sharp` 기반 WebP 변환 스크립트
- **호스팅**: Vercel · **도메인/DNS**: Cloudflare
- **분석**: Vercel Analytics

## 주요 기능

- MDX 파일 기반 글 작성 (frontmatter 메타데이터)
- 글 목록 / 글 상세 / 카테고리 기반 URL (`/posts/<category>/<slug>`)
- 홈 최근 글 노출, About 페이지
- SEO 기본기: `sitemap.xml`, `robots.txt`, RSS 피드, Open Graph / 메타데이터
- 이미지 자동 WebP 변환 (`npm run images`)

## 시작하기

### 요구 사항

- Node.js 20 LTS 이상 권장

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 (http://localhost:3000)
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과 실행
npm run start
```

### 스크립트

| 명령어 | 설명 |
| --- | --- |
| `npm run dev` | 개발 서버 실행 |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 빌드 결과 실행 |
| `npm run lint` | 린트 검사 |
| `npm run images` | `public/images/posts`의 JPG/PNG를 WebP로 변환 |

## 프로젝트 구조

```txt
app/                 # App Router (라우트, 레이아웃, sitemap/robots/rss)
components/          # Header, PostCard, MdxContent 등
content/
  posts/             # 글 = .mdx 파일
lib/
  posts.ts           # 글 읽기/파싱/정렬 (getAllPosts, getPostBySlug 등)
  site.ts            # 사이트 공통 설정 (도메인, 이름, 설명 등)
types/               # 타입 정의
public/
  images/posts/      # 글별 이미지 (WebP만 커밋)
scripts/             # 이미지 변환 등 개발용 유틸
```

## 글 작성 방법

`content/posts/` 에 `.mdx` 파일을 추가한다. 파일 상단에 frontmatter로 메타데이터를 적는다.

```yaml
---
title: "글 제목"
description: "검색·공유 카드에 노출되는 한 줄 설명"
date: "2026-07-01"
category: "개발"          # 개발 / 여행 / 투자 / 운동 / 일상
tags: ["Next.js", "MDX"]
published: true           # false면 목록·색인에서 제외
coverImage: ""
---

본문은 여기부터. (제목은 frontmatter의 title이 H1으로 렌더되므로
본문은 ## 부터 시작한다.)
```

- `published: false` 인 글은 목록·사이트맵에 노출되지 않는다. 작성 중에는 `false`로 두고 완성 후 `true`.
- 날짜(`date`) 기준 최신순으로 정렬된다.

## 이미지 워크플로우

원본 사진(JPG/PNG)은 git에 커밋하지 않고, **WebP 변환본만** 커밋한다.

```bash
# 1) 원본을 글별 폴더에 넣는다
#    public/images/posts/<글slug>/cover.jpg ...

# 2) 변환 실행 → 같은 폴더에 .webp 생성
npm run images

# 3) MDX에서 참조
#    /images/posts/<글slug>/cover.webp
```

변환 기준: 긴 변 1600px 이하, WebP 품질 자동 조정(용량 목표 기반), 파일명 소문자·하이픈 정규화.

## 배포

`main` 브랜치에 push하면 Vercel이 자동으로 빌드·배포한다. 도메인은 Cloudflare에서 관리하며, Vercel의 DNS 레코드를 **DNS only(프록시 off)** 로 연결한다.

## 앞으로

- [ ] 제휴 고지 컴포넌트 (`<AffiliateNotice />`)
- [ ] 코드 신택스 하이라이팅
- [ ] 카테고리 / 태그 목록 페이지
- [ ] 이메일 구독 (외부 서비스 연동)
- [ ] 다크모드 · 검색 · 댓글 (필요 시)

## 라이선스

소스 코드는 자유롭게 참고 가능. 블로그 글·이미지 등 콘텐츠에 대한 권리는 저자에게 있습니다.

---

made by 황태웅