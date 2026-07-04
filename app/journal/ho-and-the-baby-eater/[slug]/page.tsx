import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getBook,
  getPublishedChapters,
  getPublishedFrontMatter,
  getChapterBySlug,
  getAdjacentChapters,
  renderChapterDocx,
  chapterWord,
} from "@/lib/journal";
import styles from "./reader.module.css";

export const dynamicParams = false;

export async function generateStaticParams() {
  const chapters = getPublishedChapters();
  return chapters.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const chapter = getChapterBySlug(slug);
  if (!chapter || chapter.status !== "published") return {};
  const book = getBook();
  return {
    title: `Chapter ${chapterWord(chapter.chapterNumber)}: ${chapter.title} - ${book.title} | Hero's Journey Creative`,
    description: chapter.summary,
    alternates: { canonical: `/journal/ho-and-the-baby-eater/${chapter.slug}` },
  };
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const chapter = getChapterBySlug(slug);

  if (!chapter || chapter.status !== "published") {
    notFound();
  }

  const book = getBook();
  const { prev, next } = getAdjacentChapters(slug);
  const epigraph = !prev
    ? getPublishedFrontMatter().find((item) => item.slug === "epigraph")
    : undefined;
  const glossaryHref = "/journal/ho-and-the-baby-eater/glossary";
  const bodyHtml = await renderChapterDocx(chapter.sourceFile, chapter.title);

  return (
    <div
      className="hjc-fade flex-1"
      style={{ background: "var(--bg)", padding: "64px 0 96px" }}
    >
      <div
        className="max-w-[1200px] mx-auto px-8 max-[880px]:px-5"
        style={{ marginBottom: "56px" }}
      >
        <Link
          href="/journal"
          className="hjc-lnk"
          style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
        >
          Back to {book.title}
        </Link>
      </div>

      <main className="chapter-reader-shell">
        <article className="chapter-reader-page">
          <span className="hjc-kick block mb-[16px]">
            {book.title} - Chapter {chapterWord(chapter.chapterNumber)}
          </span>

          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 600,
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
              lineHeight: 1.2,
              color: "var(--fg1)",
              margin: "0 0 20px",
            }}
          >
            {chapter.title}
          </h1>

          <div style={{ margin: "0 0 32px" }}>
            <Link href={glossaryHref} className="hjc-lnk">
              Glossary
            </Link>
          </div>

          {chapter.contentWarning && (
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--fg3)",
                borderLeft: "2px solid var(--hjc-yellow)",
                paddingLeft: "14px",
                margin: "0 0 40px",
              }}
            >
              Content note: {chapter.contentWarning}
            </p>
          )}

          <hr
            style={{
              border: "none",
              borderTop: "1px solid var(--rule)",
              margin: "0 0 48px",
            }}
          />

          <div
            className={`chapter-body ${styles.body}`}
            dangerouslySetInnerHTML={{ __html: bodyHtml }}
          />

          <hr
            style={{
              border: "none",
              borderTop: "1px solid var(--rule)",
              margin: "64px 0 48px",
            }}
          />

          <nav
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "24px",
              flexWrap: "wrap",
            }}
          >
            {prev ? (
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "9px",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--fg3)",
                    margin: "0 0 6px",
                  }}
                >
                  Previous
                </p>
                <Link
                  href={`/journal/ho-and-the-baby-eater/${prev.slug}`}
                  className="hjc-lnk"
                >
                  Chapter {chapterWord(prev.chapterNumber)}
                </Link>
              </div>
            ) : epigraph ? (
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "9px",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--fg3)",
                    margin: "0 0 6px",
                  }}
                >
                  Previous
                </p>
                <Link
                  href={`/journal/ho-and-the-baby-eater/${epigraph.slug}`}
                  className="hjc-lnk"
                >
                  {epigraph.label}
                </Link>
              </div>
            ) : (
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "9px",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--fg3)",
                    margin: "0 0 6px",
                  }}
                >
                  Reference
                </p>
                <Link href={glossaryHref} className="hjc-lnk">
                  Glossary
                </Link>
              </div>
            )}

            {next ? (
              <div style={{ textAlign: "right" }}>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "9px",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--fg3)",
                    margin: "0 0 6px",
                  }}
                >
                  Next
                </p>
                <Link
                  href={`/journal/ho-and-the-baby-eater/${next.slug}`}
                  className="hjc-lnk"
                >
                  Chapter {chapterWord(next.chapterNumber)}
                </Link>
              </div>
            ) : (
              <div style={{ textAlign: "right" }}>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "9px",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--fg3)",
                    margin: "0 0 6px",
                  }}
                >
                  Reference
                </p>
                <Link href={glossaryHref} className="hjc-lnk">
                  Glossary
                </Link>
              </div>
            )}
          </nav>
        </article>
      </main>
    </div>
  );
}
