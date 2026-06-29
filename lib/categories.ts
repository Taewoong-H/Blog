export const categories = [
  {
    slug: "development",
    label: "개발",
    en: "Development",
    description: "코드, 아키텍처, 그리고 수많은 시행착오의 기록.",
  },
  {
    slug: "life",
    label: "일상",
    en: "Daily",
    description: "평범한 하루를 조금 더 오래 들여다보는 일.",
  },
  {
    slug: "travel",
    label: "여행",
    en: "Travel",
    description: "도시와 길 위에서 모아 온 장면들.",
  },
  {
    slug: "economy",
    label: "경제",
    en: "Economy",
    description: "돈, 시장, 그리고 작은 사이드 프로젝트의 손익.",
  },
] as const;

export type CategorySlug = (typeof categories)[number]["slug"];

export function getCategoryBySlug(slug: string | undefined) {
  return categories.find((category) => category.slug === slug);
}

export function getCategoryByLabel(label: string) {
  return categories.find((category) => category.label === label);
}

export function getCategorySlugByLabel(label: string) {
  return getCategoryByLabel(label)?.slug ?? "life";
}

export function getCategoryUpper(label: string) {
  return (getCategoryByLabel(label)?.en ?? label).toUpperCase();
}
