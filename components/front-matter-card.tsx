import Link from "next/link";
import type { FrontMatterMeta } from "@/lib/journal";

interface FrontMatterCardProps {
  item: FrontMatterMeta;
}

export default function FrontMatterCard({ item }: FrontMatterCardProps) {
  const href = `/journal/ho-and-the-baby-eater/${item.slug}`;

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
            {item.label}
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
            {item.title}
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
            {item.summary}
          </p>
        </div>

        <span className="hjc-card-go" style={{ marginTop: "22px" }}>
          {item.ctaLabel} →
        </span>
      </article>
    </Link>
  );
}
