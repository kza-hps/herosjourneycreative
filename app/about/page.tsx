import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Hero's Journey Creative",
  description:
    "A story-led creative studio in Aotearoa New Zealand working across human writing practice, disciplined AI engineering, and careful technology enquiry.",
  alternates: { canonical: "/about" },
};

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
            Hero’s Journey Creative is a story-led creative studio based in Aotearoa New Zealand, working across human writing practice, disciplined AI engineering, and careful enquiry into the cultural implications of emerging technology.
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
            Our writing work is deliberately human-led. Through workshops, memoir structures, family-history projects, journals, and story-world development, we help people give form to memory, identity, imagination, and lived experience without outsourcing the soul of the work to machines.
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
            Alongside that, we build high-quality digital products and web experiences using AI-assisted engineering methods: rapid prototyping, agentic workflows, vibe coding, structured testing, deployment discipline, and human-in-the-loop judgement. The goal is not to replace craft, but to compress the distance between idea, prototype, and production-ready tool.
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
            Our work with AI sits between practice and caution. We treat these systems as powerful collaborators that require governance, cultural care, privacy awareness, and respectful enquiry — especially when the subject matter involves story, whakapapa, memory, creativity, and community.
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
            At its heart, Hero’s Journey Creative is about helping people and organisations shape what matters into lasting forms: books, workshops, archives, websites, products, frameworks, and creative systems that carry human meaning forward.
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
