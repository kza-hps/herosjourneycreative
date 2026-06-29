import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  chapterWord,
  getBook,
  getFrontMatterBySlug,
  getPublishedChapters,
  renderFrontMatterHtml,
} from "@/lib/journal";
import styles from "../[slug]/reader.module.css";

export const metadata: Metadata = {
  title: "Epigraph - Ho & the Baby Eater | Hero's Journey Creative",
  description:
    "The epigraph for Ho & the Baby Eater, a mythic fantasy serial by Kauri Tukere.",
};

export default function EpigraphPage() {
  const book = getBook();
  const epigraph = getFrontMatterBySlug("epigraph");
  const firstChapter = getPublishedChapters()[0];
  const glossaryHref = "/journal/ho-and-the-baby-eater/glossary";

  if (!epigraph || epigraph.status !== "published") {
    notFound();
  }

  const bodyHtml = renderFrontMatterHtml(epigraph.sourceFile);

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
            {book.title} &mdash; {epigraph.label}
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
            {epigraph.title}
          </h1>

          <div style={{ margin: "0 0 32px" }}>
            <Link href={glossaryHref} className="hjc-lnk">
              Glossary
            </Link>
          </div>

          <hr
            style={{
              border: "none",
              borderTop: "1px solid var(--rule)",
              margin: "0 0 48px",
            }}
          />

          <div
            className={`chapter-body ${styles.body} ${styles.epigraphBody}`}
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

            {firstChapter && (
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
                  href={`/journal/ho-and-the-baby-eater/${firstChapter.slug}`}
                  className="hjc-lnk"
                >
                  Chapter {chapterWord(firstChapter.chapterNumber)}
                </Link>
              </div>
            )}
          </nav>
        </article>
      </main>
    </div>
  );
}
