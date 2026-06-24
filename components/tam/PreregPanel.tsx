"use client";

import { useState } from "react";
import { TAROT_VALENCE, SUIT_VALENCE } from "@/lib/tam/frozen";

interface Props {
  prereg: {
    committedNPerArm: number;
    scoringRule: string;
    registeredOn: string;
    configHash: string;
  };
}

export default function PreregPanel({ prereg }: Props) {
  const [codebookOpen, setCodebookOpen] = useState(false);

  const suitEntries = Object.entries(SUIT_VALENCE);
  const tarotEntries = Object.entries(TAROT_VALENCE);

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
                      {suit} {val > 0 ? "+" : ""}{val}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ fontFamily: "var(--font-space-mono)", fontSize: 11, color: "var(--tam-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>
                  Tarot ({tarotEntries.length} cards)
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                    gap: "4px 16px",
                    maxHeight: 280,
                    overflowY: "auto",
                  }}
                >
                  {tarotEntries.map(([card, val]) => (
                    <div
                      key={card}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontFamily: "var(--font-space-mono)",
                        fontSize: 11,
                        padding: "3px 0",
                        borderBottom: "1px solid var(--tam-line)",
                      }}
                    >
                      <span style={{ color: "var(--tam-muted)" }}>{card}</span>
                      <span
                        style={{
                          color: val > 0 ? "var(--tam-thread)" : val < 0 ? "var(--tam-warn)" : "var(--tam-muted)",
                          marginLeft: 8,
                        }}
                      >
                        {val > 0 ? "+" : ""}{val}
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
