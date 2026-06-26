# 블로그 MVP 개발 프롬프트 (Claude Code / Codex 용)

Next.js 최신 App Router 기반 개인 블로그 MVP를 개발해줘.
현재 프로젝트 루트 구조는 `src` 없이 `app` 디렉터리를 사용하는 구조야.

현재 루트에는 다음 파일/폴더가 있어:

- app/
- public/
- package.json
- next.config.ts
- tsconfig.json
- eslint.config.mjs
- postcss.config.mjs

목표는 CRUD나 DB 없이, **MDX 파일 기반 정적 블로그 MVP**를 만드는 것이야.

---

## 0. 작업 시작 전에 먼저 확인할 것 (중요)

- 코드를 짜기 전에 **반드시 `package.json`을 먼저 읽고** Next.js / React /
  Tailwind 의 실제 설치 버전을 확인해. 버전을 추측해서 쓰지 마.
- 특히 다음 두 가지는 버전에 따라 문법이 다르니 설치된 버전에 맞춰야 해:
  - **Tailwind**: v4면 `globals.css`에 `@tailwind base/components/utilities`가
    아니라 **`@import "tailwindcss";`** 한 줄을 쓰고, `@tailwindcss/postcss`
    플러그인이 `postcss.config.mjs`에 들어있어야 해. (v4는 tailwind.config.js
    없이 동작) v3이면 기존 `@tailwind` 디렉티브 방식으로 써.
  - **Next.js 15 이상**: 동적 라우트와 `generateMetadata`의 `params`가
    **`Promise`** 타입이야. 반드시 `await params` 해서 풀어 써.

---

## 1. 이번 작업의 범위

다음까지만 해줘:

1. 폴더 구조 생성
2. MDX 기반 글 작성 구조 구현
3. 글 목록 페이지 구현
4. 글 상세 페이지 구현
5. 홈 페이지에서 최근 글 노출
6. about 페이지 생성
7. 최소한의 스타일링
8. 로컬에서 `npm run dev` / `npm run build`가 통과되도록 구성

---

## 2. 원하는 폴더 구조

```txt
app/
  page.tsx
  layout.tsx
  globals.css
  posts/
    page.tsx
    [slug]/
      page.tsx
  about/
    page.tsx
components/
  Header.tsx
  PostCard.tsx
  MdxContent.tsx
content/
  posts/
    blog-start.mdx
lib/
  posts.ts
types/
  post.ts
public/
  images/
    posts/
```

---

## 3. 글(MDX) 작성 구조

글은 `content/posts/*.mdx` 파일로 작성할 거야.
첫 글 예시는 `content/posts/blog-start.mdx`로 만들어줘.

frontmatter 형식은 다음과 같아:

```yaml
---
title: "블로그를 다시 시작한다"
description: "완벽하게 만들려다 멈췄던 블로그를 이번에는 공개부터 해보려 한다."
date: "2026-06-26"
category: "일상"
tags: ["블로그", "회고", "개발자"]
published: true
coverImage: ""
---
```

본문은 적당히 5문단 정도 작성해줘.

---

## 4. 타입 정의 (`types/post.ts`)

다음 필드를 가진 `Post` 타입을 만들어줘. `lib/posts.ts`에서 gray-matter의
`data`를 이 타입으로 다뤄서 타입 안정성을 확보해줘:

- `slug: string`
- `title: string`
- `description: string`
- `date: string`
- `category: string`
- `tags: string[]`
- `published: boolean`
- `coverImage: string`
- `content: string` (본문 원문; 상세 페이지 렌더링용)

목록용으로 본문(`content`)이 빠진 메타 전용 타입을 따로 둬도 되지만,
과설계는 금지. 굳이 필요 없으면 `Post` 하나로 충분해.

---

## 5. `lib/posts.ts` 기능

다음 기능을 만들어줘:

- `content/posts` 폴더의 mdx 파일 읽기 (`fs` 사용, 서버 전용)
- gray-matter로 frontmatter 파싱
- 파일명에서 slug 생성
- `published`가 `true`인 글만 반환
- `date` 기준 최신순 정렬
- `getAllPosts()`
- `getPostBySlug(slug)`
- `getRecentPosts(limit)`
- `getAllPostSlugs()`

---

## 6. MDX 렌더링

`next-mdx-remote-client/rsc`를 사용해줘.

> **주의:** 기존에 흔히 쓰던 `next-mdx-remote`는 2026년 4월에 저장소가
> 아카이브(유지보수 중단)됐어. 그 포크이자 Next.js 공식 문서가 권장하는
> **`next-mdx-remote-client`** 를 사용해. import 경로는
> `next-mdx-remote-client/rsc` 야. (React 19 프로젝트면 v2를 설치)

