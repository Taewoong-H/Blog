import { readFile } from "node:fs/promises";
import path from "node:path";

const fontDirectory = path.join(process.cwd(), "assets", "fonts");
const loadFont = (fileName: string) => readFile(path.join(fontDirectory, fileName));

export async function getFonts() {
  const [pretendardBold, pretendardRegular, monoBold, monoMedium] = await Promise.all([
    loadFont("Pretendard-Bold.otf"),
    loadFont("Pretendard-Regular.otf"),
    loadFont("JetBrainsMono-Bold.ttf"),
    loadFont("JetBrainsMono-Medium.ttf"),
  ]);

  return [
    { name: "Pretendard", data: pretendardBold, weight: 700 as const, style: "normal" as const },
    { name: "Pretendard", data: pretendardRegular, weight: 400 as const, style: "normal" as const },
    { name: "JetBrains Mono", data: monoBold, weight: 700 as const, style: "normal" as const },
    { name: "JetBrains Mono", data: monoMedium, weight: 500 as const, style: "normal" as const },
  ];
}

