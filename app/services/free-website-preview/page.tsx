import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/section-heading";

const isProduction = process.env.VERCEL_ENV === "production";

export const metadata: Metadata = {
  title: "Free Website Refresh Preview for Local Businesses | Hero's Journey Creative",
  description:
    "Get a free interactive homepage refresh preview for your small business website. Fixed-price website refresh packages from $300, with SEO foundation and AI Search Readiness included.",
  alternates: { canonical: "/services/free-website-preview" },
  robots: isProduction ? undefined : { index: false, follow: false },
  openGraph: {
    title: "Free Website Refresh Preview for Local Businesses",
    description:
      "See what your website could look like before paying for a rebuild. Free homepage preview for selected local businesses. Fixed-price packages from $300.",
    url: "https://www.herosjourneycreative.co.nz/services/free-website-preview",
    siteName: "Hero's Journey Creative",
    locale: "en_NZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Website Refresh Preview for Local Businesses",
    description:
      "See what your website could look like before paying for a rebuild. Fixed-price packages from $300.",
  },
};

// ── types ──────────────────────────────────────────────────────────────────────

interface Plan {
  name: string;
  badge: string | null;
  price: string;
  priceNote: string;
  bestFor: string;
  includes: string[];
  examplePages: string | null;
  turnaround: string;
  cta: string;
  ctaHref: string;
  highlight: boolean;
  free: boolean;
}

// ── data ───────────────────────────────────────────────────────────────────────

const PLANS: Plan[] = [
  {
    name: "Free Preview",
    badge: "No obligation",
    price: "$0",
    priceNote: "Homepage concept",
    bestFor: "Seeing what your current website could become before paying for a rebuild.",
    includes: [
      "Private interactive homepage preview",
      "Refreshed visual direction",
      "Stronger homepage message",
      "Clearer call-to-action direction",
      "No changes to your live website",
      "No obligation",
    ],
    examplePages: null,
    turnaround: "Fast concept",
    cta: "Request a Free Preview",
    ctaHref: "/contact?interest=free-preview",
    highlight: false,
    free: true,
  },
  {
    name: "Starter",
    badge: null,
    price: "$300",
    priceNote: "3-page refresh",
    bestFor: "Simple businesses that need a clean, modern website.",
    includes: [
      "3 live pages",
      "Existing content refreshed",
      "Mobile-friendly layout",
      "SEO foundation",
      "AI Search Readiness",
      "Basic contact form",
      "Simple domain connection",
    ],
    examplePages: "Home, Services, Contact",
    turnaround: "3–5 days",
    cta: "Choose Starter",
    ctaHref: "/contact?interest=website-refresh&package=starter",
    highlight: false,
    free: false,
  },
  {
    name: "Local",
    badge: "Most popular",
    price: "$500",
    priceNote: "5-page refresh",
    bestFor: "Most local businesses that need a stronger online presence.",
    includes: [
      "5 live pages",
      "Everything in Starter",
      "About page structure",
      "Service page structure",
      "Gallery or testimonials option",
      "Google Business Profile alignment",
      "Basic analytics/search setup",
    ],
    examplePages: "Home, About, Services, Gallery or Testimonials, Contact",
    turnaround: "5–7 days",
    cta: "Choose Local",
    ctaHref: "/contact?interest=website-refresh&package=local",
    highlight: true,
    free: false,
  },
  {
    name: "Growth",
    badge: null,
    price: "$800",
    priceNote: "8-page refresh",
    bestFor: "Businesses with multiple services or stronger local search needs.",
    includes: [
      "8 live pages",
      "Everything in Local",
      "Expanded service structure",
      "More detailed service content",
      "More space for trust and proof",
      "Stronger local search structure",
      "Fuller AI Search Readiness",
    ],
    examplePages: "Home, About, Services, 3 service pages, Gallery or Testimonials, Contact",
    turnaround: "7–10 days",
    cta: "Choose Growth",
    ctaHref: "/contact?interest=website-refresh&package=growth",
    highlight: false,
    free: false,
  },
  {
    name: "Full",
    badge: null,
    price: "$1,200",
    priceNote: "12-page refresh",
    bestFor: "Larger local businesses, multi-service operators, or businesses needing a fuller website.",
    includes: [
      "12 live pages",
      "Everything in Growth",
      "Multiple service pages",
      "Optional location pages",
      "Expanded site structure",
      "Stronger content organisation",
      "Fuller SEO and AI Search Readiness",
    ],
    examplePages: null,
    turnaround: "10–15 days",
    cta: "Choose Full",
    ctaHref: "/contact?interest=website-refresh&package=full",
    highlight: false,
    free: false,
  },
];

