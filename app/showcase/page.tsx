import Link from "next/link";
import ShowcaseCard from "@/components/showcase-card";
import { SHOWCASE_ITEMS } from "@/lib/site-content";

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
            margin: 0,
          }}
        >
          A portfolio and public archive of completed story projects — memoirs, interactive
          portals, and community programmes.
        </p>
        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "48px 0" }} />

        {/* Showcase grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
          }}
          className="max-[880px]:grid-cols-1"
        >
          {SHOWCASE_ITEMS.map((item) => (
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
