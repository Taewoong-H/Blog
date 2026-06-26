import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "taewoong.log를 운영하는 프론트엔드 개발자 소개입니다.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-16">
      <header>
        <p className="text-sm font-semibold text-stone-500">About</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-stone-950">
          프론트엔드 개발자의 기록
        </h1>
      </header>

      <div className="mt-10 space-y-6 text-lg leading-8 text-stone-700">
        <p>
          안녕하세요. 사용자 경험과 제품의 완성도를 함께 고민하는 프론트엔드
          개발자입니다. 이 블로그는 배운 것을 오래 남기고, 나중에 다시 꺼내 보기 위해
          만든 개인 기록 공간입니다.
        </p>
        <p>
          주로 프론트엔드 개발 과정에서 마주한 문제와 해결 방법을 정리합니다. 작게는
          컴포넌트 설계와 스타일링부터, 넓게는 제품을 더 단단하게 만드는 판단까지
          기록하려 합니다.
        </p>
        <p>
          개발 외에도 여행, 투자, 운동에 관한 생각을 함께 남깁니다. 서로 다른 경험을
          꾸준히 적다 보면 지금의 관심사와 선택이 어떤 방향으로 이어지는지 더 잘 볼 수
          있다고 믿습니다.
        </p>
      </div>
    </div>
  );
}
