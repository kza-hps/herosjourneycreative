import Link from "next/link";
import type { ChapterMeta } from "@/lib/journal";
import { chapterWord } from "@/lib/journal";

interface ChapterCardProps {
  chapter: ChapterMeta;
}

export default function ChapterCard({ chapter }: ChapterCardProps) {
  const href = `/journal/ho-and-the-baby-eater/${chapter.slug}`;

  return (
    <Link href={href} style={{ textDecoration: "none", display: "block" }}>
      <article className="hjc-card">
        <div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--hjc-yellow)",
              marginBottom: "14px",
            }}
          >
            Chapter {chapterWord(chapter.chapterNumber)}
          </div>

          <h3
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 600,
              fontSize: "1.15rem",
              lineHeight: 1.2,
              color: "var(--fg1)",
              margin: "0 0 14px",
            }}
          >
            {chapter.title}
          </h3>

          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: "0.9rem",
              lineHeight: 1.6,
              color: "var(--fg2)",
              margin: 0,
            }}
          >
            {chapter.summary}
          </p>

          {chapter.contentWarning && (
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--fg3)",
                margin: "14px 0 0",
              }}
            >
              {chapter.contentWarning}
            </p>
          )}
        </div>

        <span className="hjc-card-go" style={{ marginTop: "22px" }}>
          Read Chapter {chapterWord(chapter.chapterNumber)} →
        </span>
      </article>
    </Link>
  );
}
