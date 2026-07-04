import HeroPanel from "@/components/hero-panel";
import ServiceCard from "@/components/service-card";
import ShowcaseCard from "@/components/showcase-card";
import CtaBand from "@/components/cta-band";
import SectionHeading from "@/components/section-heading";
import Link from "next/link";
import type { Metadata } from "next";
import { LANE_ITEMS, SHOWCASE_ITEMS } from "@/lib/site-content";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero — black, cinematic */}
      <HeroPanel />

      {/* Studio Lanes — paper ground */}
      <section style={{ padding: "90px 0", background: "var(--bg)" }}>
        <div className="max-w-[1200px] mx-auto px-8 max-[880px]:px-5">
          <SectionHeading
            title="Studio Lanes"
            subtitle="The core disciplines of our creative studio and story house."
          />
          {/* Hairline grid: 1px charcoal gutters + outer border */}
          <div
            className="grid grid-cols-4 max-[880px]:grid-cols-2"
            style={{
              gap: "1px",
              background: "var(--hjc-charcoal)",
              border: "1px solid var(--hjc-charcoal)",
              marginTop: "44px",
            }}
          >
            {LANE_ITEMS.map((lane) => (
              <ServiceCard
                key={lane.no}
                catalogueNo={lane.no}
                title={lane.title}
                description={lane.description}
                href={lane.href}
                ctaText="Explore Lane"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Website Refresh promo strip */}
      <div style={{ background: "var(--hjc-yellow)", borderTop: "1px solid var(--hjc-black)", borderBottom: "1px solid var(--hjc-black)", padding: "20px 0" }}>
        <div className="max-w-[1200px] mx-auto px-8 max-[880px]:px-5" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
          <div>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--hjc-black)", display: "block", marginBottom: "3px" }}>New service</span>
            <p style={{ fontFamily: "var(--font-serif)", fontSize: "var(--step-body-lg)", color: "var(--hjc-black)", margin: 0 }}>
              Free website refresh preview for local businesses.
            </p>
          </div>
          <Link href="/services/free-website-preview" className="hjc-btn hjc-btn-dark" style={{ flexShrink: 0 }}>
            See how it works →
          </Link>
        </div>
      </div>

      {/* Manifesto band — black, cinematic breathing room */}
      <section style={{ background: "var(--hjc-black)", color: "var(--hjc-warm-white)", padding: "96px 0" }}>
        <div className="max-w-[1200px] mx-auto px-8 max-[880px]:px-5">
          <span className="hjc-kick hjc-kick-ink block mb-6">The studio</span>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.6rem, 3.2vw, 2.6rem)",
              lineHeight: 1.32,
              fontWeight: 400,
              maxWidth: "880px",
              letterSpacing: "-0.01em",
              color: "var(--fg-on-ink-1)",
              margin: "26px 0 0",
            }}
          >
            Our mission is to help people, communities, and organisations shape{" "}
            <strong style={{ color: "var(--hjc-yellow)", fontWeight: 400 }}>
              meaningful stories
            </strong>{" "}
            and{" "}
            <strong style={{ color: "var(--hjc-yellow)", fontWeight: 400 }}>
              useful digital systems
            </strong>{" "}
            through human-led creative practice, disciplined AI-assisted engineering, and careful, respectful enquiry into how emerging technologies should be used.
          </p>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--fg-on-ink-2)",
              marginTop: "30px",
            }}
          >
            Hero&apos;s Journey Creative — Aotearoa New Zealand
          </div>
        </div>
      </section>

      {/* Selected Work — paper ground */}
      <section style={{ padding: "90px 0", background: "var(--bg)" }}>
        <div className="max-w-[1200px] mx-auto px-8 max-[880px]:px-5">
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "24px",
              marginBottom: "42px",
              flexWrap: "wrap",
            }}
          >
            <SectionHeading title="Selected Work" />
            <Link href="/showcase" className="hjc-lnk">
              View Showcase →
            </Link>
          </div>
          <div
            className="grid grid-cols-3 gap-6 max-[880px]:grid-cols-1"
          >
            {SHOWCASE_ITEMS.filter((item) => !item.hidden).map((item) => (
              <ShowcaseCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA band — yellow */}
      <CtaBand />
    </div>
  );
}