const ADDONS = [
  { label: "Extra standard page", price: "$100" },
  { label: "Copywriting from scratch, per page", price: "$100" },
  { label: "Extra revision round", price: "$100" },
  { label: "Blog / news setup", price: "$150" },
  { label: "Gallery setup", price: "$150" },
  { label: "Booking link integration", price: "$150" },
  { label: "Advanced contact form", price: "$150" },
  { label: "Google Business Profile alignment", price: "$150" },
  { label: "Basic analytics + Search Console setup", price: "$150" },
  { label: "Domain access recovery support", price: "$150" },
  { label: "Website migration support", price: "$250" },
  { label: "Hosting setup", price: "$250" },
  { label: "Ecommerce setup", price: "from $500" },
  { label: "Booking system setup", price: "from $500" },
  { label: "Photography / video", price: "Quoted separately" },
  { label: "Complex custom functionality", price: "Quoted separately" },
];

const COMPARISON_ROWS: { feature: string; values: string[] }[] = [
  { feature: "Homepage preview",              values: ["✓", "✓", "✓", "✓", "✓"] },
  { feature: "Pages included",                values: ["1 (preview)", "3", "5", "8", "12"] },
  { feature: "Existing content refreshed",    values: ["Preview direction", "✓", "✓", "✓", "✓"] },
  { feature: "Mobile-friendly layout",        values: ["Preview direction", "✓", "✓", "✓", "✓"] },
  { feature: "SEO foundation",                values: ["—", "✓", "✓", "✓", "✓"] },
  { feature: "AI Search Readiness",           values: ["—", "✓", "✓", "✓", "✓"] },
  { feature: "Contact or booking CTA",        values: ["Direction only", "✓", "✓", "✓", "✓"] },
  { feature: "Basic contact form",            values: ["—", "✓", "✓", "✓", "✓"] },
  { feature: "Domain and hosting check",      values: ["—", "✓", "✓", "✓", "✓"] },
  { feature: "Simple domain connection",      values: ["—", "✓", "✓", "✓", "✓"] },
  { feature: "Google Business Profile",       values: ["—", "—", "✓", "✓", "✓"] },
  { feature: "Analytics / search setup",      values: ["—", "—", "✓", "✓", "✓"] },
  { feature: "Extra standard pages",          values: ["—", "+$100/page", "+$100/page", "+$100/page", "+$100/page"] },
  { feature: "Turnaround target",             values: ["Fast", "3–5 days", "5–7 days", "7–10 days", "10–15 days"] },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "Is the preview really free?",
    a: "Yes. The homepage preview is free and does not change your live website. It is a private concept link so you can see the direction before deciding whether to rebuild anything.",
  },
  {
    q: "What counts as a standard page?",
    a: "A standard page is one normal website page using the approved design direction. It includes refreshed existing content, mobile-friendly layout, clear headings, basic SEO structure, AI Search Readiness, and a clear customer call-to-action.",
  },
  {
    q: "Can I add more pages later?",
    a: "Yes. Extra standard pages can be added for $100 per page.",
  },
  {
    q: "What if I do not have access to my domain?",
    a: "That is common. If you have lost access to your domain, hosting, or website provider, we can help you work out what to request. Domain access recovery is available as a fixed-price add-on.",
  },
  {
    q: "Will my current website stay live?",
    a: "Yes. Your existing website stays live while the refresh is prepared. Nothing changes on your real domain until you approve the final version.",
  },
  {
    q: "Do you guarantee Google rankings or AI recommendations?",
    a: "No. We do not promise rankings or instant AI recommendations. We structure your website so it is clearer, cleaner, and easier for customers, search engines, and AI-powered tools to understand.",
  },
];

// ── structured data ────────────────────────────────────────────────────────────

const JSON_LD = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.herosjourneycreative.co.nz" },
      { "@type": "ListItem", "position": 2, "name": "Website Refresh", "item": "https://www.herosjourneycreative.co.nz/services/free-website-preview" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Hero’s Journey Creative",
    "url": "https://www.herosjourneycreative.co.nz",
    "email": "kauri@herosjourneycreative.co.nz",
    "areaServed": ["Auckland", "New Zealand"],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Free Website Refresh Preview",
    "description": "A free interactive homepage refresh preview for selected local businesses, followed by fixed-price website refresh packages with SEO foundation and AI Search Readiness.",
    "provider": {
      "@type": "Organization",
      "name": "Hero’s Journey Creative",
      "url": "https://www.herosjourneycreative.co.nz",
    },
    "areaServed": ["Auckland", "New Zealand"],
    "serviceType": "Website refresh, small business web design, SEO, AI Search Readiness",
    "offers": {
      "@type": "OfferCatalog",
      "name": "Website Refresh Packages",
      "itemListElement": [
        { "@type": "Offer", "name": "Free Preview", "price": "0", "priceCurrency": "NZD", "description": "Homepage concept preview. No obligation." },
        { "@type": "Offer", "name": "Starter Refresh", "price": "300", "priceCurrency": "NZD", "description": "3-page website refresh with SEO foundation and AI Search Readiness." },
        { "@type": "Offer", "name": "Local Business Refresh", "price": "500", "priceCurrency": "NZD", "description": "5-page website refresh for most local businesses." },
        { "@type": "Offer", "name": "Growth Refresh", "price": "800", "priceCurrency": "NZD", "description": "8-page website refresh for businesses with multiple services." },
        { "@type": "Offer", "name": "Full Refresh", "price": "1200", "priceCurrency": "NZD", "description": "12-page website refresh for larger local businesses." },
      ],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.map(({ q, a }) => ({
      "@type": "Question",
      "name": q,
      "acceptedAnswer": { "@type": "Answer", "text": a },
    })),
  },
];

