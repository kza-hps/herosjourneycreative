import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Free Website Refresh Preview | Hero's Journey Creative",
  description:
    "Hero's Journey Creative creates free interactive homepage refresh previews for selected local businesses. See what your website could look like before paying for a rebuild.",
  alternates: {
    canonical: "/services/free-website-preview",
  },
  openGraph: {
    title: "Free Website Refresh Preview | Hero's Journey Creative",
    description:
      "See what your website could look like — before paying for a rebuild. Free homepage refresh previews for selected local businesses.",
    url: "https://herosjourneycreative.co.nz/services/free-website-preview",
    siteName: "Hero's Journey Creative",
    locale: "en_NZ",
    type: "website",
  },
};

// ── local helpers ──────────────────────────────────────────────────────────────

function Rule() {
  return (
    <hr
      style={{
        border: "none",
        borderTop: "1px solid var(--rule)",
        margin: "64px 0",
      }}
    />
  );
}

function MonoLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "10px",
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "var(--fg3)",
        marginBottom: "12px",
      }}
    >
      {children}
    </div>
  );
}

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
        fontFamily: "var(--font-serif)",
        fontSize: "var(--step-body)",
        lineHeight: 1.55,
        color: "var(--fg2)",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          display: "inline-block",
          width: "18px",
          height: "2px",
          background: "var(--hjc-yellow)",
          flexShrink: 0,
          marginTop: "0.65em",
        }}
      />
      {children}
    </li>
  );
}

// ── page ───────────────────────────────────────────────────────────────────────

