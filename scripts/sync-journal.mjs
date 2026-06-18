import fs from "node:fs";
import path from "node:path";
import mammoth from "mammoth";

const JOURNAL_DIR = path.join(process.cwd(), "public", "journal");
const CHAPTER_PATTERN = /^chapter-(\d{2})-pollex-audit\.docx$/i;
const PUBLISH_DATE = "2026-06-18";
const CONTENT_WARNING = "Mature fantasy themes";

const NUMBER_WORDS = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
  "twenty",
];

function sentenceTitle(value) {
  const trimmed = value.replace(/\s+/g, " ").trim();
  const firstLetter = trimmed.search(/[A-Za-zÀ-ž]/);
  if (firstLetter < 0) return trimmed;
  return (
    trimmed.slice(0, firstLetter) +
    trimmed[firstLetter].toLocaleUpperCase() +
    trimmed.slice(firstLetter + 1)
  );
}

function normalizeText(value) {
  return value.replace(/\s+/g, " ").trim();
}

function stripChapterHeading(lines) {
  const copy = [...lines];
  if (/^CHAPTER\s+\S+$/i.test(copy[0] ?? "")) {
    copy.shift();
  }
  return copy;
}

function sentenceTokens(value) {
  return normalizeText(value).match(/.+?[.!?][”’"']?(?=\s|$)/g) ?? [normalizeText(value)];
}

function titleLead(value) {
  const text = normalizeText(value);
  const pairedQuote = text.match(/^([“‘"'][^”’"']+[.!?][”’"']\s+[“‘"'][^”’"']+[.!?][”’"'])/);
  if (pairedQuote) return pairedQuote[1];

  const sentences = sentenceTokens(text);
  const first = sentences[0] ?? text;
  const second = sentences[1] ?? "";

  if (/^[“‘"']/.test(first) && /^[“‘"']/.test(second)) {
    return `${first} ${second}`.trim();
  }

  if (
    /^[“‘"']/.test(first) &&
    second.length <= 70 &&
    /\b(asked|called|commanded|cried|murmured|said|shouted|warned|whispered)\b/i.test(second)
  ) {
    return `${first} ${second}`.trim();
  }

  return first;
}

function cleanTitleLead(value) {
  const trimmed = value.trim();
  if (/[”’"']$/.test(trimmed)) return trimmed;
  return trimmed.replace(/[.!?]+$/, "");
}

function extractTitle(lines) {
  const bodyLines = stripChapterHeading(lines);
  const opening = bodyLines[0] ?? "";
  const lead = titleLead(opening);
  return sentenceTitle(cleanTitleLead(lead));
}

function stripTitleFromOpening(opening, title) {
  const normalizedTitle = title.toLocaleLowerCase();
  const lead = titleLead(opening);
  if (sentenceTitle(cleanTitleLead(lead)).toLocaleLowerCase() !== normalizedTitle) {
    return opening;
  }
  return normalizeText(opening.slice(lead.length));
}

function excerpt(lines, title) {
  const bodyLines = stripChapterHeading(lines);
  const opening = stripTitleFromOpening(bodyLines.join(" "), title);
  const text = normalizeText(opening);
  if (text.length <= 240) return text;
  const trimmed = text.slice(0, 240);
  const lastBreak = Math.max(trimmed.lastIndexOf("."), trimmed.lastIndexOf("?"), trimmed.lastIndexOf("!"));
  return `${trimmed.slice(0, lastBreak > 120 ? lastBreak + 1 : 240).trim()}...`;
}

function slugify(value, chapterNumber) {
  const ascii = value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[‘’]/g, "")
    .replace(/[“”]/g, "")
    .replace(/&/g, " and ")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");

  return `chapter-${String(chapterNumber).padStart(2, "0")}-${ascii || NUMBER_WORDS[chapterNumber] || chapterNumber}`;
}

function readExistingChapters() {
  const chaptersPath = path.join(JOURNAL_DIR, "chapters.json");
  if (!fs.existsSync(chaptersPath)) return new Map();

  const data = JSON.parse(fs.readFileSync(chaptersPath, "utf8"));
  return new Map(data.map((chapter) => [chapter.chapterNumber, chapter]));
}

async function chapterFromFile(fileName, existingByNumber) {
  const match = fileName.match(CHAPTER_PATTERN);
  const chapterNumber = Number(match[1]);
  const sourcePath = path.join(JOURNAL_DIR, fileName);
  const { value } = await mammoth.extractRawText({ path: sourcePath });
  const lines = value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const title = extractTitle(lines);
  const existing = existingByNumber.get(chapterNumber);

  return {
    chapterNumber,
    title,
    slug: slugify(title, chapterNumber),
    sourceFile: fileName,
    summary: existing?.sourceFile === fileName ? existing.summary : excerpt(lines, title),
    status: "published",
    publishDate: existing?.publishDate || PUBLISH_DATE,
    contentWarning: existing?.contentWarning || CONTENT_WARNING,
  };
}

async function main() {
  const existingByNumber = readExistingChapters();
  const files = fs
    .readdirSync(JOURNAL_DIR)
    .filter((file) => CHAPTER_PATTERN.test(file))
    .sort();

  if (files.length === 0) {
    throw new Error("No chapter-XX-pollex-audit.docx files found in public/journal");
  }

  const chapters = [];
  for (const file of files) {
    chapters.push(await chapterFromFile(file, existingByNumber));
  }

  const chaptersPath = path.join(JOURNAL_DIR, "chapters.json");
  fs.writeFileSync(chaptersPath, `${JSON.stringify(chapters, null, 2)}\n`, "utf8");
  console.log(`Synced ${chapters.length} journal chapters to ${path.relative(process.cwd(), chaptersPath)}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
