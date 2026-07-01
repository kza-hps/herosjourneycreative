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
  const cased = /[A-Za-zÀ-ž]/.test(trimmed) && trimmed === trimmed.toLocaleUpperCase()
    ? trimmed.toLocaleLowerCase()
    : trimmed;
  const firstLetter = cased.search(/[A-Za-zÀ-ž]/);
  if (firstLetter < 0) return trimmed;
  return (
    cased.slice(0, firstLetter) +
    cased[firstLetter].toLocaleUpperCase() +
    cased.slice(firstLetter + 1)
  );
}

function normalizeText(value) {
  return value.replace(/\s+/g, " ").trim();
}

function stripChapterHeading(lines) {
  const copy = [...lines];
  if (/^CHAPTER\s+/i.test(copy[0] ?? "")) {
    copy.shift();
  }
  return copy;
}

function titleFromChapterHeading(line) {
  const match = normalizeText(line).match(/^CHAPTER\s+[^|:–—-]+(?:\s*(?:\||:|–|—|-)\s*(.+))?$/i);
  return match?.[1] ? sentenceTitle(cleanTitleLead(match[1])) : null;
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
  const headingTitle = titleFromChapterHeading(lines[0] ?? "");
  if (headingTitle) return headingTitle;

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
    slug: existing?.sourceFile === fileName ? existing.slug : slugify(title, chapterNumber),
    sourceFile: fileName,
    summary: existing?.sourceFile === fileName ? existing.summary : excerpt(lines, title),
    status: "published",
    publishDate: existing?.publishDate || PUBLISH_DATE,
    contentWarning: existing?.contentWarning || CONTENT_WARNING,
  };
}

/**
 * Converts epigraph.docx → epigraph.html if epigraph.docx exists.
 *
 * The DOCX must follow this paragraph convention:
 *   - Content paragraphs for a blockquote, then one attribution paragraph
 *     starting with "—". This attribution line ends the blockquote.
 *   - Blank paragraphs between blockquotes are ignored.
 *
 * To update the Epigraph: edit public/journal/epigraph.docx in Word, then
 * run `npm run journal:sync`. The HTML is regenerated automatically.
 */
async function syncEpigraph() {
  const docxPath = path.join(JOURNAL_DIR, "epigraph.docx");
  if (!fs.existsSync(docxPath)) {
    console.log("No epigraph.docx found; skipping epigraph sync.");
    return;
  }

  const { value: rawHtml } = await mammoth.convertToHtml({ path: docxPath });
  const html = buildEpigraphHtml(rawHtml);

  const outputPath = path.join(JOURNAL_DIR, "epigraph.html");
  fs.writeFileSync(outputPath, html + "\n", "utf8");
  console.log(`Regenerated ${path.relative(process.cwd(), outputPath)} from epigraph.docx`);
}

function buildEpigraphHtml(mammothHtml) {
  const paragraphRegex = /<p(?:[^>]*)>([\s\S]*?)<\/p>/g;
  const inners = [...mammothHtml.matchAll(paragraphRegex)].map(([, inner]) => inner);

  const blockquotes = [];
  let currentBody = [];

  for (const inner of inners) {
    const text = inner.replace(/<[^>]+>/g, "").replace(/&[a-z]+;/g, " ").trim();
    if (!text) continue;

    if (/^[—–-]/.test(text)) {
      if (currentBody.length > 0) {
        blockquotes.push({ body: [...currentBody], attribution: inner });
        currentBody = [];
      }
    } else {
      currentBody.push(inner);
    }
  }

  return blockquotes
    .map(({ body, attribution }) => {
      const bodyHtml = body.map((p) => `  <p>${p}</p>`).join("\n\n");
      return `<blockquote>\n${bodyHtml}\n\n  <footer>${attribution}</footer>\n</blockquote>`;
    })
    .join("\n\n");
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

  await syncEpigraph();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
