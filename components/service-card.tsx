import Link from "next/link";

interface ServiceCardProps {
  catalogueNo: string;
  title: string;
  description: string;
  href: string;
  ctaText?: string;
}

export default function ServiceCard({
  catalogueNo,
  title,
  description,
  href,
  ctaText = "Explore Lane",
}: ServiceCardProps) {
  return (
    <Link href={href} className="hjc-lane block" style={{ textDecoration: "none" }}>
      <div>
        {/* Catalogue number */}
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "var(--fg3)",
            letterSpacing: "0.1em",
          }}
        >
          № {catalogueNo}
        </div>

        {/* Anton title */}
        <h3
          style={{
            fontFamily: "var(--font-display)",
            textTransform: "uppercase",
            fontSize: "1.5rem",
            lineHeight: 1.04,
            color: "var(--fg1)",
            margin: "18px 0 12px",
          }}
        >
          {title}
        </h3>

        {/* Serif description */}
        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "0.95rem",
            lineHeight: 1.5,
            color: "var(--fg2)",
            margin: 0,
          }}
        >
          {description}
        </p>
      </div>

      {/* Footer link */}
      <span className="hjc-lane-go">
        {ctaText} →
      </span>
    </Link>
  );
}
