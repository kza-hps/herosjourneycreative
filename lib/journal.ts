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
const CHAPTER_DESIGNATION =
  "(?:\\d{1,3}|[IVXLCDM]+|(?:ONE|TWO|THREE|FOUR|FIVE|SIX|SEVEN|EIGHT|NINE|TEN|ELEVEN|TWELVE|THIRTEEN|FOURTEEN|FIFTEEN|SIXTEEN|SEVENTEEN|EIGHTEEN|NINETEEN|TWENTY|THIRTY|FORTY|FIFTY|SIXTY|SEVENTY|EIGHTY|NINETY)(?:[\\s-](?:ONE|TWO|THREE|FOUR|FIVE|SIX|SEVEN|EIGHT|NINE))?)";
const CHAPTER_TITLE_REGEX = new RegExp(
  `^CHAPTER\\s+${CHAPTER_DESIGNATION}(?:\\s*(?:[:|\\-]|\\u2013|\\u2014)\\s*.*)?$`,
  "i"
);

function stripOpeningChapterTitle(html: string): string {
  let currentHtml = html;

  while (true) {
    const match = currentHtml.match(OPENING_PARAGRAPH_REGEX);
    if (!match) return currentHtml;

    const paragraphText = match[1]
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/gi, " ")
      .replace(/\s+/g, " ")
      .trim();

    if (!paragraphText) {
      currentHtml = currentHtml.slice(match[0].length);
      continue;
    }

    if (CHAPTER_TITLE_REGEX.test(paragraphText)) {
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
