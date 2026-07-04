import Link from "next/link";
import { createPageMetadata } from "@/lib/seo-metadata";

export const metadata = createPageMetadata({
  title: "Legacy Writing | Hero's Journey Creative",
  description:
    "Legacy writing and personal story support for memoirs, family histories, archives, and meaningful life stories.",
  canonical: "/legacy-writing",
});

export default function LegacyWritingPage() {
  return (
    <div
      className="hjc-fade flex-1"
      style={{ padding: "72px 0 80px", background: "var(--bg)" }}
    >
      <div className="max-w-[1200px] mx-auto px-8 max-[880px]:px-5">
        {/* Page header */}
        <span className="hjc-kick block mb-[18px]">Studio Lane № 02</span>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            textTransform: "uppercase",
            fontSize: "var(--step-display)",
            lineHeight: 0.94,
            color: "var(--fg1)",
            margin: "0 0 18px",
          }}
        >
          Legacy &amp;
          <br />
          Personal Story
        </h1>
        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: "var(--step-body-lg)",
            lineHeight: 1.5,
            color: "var(--fg2)",
            maxWidth: "680px",
            margin: 0,
          }}
        >
          Preserving memory through archival research and structured, publication-grade
          biography authoring.
        </p>
        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "48px 0" }} />

        {/* Content */}
        <div style={{ maxWidth: "720px", display: "flex", flexDirection: "column", gap: "20px" }}>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "var(--step-body)",
              lineHeight: 1.62,
              color: "var(--fg2)",
              margin: 0,
            }}
          >
            Our Legacy Story service works with families, founders, and community elders to
            turn scattered memoirs, letters, and spoken recollections into a unified,
            publication-grade text.
          </p>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "var(--step-body)",
              lineHeight: 1.62,
              color: "var(--fg2)",
              margin: 0,
            }}
          >
            We lead structured recording interviews, compile historic context, edit
            transcripts, and design physical and digital portfolios. Each project is
            tailored to the individual&apos;s specific intent, producing an archival asset
            to be passed down.
          </p>
        </div>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "48px 0" }} />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--fg3)",
            }}
          >
            Private commissions by consultation.
          </span>
          <Link href="/contact" className="hjc-lnk">
            Request Private Consultation →
          </Link>
        </div>
      </div>
    </div>
  );
}