export default function FreeWebsitePreviewPage() {
  return (
    <div className="hjc-fade flex-1" style={{ background: "var(--bg)" }}>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section style={{ padding: "72px 0 68px", background: "var(--hjc-black)" }}>
        <div className="max-w-[1200px] mx-auto px-8 max-[880px]:px-5">
          <span className="hjc-kick hjc-kick-ink block mb-5">
            Website Refresh Preview
          </span>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              textTransform: "uppercase",
              fontSize: "var(--step-display)",
              lineHeight: 0.94,
              color: "var(--hjc-warm-white)",
              margin: "0 0 22px",
              maxWidth: "860px",
            }}
          >
            See what your website could look like — before paying for a rebuild.
          </h1>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: "var(--step-body-lg)",
              lineHeight: 1.5,
              color: "var(--fg-on-ink-2)",
              maxWidth: "660px",
              margin: "0 0 16px",
            }}
          >
            Hero&apos;s Journey Creative creates free interactive homepage refresh previews
            for selected local businesses. You get a private link showing a refreshed
            version of your current website, with stronger design, clearer messaging, and
            better calls to action.
          </p>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "var(--step-body)",
              lineHeight: 1.5,
              color: "var(--fg-on-ink-2)",
              maxWidth: "600px",
              margin: "0 0 38px",
            }}
          >
            Nothing changes on your live website. No obligation. Just a preview of what
            your business could look like online.
          </p>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--hjc-yellow)",
              margin: "0 0 30px",
            }}
          >
            If you like it, we can build out the rest of your website from $100 per page.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "14px" }}>
            <Link
              href="/contact?interest=free-preview"
              className="hjc-btn hjc-btn-yellow"
            >
              Request a Free Preview
            </Link>
            <a href="#received-preview" className="hjc-btn hjc-btn-ghost-ink">
              I Received a Preview
            </a>
          </div>
        </div>
      </section>

      {/* ── Main content ───────────────────────────────────────────────────── */}
      <div
        className="max-w-[1200px] mx-auto px-8 max-[880px]:px-5"
        style={{ paddingTop: "68px", paddingBottom: "88px" }}
      >

        {/* ── Received a preview? ────────────────────────────────────────── */}
        <section id="received-preview">
          <SectionHeading title="Received a preview from us?" />
          <div
            className="grid grid-cols-[1fr_auto] gap-12 max-[880px]:grid-cols-1 max-[880px]:gap-8"
            style={{ marginTop: "28px", alignItems: "start" }}
          >
            <div>
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "var(--step-body-lg)",
                  lineHeight: 1.6,
                  color: "var(--fg2)",
                  margin: "0 0 18px",
                }}
              >
                We may have sent you a private concept preview showing how your current
                homepage could be modernised.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "var(--step-body)",
                  lineHeight: 1.6,
                  color: "var(--fg2)",
                  margin: "0 0 14px",
                }}
              >
                The preview is not live on your real website. It is a separate concept link
                created so you can review the design direction safely.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "var(--step-body)",
                  lineHeight: 1.6,
                  color: "var(--fg2)",
                  margin: "0 0 28px",
                }}
              >
                You can review it, send feedback, request changes, or simply ignore it.
                There is no obligation. If you like the direction, we can turn the concept
                into a working website and build out the rest of your pages from $100 per
                page.
              </p>
              <Link
                href="/contact?interest=preview-followup"
                className="hjc-btn hjc-btn-yellow"
              >
                Talk to us about my preview
              </Link>
            </div>

            {/* Sidebar note */}
            <div
              style={{
                border: "1px solid var(--rule)",
                padding: "24px",
                background: "var(--surface-inset)",
                minWidth: "260px",
              }}
              className="max-[880px]:min-w-0 max-[880px]:w-full"
            >
              <MonoLabel>Good to know</MonoLabel>
              <ul
                style={{
                  margin: 0,
                  padding: 0,
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {[
                  "Your live website is untouched",
                  "No contract or commitment required",
                  "You can request changes to the concept",
                  "The preview link is private",
                ].map((item) => (
                  <li
                    key={item}
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "0.95rem",
                      lineHeight: 1.5,
                      color: "var(--fg2)",
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <Rule />

        {/* ── What is included ───────────────────────────────────────────── */}
        <section>
          <SectionHeading title="What is included in the free preview?" />
          <div
            className="grid grid-cols-[1fr_1fr] gap-10 max-[880px]:grid-cols-1"
            style={{ marginTop: "28px" }}
          >
            <ul
              style={{
                margin: 0,
                padding: 0,
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              {[
                "A redesigned homepage concept",
                "Sharper headline and business positioning",
                "Improved service sections",
                "Clearer contact, booking, or enquiry buttons",
                "Updated visual style",
                "Mobile-friendly layout direction",
                "A private preview link you can click through",
              ].map((item) => (
                <CheckItem key={item}>{item}</CheckItem>
              ))}
            </ul>

            <div
              style={{
                borderLeft: "4px solid var(--hjc-yellow)",
                paddingLeft: "24px",
              }}
            >
              <MonoLabel>What is not included</MonoLabel>
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "var(--step-body)",
                  lineHeight: 1.65,
                  color: "var(--fg2)",
                  margin: 0,
                }}
              >
                Free previews are offered selectively and are intended as concept
                demonstrations. They do not include full website build-out, hosting,
                custom integrations, booking systems, ecommerce, or migration work.
              </p>
            </div>
          </div>
        </section>

        <Rule />

        {/* ── How it works ───────────────────────────────────────────────── */}
        <section>
          <SectionHeading title="How it works" />
          <div
            style={{
              marginTop: "28px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {[
              { n: "01", step: "We review your current website" },
              { n: "02", step: "We create a free homepage refresh preview" },
              { n: "03", step: "We send you a private link" },
              {
                n: "04",
                step: "You review it and decide whether you like the direction",
              },
              {
                n: "05",
                step: "If you want to continue, we build out the rest of your site from $100 per page",
              },
            ].map(({ n, step }) => (
              <div
                key={n}
                style={{
                  border: "1px solid var(--rule)",
                  padding: "20px 22px",
                  background: "var(--surface)",
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)",
                    lineHeight: 1,
                    color: "var(--hjc-yellow)",
                    flexShrink: 0,
                    minWidth: "2.4rem",
                  }}
                >
                  {n}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "var(--step-body-lg)",
                    lineHeight: 1.45,
                    color: "var(--fg1)",
                  }}
                >
                  {step}
                </span>
              </div>
            ))}
          </div>
        </section>

        <Rule />

        {/* ── Build-out pricing ──────────────────────────────────────────── */}
        <section>
          <SectionHeading
            title="Simple build-out pricing"
            subtitle="If you like your free homepage preview, we can build out the rest of your website using the approved design direction."
          />

          {/* Price block */}
          <div
            style={{
              margin: "32px 0 28px",
              padding: "32px 28px",
              background: "var(--hjc-black)",
              color: "var(--hjc-warm-white)",
              display: "inline-block",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--hjc-yellow)",
                marginBottom: "8px",
              }}
            >
              Build-out rate
            </div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.2rem, 5vw, 3.6rem)",
                lineHeight: 1,
                color: "var(--hjc-warm-white)",
              }}
            >
              From $100 per page
            </div>
          </div>

          {/* Two column: page types + example packages */}
          <div
            className="grid grid-cols-2 gap-8 max-[880px]:grid-cols-1"
            style={{ marginTop: "8px" }}
          >
            <div
              style={{
                border: "1px solid var(--rule)",
                padding: "24px",
                background: "var(--surface)",
              }}
            >
              <MonoLabel>Example page types</MonoLabel>
              <ul
                style={{
                  margin: 0,
                  padding: 0,
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {[
                  "Home",
                  "Services",
                  "About",
                  "Contact",
                  "Booking / Enquiry",
                  "FAQ",
                  "Gallery",
                  "Testimonials",
                  "Location pages",
                ].map((page) => (
                  <li
                    key={page}
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "var(--step-body)",
                      color: "var(--fg2)",
                    }}
                  >
                    {page}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { label: "3-page site", price: "from $300" },
                { label: "5-page site", price: "from $500" },
                { label: "8-page site", price: "from $800" },
              ].map(({ label, price }) => (
                <div
                  key={label}
                  style={{
                    border: "1px solid var(--rule)",
                    padding: "20px 22px",
                    background: "var(--surface-inset)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    gap: "12px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "var(--step-body)",
                      color: "var(--fg2)",
                    }}
                  >
                    {label}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.3rem",
                      color: "var(--fg1)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {price}
                  </span>
                </div>
              ))}

              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  letterSpacing: "0.08em",
                  color: "var(--fg3)",
                  lineHeight: 1.65,
                  margin: "8px 0 0",
                }}
              >
                Final pricing depends on page complexity, content readiness,
                integrations, and launch requirements.
              </p>
            </div>
          </div>
        </section>

        <Rule />

        {/* ── Example preview ────────────────────────────────────────────── */}
        <section>
          <SectionHeading title="Example homepage refresh" />
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "var(--step-body-lg)",
              lineHeight: 1.55,
              color: "var(--fg2)",
              maxWidth: "620px",
              margin: "20px 0 28px",
            }}
          >
            Here is an example of a local business homepage refresh concept. The goal is
            to show how an existing website can be given a stronger first impression,
            clearer service positioning, and more direct customer calls to action.
          </p>

          {/* Screenshot placeholder */}
          <div
            style={{
              border: "1px solid var(--rule)",
              background: "var(--surface-inset)",
              aspectRatio: "16 / 9",
              maxWidth: "860px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                textAlign: "center",
                padding: "24px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1rem",
                  textTransform: "uppercase",
                  color: "var(--fg3)",
                  marginBottom: "8px",
                }}
              >
                [Insert screenshot of Kumeu Motors refresh preview]
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--fg3)",
                  lineHeight: 1.6,
                  maxWidth: "420px",
                }}
              >
                Concept preview only. Created as an example of how a local business
                website can be modernised before any changes are made to the live site.
              </div>
            </div>
          </div>

          {/* Before / after labels */}
          <div
            className="grid grid-cols-2 gap-5 max-[560px]:grid-cols-1"
            style={{ maxWidth: "860px", marginTop: "12px" }}
          >
            {["Existing website", "Refresh preview"].map((label) => (
              <div
                key={label}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--fg3)",
                  textAlign: "center",
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </section>

        <Rule />

        {/* ── What may cost extra ────────────────────────────────────────── */}
        <section>
          <SectionHeading title="What may cost extra?" />
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "var(--step-body)",
              lineHeight: 1.55,
              color: "var(--fg2)",
              margin: "20px 0 22px",
            }}
          >
            Some work may cost more depending on what is required.
          </p>
          <ul
            className="grid grid-cols-2 gap-x-6 gap-y-3 max-[560px]:grid-cols-1"
            style={{ margin: 0, padding: 0, listStyle: "none" }}
          >
            {[
              "Domain setup",
              "Hosting changes",
              "Website migration",
              "Copywriting from scratch",
              "Advanced contact forms",
              "Booking systems",
              "Ecommerce",
              "Custom integrations",
              "SEO campaigns",
              "Photography or video",
              "Complex layout or content requirements",
            ].map((item) => (
              <CheckItem key={item}>{item}</CheckItem>
            ))}
          </ul>
        </section>

        <Rule />

        {/* ── Final CTA ──────────────────────────────────────────────────── */}
        <section>
          <SectionHeading title="Want to see what your website could look like?" />
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "var(--step-body-lg)",
              lineHeight: 1.55,
              color: "var(--fg2)",
              maxWidth: "600px",
              margin: "20px 0 32px",
            }}
          >
            Send us your current website, or reply to the preview link we sent you. If it
            is a good fit, we can create a free homepage refresh concept and show you what
            is possible before you commit to a rebuild.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "14px" }}>
            <Link
              href="/contact?interest=free-preview"
              className="hjc-btn hjc-btn-yellow"
            >
              Request a Free Preview
            </Link>
            <a href="#received-preview" className="hjc-btn hjc-btn-ghost">
              I received a preview
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
