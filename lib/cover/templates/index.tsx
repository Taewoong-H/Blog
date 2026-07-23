import type { ResolvedCover } from "@/lib/cover/types";
import { Variant1 } from "./Variant1";
import { Variant2 } from "./Variant2";
import { Variant3 } from "./Variant3";
import { Variant4 } from "./Variant4";

export function CoverTemplate({ cover, slug }: { cover: ResolvedCover; slug: string }) {
  switch (cover.variant) {
    case 1:
      return <Variant1 {...cover} />;
    case 2:
      return <Variant2 {...cover} />;
    case 3:
      return <Variant3 {...cover} />;
    case 4:
      return <Variant4 cover={cover} slug={slug} />;
  }
}

