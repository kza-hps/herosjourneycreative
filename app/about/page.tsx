import Link from "next/link";

export default function AboutPage() {
  return (
    <div
      className="hjc-fade flex-1"
      style={{ padding: "72px 0 80px", background: "var(--bg)" }}
    >
      <div className="max-w-[1200px] mx-auto px-8 max-[880px]:px-5">
        {/* Page header */}
        <span className="hjc-kick block mb-[18px]">About the Studio</span>
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
          Cinematic studio,
          <br />
          workshop house
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
          Hero&apos;s Journey Creative works with people turning memory, experience, and
          imagination into story.
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
            We are a creative studio that believes in narrative as the foundational
            infrastructure of human experience. Our work is split between analog writing
            practices — journal writing, structural memoir coaching, physical workshops —
            and digital frontier experiments in human-centred AI collaboration.
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
            Our mission is to help individuals and collectives architect story worlds,
            preserve family histories, and explore their own mythologies through structured
            creative processes.
          </p>
        </div>

        <div style={{ marginTop: "36px" }}>
          <Link href="/contact" className="hjc-btn hjc-btn-ghost">
            Get in touch →
          </Link>
        </div>
      </div>
    </div>
  );
}
