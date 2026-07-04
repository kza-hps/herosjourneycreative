import Link from "next/link";
import type { Metadata } from "next";
import ShowcaseCard from "@/components/showcase-card";
import { SHOWCASE_ITEMS } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Showcase | Hero's Journey Creative",
  description:
    "A public archive of Hero's Journey Creative projects across story worlds, web experiences, AI-assisted builds, and creative systems.",
  alternates: { canonical: "/showcase" },
};

export default function ShowcasePage() {
  return (
    <div
      className="hjc-fade flex-1"
      style={{ padding: "72px 0 80px", background: "var(--bg)" }}
    >
      <div className="max-w-[1200px] mx-auto px-8 max-[880px]:px-5">
        {/* Page header */}
        <span className="hjc-kick block mb-[18px]">Public Archive</span>
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
          Showcase
        </h1>
        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: "var(--step-body-lg)",
            lineHeight: 1.5,
            color: "var(--fg2)",
            maxWidth: "680px",
            margin: "0 0 20px",
          }}
        >
          A public archive of finished creative builds, story worlds, research frameworks, and
          disciplined AI-assisted engineering.
        </p>
        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "var(--step-body)",
            lineHeight: 1.6,
            color: "var(--fg2)",
            maxWidth: "680px",
            margin: 0,
          }}
        >
          Each case study documents not only what was made, but how it was made: the prompts,
          product decisions, agent workflows, design systems, infrastructure choices, and
          production rituals used to turn an idea into a working artefact.
        </p>
        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "48px 0" }} />

        {/* Showcase grid */}
        <div
          className="grid grid-cols-3 gap-6 max-[880px]:grid-cols-1"
        >
          {SHOWCASE_ITEMS.filter((item) => !item.hidden).map((item) => (
            <div key={item.id} id={item.slug} className="scroll-mt-20">
              <ShowcaseCard item={item} />
            </div>
          ))}
        </div>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "60px 0 48px" }} />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "var(--step-body)",
              lineHeight: 1.6,
              color: "var(--fg2)",
              maxWidth: "520px",
              margin: 0,
            }}
          >
            We focus on bespoke, archival-grade physical books and carefully designed digital
            interfaces. Let&apos;s co-create your story world.
          </p>
          <Link href="/contact" className="hjc-lnk">
            Inquire About Custom Projects →
          </Link>
        </div>
      </div>
    </div>
  );
}
