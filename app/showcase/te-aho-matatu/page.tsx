import { cookies } from "next/headers";
import Link from "next/link";
import type { Metadata } from "next";
import { SHOWCASE_ITEMS } from "@/lib/site-content";
import SectionHeading from "@/components/section-heading";
import VideoPlaceholder from "@/components/video-placeholder";
import { PREREG } from "@/lib/tam/frozen";
import { getSessions } from "@/lib/tam/db";
import ThreadGap from "@/components/tam/ThreadGap";
import PreregPanel from "@/components/tam/PreregPanel";
import SessionTable from "@/components/tam/SessionTable";
import OperatorRunner from "@/components/tam/OperatorRunner";

export const dynamic = "force-dynamic";

const item = SHOWCASE_ITEMS.find((i) => i.slug === "te-aho-matatu")!;

export const metadata: Metadata = {
  title: `${item.title} — Showcase | Hero's Journey Creative`,
  description: item.detail.heroSubtitle,
};

function DetailBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "10px",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--fg3)",
          margin: "0 0 10px",
        }}
      >
        {label}
      </p>
      <div
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "var(--step-body)",
          lineHeight: 1.6,
          color: "var(--fg2)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ margin: "60px 0" }}>
      <SectionHeading title={title} className="mb-[28px]" />
      {children}
    </section>
  );
}

export default async function TamShowcasePage() {
  const sessions = await getSessions().catch(() => []);

  const cookieStore = await cookies();
  const isOperator =
    !!process.env.OPERATOR_TOKEN &&
    cookieStore.get("tam_op")?.value === process.env.OPERATOR_TOKEN;

  const { detail } = item;

  return (
    <div className="hjc-fade flex-1" style={{ padding: "64px 0 80px", background: "var(--bg)" }}>
      <div className="max-w-[1200px] mx-auto px-8 max-[880px]:px-5">

        {/* Back link */}
        <Link
          href="/showcase"
          className="hjc-lnk"
          style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "40px" }}
        >
          ← Showcase
        </Link>

        {/* ── Hero ── */}
        <span className="hjc-kick block mb-[18px]">{item.eyebrow}</span>
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
          {item.title}
        </h1>
        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: "var(--step-body-lg)",
            lineHeight: 1.5,
            color: "var(--fg2)",
            maxWidth: "680px",
            margin: "0 0 28px",
          }}
        >
          {detail.heroSubtitle}
        </p>

        {item.externalLinks.length > 0 && (
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "48px" }}>
            {item.externalLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hjc-btn hjc-btn-ghost"
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        )}

        {/* ── Live σ-test dashboard (replaces image placeholder) ── */}
        <div className="tam-shell" style={{ borderRadius: 14, overflow: "hidden" }}>
          <div style={{ padding: "32px 28px 28px", borderBottom: "1px solid var(--tam-line)" }}>
            <div
              style={{
                fontFamily: "var(--font-space-mono)",
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--tam-muted)",
                marginBottom: 8,
              }}
            >
              Live experiment · σ-Correspondence Protocol
            </div>
            <p
              style={{
                fontFamily: "var(--font-space-mono)",
                fontSize: 14,
                color: "var(--tam-muted)",
                margin: "0 0 4px",
                letterSpacing: "0.02em",
              }}
            >
              Ψ → ∑Mi(↑/↓) ⇄ σ(ϕ) → ϕ
            </p>
            <p style={{ maxWidth: "62ch", color: "#cfcabf", margin: "10px 0 0", fontSize: 14, lineHeight: 1.6 }}>
              A falsifiable test: does the symbol drawn correspond to inner state{" "}
              <b style={{ color: "var(--tam-ink)" }}>more when coherent (∑Mi↑) than scattered (∑Mi↓)</b>?
              The result is the gap between those two arms — scored by rule, logged including misses.
            </p>
          </div>
          <div style={{ padding: "0 28px 28px" }}>
            <ThreadGap sessions={sessions} />
            <PreregPanel prereg={PREREG} />
            <SessionTable sessions={sessions} />
            <OperatorRunner isOperator={isOperator} />
          </div>
        </div>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "60px 0 0" }} />

        {/* ── Project Summary ── */}
        <Section title="Project Summary">
          <div className="grid grid-cols-3 gap-6 max-[880px]:grid-cols-1">
            <DetailBlock label="What It Is">{detail.summary.whatItIs}</DetailBlock>
            <DetailBlock label="Why It Exists">{detail.summary.whyItExists}</DetailBlock>
            <DetailBlock label="What Was Built">{detail.summary.whatWasBuilt}</DetailBlock>
          </div>
        </Section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "0" }} />

        {/* ── Build Story ── */}
        <Section title="Build Story">
          <div className="grid grid-cols-2 gap-6 max-[880px]:grid-cols-1" style={{ rowGap: "32px" }}>
            <DetailBlock label="The Original Problem">{detail.buildStory.problem}</DetailBlock>
            <DetailBlock label="The Creative / Product Insight">{detail.buildStory.insight}</DetailBlock>
            <DetailBlock label="The Role of AI Agents">{detail.buildStory.aiRole}</DetailBlock>
            <DetailBlock label="The Human-in-the-Loop Decisions">{detail.buildStory.humanInLoop}</DetailBlock>
          </div>
        </Section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "0" }} />

        {/* ── Production Notes ── */}
        <Section title="Production Notes">
          <div style={{ marginBottom: "32px" }}>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--fg3)",
                margin: "0 0 10px",
              }}
            >
              Tech / Method Stack
            </p>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                lineHeight: 1.8,
                color: "var(--fg2)",
                margin: 0,
              }}
            >
              {detail.productionNotes.stack}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-6 max-[880px]:grid-cols-1">
            <DetailBlock label="Design Process">{detail.productionNotes.designProcess}</DetailBlock>
            <DetailBlock label="Prompting / Agent Workflow">{detail.productionNotes.promptingWorkflow}</DetailBlock>
            <DetailBlock label="Testing / Validation / Review">{detail.productionNotes.testing}</DetailBlock>
          </div>
        </Section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "0" }} />

        {/* ── Video Walkthrough ── */}
        <Section title="Video Walkthrough">
          <VideoPlaceholder title={detail.videoPlaceholderTitle} />
        </Section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "0" }} />

        {/* ── Outcome ── */}
        <Section title="Outcome">
          <div className="grid grid-cols-2 gap-6 max-[880px]:grid-cols-1">
            <DetailBlock label="Current State">{detail.outcome.currentState}</DetailBlock>
            <DetailBlock label="What This Project Demonstrates">{detail.outcome.demonstrates}</DetailBlock>
          </div>
        </Section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "0 0 48px" }} />

        {/* ── Footer ── */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <Link href="/showcase" className="hjc-lnk">← Back to Showcase</Link>
          <Link href="/contact" className="hjc-lnk">Inquire About Custom Projects →</Link>
        </div>

      </div>
    </div>
  );
}
