import type { Metadata } from "next";
import Link from "next/link";
import { categories } from "@/lib/categories";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "About",
  description: "Taewoong.dev를 운영하는 프론트엔드 개발자 소개입니다.",
};

const stacks = [
  { group: "Frontend", items: ["React", "Next.js", "TypeScript", "CSS"] },
  { group: "Backend", items: ["Node.js", "Postgres", "Prisma"] },
  { group: "Tools", items: ["Figma", "Vercel", "Linear", "Raycast"] },
];

const timeline = [
  { year: "2026", title: "Taewoong.dev 리뉴얼", desc: "MDX 기반 개인 블로그를 다시 만들고 기록을 시작." },
  { year: "2025", title: "프론트엔드 실험", desc: "작은 사이드 프로젝트와 UI 개선을 꾸준히 시도." },
  { year: "2024", title: "기록 습관 만들기", desc: "개발, 여행, 돈에 대한 생각을 노트로 남기기 시작." },
  { year: "2021", title: "프론트엔드 개발자로", desc: "웹과 인터페이스를 만드는 일에 정착." },
];

export default function AboutPage() {
  const posts = getAllPosts();

  return (
    <div className="content-container py-14 pb-24">
      <section className="mb-[72px] grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="mono mb-[18px] text-xs tracking-[0.08em] text-[var(--accent)]">ABOUT</div>
          <h1 className="m-0 mb-[22px] text-[46px] font-extrabold leading-[1.18] tracking-[-0.04em] max-sm:text-4xl">
            코드도, 여행도,
            <br />
            결국은 기록하는 일.
          </h1>
          <p className="mb-[18px] text-[17px] leading-[1.7] text-[#34343A]">
            안녕하세요, Taewoong입니다. 사용자 경험과 제품의 완성도를 함께 고민하는
            프론트엔드 개발자입니다. 개발하며 배운 것, 떠난 곳에서 본 것, 그리고 돈을
            다루며 깨달은 것을 이곳에 정리합니다.
          </p>
          <p className="mb-7 text-[17px] leading-[1.7] text-[#34343A]">
            잘 쓰는 글보다, 나중에 다시 찾아보고 싶은 글을 쓰려고 합니다.
          </p>
          <div className="flex flex-wrap gap-2.5">
            <a href="https://github.com/Taewoong-H" className="btn-ink">
              GitHub
            </a>
            <a href="mailto:taeung2008@gmail.com" className="btn-ghost">
              Email
            </a>
            <Link href="/posts" className="btn-ghost">
              Archive
            </Link>
          </div>
        </div>
        <div className="cover aspect-square rounded-[20px]" />
      </section>

      <section className="mb-[72px]">
        <h2 className="mono m-0 mb-6 text-[13px] font-extrabold tracking-[0.1em] text-[var(--faint)]">
          무엇을 쓰나요
        </h2>
        <div className="grid gap-[18px] md:grid-cols-2">
          {categories.map((category) => {
            const count = posts.filter((post) => post.category === category.label).length;

            return (
              <Link
                key={category.slug}
                href={`/posts?category=${category.slug}`}
                className="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-6 no-underline transition-all hover:-translate-y-0.5 hover:border-[var(--accent)]"
              >
                <div className="mb-3 flex items-baseline gap-2.5">
                  <h3 className="m-0 text-[21px] font-extrabold tracking-[-0.02em]">
                    {category.label}
                  </h3>
                  <span className="mono text-[11.5px] tracking-[0.05em] text-[var(--accent)]">
                    {category.en} · {count}
                  </span>
                </div>
                <p className="m-0 text-sm leading-[1.6] text-[var(--muted)]">
                  {category.description}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="mono m-0 mb-5 text-[13px] font-extrabold tracking-[0.1em] text-[var(--faint)]">
            기술 스택
          </h2>
          <div className="flex flex-col gap-[18px]">
            {stacks.map((stack) => (
              <div key={stack.group}>
                <div className="mb-2.5 text-[13px] font-bold text-[var(--muted)]">
                  {stack.group}
                </div>
                <div className="flex flex-wrap gap-2">
                  {stack.items.map((item) => (
                    <span
                      key={item}
                      className="mono rounded-lg border border-[var(--line-strong)] px-3 py-1.5 text-[12.5px]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mono m-0 mb-5 text-[13px] font-extrabold tracking-[0.1em] text-[var(--faint)]">
            타임라인
          </h2>
          <div className="flex flex-col">
            {timeline.map((item) => (
              <div key={item.year} className="grid grid-cols-[62px_1fr] gap-[18px] pb-[22px]">
                <span className="mono pt-0.5 text-[13px] font-semibold text-[var(--accent)]">
                  {item.year}
                </span>
                <div className="relative border-l-2 border-[var(--line-strong)] pl-5">
                  <span className="absolute top-[5px] left-[-6px] size-2.5 rounded-full border-2 border-[var(--bg)] bg-[var(--accent)]" />
                  <div className="mb-1 text-[15px] font-bold tracking-[-0.01em]">{item.title}</div>
                  <div className="text-[13.5px] leading-[1.55] text-[var(--muted)]">
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
