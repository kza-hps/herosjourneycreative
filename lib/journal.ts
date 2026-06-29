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
  glossarySourceFile?: string;
  glossaryTitle?: string;
  glossaryDescription?: string;
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

export interface FrontMatterMeta {
  kind: "epigraph";
  title: string;
  slug: string;
  sourceFile: string;
  summary: string;
  status: "published" | "draft" | "scheduled";
  publishDate: string;
  label: string;
  ctaLabel: string;
}

function assertBook(data: unknown): BookMeta {
  if (!data || typeof data !== "object") throw new Error("book.json: invalid format");
  const d = data as Record<string, unknown>;
  if (!d.title) throw new Error("book.json: missing title");
  if (!d.author) throw new Error("book.json: missing author");
  if (d.glossarySourceFile) {
    const glossaryPath = path.join(JOURNAL_DIR, d.glossarySourceFile as string);
    if (!fs.existsSync(glossaryPath)) {
      throw new Error(`book.json: glossary source file not found: ${d.glossarySourceFile}`);
    }
  }
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

const FRONT_MATTER_STATUSES = ["published", "draft", "scheduled"] as const;

function resolveSafeJournalPath(sourceFile: string, label: string): string {
  const resolved = path.resolve(JOURNAL_DIR, sourceFile);
  if (!resolved.startsWith(path.resolve(JOURNAL_DIR) + path.sep)) {
    throw new Error(`${label}: sourceFile must be within the journal directory`);
  }
  return resolved;
}

function assertFrontMatter(data: unknown): FrontMatterMeta[] {
  if (!Array.isArray(data)) throw new Error("front-matter.json: must be an array");
  const slugs = new Set<string>();
  return data.map((item, i) => {
    const d = item as Record<string, unknown>;
    if (d.kind !== "epigraph") throw new Error(`front-matter.json[${i}]: unsupported kind`);
    if (!d.title) throw new Error(`front-matter.json[${i}]: missing title`);
    if (!d.slug) throw new Error(`front-matter.json[${i}]: missing slug`);
    if (!d.summary) throw new Error(`front-matter.json[${i}]: missing summary`);
    if (!d.sourceFile) throw new Error(`front-matter.json[${i}]: missing sourceFile`);
    if (!FRONT_MATTER_STATUSES.includes(d.status as typeof FRONT_MATTER_STATUSES[number])) {
      throw new Error(
        `front-matter.json[${i}]: status must be one of ${FRONT_MATTER_STATUSES.join(", ")}`
      );
    }
    if (!d.publishDate) throw new Error(`front-matter.json[${i}]: missing publishDate`);
    if (!d.label) throw new Error(`front-matter.json[${i}]: missing label`);
    if (!d.ctaLabel) throw new Error(`front-matter.json[${i}]: missing ctaLabel`);
    if (slugs.has(d.slug as string)) {
      throw new Error(`front-matter.json: duplicate slug "${d.slug}"`);
    }
    slugs.add(d.slug as string);
    if (d.status === "published") {
      const sourcePath = resolveSafeJournalPath(
        d.sourceFile as string,
        `front-matter.json[${i}]`
      );
      if (!fs.existsSync(sourcePath)) {
        throw new Error(
          `front-matter.json[${i}]: published source file not found: ${d.sourceFile}`
        );
      }
    }
    return d as unknown as FrontMatterMeta;
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

export function getAllFrontMatter(): FrontMatterMeta[] {
  const frontMatterPath = path.join(JOURNAL_DIR, "front-matter.json");
  if (!fs.existsSync(frontMatterPath)) {
    return [];
  }
  return assertFrontMatter(JSON.parse(fs.readFileSync(frontMatterPath, "utf-8")));
}

export function getPublishedFrontMatter(): FrontMatterMeta[] {
  return getAllFrontMatter().filter((item) => item.status === "published");
}

export function getFrontMatterBySlug(slug: string): FrontMatterMeta | undefined {
  return getAllFrontMatter().find((item) => item.slug === slug);
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

function normalizeComparableText(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/&(?:mdash|ndash);|&#821[12];/gi, "-")
    .replace(/[^\p{L}\p{N}'"]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLocaleLowerCase();
}

function slugify(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[‘’]/g, "")
    .replace(/[“”]/g, "")
    .replace(/&/g, " and ")
    .toLocaleLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
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

function isLikelyChapterSubtitle(value: string): boolean {
  const titlePart = value.trim();

  // Chapter headings in this manuscript are set in all caps, even when the
  // subtitle is long or a quoted line of dialogue ending in punctuation.
  if (/[A-Z]/.test(titlePart) && titlePart === titlePart.toUpperCase()) {
    return true;
  }

  return titlePart.length <= 100;
}

function isChapterTitleParagraph(text: string): boolean {
  const upper = text.toUpperCase();
  // Allow a single stray leading character before "CHAPTER " (e.g. "pCHAPTER ONE")
  const chapterStart = upper.indexOf(CHAPTER_PREFIX);
  if (chapterStart < 0 || chapterStart > 1) return false;

  const afterPrefix = text.slice(chapterStart + CHAPTER_PREFIX.length).trim();
  const sepIndex = separatorIndex(afterPrefix);

  if (sepIndex >= 0) {
    const designation = afterPrefix.slice(0, sepIndex);
    return isChapterDesignation(designation) &&
      isLikelyChapterSubtitle(afterPrefix.slice(sepIndex + 1));
  }

  return isChapterDesignation(afterPrefix);
}

function stripOpeningTitlePrefix(html: string, title: string): string {
  const match = html.match(OPENING_PARAGRAPH_REGEX);
  if (!match || !match[0]) return html;

  const innerHtml = match[1];
  if (/<[^>]+>/.test(innerHtml)) return html;

  const paragraphText = normalizeParagraphText(innerHtml);
  const normalizedParagraph = normalizeComparableText(paragraphText);
  const normalizedTitle = normalizeComparableText(title);

  if (!normalizedParagraph.startsWith(normalizedTitle)) return html;

  const titlePattern = title
    .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    .replace(/\s+/g, "\\s+");
  const strippedInner = innerHtml
    .replace(new RegExp(`^\\s*${titlePattern}\\s*[.!?]?\\s*`, "i"), "")
    .trimStart();

  if (!strippedInner) {
    return html.slice(match[0].length);
  }

  return html.replace(match[0], `<p>${strippedInner}</p>`);
}

function stripOpeningChapterTitle(html: string, chapterTitle?: string): string {
  let currentHtml = html;

  while (true) {
    const match = currentHtml.match(OPENING_PARAGRAPH_REGEX);
    if (!match) {
      return chapterTitle ? stripOpeningTitlePrefix(currentHtml, chapterTitle) : currentHtml;
    }

    if (!match[0]) {
      return chapterTitle ? stripOpeningTitlePrefix(currentHtml, chapterTitle) : currentHtml;
    }

    const paragraphText = normalizeParagraphText(match[1]);

    if (!paragraphText) {
      if (/<img\b/i.test(match[1])) {
        return chapterTitle ? stripOpeningTitlePrefix(currentHtml, chapterTitle) : currentHtml;
      }
      currentHtml = currentHtml.slice(match[0].length);
      continue;
    }

    if (isChapterTitleParagraph(paragraphText)) {
      currentHtml = currentHtml.slice(match[0].length);
      continue;
    }

    return chapterTitle ? stripOpeningTitlePrefix(currentHtml, chapterTitle) : currentHtml;
  }
}

function postProcessHtml(html: string, chapterTitle?: string): string {
  const withoutDocxTitle = stripOpeningChapterTitle(html, chapterTitle);

  // Tag scene-break paragraphs so CSS can center them
  return withoutDocxTitle.replace(
    /<p>(\s*(\*{3}|—\s*—\s*—|#{3}|~ ~ ~)\s*)<\/p>/g,
    '<p class="scene-break">$2</p>'
  );
}

export async function renderChapterDocx(sourceFile: string, chapterTitle?: string): Promise<string> {
  const docxPath = path.join(JOURNAL_DIR, sourceFile);
  if (!fs.existsSync(docxPath)) {
    throw new Error(`Source file not found: ${sourceFile}`);
  }
  const buffer = fs.readFileSync(docxPath);
  const result = await mammoth.convertToHtml({ buffer });
  const sanitized = sanitizeHtml(result.value);
  const processed = postProcessHtml(sanitized, chapterTitle);
  if (!processed.trim()) {
    throw new Error(`Chapter body is empty after processing: ${sourceFile}`);
  }
  return processed;
}

export function renderFrontMatterHtml(sourceFile: string): string {
  const sourcePath = resolveSafeJournalPath(sourceFile, "renderFrontMatterHtml");
  if (!fs.existsSync(sourcePath)) {
    throw new Error(`Front matter source file not found: ${sourceFile}`);
  }
  const sanitized = sanitizeHtml(fs.readFileSync(sourcePath, "utf-8"));
  if (!sanitized.trim()) {
    throw new Error(`Front matter body is empty after processing: ${sourceFile}`);
  }
  return sanitized;
}

function addGlossaryAnchors(html: string): string {
  return html.replace(
    /<tr><td><p>(?!<strong>)([\s\S]*?)<\/p><\/td><td>/g,
    (rowStart, termHtml: string) => {
      const term = normalizeParagraphText(termHtml);
      const id = slugify(term);
      if (!id) return rowStart;
      return `<tr id="${id}"><td><p>${termHtml}</p></td><td>`;
    }
  );
}

function stripGlossaryDocTitle(html: string, title?: string): string {
  if (!title) return html;
  const match = html.match(OPENING_PARAGRAPH_REGEX);
  if (!match || !match[0]) return html;
  const paragraphText = normalizeParagraphText(match[1]);
  return normalizeComparableText(paragraphText) === normalizeComparableText(title)
    ? html.slice(match[0].length)
    : html;
}

export async function renderGlossaryDocx(sourceFile: string, title?: string): Promise<string> {
  const docxPath = path.join(JOURNAL_DIR, sourceFile);
  if (!fs.existsSync(docxPath)) {
    throw new Error(`Glossary source file not found: ${sourceFile}`);
  }
  const buffer = fs.readFileSync(docxPath);
  const result = await mammoth.convertToHtml({ buffer });
  const sanitized = sanitizeHtml(result.value);
  const processed = addGlossaryAnchors(stripGlossaryDocTitle(sanitized, title));
  if (!processed.trim()) {
    throw new Error(`Glossary body is empty after processing: ${sourceFile}`);
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
