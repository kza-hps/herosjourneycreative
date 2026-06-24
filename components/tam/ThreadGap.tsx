"use client";

import type { TamSession } from "@/lib/tam/frozen";
import { type ArmStats, zTest, pct, gapStr } from "@/lib/tam/stats";

interface Props {
  sessions: TamSession[];
}

function armStats(sessions: TamSession[], deck: "tarot_dir_hit" | "playing_dir_hit", cond: "up" | "down"): ArmStats {
  const arm = sessions.filter((s) => s.condition === cond && s[deck] !== null);
  if (!arm.length) return { n: 0, hits: 0, p: null };
  const hits = arm.filter((s) => s[deck] === true).length;
  return { n: arm.length, hits, p: hits / arm.length };
}

interface DeckBlockProps {
  name: string;
  label: string;
  up: ArmStats;
  dn: ArmStats;
}

function DeckBlock({ name, label, up, dn }: DeckBlockProps) {
  const gap = up.p !== null && dn.p !== null ? up.p - dn.p : null;
  const gapCls = gap === null ? "var(--tam-muted)" : gap > 0.0001 ? "var(--tam-pounamu)" : gap < -0.0001 ? "var(--tam-warn)" : "var(--tam-muted)";
  const upW = up.p === null ? 2 : Math.max(2, Math.round(up.p * 100));
  const dnW = dn.p === null ? 2 : Math.max(2, Math.round(dn.p * 100));

  return (
    <div style={{ paddingTop: 18, paddingBottom: 18, borderTop: "1px solid var(--tam-line)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
        <div style={{ fontFamily: "var(--font-spectral)", fontSize: 17 }}>
          {name}{" "}
          <span style={{ color: "var(--tam-muted)", fontSize: 12 }}>· {label}</span>
        </div>
        <div style={{ fontFamily: "var(--font-space-mono)", fontSize: 15, color: gapCls }}>
          gap {gapStr(gap)}
        </div>
      </div>

      {/* Up arm row: label · bar · value all on the same baseline */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <span style={{
          fontFamily: "var(--font-space-mono)",
          fontSize: 11,
          color: "var(--tam-muted)",
          whiteSpace: "nowrap",
          minWidth: 112,
        }}>
          ∑Mi↑ coherent
        </span>
        <div style={{ flex: 1, height: 14, position: "relative" }}>
          <div
            className="tam-arm tam-arm-up"
            style={{ width: `${upW}%`, position: "absolute", left: 0, top: 0, height: "100%" }}
          />
        </div>
        <span style={{
          fontFamily: "var(--font-space-mono)",
          fontSize: 12,
          color: "var(--tam-thread)",
          whiteSpace: "nowrap",
          minWidth: 72,
          textAlign: "right",
        }}>
          {pct(up.p)} · {up.n}
        </span>
      </div>

      {/* Midline separator */}
      <div style={{ height: 1, background: "var(--tam-line)", margin: "2px 0 10px" }} />

      {/* Dn arm row */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{
          fontFamily: "var(--font-space-mono)",
          fontSize: 11,
          color: "var(--tam-muted)",
          whiteSpace: "nowrap",
          minWidth: 112,
        }}>
          ∑Mi↓ scattered
        </span>
        <div style={{ flex: 1, height: 14, position: "relative" }}>
          <div
            className="tam-arm tam-arm-dn"
            style={{ width: `${dnW}%`, position: "absolute", left: 0, top: 0, height: "100%" }}
          />
        </div>
        <span style={{
          fontFamily: "var(--font-space-mono)",
          fontSize: 12,
          color: "var(--tam-scatter)",
          whiteSpace: "nowrap",
          minWidth: 72,
          textAlign: "right",
        }}>
          {pct(dn.p)} · {dn.n}
        </span>
      </div>
    </div>
  );
}

export default function ThreadGap({ sessions }: Props) {
  const tarotUp = armStats(sessions, "tarot_dir_hit", "up");
  const tarotDn = armStats(sessions, "tarot_dir_hit", "down");
  const playUp = armStats(sessions, "playing_dir_hit", "up");
  const playDn = armStats(sessions, "playing_dir_hit", "down");

  const tGap = tarotUp.p !== null && tarotDn.p !== null ? tarotUp.p - tarotDn.p : null;
  const pGap = playUp.p !== null && playDn.p !== null ? playUp.p - playDn.p : null;
  const tz = zTest(tarotUp, tarotDn);

  const totalValid = sessions.filter((s) => s.tarot_dir_hit !== null).length;

  let verdict: React.ReactNode;
  if (totalValid < 6) {
    verdict = (
      <>
        <b>Preliminary.</b> Too few scored sessions to read anything ({totalValid} so far). This is a warm-up — run the full pre-registered N before drawing any conclusion.
      </>
    );
  } else {
    const parts: React.ReactNode[] = [];
    if (tz && tGap !== null) {
      parts.push(
        <span key="z">
          Tarot ∑Mi↑ vs ∑Mi↓: gap <b>{gapStr(tGap)}</b>, one-sided p ≈{" "}
          <b>{tz.p < 0.001 ? "<0.001" : tz.p.toFixed(3)}</b> (small-N, indicative only).{" "}
        </span>
      );
    }
    if (tGap !== null && pGap !== null) {
      const diff = tGap - pGap;
      parts.push(
        diff > 0.05 ? (
          <span key="sym">
            Tarot gap exceeds the plain-deck gap by {Math.round(diff * 100)}% — suggestive that <b>symbols</b> (not just structure) are doing something, though the decks differ in size so treat this as indicative only.{" "}
          </span>
        ) : diff < -0.05 ? (
          <span key="sym">
            The plain-deck gap exceeds the tarot gap by {Math.round(Math.abs(diff) * 100)}% — so far <b>structure alone</b> explains more than symbolic content does. Treat this secondary comparison as suggestive only — deck sizes differ.{" "}
          </span>
        ) : (
          <span key="sym">
            Tarot and plain-deck gaps are close — no clear separation between symbolic and structural contributions yet. Treat this secondary comparison as suggestive only — deck sizes differ.{" "}
          </span>
        )
      );
    }
    verdict = (
      <>
        {parts}
        <span style={{ color: "var(--tam-muted)" }}>Honour whatever this becomes at full N — a flat result is a real finding.</span>
      </>
    );
  }

  return (
    <section className="tam-panel" style={{ marginTop: 0 }}>
      <h2 style={{ fontFamily: "var(--font-spectral)", fontWeight: 600, fontSize: 20, margin: "0 0 4px" }}>
        The thread gap
      </h2>
      <p style={{ color: "var(--tam-muted)", fontSize: 13, margin: "0 0 4px" }}>
        σ shows itself only if the gold thread (coherent) sits ahead of the slate one (scattered).
      </p>

      <div style={{ marginTop: 4 }}>
        <DeckBlock name="Tarot" label="symbolic deck" up={tarotUp} dn={tarotDn} />
        <DeckBlock name="Playing cards" label="plain deck — structure-only control" up={playUp} dn={playDn} />
      </div>

      <div
        style={{
          marginTop: 22,
          padding: 16,
          borderRadius: 12,
          border: "1px solid var(--tam-line)",
          background: "var(--tam-surface-2)",
          fontSize: 14,
          color: "#cfcabf",
          lineHeight: 1.55,
        }}
      >
        {verdict}
      </div>

      <p style={{ fontSize: 12, color: "var(--tam-muted)", marginTop: 8, fontFamily: "var(--font-space-mono)" }}>
        Sessions: {sessions.length} · coherent {sessions.filter((s) => s.condition === "up").length} · scattered {sessions.filter((s) => s.condition === "down").length}
      </p>
    </section>
  );
}
