import fs from "fs";
import path from "path";
import mammoth from "mammoth";

const JOURNAL_DIR = path.join(process.cwd(), "public", "journal");

export interface BookMeta {
  title: string;
  author: string;
  subtitle: string;
  description: string;
  coverImage: string | null;
  coverPlaceholder: boolean;
  status: string;
}

export interface ChapterMeta {
  chapterNumber: number;
  title: string;
  slug: string;
  sourceFile: string;
  summary: string;
  status: "published" | "draft" | "scheduled";
  publishDate: string;
  contentWarning?: string;
}

function assertBook(data: unknown): BookMeta {
  if (!data || typeof data !== "object") throw new Error("book.json: invalid format");
  const d = data as Record<string, unknown>;
  if (!d.title) throw new Error("book.json: missing title");
  if (!d.author) throw new Error("book.json: missing author");
  return d as unknown as BookMeta;
}

function assertChapters(data: unknown): ChapterMeta[] {
  if (!Array.isArray(data)) throw new Error("chapters.json: must be an array");
  const slugs = new Set<string>();
  return data.map((item, i) => {
    const d = item as Record<string, unknown>;
    if (!d.chapterNumber) throw new Error(`chapters.json[${i}]: missing chapterNumber`);
    if (!d.title) throw new Error(`chapters.json[${i}]: missing title`);
    if (!d.slug) throw new Error(`chapters.json[${i}]: missing slug`);
    if (!d.summary) throw new Error(`chapters.json[${i}]: missing summary`);
    if (!d.sourceFile) throw new Error(`chapters.json[${i}]: missing sourceFile`);
    if (slugs.has(d.slug as string)) {
      throw new Error(`chapters.json: duplicate slug "${d.slug}"`);
    }
    slugs.add(d.slug as string);
    if (d.status === "published") {
      const docxPath = path.join(JOURNAL_DIR, d.sourceFile as string);
      if (!fs.existsSync(docxPath)) {
        throw new Error(
          `chapters.json[${i}]: published chapter source file not found: ${d.sourceFile}`
        );
      }
    }
    return d as unknown as ChapterMeta;
  });
}

export function getBook(): BookMeta {
  const bookPath = path.join(JOURNAL_DIR, "book.json");
  if (!fs.existsSync(bookPath)) {
    throw new Error("book.json is missing from public/journal/");
  }
  return assertBook(JSON.parse(fs.readFileSync(bookPath, "utf-8")));
}

export function getAllChapters(): ChapterMeta[] {
  const chaptersPath = path.join(JOURNAL_DIR, "chapters.json");
  if (!fs.existsSync(chaptersPath)) {
    throw new Error("chapters.json is missing from public/journal/");
  }
  return assertChapters(JSON.parse(fs.readFileSync(chaptersPath, "utf-8")));
}

export function getPublishedChapters(): ChapterMeta[] {
  return getAllChapters()
    .filter((c) => c.status === "published")
    .sort((a, b) => a.chapterNumber - b.chapterNumber);
}

export function getChapterBySlug(slug: string): ChapterMeta | undefined {
  return getAllChapters().find((c) => c.slug === slug);
}

export function getAdjacentChapters(slug: string): {
  prev: ChapterMeta | null;
  next: ChapterMeta | null;
} {
  const published = getPublishedChapters();
  const idx = published.findIndex((c) => c.slug === slug);
  return {
    prev: idx > 0 ? published[idx - 1] : null,
    next: idx < published.length - 1 ? published[idx + 1] : null,
  };
}

function sanitizeHtml(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
    .replace(/\son\w+\s*=\s*["'][^"']*["']/gi, "")
    .replace(/\shref\s*=\s*["']javascript:[^"']*["']/gi, "");
}

const OPENING_PARAGRAPH_REGEX = /^\s*<p\b[^>]*>([\s\S]*?)<\/p>\s*/i;
const CHAPTER_PREFIX = "CHAPTER ";
const CHAPTER_UNITS = new Set([
  "ONE", "TWO", "THREE", "FOUR", "FIVE",
  "SIX", "SEVEN", "EIGHT", "NINE",
]);
const CHAPTER_TEENS = new Set([
  "TEN", "ELEVEN", "TWELVE", "THIRTEEN", "FOURTEEN",
  "FIFTEEN", "SIXTEEN", "SEVENTEEN", "EIGHTEEN", "NINETEEN",
]);
const CHAPTER_TENS = new Set([
  "TWENTY", "THIRTY", "FORTY", "FIFTY",
  "SIXTY", "SEVENTY", "EIGHTY", "NINETY",
]);

