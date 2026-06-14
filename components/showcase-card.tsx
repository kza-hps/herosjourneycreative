import Link from "next/link";
import { ShowcaseItem } from "@/lib/site-content";

interface ShowcaseCardProps {
  item: ShowcaseItem;
}

export default function ShowcaseCard({ item }: ShowcaseCardProps) {
  return (
    <div className="hjc-card">
      <div>
        {/* Top row: eyebrow tag + metadata */}
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
            gap: "12px",
          }}
        >
          <span
            style={{
              border: "1px solid var(--rule)",
              padding: "4px 8px",
            }}
          >
            {item.eyebrow}
          </span>
          <span>{item.metadata}</span>
        </div>

        {/* Serif semibold title */}
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

        {/* Serif description */}
        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "0.92rem",
            lineHeight: 1.5,
            color: "var(--fg2)",
            margin: "0 0 14px",
          }}
        >
          {item.description}
        </p>

        {/* Notes line */}
        {item.notes && (
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              letterSpacing: "0.04em",
              color: "var(--fg3)",
              margin: 0,
            }}
          >
            {item.notes}
          </p>
        )}
      </div>

      {/* Footer link */}
      <Link href={`/showcase/${item.slug}`} className="hjc-card-go" style={{ textDecoration: "none" }}>
        View Case Study →
      </Link>
    </div>
  );
}