// ── helpers ────────────────────────────────────────────────────────────────────

function Rule() {
  return (
    <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "64px 0" }} />
  );
}

function MonoLabel({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <div
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "10px",
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: color ?? "var(--fg3)",
        marginBottom: "12px",
      }}
    >
      {children}
    </div>
  );
}

function Check({ dark }: { dark?: boolean }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      style={{ flexShrink: 0, marginTop: "2px" }}
      aria-hidden="true"
    >
      <circle cx="7.5" cy="7.5" r="7.5" fill={dark ? "var(--hjc-black)" : "var(--hjc-yellow)"} />
      <path
        d="M4 7.5L6.2 10L11 5"
        stroke={dark ? "var(--hjc-yellow)" : "var(--hjc-black)"}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}


function PricingCard({ plan }: { plan: Plan }) {
  return (
    <div
      className={`wrf-plan-card${plan.highlight ? " wrf-plan-card--popular" : ""}`}
      style={{
        borderRadius: "8px",
        background: "var(--hjc-warm-white)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        flex: "1",
        minWidth: "210px",
        position: "relative",
      }}
    >
      {/* Top accent */}
      <div
        style={{
          height: "4px",
          background: plan.highlight ? "var(--hjc-yellow)" : plan.free ? "var(--hjc-charcoal)" : "var(--rule)",
        }}
      />

      <div style={{ padding: "20px 18px 24px", flex: 1, display: "flex", flexDirection: "column", gap: "14px" }}>
        {/* Badge */}
        {plan.badge && (
          <div
            style={{
              display: "inline-flex",
              alignSelf: "flex-start",
              background: plan.highlight ? "var(--hjc-yellow)" : "var(--hjc-paper-200)",
              color: "var(--hjc-black)",
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              padding: "4px 10px",
              borderRadius: "3px",
              border: "1px solid var(--rule)",
            }}
          >
            {plan.badge}
          </div>
        )}

        {/* Name + best for */}
        <div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.15rem",
              textTransform: "uppercase",
              color: "var(--fg1)",
              lineHeight: 1,
              marginBottom: "7px",
            }}
          >
            {plan.name}
          </div>
          <div
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "0.875rem",
              fontStyle: "italic",
              color: "var(--fg3)",
              lineHeight: 1.4,
            }}
          >
            {plan.bestFor}
          </div>
        </div>

        {/* Price */}
        <div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.9rem, 3vw, 2.5rem)",
              lineHeight: 1,
              color: "var(--fg1)",
            }}
          >
            {plan.price}
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--fg3)",
              marginTop: "4px",
            }}
          >
            {plan.priceNote}
          </div>
        </div>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "0" }} />

        {/* Includes */}
        <ul
          style={{
            margin: 0,
            padding: 0,
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            gap: "7px",
            flex: 1,
          }}
        >
          {plan.includes.map((item) => (
            <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
              <Check />
              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "0.85rem",
                  lineHeight: 1.45,
                  color: "var(--fg2)",
                }}
              >
                {item}
              </span>
            </li>
          ))}
        </ul>

        {/* Example pages */}
        {plan.examplePages && (
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--fg3)",
              lineHeight: 1.65,
              borderTop: "1px solid var(--rule)",
              paddingTop: "12px",
            }}
          >
            e.g. {plan.examplePages}
          </div>
        )}

        {/* Turnaround */}
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "9px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--fg3)",
          }}
        >
          {plan.turnaround}
        </div>

        {/* CTA */}
        <Link
          href={plan.ctaHref}
          className={`hjc-btn ${plan.highlight || plan.free ? "hjc-btn-yellow" : "hjc-btn-ghost"}`}
          style={{
            justifyContent: "center",
            fontSize: "11px",
            padding: "11px 14px",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {plan.cta}
        </Link>
      </div>
    </div>
  );
}

// ── page ───────────────────────────────────────────────────────────────────────

