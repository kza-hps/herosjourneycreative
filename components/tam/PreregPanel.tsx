"use client";

import { useState } from "react";
import { TAROT, SUIT_VALENCE } from "@/lib/tam/frozen";

interface Props {
  prereg: {
    committedNPerArm: number;
    scoringRule: string;
    orientationRule: string;
    registeredOn: string;
    configHash: string;
  };
}

function fmtVal(v: number) {
  return (v > 0 ? "+" : "") + v;
}

function valColor(v: number) {
  return v > 0 ? "var(--tam-thread)" : v < 0 ? "var(--tam-warn)" : "var(--tam-muted)";
}

export default function PreregPanel({ prereg }: Props) {
  const [codebookOpen, setCodebookOpen] = useState(false);

  const suitEntries = Object.entries(SUIT_VALENCE);
  const tarotEntries = Object.entries(TAROT);

  return (
    <section className="tam-panel">
      <h2 style={{ fontFamily: "var(--font-spectral)", fontWeight: 600, fontSize: 20, margin: "0 0 4px" }}>
        Pre-registration
      </h2>
      <p style={{ color: "var(--tam-muted)", fontSize: 13, margin: "0 0 18px" }}>
        Committed before any sessions were run. Not updated after data collection began.
      </p>

      <div style={{ display: "grid", gap: 14 }}>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontFamily: "var(--font-space-mono)", fontSize: 11, color: "var(--tam-muted)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 4 }}>
              Committed N per arm
            </div>
            <div style={{ fontFamily: "var(--font-space-mono)", fontSize: 28, color: "var(--tam-thread)" }}>
              {prereg.committedNPerArm}
            </div>
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-space-mono)", fontSize: 11, color: "var(--tam-muted)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 4 }}>
              Registered
            </div>
            <div style={{ fontFamily: "var(--font-space-mono)", fontSize: 14, color: "var(--tam-ink)" }}>
              {prereg.registeredOn}
            </div>
          </div>
        </div>

        <div>
          <div style={{ fontFamily: "var(--font-space-mono)", fontSize: 11, color: "var(--tam-muted)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 6 }}>
            Scoring rule
          </div>
          <p style={{ fontSize: 14, color: "#cfcabf", margin: 0, lineHeight: 1.55 }}>
            {prereg.scoringRule}
          </p>
        </div>

        <div>
          <div style={{ fontFamily: "var(--font-space-mono)", fontSize: 11, color: "var(--tam-muted)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 6 }}>
            Orientation rule
          </div>
          <p style={{ fontSize: 14, color: "#cfcabf", margin: 0, lineHeight: 1.55 }}>
            {prereg.orientationRule}
          </p>
        </div>

        <div>
          <div style={{ fontFamily: "var(--font-space-mono)", fontSize: 11, color: "var(--tam-muted)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 6 }}>
            Frozen codebook SHA-256
          </div>
          <code
            style={{
              fontFamily: "var(--font-space-mono)",
              fontSize: 11,
              color: "var(--tam-muted)",
              wordBreak: "break-all",
              display: "block",
            }}
          >
            {prereg.configHash}
          </code>
        </div>

        <div>
          <button
            onClick={() => setCodebookOpen((o) => !o)}
            aria-expanded={codebookOpen}
            style={{
              background: "none",
              border: "1px solid var(--tam-line)",
              borderRadius: 8,
              padding: "8px 14px",
              color: "var(--tam-muted)",
              fontFamily: "var(--font-space-mono)",
              fontSize: 12,
              cursor: "pointer",
              letterSpacing: "0.08em",
            }}
          >
            {codebookOpen ? "▴ Hide codebook" : "▾ Show frozen codebook"}
          </button>

          {codebookOpen && (
            <div
              style={{
                marginTop: 12,
                background: "var(--tam-surface-2)",
                border: "1px solid var(--tam-line)",
                borderRadius: 10,
                padding: 16,
              }}
            >
              <p style={{ fontFamily: "var(--font-space-mono)", fontSize: 11, color: "var(--tam-muted)", margin: "0 0 12px" }}>
                Rider–Waite–Smith valence reference for this run. Frozen before session 1. Do not change.
              </p>

              <div style={{ marginBottom: 14 }}>
                <div style={{ fontFamily: "var(--font-space-mono)", fontSize: 11, color: "var(--tam-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>
                  Playing cards (by suit)
                </div>
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                  {suitEntries.map(([suit, val]) => (
                    <span
                      key={suit}
                      style={{
                        fontFamily: "var(--font-space-mono)",
                        fontSize: 13,
                        color: val > 0 ? "var(--tam-thread)" : "var(--tam-scatter)",
                      }}
                    >
                      {suit} {fmtVal(val)}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ fontFamily: "var(--font-space-mono)", fontSize: 11, color: "var(--tam-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>
                  Tarot ({tarotEntries.length} cards — upright / reversed)
                </div>

                {/* Column headers */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: "0 12px", fontFamily: "var(--font-space-mono)", fontSize: 10, color: "var(--tam-muted)", paddingBottom: 4, marginBottom: 2, borderBottom: "1px solid var(--tam-line)" }}>
                  <span />
                  <span style={{ textAlign: "right" }}>↑ up</span>
                  <span style={{ textAlign: "right" }}>↓ rev</span>
                </div>

                <div
                  style={{
                    maxHeight: 280,
                    overflowY: "auto",
                  }}
                >
                  {tarotEntries.map(([card, vals]) => (
                    <div
                      key={card}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr auto auto",
                        gap: "0 12px",
                        fontFamily: "var(--font-space-mono)",
                        fontSize: 11,
                        padding: "3px 0",
                        borderBottom: "1px solid var(--tam-line)",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ color: "var(--tam-muted)" }}>{card}</span>
                      <span style={{ color: valColor(vals.upright), textAlign: "right", minWidth: 28 }}>
                        {fmtVal(vals.upright)}
                      </span>
                      <span style={{ color: valColor(vals.reversed), textAlign: "right", minWidth: 28 }}>
                        {fmtVal(vals.reversed)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
