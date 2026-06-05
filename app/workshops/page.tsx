import Link from "next/link";
import SectionHeading from "@/components/section-heading";
import {
  WORKSHOPS_MEETUP_URL,
  WORKSHOP_PATHWAY_CARDS,
  WORKSHOP_PRICING,
  SPRINT_FORMAT_ROWS,
  PRIVATE_AUDIENCE_GROUPS,
  WHAT_TO_BRING,
} from "@/lib/site-content";

// ─── local helpers ────────────────────────────────────────────────────────────

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

function Rule() {
  return (
    <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "60px 0" }} />
  );
}

// ─── page ─────────────────────────────────────────────────────────────────────

export default function WorkshopsPage() {
  return (
    <div className="hjc-fade flex-1" style={{ background: "var(--bg)" }}>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section style={{ padding: "72px 0 68px", background: "var(--hjc-black)" }}>
        <div className="max-w-[1200px] mx-auto px-8 max-[880px]:px-5">
          <span className="hjc-kick hjc-kick-ink block mb-5">
            Creative &amp; Legacy Writing Workshops
          </span>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              textTransform: "uppercase",
              fontSize: "var(--step-display)",
              lineHeight: 0.94,
              color: "var(--hjc-warm-white)",
              margin: "0 0 22px",
              maxWidth: "820px",
            }}
          >
            Guided writing sprints for people with a story worth telling.
          </h1>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: "var(--step-body-lg)",
              lineHeight: 1.5,
              color: "var(--fg-on-ink-2)",
              maxWidth: "660px",
              margin: "0 0 38px",
            }}
          >
            Public sprint-workshops run monthly in Auckland and on Zoom via Meetup — open
            to anyone. Private workshops are available for teams, schools, community groups,
            marae, care settings, and writing groups across Aotearoa.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "14px" }}>
            <a
              href={WORKSHOPS_MEETUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hjc-btn hjc-btn-yellow"
            >
              Join a Public Workshop
            </a>
            <Link
              href="/contact?interest=private-workshop"
              className="hjc-btn hjc-btn-ghost-ink"
            >
              Book a Private Workshop
            </Link>
          </div>
        </div>
      </section>

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <div className="max-w-[1200px] mx-auto px-8 max-[880px]:px-5" style={{ paddingTop: "68px", paddingBottom: "88px" }}>

        {/* Pathway cards */}
        <SectionHeading
          title="Choose Your Path"
          subtitle="Public sessions are open-enrolment via Meetup. Private bookings are arranged directly with the studio."
        />
        <div
          className="grid grid-cols-3 gap-5 max-[880px]:grid-cols-1"
          style={{ marginTop: "36px" }}
        >
          {WORKSHOP_PATHWAY_CARDS.map((card) => (
            <div
              key={card.label}
              style={{
                border: "1px solid var(--rule)",
                padding: "28px 26px 24px",
                background: "var(--surface)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <MonoLabel>{card.label}</MonoLabel>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  textTransform: "uppercase",
                  fontSize: "1.25rem",
                  lineHeight: 1.05,
                  color: "var(--fg1)",
                  margin: "0 0 12px",
                }}
              >
                {card.heading}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "var(--step-body)",
                  lineHeight: 1.6,
                  color: "var(--fg2)",
                  margin: "0 0 24px",
                  flex: 1,
                }}
              >
                {card.body}
              </p>
              {card.external ? (
                <a
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hjc-lnk"
                  style={{ alignSelf: "flex-start" }}
                >
                  {card.cta} <span aria-hidden="true">→</span>
                </a>
              ) : (
                <Link
                  href={card.href}
                  className="hjc-lnk"
                  style={{ alignSelf: "flex-start" }}
                >
                  {card.cta} <span aria-hidden="true">→</span>
                </Link>
              )}
            </div>
          ))}
        </div>

        <Rule />

        {/* Pricing */}
        <SectionHeading
          title="Private Workshop Pricing"
          subtitle="All prices are GST exclusive. Custom quotes available for larger or specialist engagements."
        />
        <div
          className="grid grid-cols-2 gap-5 max-[880px]:grid-cols-1"
          style={{ marginTop: "36px" }}
        >
          {WORKSHOP_PRICING.map((tier) => (
            <div
              key={tier.title}
              style={{
                background: "var(--surface-inset)",
                border: "1px solid var(--rule)",
                padding: "28px 26px",
              }}
            >
              <MonoLabel>{tier.title}</MonoLabel>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                  lineHeight: 1,
                  color: "var(--fg1)",
                  marginBottom: "10px",
                }}
              >
                {tier.price}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--fg3)",
                }}
              >
                {tier.detail}
              </div>
            </div>
          ))}
        </div>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            letterSpacing: "0.08em",
            color: "var(--fg3)",
            marginTop: "16px",
            lineHeight: 1.6,
          }}
        >
          Custom programmes, travel, larger groups, specialist preparation, and sessions
          longer than two hours can be quoted separately.
        </p>

        <Rule />

        {/* Sprint format */}
        <SectionHeading
          title="The Sprint Format"
          subtitle="A typical two-hour session — structured, timed, and deliberately simple."
        />

        <div
          style={{ marginTop: "28px", display: "flex", flexDirection: "column", gap: "10px" }}
        >
          {SPRINT_FORMAT_ROWS.map((row) => (
            <div
              key={row.session}
              style={{
                border: "1px solid var(--rule)",
                padding: "18px 20px",
                background: "var(--surface)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: "8px",
                  flexWrap: "wrap",
                  gap: "8px",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1rem",
                    textTransform: "uppercase",
                    color: "var(--fg1)",
                  }}
                >
                  {row.session}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "9px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--fg3)",
                  }}
                >
                  {row.focus}
                </span>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "var(--step-body)",
                  lineHeight: 1.6,
                  color: "var(--fg2)",
                  margin: 0,
                }}
              >
                {row.whatWeDo}
              </p>
            </div>
          ))}
        </div>

        <Rule />

        {/* Private audience section */}
        <SectionHeading
          title="Who We Work With"
          subtitle="Private workshops are designed around the group — its purpose, pace, and people."
        />
        <div
          className="grid grid-cols-[1fr_auto] gap-12 max-[880px]:grid-cols-1 max-[880px]:gap-8"
          style={{ alignItems: "start", marginTop: "28px" }}
        >
          <div>
            <ul
              className="grid grid-cols-2 gap-x-6 gap-y-3 max-[560px]:grid-cols-1"
              style={{ margin: 0, padding: 0, listStyle: "none" }}
            >
              {PRIVATE_AUDIENCE_GROUPS.map((group) => (
                <li
                  key={group}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontFamily: "var(--font-serif)",
                    fontSize: "var(--step-body)",
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
                    }}
                  />
                  {group}
                </li>
              ))}
            </ul>
          </div>

          {/* What to bring */}

          <div
            style={{
              border: "1px solid var(--rule)",
              padding: "26px 24px",
              background: "var(--surface-inset)",
              minWidth: "280px",
            }}
            className="max-[880px]:min-w-0 max-[880px]:w-full"
          >
            <MonoLabel>What to bring</MonoLabel>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              {WHAT_TO_BRING.map((item) => (
                <li
                  key={item}
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "var(--step-body)",
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

        <Rule />

        {/* Facilitator note */}
        <div
          style={{
            borderLeft: "4px solid var(--hjc-yellow)",
            paddingLeft: "28px",
            maxWidth: "680px",
          }}
        >
          <MonoLabel>The Facilitator</MonoLabel>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "var(--step-body-lg)",
              fontStyle: "italic",
              lineHeight: 1.55,
              color: "var(--fg2)",
              margin: "0 0 16px",
            }}
          >
            Kauri has 15+ years of storytelling experience across television, film, creative
            development, and public-sector programme work — and is currently completing an
            action-fantasy novel set in classical Polynesia.
          </p>
          <a
            href="mailto:kauri@herosjourneycreative.co.nz"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              letterSpacing: "0.1em",
              color: "var(--fg1)",
              textDecoration: "underline",
              textUnderlineOffset: "3px",
            }}
          >
            kauri@herosjourneycreative.co.nz
          </a>
        </div>

        <Rule />

        {/* Final CTA row */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "24px",
          }}
        >
          <SectionHeading title="Ready to Write?" />
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "var(--step-body-lg)",
              lineHeight: 1.5,
              color: "var(--fg2)",
              maxWidth: "560px",
              margin: 0,
            }}
          >
            Join an upcoming public session on Meetup, or get in touch to arrange a private
            workshop for your group.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "14px" }}>
            <a
              href={WORKSHOPS_MEETUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hjc-btn hjc-btn-yellow"
            >
              Join a Public Workshop
            </a>
            <Link
              href="/contact?interest=private-workshop"
              className="hjc-btn hjc-btn-ghost"
            >
              Enquire About a Private Booking
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
