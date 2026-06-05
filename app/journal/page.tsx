import Link from "next/link";
import type { Metadata } from "next";
import { getBook, getPublishedChapters } from "@/lib/journal";
import BookCover from "@/components/book-cover";
import ChapterCard from "@/components/chapter-card";

export const metadata: Metadata = {
  title: "Journal — Ho & the Baby Eater | Hero's Journey Creative",
  description:
    "A Polynesian-inspired mythic fantasy novel about exile, hunger, mana, prophecy, pride, gods, monsters, and the cost of becoming a hero.",
};

export default function JournalPage() {
  const book = getBook();
  const chapters = getPublishedChapters();
  const firstChapter = chapters[0];

  return (
    <div className="hjc-fade flex-1" style={{ background: "var(--bg)" }}>
      {/* ── Serial Hero ── */}
      <section style={{ padding: "80px 0 72px" }}>
        <div className="max-w-[1200px] mx-auto px-8 max-[880px]:px-5">
          <div
            className="max-[880px]:flex-col"
            style={{
              display: "flex",
              gap: "64px",
              alignItems: "flex-start",
            }}
          >
            {/* Left — text */}
            <div style={{ flex: "1 1 0", minWidth: 0 }}>
              <span className="hjc-kick block mb-[20px]">
                A Novel in Serial — {new Date(book.status === "serialising" ? "2026" : "").getFullYear() || "2026"}
              </span>

              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  textTransform: "uppercase",
                  fontSize: "var(--step-display)",
                  lineHeight: 0.94,
                  letterSpacing: "var(--track-display)",
                  color: "var(--fg1)",
                  margin: "0 0 20px",
                }}
              >
                {book.title}
              </h1>

              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontSize: "var(--step-body-lg)",
                  lineHeight: 1.45,
                  color: "var(--fg2)",
                  margin: "0 0 20px",
                  maxWidth: "520px",
                }}
              >
                {book.subtitle} by {book.author}.
              </p>

              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "var(--step-body)",
                  lineHeight: 1.7,
                  color: "var(--fg2)",
                  maxWidth: "520px",
                  margin: "0 0 14px",
                }}
              >
                {book.description}
              </p>

              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  color: "var(--fg3)",
                  margin: "0 0 40px",
                  maxWidth: "520px",
                }}
              >
                Chapters will be released slowly through the Journal. Each
                chapter can be read online in a book-style reading window.
              </p>

              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                {firstChapter && (
                  <Link
                    href={`/journal/ho-and-the-baby-eater/${firstChapter.slug}`}
                    className="hjc-btn hjc-btn-yellow"
                  >
                    Start Reading
                  </Link>
                )}
                <a href="#chapters" className="hjc-btn hjc-btn-ghost">
                  View Chapters
                </a>
              </div>
            </div>

            {/* Right — cover */}
            <div
              className="max-[880px]:self-center max-[880px]:mt-0"
              style={{ flexShrink: 0 }}
            >
              <BookCover book={book} />
            </div>
          </div>
        </div>
      </section>

      <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "0" }} />

      {/* ── Chapter Archive ── */}
      <section id="chapters" style={{ padding: "80px 0" }}>
        <div className="max-w-[1200px] mx-auto px-8 max-[880px]:px-5">
          <div style={{ marginBottom: "48px" }}>
            <span className="hjc-kick block mb-[14px]">
              {book.title}
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                textTransform: "uppercase",
                fontSize: "var(--step-h2)",
                lineHeight: 0.96,
                color: "var(--fg1)",
                margin: 0,
              }}
            >
              Chapters
            </h2>
          </div>

          {chapters.length === 0 ? (
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                color: "var(--fg3)",
              }}
            >
              No chapters published yet.
            </p>
          ) : (
            <div className="grid grid-cols-3 gap-6 max-[880px]:grid-cols-1">
              {chapters.map((chapter) => (
                <ChapterCard key={chapter.slug} chapter={chapter} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
