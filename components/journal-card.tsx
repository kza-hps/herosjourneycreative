import Link from "next/link";
import { JournalItem } from "@/lib/site-content";

interface JournalCardProps {
  item: JournalItem;
}

export default function JournalCard({ item }: JournalCardProps) {
  return (
    <article className="hjc-card">
      <div>
        {/* Top row: label / date + read time */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--fg3)",
            marginBottom: "18px",
          }}
        >
          <span>{item.publishedAt}</span>
          <span>{item.readTime}</span>
        </div>

        {/* Serif semibold title — sentence case, not Anton */}
        <h4
          style={{
            fontFamily: "var(--font-serif)",
            fontWeight: 600,
            fontSize: "1.25rem",
            lineHeight: 1.15,
            color: "var(--fg1)",
            margin: "0 0 10px",
          }}
        >
          {item.title}
        </h4>

        {/* Serif excerpt */}
        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "0.92rem",
            lineHeight: 1.5,
            color: "var(--fg2)",
            margin: 0,
          }}
        >
          {item.excerpt}
        </p>
      </div>

      {/* Footer link */}
      <Link href={`/journal#${item.slug}`} className="hjc-card-go" style={{ textDecoration: "none" }}>
        Read Entry →
      </Link>
    </article>
  );
}
