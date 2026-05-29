import Link from "next/link";
import JournalCard from "@/components/journal-card";
import { JOURNAL_ITEMS } from "@/lib/site-content";

export default function JournalPage() {
  return (
    <div
      className="hjc-fade flex-1"
      style={{ padding: "72px 0 80px", background: "var(--bg)" }}
    >
      <div className="max-w-[1200px] mx-auto px-8 max-[880px]:px-5">
        {/* Page header */}
        <span className="hjc-kick block mb-[18px]">Notes &amp; Essays</span>
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
          Journal
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
          Reflections on language, notes from the workshop table, and dispatches from our
          human-centred AI experiments.
        </p>
        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "48px 0" }} />

        {/* Journal grid */}
        <div
          className="grid grid-cols-3 gap-6 max-[880px]:grid-cols-1"
        >
          {JOURNAL_ITEMS.map((item) => (
            <div key={item.id} id={item.slug} className="scroll-mt-20">
              <JournalCard item={item} />
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
            Interested in narrative workshops or writing cohorts? We host sessions based in
            Aotearoa and online for international participants.
          </p>
          <Link href="/contact" className="hjc-lnk">
            Contact the Studio →
          </Link>
        </div>
      </div>
    </div>
  );
}
