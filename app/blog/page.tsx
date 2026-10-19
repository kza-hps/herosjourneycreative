import Link from "next/link";
import { createPageMetadata } from "@/lib/seo-metadata";

export const metadata = createPageMetadata({
  title: "Blog | Hero's Journey Creative",
  description:
    "Notes on writing practice, storytelling, and life in the studio at Hero's Journey Creative, Aotearoa New Zealand.",
  canonical: "/blog",
});

export default function BlogPage() {
  return (
    <div className="hjc-fade flex-1" style={{ background: "var(--bg)", padding: "72px 0 96px" }}>
      <div className="max-w-[1200px] mx-auto px-8 max-[880px]:px-5">
        <span className="hjc-kick block mb-[18px]">From the studio</span>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--step-display)", lineHeight: 0.94, textTransform: "uppercase", color: "var(--fg1)", margin: "0 0 24px" }}>
          Blog
        </h1>
        <p style={{ fontFamily: "var(--font-serif)", fontSize: "var(--step-body-lg)", lineHeight: 1.5, color: "var(--fg2)", maxWidth: "680px", margin: 0 }}>
          Notes on writing practice, storytelling, and the ideas taking shape in the studio.
        </p>
        <section aria-labelledby="posts-heading" style={{ borderTop: "1px solid var(--rule)", marginTop: "48px", paddingTop: "40px", maxWidth: "760px" }}>
          <span className="hjc-kick block mb-[18px]">The first page</span>
          <h2 id="posts-heading" style={{ fontFamily: "var(--font-display)", fontSize: "var(--step-h2)", lineHeight: 1, textTransform: "uppercase", margin: "0 0 20px" }}>
            Stories to come
          </h2>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: "var(--step-body)", lineHeight: 1.65, color: "var(--fg2)", margin: "0 0 28px" }}>
            No posts published yet. In the meantime, join a workshop and make some room for your own writing.
          </p>
          <Link href="/workshops" className="hjc-btn hjc-btn-yellow">Explore workshops →</Link>
        </section>
      </div>
    </div>
  );
}