export default function FreeWebsitePreviewPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <div className="hjc-fade flex-1" style={{ background: "var(--bg)" }}>

      {/* ── 1. Hero ──────────────────────────────────────────────────────────── */}
      <section style={{ padding: "72px 0 68px", background: "var(--hjc-black)" }}>
        <div className="max-w-[1200px] mx-auto px-8 max-[880px]:px-5">
          <span className="hjc-kick hjc-kick-ink block mb-5">Website Refresh Preview</span>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              textTransform: "uppercase",
              fontSize: "var(--step-display)",
              lineHeight: 0.94,
              color: "var(--hjc-warm-white)",
              margin: "0 0 18px",
              maxWidth: "860px",
            }}
          >
            Free Website Refresh Preview for Local Businesses
          </h1>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: "var(--step-body-lg)",
              lineHeight: 1.5,
              color: "var(--fg-on-ink-2)",
              maxWidth: "640px",
              margin: "0 0 16px",
            }}
          >
            See what your website could look like before paying for a rebuild.
          </p>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "var(--step-body)",
              lineHeight: 1.6,
              color: "var(--fg-on-ink-2)",
              maxWidth: "640px",
              margin: "0 0 16px",
            }}
          >
            Hero&apos;s Journey Creative creates free interactive homepage refresh previews
            for selected local businesses.
          </p>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "var(--step-body)",
              lineHeight: 1.6,
              color: "var(--fg-on-ink-2)",
              maxWidth: "600px",
              margin: "0 0 14px",
            }}
          >
            We take an existing website and show how it could look with stronger design,
            clearer messaging, better calls to action, and cleaner structure for Google and
            AI-powered search tools.
          </p>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "var(--step-body)",
              lineHeight: 1.6,
              color: "var(--fg-on-ink-2)",
              maxWidth: "600px",
              margin: "0 0 14px",
            }}
          >
            Nothing changes on your live website. No obligation. Just a private preview
            link you can click through and review.
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
            If you like the direction, we can build out the rest of your website with
            simple fixed-price packages starting from $300.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "14px" }}>
            <Link href="/contact?interest=free-preview" className="hjc-btn hjc-btn-yellow">
              Request a Free Preview
            </Link>
            <Link href="/contact?interest=preview-followup" className="hjc-btn hjc-btn-ghost-ink">
              I Received a Preview
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2. Received a preview ────────────────────────────────────────────── */}
      <div className="max-w-[1200px] mx-auto px-8 max-[880px]:px-5" style={{ paddingTop: "68px" }}>
        <section id="received-preview">
          <SectionHeading
            title="Received a preview from us?"
            subtitle="Your live website has not been touched."
          />
          <div
            className="grid grid-cols-[1fr_auto] gap-12 max-[880px]:grid-cols-1 max-[880px]:gap-8"
            style={{ marginTop: "28px", alignItems: "start" }}
          >
            <div>
              <p style={{ fontFamily: "var(--font-serif)", fontSize: "var(--step-body-lg)", lineHeight: 1.6, color: "var(--fg2)", margin: "0 0 16px" }}>
                If we sent you a preview link, it is a private concept version of your homepage.
              </p>
              <p style={{ fontFamily: "var(--font-serif)", fontSize: "var(--step-body)", lineHeight: 1.6, color: "var(--fg2)", margin: "0 0 14px" }}>
                It is not published on your real website. It does not replace your current site.
                It is simply a safe way to see what your business could look like online before
                deciding whether to rebuild anything.
              </p>
              <p style={{ fontFamily: "var(--font-serif)", fontSize: "var(--step-body)", lineHeight: 1.6, color: "var(--fg2)", margin: "0 0 28px" }}>
                You can review the preview, share it with your team, ask for changes, or ignore
                it. There is no obligation.
              </p>
              <Link href="/contact?interest=preview-followup" className="hjc-btn hjc-btn-yellow">
                Talk to us about my preview
              </Link>
            </div>
            <div
              style={{
                border: "1px solid var(--rule)",
                padding: "24px",
                background: "var(--surface-inset)",
                minWidth: "240px",
              }}
              className="max-[880px]:min-w-0 max-[880px]:w-full"
            >
              <MonoLabel>Good to know</MonoLabel>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
                {[
                  "Your live website is untouched",
                  "No contract or commitment required",
                  "You can request changes to the concept",
                  "The preview link is private",
                ].map((item) => (
                  <li key={item} style={{ fontFamily: "var(--font-serif)", fontSize: "0.95rem", lineHeight: 1.5, color: "var(--fg2)" }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <Rule />

        {/* ── 3. Before / after ──────────────────────────────────────────────── */}
        <section>
          <SectionHeading
            title="Example homepage refresh"
            subtitle="Before and after: a stronger first impression"
          />
          <p style={{ fontFamily: "var(--font-serif)", fontSize: "var(--step-body-lg)", lineHeight: 1.55, color: "var(--fg2)", maxWidth: "640px", margin: "20px 0 28px" }}>
            An older business website often has useful information, but the design, layout,
            message, and calls to action can feel dated. A website refresh keeps the important
            business information and presents it with a clearer structure, stronger visual
            identity, better service positioning, and more direct customer action.
          </p>
          <div className="grid grid-cols-2 gap-5 max-[640px]:grid-cols-1" style={{ marginBottom: "12px" }}>
            {[
              { src: "/website-refresh/Before_Website_Example.png", label: "Before: existing website", alt: "Before screenshot of an older local business website homepage before a website refresh" },
              { src: "/website-refresh/After_Website_Example.png", label: "After: free homepage refresh preview", alt: "After screenshot of a modern website refresh preview for a local business homepage" },
            ].map(({ src, label, alt }) => (
              <div key={label}>
                <div
                  style={{
                    border: "1px solid var(--rule)",
                    overflow: "hidden",
                    aspectRatio: "16 / 10",
                    background: "var(--surface-inset)",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={alt}
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                  />
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "9px",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--fg3)",
                    marginTop: "8px",
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--fg3)", lineHeight: 1.7, maxWidth: "560px" }}>
            Concept preview only. Created as an example of how a local business website can
            be modernised before any changes are made to the live site.
          </p>
        </section>
      </div>

      {/* ── 4. More than a visual refresh ──────────────────────────────────────── */}
      <section style={{ background: "var(--hjc-black)", padding: "72px 0", marginTop: "64px" }}>
        <div className="max-w-[1200px] mx-auto px-8 max-[880px]:px-5">
          <span className="hjc-kick hjc-kick-ink block mb-5">What we actually do</span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              textTransform: "uppercase",
              fontSize: "var(--step-h1)",
              lineHeight: 1,
              color: "var(--hjc-warm-white)",
              margin: "0 0 8px",
              maxWidth: "700px",
            }}
          >
            More than a visual refresh
          </h2>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: "var(--step-body-lg)",
              color: "var(--fg-on-ink-2)",
              margin: "0 0 28px",
            }}
          >
            Designed for people. Structured for search. Ready for AI.
          </p>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "var(--step-body)",
              lineHeight: 1.6,
              color: "var(--fg-on-ink-2)",
              maxWidth: "600px",
              margin: "0 0 14px",
            }}
          >
            A dated website does more than look old. It can make your business harder to
            trust, harder to contact, and harder to understand.
          </p>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "var(--step-body)",
              lineHeight: 1.6,
              color: "var(--fg-on-ink-2)",
              maxWidth: "600px",
              margin: "0 0 32px",
            }}
          >
            We refresh your site so the first impression is stronger, but we also improve
            the structure behind the page.
          </p>
          <ul
            className="grid grid-cols-2 gap-x-8 gap-y-3 max-[640px]:grid-cols-1"
            style={{ margin: 0, padding: 0, listStyle: "none", maxWidth: "640px" }}
          >
            {[
              "Clearer homepage message",
              "Stronger service descriptions",
              "Better local business positioning",
              "Cleaner page structure",
              "Improved mobile layout",
              "Contact and booking actions",
              "Search-friendly headings",
              "AI-readable business information",
            ].map((item) => (
              <li key={item} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Check dark />
                <span style={{ fontFamily: "var(--font-serif)", fontSize: "var(--step-body)", color: "var(--fg-on-ink-2)" }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-8 max-[880px]:px-5" style={{ paddingTop: "68px" }}>

        {/* ── 5. SEO + AI Search Readiness ─────────────────────────────────────── */}
        <section>
          <SectionHeading
            title="SEO + AI Search Readiness"
            subtitle="Help customers, Google, and AI tools understand your business."
          />
          <div
            className="grid grid-cols-[1fr_1fr] gap-10 max-[880px]:grid-cols-1"
            style={{ marginTop: "28px" }}
          >
            <div>
              <p style={{ fontFamily: "var(--font-serif)", fontSize: "var(--step-body)", lineHeight: 1.65, color: "var(--fg2)", margin: "0 0 14px" }}>
                Search is changing. Customers still use Google, but they are also asking AI
                tools for recommendations, summaries, comparisons, and local options.
              </p>
              <p style={{ fontFamily: "var(--font-serif)", fontSize: "var(--step-body)", lineHeight: 1.65, color: "var(--fg2)", margin: "0 0 14px" }}>
                That means your website needs to clearly explain who you are, what you do,
                where you operate, who you help, what services you offer, why customers should
                trust you, and how customers can contact or book with you.
              </p>
              <p style={{ fontFamily: "var(--font-serif)", fontSize: "var(--step-body)", lineHeight: 1.65, color: "var(--fg2)", margin: "0 0 14px" }}>
                We do not promise rankings or instant AI recommendations. We help make your
                website clearer, cleaner, and easier to understand.
              </p>
              <p style={{ fontFamily: "var(--font-serif)", fontSize: "var(--step-body)", lineHeight: 1.65, color: "var(--fg2)", margin: 0 }}>
                AI Search Readiness is sometimes called Generative Engine Optimisation, or GEO.
                For us, it means making your website clearer, better structured, and easier for
                search engines and AI-powered tools to understand.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                {
                  label: "SEO foundation",
                  body: "Helps traditional search engines understand and present your website.",
                },
                {
                  label: "AI Search Readiness",
                  body: "Sometimes called GEO (Generative Engine Optimisation). Structures your content so AI-powered tools can more easily understand and summarise your business.",
                },
              ].map(({ label, body }) => (
                <div
                  key={label}
                  style={{
                    border: "1px solid var(--rule)",
                    padding: "22px 20px",
                    background: "var(--surface-inset)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1rem",
                      textTransform: "uppercase",
                      color: "var(--fg1)",
                      marginBottom: "8px",
                    }}
                  >
                    {label}
                  </div>
                  <p style={{ fontFamily: "var(--font-serif)", fontSize: "var(--step-body)", lineHeight: 1.55, color: "var(--fg2)", margin: 0 }}>
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Rule />

        {/* ── 6. How it works ──────────────────────────────────────────────────── */}
        <section>
          <SectionHeading
            title="How the website refresh process works"
            subtitle="Your current website stays live while the refresh is prepared. Nothing changes on your real domain until you approve it."
          />
          <div style={{ marginTop: "28px", display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              "We review your current website",
              "We create a free homepage preview",
              "You receive a private link",
              "You review the direction",
              "If you like it, we confirm the package and build the refreshed site",
            ].map((step, i) => (
              <div
                key={step}
                style={{
                  border: "1px solid var(--rule)",
                  padding: "18px 22px",
                  background: "var(--surface)",
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)",
                    lineHeight: 1,
                    color: "var(--hjc-yellow)",
                    flexShrink: 0,
                    minWidth: "2.2rem",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span style={{ fontFamily: "var(--font-serif)", fontSize: "var(--step-body-lg)", lineHeight: 1.45, color: "var(--fg1)" }}>
                  {step}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── 7. Pricing cards ─────────────────────────────────────────────────── */}
      <section
        style={{
          background: "var(--hjc-paper-200)",
          borderTop: "1px solid var(--rule)",
          borderBottom: "1px solid var(--rule)",
          padding: "72px 0",
          marginTop: "64px",
        }}
      >
        <div className="max-w-[1200px] mx-auto px-8 max-[880px]:px-5">
          <span className="hjc-kick block mb-5">Pricing</span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              textTransform: "uppercase",
              fontSize: "var(--step-h1)",
              lineHeight: 1,
              color: "var(--fg1)",
              margin: "0 0 20px",
            }}
          >
            Choose your website refresh package
          </h2>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: "var(--step-body-lg)", lineHeight: 1.55, color: "var(--fg2)", maxWidth: "680px", margin: "0 0 10px" }}>
            Start with a free homepage preview. If you like the direction, choose the
            fixed-price refresh package that fits the size of your business website.
          </p>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: "var(--step-body)", lineHeight: 1.6, color: "var(--fg2)", maxWidth: "680px", margin: "0 0 10px" }}>
            Every paid package includes refreshed existing content, mobile-friendly layout,
            SEO foundation, AI Search Readiness, contact or booking calls to action, and a
            simple domain connection where access is straightforward.
          </p>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--fg3)",
              margin: "0 0 40px",
            }}
          >
            No surprise hourly billing. No changes to your live website until you approve the final version.
          </p>

          {/* Cards — horizontal scroll on narrow screens; extra vertical padding for lift+shadow */}
          <div style={{ overflowX: "auto", padding: "12px 0 24px", margin: "0 -8px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, minmax(210px, 1fr))",
                gap: "16px",
                padding: "0 8px",
                minWidth: "700px",
              }}
            >
              {PLANS.map((plan) => (
                <PricingCard key={plan.name} plan={plan} />
              ))}
            </div>
          </div>

          {/* Under-card note */}
          <div
            style={{
              marginTop: "28px",
              padding: "22px 24px",
              border: "1px solid var(--rule)",
              background: "var(--hjc-warm-white)",
              borderRadius: "4px",
            }}
          >
            <p style={{ fontFamily: "var(--font-serif)", fontSize: "var(--step-body)", lineHeight: 1.6, color: "var(--fg2)", margin: "0 0 10px" }}>
              <strong>Extra standard pages</strong> can be added to any paid package for $100 per page.
            </p>
            <p style={{ fontFamily: "var(--font-serif)", fontSize: "var(--step-body)", lineHeight: 1.6, color: "var(--fg2)", margin: "0 0 12px" }}>
              A standard page means one normal website page using the approved design direction.
              It includes layout, mobile-friendly structure, refreshed existing content, clear
              headings, basic SEO structure, AI Search Readiness, and a clear customer call-to-action.
            </p>
            <div
              className="flex flex-wrap gap-x-5 gap-y-1"
              style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fg3)" }}
            >
              {["Home", "About", "Services", "Individual service page", "Contact", "FAQ", "Gallery", "Testimonials", "Location page"].map((p) => (
                <span key={p}>{p}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-8 max-[880px]:px-5" style={{ paddingTop: "68px" }}>

        {/* ── 8. Comparison table ──────────────────────────────────────────────── */}
        <section>
          <SectionHeading title="What's included?" />
          <div style={{ overflowX: "auto", marginTop: "28px" }}>
            <table
              style={{
                width: "100%",
                minWidth: "620px",
                borderCollapse: "collapse",
                fontFamily: "var(--font-serif)",
                fontSize: "0.875rem",
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "10px 14px",
                      background: "var(--surface-inset)",
                      border: "1px solid var(--rule)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "9px",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--fg3)",
                      fontWeight: 400,
                    }}
                  >
                    Feature
                  </th>
                  {PLANS.map((p) => (
                    <th
                      key={p.name}
                      style={{
                        textAlign: "center",
                        padding: "10px 10px",
                        background: p.highlight ? "var(--hjc-yellow)" : "var(--surface-inset)",
                        border: "1px solid var(--rule)",
                        fontFamily: "var(--font-mono)",
                        fontSize: "9px",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: p.highlight ? "var(--hjc-black)" : "var(--fg3)",
                        fontWeight: p.highlight ? 700 : 400,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, ri) => (
                  <tr key={row.feature}>
                    <td
                      style={{
                        padding: "9px 14px",
                        border: "1px solid var(--rule)",
                        color: "var(--fg2)",
                        background: ri % 2 === 0 ? "var(--hjc-warm-white)" : "var(--surface-inset)",
                      }}
                    >
                      {row.feature}
                    </td>
                    {row.values.map((val, vi) => (
                      <td
                        key={vi}
                        style={{
                          padding: "9px 10px",
                          border: "1px solid var(--rule)",
                          textAlign: "center",
                          color: val === "—" ? "var(--fg3)" : "var(--fg1)",
                          fontFamily: val === "✓" ? "inherit" : "var(--font-mono)",
                          fontSize: val === "✓" ? "1rem" : "0.8rem",
                          letterSpacing: val === "✓" ? 0 : "0.04em",
                          background: PLANS[vi].highlight
                            ? ri % 2 === 0 ? "#fffef7" : "#fffbea"
                            : ri % 2 === 0 ? "var(--hjc-warm-white)" : "var(--surface-inset)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <Rule />

        {/* ── 9. Fixed-price add-ons ───────────────────────────────────────────── */}
        <section>
          <SectionHeading
            title="Fixed-price website refresh add-ons"
            subtitle="Clear prices before work starts."
          />
          <p style={{ fontFamily: "var(--font-serif)", fontSize: "var(--step-body)", lineHeight: 1.65, color: "var(--fg2)", maxWidth: "580px", margin: "20px 0 28px" }}>
            Most small business refreshes fit inside one of the packages above. If your site
            needs something extra, we price it clearly before work starts. No surprise hourly
            billing. No hidden agency process. No changes to your live site until you approve
            the work.
          </p>
          <div
            className="grid grid-cols-2 gap-px max-[560px]:grid-cols-1"
            style={{ background: "var(--rule)", border: "1px solid var(--rule)" }}
          >
            {ADDONS.map(({ label, price }) => (
              <div
                key={label}
                style={{
                  background: "var(--hjc-warm-white)",
                  padding: "14px 18px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  gap: "12px",
                }}
              >
                <span style={{ fontFamily: "var(--font-serif)", fontSize: "var(--step-body)", color: "var(--fg2)" }}>
                  {label}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--fg1)",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                >
                  {price}
                </span>
              </div>
            ))}
          </div>
        </section>

        <Rule />

        {/* ── 10 + 11. Domain sections ─────────────────────────────────────────── */}
        <section>
          <div
            className="grid grid-cols-2 gap-8 max-[880px]:grid-cols-1"
            style={{ alignItems: "start" }}
          >
            <div>
              <SectionHeading
                title="Simple domain connection included"
                subtitle="Included where access is straightforward."
              />
              <p style={{ fontFamily: "var(--font-serif)", fontSize: "var(--step-body)", lineHeight: 1.65, color: "var(--fg2)", margin: "20px 0 14px" }}>
                A simple domain connection is included in our paid refresh packages where the
                business has access to its domain account and no complex migration is required.
              </p>
              <p style={{ fontFamily: "var(--font-serif)", fontSize: "var(--step-body)", lineHeight: 1.65, color: "var(--fg2)", margin: 0 }}>
                This usually means the domain account can be accessed, the domain is active,
                email is already working, and we only need to connect the refreshed website
                to the domain.
              </p>
            </div>
            <div
              style={{
                borderLeft: "4px solid var(--hjc-yellow)",
                paddingLeft: "28px",
              }}
            >
              <SectionHeading title="Lost access to your website or domain?" />
              <p style={{ fontFamily: "var(--font-serif)", fontSize: "var(--step-body)", lineHeight: 1.65, color: "var(--fg2)", margin: "20px 0 14px" }}>
                That is common for small businesses. Sometimes a previous web designer, IT
                provider, hosting company, or staff member managed the domain and website, and
                the business owner no longer has the login details.
              </p>
              <p style={{ fontFamily: "var(--font-serif)", fontSize: "var(--step-body)", lineHeight: 1.65, color: "var(--fg2)", margin: "0 0 14px" }}>
                We can help you work out what to request — domain access, DNS records, hosting
                access, website admin access, or a domain transfer code.
              </p>
              <p style={{ fontFamily: "var(--font-serif)", fontSize: "var(--step-body)", lineHeight: 1.65, color: "var(--fg2)", margin: "0 0 20px" }}>
                Domain access recovery is available as a fixed-price add-on. If the setup is
                complex, we confirm the cost before doing the work.
              </p>
              <Link href="/contact?interest=website-refresh" className="hjc-btn hjc-btn-ghost" style={{ display: "inline-flex" }}>
                Ask about domain recovery
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* ── 12. FAQ ──────────────────────────────────────────────────────────── */}
      <section
        style={{
          background: "var(--surface-inset)",
          borderTop: "1px solid var(--rule)",
          padding: "72px 0",
          marginTop: "64px",
        }}
      >
        <div className="max-w-[1200px] mx-auto px-8 max-[880px]:px-5">
          <SectionHeading title="Website refresh FAQs" />
          <div
            style={{
              marginTop: "32px",
              maxWidth: "760px",
              borderTop: "1px solid var(--rule)",
            }}
          >
            {FAQS.map(({ q, a }) => (
              <details
                key={q}
                style={{ borderBottom: "1px solid var(--rule)" }}
              >
                <summary
                  style={{
                    cursor: "pointer",
                    padding: "20px 0",
                    fontFamily: "var(--font-serif)",
                    fontSize: "var(--step-body-lg)",
                    color: "var(--fg1)",
                    listStyle: "none",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "16px",
                    userSelect: "none",
                  }}
                >
                  {q}
                  <span
                    aria-hidden="true"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "16px",
                      flexShrink: 0,
                      color: "var(--fg3)",
                    }}
                  >
                    +
                  </span>
                </summary>
                <div
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "var(--step-body)",
                    lineHeight: 1.65,
                    color: "var(--fg2)",
                    paddingBottom: "20px",
                  }}
                >
                  {a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── 13. Final CTA ────────────────────────────────────────────────────── */}
      <section
        style={{
          background: "var(--hjc-yellow)",
          borderTop: "2px solid var(--hjc-black)",
          borderBottom: "2px solid var(--hjc-black)",
          padding: "74px 0",
          textAlign: "center",
        }}
      >
        <div className="max-w-[1200px] mx-auto px-8 max-[880px]:px-5">
          <h2
            style={{
              fontFamily: "var(--font-display)",
              textTransform: "uppercase",
              fontSize: "var(--step-display)",
              lineHeight: 0.96,
              color: "var(--hjc-black)",
              margin: "0 0 16px",
            }}
          >
            Want to see what your website could look like?
          </h2>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: "1.15rem",
              color: "#3a2c00",
              maxWidth: "560px",
              margin: "0 auto 10px",
              lineHeight: 1.55,
            }}
          >
            Send us your current website, or reply to the preview link we sent you.
          </p>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "var(--step-body)",
              color: "#3a2c00",
              maxWidth: "540px",
              margin: "0 auto 32px",
              lineHeight: 1.55,
            }}
          >
            We can create a free homepage refresh concept so you can see the direction
            before choosing a fixed-price refresh package.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "14px" }}>
            <Link href="/contact?interest=free-preview" className="hjc-btn hjc-btn-dark">
              Request a Free Preview
            </Link>
            <Link href="/contact?interest=preview-followup" className="hjc-btn hjc-btn-ghost">
              I Received a Preview
            </Link>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
