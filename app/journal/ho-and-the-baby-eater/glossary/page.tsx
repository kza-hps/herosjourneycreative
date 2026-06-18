import Link from "next/link";
import type { Metadata } from "next";
import { getBook, renderGlossaryDocx } from "@/lib/journal";
import ReturnToReading from "./return-to-reading";
import styles from "./glossary.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const book = getBook();
  return {
    title: `${book.glossaryTitle ?? "Glossary"} | ${book.title} | Hero's Journey Creative`,
    description: book.glossaryDescription,
  };
}

export default async function GlossaryPage() {
  const book = getBook();
  const title = book.glossaryTitle ?? `${book.title}: Glossary`;

  if (!book.glossarySourceFile) {
    throw new Error("book.json: missing glossarySourceFile");
  }

  const glossaryHtml = await renderGlossaryDocx(book.glossarySourceFile, title);

  return (
    <div
      className="hjc-fade flex-1"
      style={{ background: "var(--bg)", padding: "64px 0 96px" }}
    >
      <div
        className="max-w-[1200px] mx-auto px-8 max-[880px]:px-5"
        style={{ marginBottom: "56px" }}
      >
        <div style={{ display: "flex", gap: "18px", flexWrap: "wrap" }}>
          <ReturnToReading />
          <Link href="/journal" className="hjc-lnk">
            Back to journal
          </Link>
        </div>
      </div>

      <main className="chapter-reader-shell">
        <article className="chapter-reader-page">
          <span className="hjc-kick block mb-[16px]">{book.title}</span>

          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 600,
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              lineHeight: 1.12,
              color: "var(--fg1)",
              margin: "0 0 20px",
            }}
          >
            {title}
          </h1>

          {book.glossaryDescription && (
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: "1.05rem",
                lineHeight: 1.6,
                color: "var(--fg2)",
                margin: "0 0 40px",
              }}
            >
              {book.glossaryDescription}
            </p>
          )}

          <hr
            style={{
              border: "none",
              borderTop: "1px solid var(--rule)",
              margin: "0 0 40px",
            }}
          />

          <div
            className={styles.body}
            dangerouslySetInnerHTML={{ __html: glossaryHtml }}
          />
        </article>
      </main>
    </div>
  );
}