function normalizeParagraphText(html: string): string {
  return html
    .replace(/<br\s*\/?>|<[^>]+>|&nbsp;|&(?:mdash|ndash);|&#821[12];/gi, (token) =>
      /^<br|^&(?:mdash|ndash);|^&#821[12];/i.test(token) ? " - " : " "
    )
    .replace(/\s+/g, " ")
    .trim();
}

function separatorIndex(text: string): number {
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === ":" || char === "|" || char === "." || char === "–" || char === "—") {
      return i;
    }
    if (char === "-" && (text[i - 1] === " " || text[i + 1] === " ")) {
      return i;
    }
  }
  return -1;
}

function isChapterDesignation(value: string): boolean {
  const trimmed = value.trim().toUpperCase();
  if (/^\d{1,3}$/.test(trimmed) || /^[IVXLCDM]+$/.test(trimmed)) return true;

  const parts = trimmed.split(/[\s-]+/);
  if (parts.length === 1) {
    return (
      CHAPTER_UNITS.has(parts[0]) ||
      CHAPTER_TEENS.has(parts[0]) ||
      CHAPTER_TENS.has(parts[0])
    );
  }
  return parts.length === 2 && CHAPTER_TENS.has(parts[0]) && CHAPTER_UNITS.has(parts[1]);
}

function isChapterTitleParagraph(text: string): boolean {
  const upper = text.toUpperCase();
  if (!upper.startsWith(CHAPTER_PREFIX)) return false;

  const afterPrefix = text.slice(CHAPTER_PREFIX.length).trim();
  const sepIndex = separatorIndex(afterPrefix);
  const designation = sepIndex >= 0 ? afterPrefix.slice(0, sepIndex) : afterPrefix;
  return isChapterDesignation(designation);
}

function stripOpeningChapterTitle(html: string): string {
  let currentHtml = html;

  while (true) {
    const match = currentHtml.match(OPENING_PARAGRAPH_REGEX);
    if (!match) return currentHtml;

    if (!match[0]) return currentHtml;

    const paragraphText = normalizeParagraphText(match[1]);

    if (!paragraphText) {
      if (/<img\b/i.test(match[1])) {
        return currentHtml;
      }
      currentHtml = currentHtml.slice(match[0].length);
      continue;
    }

    if (isChapterTitleParagraph(paragraphText)) {
      return currentHtml.slice(match[0].length);
    }

    return currentHtml;
  }
}

function postProcessHtml(html: string): string {
  const withoutDocxTitle = stripOpeningChapterTitle(html);

  // Tag scene-break paragraphs so CSS can center them
  return withoutDocxTitle.replace(
    /<p>(\s*(\*{3}|—\s*—\s*—|#{3}|~ ~ ~)\s*)<\/p>/g,
    '<p class="scene-break">$2</p>'
  );
}

export async function renderChapterDocx(sourceFile: string): Promise<string> {
  const docxPath = path.join(JOURNAL_DIR, sourceFile);
  if (!fs.existsSync(docxPath)) {
    throw new Error(`Source file not found: ${sourceFile}`);
  }
  const buffer = fs.readFileSync(docxPath);
  const result = await mammoth.convertToHtml({ buffer });
  const sanitized = sanitizeHtml(result.value);
  const processed = postProcessHtml(sanitized);
  if (!processed.trim()) {
    throw new Error(`Chapter body is empty after processing: ${sourceFile}`);
  }
  return processed;
}

const CHAPTER_WORDS = [
  "One", "Two", "Three", "Four", "Five",
  "Six", "Seven", "Eight", "Nine", "Ten",
  "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen",
  "Sixteen", "Seventeen", "Eighteen", "Nineteen", "Twenty",
];

export function chapterWord(n: number): string {
  if (n >= 1 && n <= 20) return CHAPTER_WORDS[n - 1];
  return String(n);
}