`components/MdxContent.tsx`에서 서버 컴포넌트로 MDX를 렌더링하고,
상세 페이지에서 이 컴포넌트를 사용해줘.

> 참고: `lib/posts.ts`가 `fs`를 쓰므로 상세 라우트는 Node.js 런타임에서
> 돌아야 해. App Router 기본값이 Node라 보통 괜찮지만, 만약 프로덕션에서
> fs/path 관련 500 에러가 나면 해당 `page.tsx`에
> `export const runtime = "nodejs";`를 추가하면 돼.

---

## 7. 필요 패키지

없으면 설치가 필요하다고 알려주고, `package.json`에 반영해줘.

- `gray-matter`
- `next-mdx-remote-client`  ← (`next-mdx-remote` 아님)

---

## 8. 페이지 요구사항

### 8-1. `app/page.tsx` (홈)
- 블로그 소개 문구
- 최근 글 3개 표시
- `/posts`, `/about` 링크 제공

### 8-2. `app/posts/page.tsx` (글 목록)
- 전체 글 목록 표시
- 제목, 설명, 날짜, 카테고리, 태그 표시

### 8-3. `app/posts/[slug]/page.tsx` (글 상세)
- `generateStaticParams` 구현 (published 글만)
- 글 상세 렌더링
- title, date, category, tags 표시
- 없는 slug면 `notFound()` 처리
- `generateMetadata` 구현
- **`params`는 `Promise`이므로 `await params`로 풀어 쓸 것**

### 8-4. `app/about/page.tsx` (소개)
- 간단한 자기소개 페이지
- 프론트엔드 개발자, 개발/여행/투자/운동 기록용 블로그라는 내용

---

## 9. 스타일

- Tailwind CSS로 최소한만 적용해줘. (설치된 Tailwind 버전 문법에 맞춰서)
- `components/Header.tsx`에 간단한 네비게이션(홈 / posts / about) 정도만.
- **만들지 마:** 과한 디자인, 다크모드, 애니메이션, 검색, 댓글, 조회수,
  태그 필터, shadcn/ui.

---

## 10. 이미지 전략

- 초기에는 `public/images/posts`에 블로그용 WebP 이미지만 저장할 예정.
- 원본 이미지는 Git에 넣지 않을 예정.
- **이번 작업에서는** 이미지 최적화 스크립트나 외부 스토리지 연동을 만들지 마.

---

## 11. 중요한 개발 원칙

- MVP 완성이 우선이다.
- 과설계하지 마.
- DB, CMS, 관리자 페이지, 인증은 만들지 마.
- `npm run build`가 성공해야 한다.
- TypeScript 에러 없이 작성해줘. (`any` 남용 금지, 위의 `Post` 타입 활용)
- 작업이 끝나면 실제로 `npm run dev`와 `npm run build`를 돌려서 통과하는지
  확인하고, 에러가 있으면 고친 뒤 마무리해줘.

---

## 12. 작업 진행 방식 (단계별로 끊어서 진행)

한 번에 전부 쏟아내지 말고, 아래 4단계로 나눠서 진행해.
**각 단계가 끝날 때마다 `npm run build`(또는 타입체크)를 돌려 통과를
확인하고, 통과하면 그 단계를 git commit 한 뒤 다음 단계로 넘어가.**
중간에 막히면 다음 단계로 가지 말고 그 단계에서 멈춰서 알려줘.

### 1단계 — 데이터 레이어

- `types/post.ts`
- `lib/posts.ts`
- `content/posts/blog-start.mdx`
- 필요 패키지 설치(`gray-matter`, `next-mdx-remote-client`)
- 확인: 타입 에러 없이 `lib/posts.ts`가 컴파일되는지
- ✅ 통과하면 commit

### 2단계 — 레이아웃 / 스타일 기반

- `app/layout.tsx`
- `app/globals.css` (설치된 Tailwind 버전 문법에 맞춰서)
- `components/Header.tsx`
- 확인: `npm run dev`로 기본 레이아웃이 깨지지 않고 뜨는지
- ✅ 통과하면 commit

### 3단계 — 페이지 구현

- `components/PostCard.tsx`, `components/MdxContent.tsx`
- `app/page.tsx` (최근 글 3개)
- `app/posts/page.tsx` (전체 목록)
- `app/posts/[slug]/page.tsx` (`generateStaticParams`, `generateMetadata`,
  `await params`, `notFound`)
- 확인: 홈 → 목록 → 상세 링크가 실제로 연결되는지
- ✅ 통과하면 commit

### 4단계 — 마무리

- `app/about/page.tsx`
- 전체 `npm run build` 통과 확인
- 남은 타입 에러 / 린트 에러 정리
- ✅ 최종 commit

각 단계 끝에서 "이번 단계에서 만든 파일 / 통과한 명령 / 다음 단계"를
한두 줄로 요약해줘.
