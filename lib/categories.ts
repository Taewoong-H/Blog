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
  {
    slug: "market",
    label: "주가관찰",
    en: "Market Watch",
    description: "공개된 기준으로 매 거래일 기록하는 국내 주식 스크리닝.",
  },
] as const;

export type CategorySlug = (typeof categories)[number]["slug"];

export function getCategoryBySlug(slug: string | undefined) {
  return categories.find((category) => category.slug === slug);
}

export function getCategoryByLabel(label: string) {
  return categories.find((category) => category.label === label);
}

export function getCategoryByValue(value: string | undefined) {
  return categories.find((category) => category.slug === value || category.label === value);
}

export function getCategorySlugByLabel(label: string) {
  return getCategoryByValue(label)?.slug ?? "life";
}

export function getCategoryUpper(label: string) {
  const category = getCategoryByValue(label);

  return category?.slug === "market" ? category.label : (category?.en ?? label).toUpperCase();
}

export function getCategoryHref(slug: CategorySlug) {
  return slug === "market" ? "/posts/market" : `/posts?category=${slug}`;
}
