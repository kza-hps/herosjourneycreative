"use client";

import { useState } from "react";
import Link from "next/link";
import SectionHeading from "@/components/section-heading";
import {
  WORKSHOPS_MEETUP_URL,
  WORKSHOP_PATHWAY_CARDS,
  WORKSHOP_PRICING,
  SPRINT_FORMAT_ROWS,
  PRIVATE_AUDIENCE_GROUPS,
  WHAT_TO_BRING,
  BRAND_INFO,
  AI_WORKSHOP_FORMATS,
  AI_WORKSHOP_COVERS,
  AI_WORKSHOP_PREREQUISITES,
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
  const [selectedCardIdx, setSelectedCardIdx] = useState<number>(0);
  const selectedTrack = selectedCardIdx === 3 ? "ai" : "writing";

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

        {/* Pathway cards — 2×2 grid */}
        <SectionHeading
          title="Choose Your Path"
          subtitle="Public sessions are open-enrolment via Meetup. Private bookings are arranged directly with the studio."
        />
        <div
          className="grid grid-cols-2 gap-5 max-[880px]:grid-cols-1"
          style={{ marginTop: "36px" }}
        >
          {WORKSHOP_PATHWAY_CARDS.map((card, idx) => {
            const isActive = selectedCardIdx === idx;

            return (
              <div
                key={card.label}
                onClick={() => setSelectedCardIdx(idx)}
                style={{
                  border: isActive ? "1px solid var(--hjc-yellow)" : "1px solid var(--rule)",
                  boxShadow: isActive ? "var(--shadow-stamp)" : "none",
                  padding: "28px 26px 24px",
                  background: "var(--surface)",
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer",
                  transition: "border var(--dur-fast) var(--ease), box-shadow var(--dur-fast) var(--ease)",
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
                    margin: "0 0 20px",
                    flex: 1,
                  }}
                >
                  {card.body}
                </p>
                {card.price && (
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--fg1)",
                      marginBottom: "16px",
                    }}
                  >
                    {card.price}
                  </div>
                )}
                {card.external ? (
                  <a
                    href={card.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hjc-lnk"
                    style={{ alignSelf: "flex-start" }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {card.cta} <span aria-hidden="true">→</span>
                  </a>
                ) : (
                  <Link
                    href={card.href}
                    className="hjc-lnk"
                    style={{ alignSelf: "flex-start" }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {card.cta} <span aria-hidden="true">→</span>
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        <Rule />

        {selectedTrack === "writing" && (
          <div className="hjc-fade">
            {/* Pricing */}
            <SectionHeading
              title="Workshop Pricing"
              subtitle="All prices are GST exclusive. Custom quotes available for larger or specialist engagements."
            />
            <div
              className="grid grid-cols-3 gap-5 max-[1024px]:grid-cols-1"
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
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                letterSpacing: "0.08em",
                color: "var(--fg3)",
                marginTop: "8px",
                lineHeight: 1.6,
              }}
            >
              Custom AI workshop pricing may vary for larger teams, tailored use cases, travel,
              discovery, or multi-session delivery.
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
                href={`mailto:${BRAND_INFO.email}`}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  color: "var(--fg1)",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
              >
                {BRAND_INFO.email}
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
        )}

        <Rule />

        {selectedTrack === "ai" && (
          <div className="hjc-fade">
            {/* AI Engineering & Product-Building Workshops */}
            <SectionHeading
              title="AI Engineering & Product-Building Workshops"
              subtitle="Practical, hands-on workshops in AI-assisted product development — for corporate teams, founders, and technically curious professionals."
            />

            <div
              style={{
                border: "1px solid var(--rule)",
                background: "var(--surface)",
                marginTop: "36px",
              }}
            >
              <div style={{ height: "3px", background: "var(--hjc-yellow)" }} />
              <div style={{ padding: "32px 28px 30px" }}>

                <MonoLabel>Corporate / Zoom cohorts / Meetup tasters</MonoLabel>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    textTransform: "uppercase",
                    fontSize: "clamp(1.4rem, 3vw, 2rem)",
                    lineHeight: 1.05,
                    color: "var(--fg1)",
                    margin: "0 0 8px",
                  }}
                >
                  AI Engineering Workshop: Vibe Coding 101
                </h3>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--fg3)",
                    marginBottom: "22px",
                  }}
                >
                  Build a SaaS-style prototype in one day
                </div>

                <p
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "var(--step-body-lg)",
                    lineHeight: 1.6,
                    color: "var(--fg2)",
                    maxWidth: "800px",
                    margin: "0 0 14px",
                  }}
                >
                  A practical AI engineering workshop for people who want to understand how modern
                  software products are now being designed, built, tested, and shipped with the help
                  of frontier AI models.
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "var(--step-body)",
                    lineHeight: 1.6,
                    color: "var(--fg2)",
                    maxWidth: "800px",
                    margin: "0 0 14px",
                  }}
                >
                  Using VouchMeApp as the real-world exemplar, this workshop walks participants
                  through the end-to-end build of a SaaS or micro-SaaS product: from problem
                  framing and user journeys through to product requirements, interface structure,
                  database design, AI-assisted coding, testing, deployment, and iteration.
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontStyle: "italic",
                    fontSize: "var(--step-body)",
                    lineHeight: 1.6,
                    color: "var(--fg2)",
                    maxWidth: "800px",
                    margin: "0 0 32px",
                  }}
                >
                  This is not a passive AI awareness session. It is a guided build workshop.
                </p>

                {/* What the workshop covers */}
                <div style={{ marginBottom: "36px" }}>
                  <MonoLabel>The workshop covers</MonoLabel>
                  <ul
                    className="grid grid-cols-2 gap-x-6 gap-y-3 max-[560px]:grid-cols-1"
                    style={{ margin: 0, padding: 0, listStyle: "none" }}
                  >
                    {AI_WORKSHOP_COVERS.map((item) => (
                      <li
                        key={item}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "10px",
                          fontFamily: "var(--font-serif)",
                          fontSize: "var(--step-body)",
                          color: "var(--fg2)",
                          lineHeight: 1.5,
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
                            marginTop: "0.6em",
                          }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Delivery formats + Prerequisites */}
                <div
                  className="grid grid-cols-[1fr_auto] gap-10 max-[880px]:grid-cols-1 max-[880px]:gap-8"
                  style={{ alignItems: "start", marginBottom: "32px" }}
                >
                  {/* Delivery formats */}
                  <div>
                    <MonoLabel>Delivery options</MonoLabel>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {AI_WORKSHOP_FORMATS.map((fmt) => (
                        <div
                          key={fmt.label}
                          style={{
                            border: "1px solid var(--rule)",
                            padding: "18px 20px",
                            background: "var(--surface-inset)",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "baseline",
                              flexWrap: "wrap",
                              gap: "8px",
                              marginBottom: "8px",
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
                              {fmt.label}
                            </span>
                            {fmt.price && (
                              <span
                                style={{
                                  fontFamily: "var(--font-mono)",
                                  fontSize: "9px",
                                  letterSpacing: "0.12em",
                                  textTransform: "uppercase",
                                  color: "var(--fg3)",
                                }}
                              >
                                {fmt.price}
                              </span>
                            )}
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
                            {fmt.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Prerequisites */}
                  <div
                    style={{
                      border: "1px solid var(--rule)",
                      padding: "26px 24px",
                      background: "var(--surface-inset)",
                      minWidth: "300px",
                    }}
                    className="max-[880px]:min-w-0 max-[880px]:w-full"
                  >
                    <MonoLabel>Assumptions and prerequisites</MonoLabel>
                    <ul
                      style={{
                        margin: "0 0 18px",
                        padding: 0,
                        listStyle: "none",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      {AI_WORKSHOP_PREREQUISITES.map((item) => (
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
                    <p
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontWeight: 600,
                        fontSize: "var(--step-body)",
                        lineHeight: 1.5,
                        color: "var(--fg1)",
                        margin: "0 0 12px",
                      }}
                    >
                      Microsoft 365 Copilot on its own is not sufficient for this workshop.
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "var(--step-body)",
                        lineHeight: 1.5,
                        color: "var(--fg2)",
                        margin: 0,
                      }}
                    >
                      Participants do not need to be professional developers, but they do need
                      access to a capable frontier model such as ChatGPT, Claude, Gemini, or an
                      equivalent coding-capable AI assistant. The workshop is designed for people
                      who want to learn the build process, not simply watch a presentation about AI.
                    </p>
                  </div>
                </div>

                {/* Best suited for */}
                <p
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "var(--step-body)",
                    lineHeight: 1.6,
                    color: "var(--fg3)",
                    margin: "0 0 28px",
                    maxWidth: "760px",
                  }}
                >
                  Best suited for founders, product teams, innovation teams, analysts, service
                  designers, business owners, and technically curious professionals who want a
                  grounded view of what AI-assisted software development now makes possible.
                </p>

                {/* CTA */}
                <Link
                  href="/contact?interest=ai-engineering-workshop"
                  className="hjc-btn hjc-btn-yellow"
                  style={{ alignSelf: "flex-start" }}
                >
                  Enquire about this workshop
                </Link>

              </div>
            </div>
          </div>
        )}



      </div>
    </div>
  );
}
