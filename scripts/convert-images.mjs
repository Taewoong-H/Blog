import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import sharp from "sharp";

const POSTS_IMAGES_DIR = path.join(process.cwd(), "public", "images", "posts");
const MAX_DIMENSION = 1600;
const MAX_BYTES = 500 * 1024;
const QUALITY_STEPS = [80, 70, 60, 50];
const SOURCE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png"]);

const targetFolder = process.argv[2];
const searchRoot = targetFolder
  ? path.resolve(POSTS_IMAGES_DIR, targetFolder)
  : POSTS_IMAGES_DIR;

function normalizeOutputName(filePath) {
  const { name } = path.parse(filePath);
  return `${name.toLowerCase().replaceAll(/[\s_]+/g, "-")}.webp`;
}

function formatBytes(bytes) {
  if (bytes < 1024) {
    return `${bytes}B`;
  }

  return `${(bytes / 1024).toFixed(1)}KB`;
}

async function pathExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function* walkImages(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      yield* walkImages(entryPath);
      continue;
    }

    if (entry.isFile() && SOURCE_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      yield entryPath;
    }
  }
}

async function isUpToDate(sourcePath, outputPath) {
  if (!(await pathExists(outputPath))) {
    return false;
  }

  const [sourceStat, outputStat] = await Promise.all([
    fs.stat(sourcePath),
    fs.stat(outputPath),
  ]);

  return outputStat.mtimeMs >= sourceStat.mtimeMs;
}

async function convertImage(sourcePath) {
  const outputPath = path.join(path.dirname(sourcePath), normalizeOutputName(sourcePath));

  if (await isUpToDate(sourcePath, outputPath)) {
    const outputStat = await fs.stat(outputPath);
    console.log(`건너뜀: ${path.relative(process.cwd(), sourcePath)} -> ${formatBytes(outputStat.size)}`);
    return "skipped";
  }

  let finalBuffer;
  let finalQuality = QUALITY_STEPS.at(-1);

  for (const quality of QUALITY_STEPS) {
    const buffer = await sharp(sourcePath)
      .rotate()
      .resize({
        width: MAX_DIMENSION,
        height: MAX_DIMENSION,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality })
      .toBuffer();

    finalBuffer = buffer;
    finalQuality = quality;

    if (buffer.byteLength <= MAX_BYTES) {
      break;
    }
  }

  await fs.writeFile(outputPath, finalBuffer);

  const relativeSource = path.relative(process.cwd(), sourcePath);
  const relativeOutput = path.relative(process.cwd(), outputPath);
  const size = formatBytes(finalBuffer.byteLength);

  console.log(`변환: ${relativeSource} -> ${relativeOutput} (${size}, quality ${finalQuality})`);

  if (finalBuffer.byteLength > MAX_BYTES) {
    console.warn(`경고: ${relativeOutput}가 ${formatBytes(MAX_BYTES)}를 초과합니다 (${size}).`);
  }

  return "converted";
}

async function main() {
  const postsRoot = path.resolve(POSTS_IMAGES_DIR);
  const resolvedRoot = path.resolve(searchRoot);

  if (targetFolder && !resolvedRoot.startsWith(`${postsRoot}${path.sep}`)) {
    throw new Error("대상 폴더는 public/images/posts 안에 있어야 합니다.");
  }

  if (!(await pathExists(resolvedRoot))) {
    throw new Error(`대상 폴더가 없습니다: ${path.relative(process.cwd(), resolvedRoot)}`);
  }

  let converted = 0;
  let skipped = 0;

  for await (const imagePath of walkImages(resolvedRoot)) {
    const result = await convertImage(imagePath);

    if (result === "converted") {
      converted += 1;
    } else {
      skipped += 1;
    }
  }

  console.log(`변환 ${converted}개, 건너뜀 ${skipped}개`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
