import { cookies } from "next/headers";
import type { Metadata } from "next";
import { PREREG } from "@/lib/tam/frozen";
import { getSessions } from "@/lib/tam/db";
import ThreadGap from "@/components/tam/ThreadGap";
import PreregPanel from "@/components/tam/PreregPanel";
import SessionTable from "@/components/tam/SessionTable";
import OperatorRunner from "@/components/tam/OperatorRunner";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Te Aho Matatū — σ-Correspondence Test | Hero's Journey Creative",
  description:
    "A live, falsifiable experiment testing whether symbolic correspondence tracks inner coherence. Scored by rule, logged including misses, reported either way.",
};

export default async function TamPage() {
  const sessions = await getSessions().catch(() => []);

  const cookieStore = await cookies();
  const isOperator =
    !!process.env.OPERATOR_TOKEN &&
    cookieStore.get("tam_op")?.value === process.env.OPERATOR_TOKEN;

  return (
    <div className="tam-shell">
      <div style={{ maxWidth: 1040, margin: "0 auto", padding: "32px 20px 80px" }}>

        {/* ── Hero ── */}
        <header style={{ marginBottom: 32 }}>
          <div
            style={{
              fontFamily: "var(--font-space-mono)",
              fontSize: 12,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--tam-muted)",
              marginBottom: 8,
            }}
          >
            Hero&apos;s Journey Creative · Human-centred AI experiments
          </div>
          <h1
            style={{
              fontFamily: "var(--font-spectral)",
              fontWeight: 600,
              fontSize: "clamp(30px, 5vw, 46px)",
              lineHeight: 1.05,
              margin: "0.3em 0 0.15em",
              letterSpacing: "-0.01em",
            }}
          >
            Te Aho <span style={{ color: "var(--tam-thread)" }}>Matatū</span> — the σ test
          </h1>
          <p
            style={{
              fontFamily: "var(--font-space-mono)",
              fontSize: 14,
              color: "var(--tam-muted)",
              margin: "6px 0 0",
              letterSpacing: "0.02em",
            }}
          >
            Ψ → ∑Mi(↑/↓) ⇄ σ(ϕ) → ϕ
          </p>
          <p
            style={{
              maxWidth: "62ch",
              color: "#cfcabf",
              margin: "18px 0 0",
              fontSize: 16,
              lineHeight: 1.6,
            }}
          >
            A live, falsifiable test of one claim: that the symbol a participant draws (
            <b style={{ color: "var(--tam-ink)" }}>ϕ</b>) corresponds to their inner state{" "}
            <b style={{ color: "var(--tam-ink)" }}>
              more when they are coherent (∑Mi↑) than when scattered (∑Mi↓)
            </b>
            . The result is the{" "}
            <b style={{ color: "var(--tam-ink)" }}>gap between those two arms</b> — scored by rule,
            logged including misses, and reported either way. A second deck of plain playing cards
            runs in parallel, to test whether the tarot&apos;s symbols matter or only its structure does.
          </p>
        </header>

        {/* ── Thread-gap dashboard ── */}
        <ThreadGap sessions={sessions} />

        {/* ── Pre-registration panel ── */}
        <PreregPanel prereg={PREREG} />

        {/* ── Session record ── */}
        <SessionTable sessions={sessions} />

        {/* ── Downloads / links ── */}
        <section className="tam-panel">
          <h2
            style={{
              fontFamily: "var(--font-spectral)",
              fontWeight: 600,
              fontSize: 20,
              margin: "0 0 14px",
            }}
          >
            Downloads &amp; links
          </h2>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
            <li>
              <a
                href="/showcase/te-aho-matatu/paper.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--tam-pounamu)", textDecoration: "none", borderBottom: "1px solid rgba(95,184,166,.4)", fontFamily: "var(--font-space-mono)", fontSize: 13 }}
              >
                Te Aho Matatū — original framework paper (PDF)
              </a>
            </li>
            <li>
              <a
                href="/showcase/te-aho-matatu/Te_Aho_Matatu_Sigma_Protocol_v1.md"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--tam-pounamu)", textDecoration: "none", borderBottom: "1px solid rgba(95,184,166,.4)", fontFamily: "var(--font-space-mono)", fontSize: 13 }}
              >
                σ-Correspondence Protocol v1.0 (Markdown)
              </a>
            </li>
          </ul>
          <div
            style={{
              marginTop: 20,
              padding: "14px 16px",
              background: "var(--tam-surface-2)",
              border: "1px solid var(--tam-line)",
              borderRadius: 10,
              fontSize: 13,
              color: "#cfcabf",
              lineHeight: 1.6,
            }}
          >
            <b style={{ color: "var(--tam-ink)" }}>How this was built.</b> The original framework
            paper was drafted with AI as collaborator. A multi-model adversarial critique pass found
            where the central physics argument fails. The corrected protocol — falsifiable, with a
            real control and mechanical scoring — was co-designed with AI as engineer. The same tools
            that helped build the claim were turned on it to break it. Sessions are filmed and
            logged here in the open; the operator commits to reporting a null result as a real
            finding.
          </div>
        </section>

        {/* ── Operator section (not prominent) ── */}
        <OperatorRunner isOperator={isOperator} />

      </div>
    </div>
  );
}
