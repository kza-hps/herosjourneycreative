import Link from "next/link";

export default function HeroPanel() {
  return (
    <section
      style={{
        background: "var(--hjc-black)",
        color: "var(--hjc-warm-white)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Bust silhouette — bleeds off the right edge, behind copy */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/assets/bust-yellow.png"
        alt=""
        aria-hidden="true"
        className="hero-bust-img"
      />

      <div
        className="max-w-[1200px] mx-auto px-8 max-[880px]:px-5"
        style={{ position: "relative", zIndex: 2 }}
      >
        <div style={{ padding: "96px 0 104px", maxWidth: "760px" }} className="max-[880px]:py-16 max-[880px]:max-w-none">
          {/* Mono kicker */}
          <span className="hjc-kick hjc-kick-ink mb-5 block">
            Creative Studio &amp; Workshop House
          </span>

          {/* Anton poster headline */}
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--step-poster)",
              lineHeight: 0.9,
              letterSpacing: "var(--track-display)",
              textTransform: "uppercase",
              color: "var(--hjc-warm-white)",
              margin: "22px 0 26px",
            }}
          >
            Turn memory
            <br />
            into{" "}
            <em style={{ color: "var(--hjc-yellow)", fontStyle: "normal" }}>myth</em>
          </h1>

          {/* Italic Spectral subhead */}
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: "var(--step-body-lg)",
              lineHeight: 1.5,
              color: "#cdc8bb",
              maxWidth: "520px",
              marginBottom: "36px",
            }}
          >
            A studio for writing, workshops, story worlds, and human-centred AI experiments —
            based in Aotearoa New Zealand.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <Link href="/contact" className="hjc-btn hjc-btn-yellow">
              Initiate Contact
            </Link>
            <Link href="/about" className="hjc-btn hjc-btn-ghost-ink">
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
