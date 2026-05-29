import Link from "next/link";

export default function WorkshopsPage() {
  return (
    <div
      className="hjc-fade flex-1"
      style={{ padding: "72px 0 80px", background: "var(--bg)" }}
    >
      <div className="max-w-[1200px] mx-auto px-8 max-[880px]:px-5">
        {/* Page header */}
        <span className="hjc-kick block mb-[18px]">Studio Lane № 01</span>
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
          Workshops
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
          Structured containers for people to unpack experience, find narrative clarity, and
          form a writing practice — in person across Aotearoa, and remote for international
          cohorts.
        </p>
        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "48px 0" }} />

        {/* Workshop grid */}
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}
          className="max-[880px]:grid-cols-1"
        >
          <div
            style={{
              border: "1px solid var(--rule)",
              padding: "30px",
              background: "var(--surface)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--fg3)",
                marginBottom: "14px",
              }}
            >
              Cohort · Remote &amp; in-person
            </div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                textTransform: "uppercase",
                fontSize: "1.4rem",
                color: "var(--fg1)",
                margin: "0 0 8px",
              }}
            >
              Morning Journal Cohorts
            </h3>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                margin: 0,
                fontSize: "0.98rem",
                lineHeight: 1.55,
                color: "var(--fg2)",
              }}
            >
              Structured morning journaling sessions aimed at clearing blocks and identifying
              the recurring themes inside raw text.
            </p>
          </div>

          <div
            style={{
              border: "1px solid var(--rule)",
              padding: "30px",
              background: "var(--surface)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--fg3)",
                marginBottom: "14px",
              }}
            >
              Cohort · Project-based
            </div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                textTransform: "uppercase",
                fontSize: "1.4rem",
                color: "var(--fg1)",
                margin: "0 0 8px",
              }}
            >
              World &amp; Myth Architecture
            </h3>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                margin: 0,
                fontSize: "0.98rem",
                lineHeight: 1.55,
                color: "var(--fg2)",
              }}
            >
              Mapping character arcs, story worlds, and mythic sequences for novels,
              interactive screenplays, and games.
            </p>
          </div>
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
            Cohort dates &amp; enrolment — illustrative placeholder, to be confirmed by the studio.
          </span>
          <Link href="/contact" className="hjc-lnk">
            Inquire About Enrolment →
          </Link>
        </div>
      </div>
    </div>
  );
}
