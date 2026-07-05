import Link from "next/link";
import { createPageMetadata } from "@/lib/seo-metadata";

export const metadata = createPageMetadata({
  title: "Personal Myth Authoring | Hero's Journey Creative",
  description:
    "A guided story-mapping process for turning lived experience, memory, and imagination into a personal mythic framework.",
  canonical: "/personal-myth-authoring",
});

export default function PersonalMythAuthoringPage() {
  return (
    <div
      className="hjc-fade flex-1"
      style={{ padding: "72px 0 80px", background: "var(--bg)" }}
    >
      <div className="max-w-[1200px] mx-auto px-8 max-[880px]:px-5">
        {/* Page header */}
        <span className="hjc-kick block mb-[18px]">Personal Myth Authoring</span>
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
          Map your
          <br />
          myth
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
          Mapping lived biography to narrative frameworks and psychological archetypes.
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
            Personal Myth Authoring is a structured, collaborative consultation framework.
            By overlaying your life milestones, struggles, and transitions onto classical
            story-world structures — such as the Hero&apos;s Journey — we help you re-frame
            your narrative.
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
            This service serves autofiction novelists, memoirists, screenwriters, and
            creative practitioners who want to draw directly from their own psychology to
            build compelling story worlds.
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
            Available as single sessions or multi-month journeys.
          </span>
          <Link href="/contact" className="hjc-lnk">
            Book an Intake Session →
          </Link>
        </div>
      </div>
    </div>
  );
}
