'use client';

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { TAROT, SUIT_VALENCE, RANKS, SUITS, dirHit, tarotValence } from "@/lib/tam/frozen";

const STORAGE_KEY = "tam_public_sessions";

type PublicSession = {
  id: string;
  ts: string;
  cond: "up" | "down";
  mood: number;
  tarot: string;
  tarot_reversed: boolean;
  tval: number;
  thit: boolean | null;
  pc: string;
  pval: number;
  phit: boolean | null;
  note: string;
};

type ArmStats = { n: number; hits: number; p: number | null };

function armStats(sessions: PublicSession[], field: "thit" | "phit", cond: "up" | "down"): ArmStats {
  const arm = sessions.filter((s) => s.cond === cond && s[field] !== null);
  if (!arm.length) return { n: 0, hits: 0, p: null };
  const hits = arm.filter((s) => s[field] === true).length;
  return { n: arm.length, hits, p: hits / arm.length };
}

function erfc(x: number): number {
  const t = 1 / (1 + 0.3275911 * Math.abs(x));
  const y =
    1 -
    ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t +
      0.254829592) *
      t *
      Math.exp(-x * x);
  return x >= 0 ? 1 - y : 1 + y;
}

function zTest(up: ArmStats, dn: ArmStats): { z: number; p: number } | null {
  if (up.n < 2 || dn.n < 2 || up.p === null || dn.p === null) return null;
  const pp = (up.hits + dn.hits) / (up.n + dn.n);
  const se = Math.sqrt(pp * (1 - pp) * (1 / up.n + 1 / dn.n));
  if (se === 0) return null;
  const z = (up.p - dn.p) / se;
  const p = 0.5 * erfc(z / Math.SQRT2);
  return { z, p };
}

function pct(n: number | null): string {
  if (n === null) return "n/a";
  return Math.round(n * 100) + "%";
}

function gapStr(gap: number | null): string {
  if (gap === null) return "n/a";
  return (gap >= 0 ? "+" : "") + Math.round(gap * 100) + "%";
}

const TAROT_KEYS = Object.keys(TAROT);

const INPUT_STYLE: React.CSSProperties = {
  width: "100%",
  background: "var(--tam-surface-2)",
  color: "var(--tam-ink)",
  border: "1px solid var(--tam-line)",
  borderRadius: 8,
  padding: "8px 12px",
  fontFamily: "var(--font-space-mono)",
  fontSize: 13,
};

function CondBtn({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        padding: "10px 0",
        borderRadius: 8,
        border: "1px solid",
        borderColor: active ? "var(--tam-pounamu)" : "var(--tam-line)",
        background: active ? "var(--tam-pounamu-dim)" : "var(--tam-surface-2)",
        color: active ? "var(--tam-pounamu)" : "var(--tam-muted)",
        fontFamily: "var(--font-space-mono)",
        fontSize: 13,
        cursor: "pointer",
        transition: "all 0.15s",
      }}
    >
      {label}
    </button>
  );
}

function OrientBtn({
  label,
  active,
  disabled,
  onClick,
}: {
  label: string;
  active: boolean;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        flex: 1,
        padding: "8px 0",
        borderRadius: 8,
        border: "1px solid",
        borderColor: active ? "var(--tam-thread)" : "var(--tam-line)",
        background: active ? "rgba(212,174,92,0.15)" : "var(--tam-surface-2)",
        color: active ? "var(--tam-thread)" : "var(--tam-muted)",
        fontFamily: "var(--font-space-mono)",
        fontSize: 12,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.4 : 1,
        transition: "all 0.15s",
      }}
    >
      {label}
    </button>
  );
}

function ArmRow({
  label,
  armCls,
  stats,
  textColor,
}: {
  label: string;
  armCls: string;
  stats: ArmStats;
  textColor: string;
}) {
  const w = stats.p === null ? 2 : Math.max(2, Math.round(stats.p * 100));
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <span
        style={{
          fontFamily: "var(--font-space-mono)",
          fontSize: 11,
          color: "var(--tam-muted)",
          whiteSpace: "nowrap",
          minWidth: 112,
        }}
      >
        {label}
      </span>
      <div style={{ flex: 1, height: 14, position: "relative" }}>
        <div
          className={`tam-arm ${armCls}`}
          style={{ width: `${w}%`, position: "absolute", left: 0, top: 0, height: "100%" }}
        />
      </div>
      <span
        style={{
          fontFamily: "var(--font-space-mono)",
          fontSize: 12,
          color: textColor,
          whiteSpace: "nowrap",
          minWidth: 72,
          textAlign: "right",
        }}
      >
        {pct(stats.p)} · {stats.n}
      </span>
    </div>
  );
}

function DeckDisplay({
  name,
  label,
  up,
  dn,
  gap,
}: {
  name: string;
  label: string;
  up: ArmStats;
  dn: ArmStats;
  gap: number | null;
}) {
  const gapColor =
    gap === null
      ? "var(--tam-muted)"
      : gap > 0.0001
        ? "var(--tam-pounamu)"
        : gap < -0.0001
          ? "var(--tam-warn)"
          : "var(--tam-muted)";

  return (
    <div style={{ paddingTop: 16, paddingBottom: 16, borderTop: "1px solid var(--tam-line)" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: 12,
        }}
      >
        <span style={{ fontFamily: "var(--font-spectral)", fontSize: 15, color: "var(--tam-ink)" }}>
          {name}{" "}
          <span style={{ color: "var(--tam-muted)", fontSize: 11 }}>· {label}</span>
        </span>
        <span style={{ fontFamily: "var(--font-space-mono)", fontSize: 13, color: gapColor }}>
          gap {gapStr(gap)}
        </span>
      </div>
      <ArmRow label="∑Mi↑ coherent" armCls="tam-arm-up" stats={up} textColor="var(--tam-thread)" />
      <div style={{ height: 1, background: "var(--tam-line)", margin: "6px 0" }} />
      <ArmRow label="∑Mi↓ scattered" armCls="tam-arm-dn" stats={dn} textColor="var(--tam-scatter)" />
    </div>
  );
}

export default function PublicRunDashboard() {
  const [sessions, setSessions] = useState<PublicSession[]>([]);
  const [loaded, setLoaded] = useState(false);

  const [cond, setCond] = useState<"up" | "down" | null>(null);
  const [mood, setMood] = useState(0);
  const [tarotCard, setTarotCard] = useState("");
  const [tarotReversed, setTarotReversed] = useState<boolean | null>(null);
  const [pcRank, setPcRank] = useState("");
  const [pcSuit, setPcSuit] = useState("");
  const [note, setNote] = useState("");
  const [saveError, setSaveError] = useState("");
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSessions(JSON.parse(raw) as PublicSession[]);
    } catch {
      /* in-memory fallback */
    }
    setLoaded(true);
  }, []);

  const persist = useCallback((s: PublicSession[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    } catch {
      /* quota exceeded — in-memory only */
    }
  }, []);

  const flipCoin = () => setCond(Math.random() < 0.5 ? "up" : "down");

  const resetForm = () => {
    setCond(null);
    setMood(0);
    setTarotCard("");
    setTarotReversed(null);
    setPcRank("");
    setPcSuit("");
    setNote("");
    setSaveError("");
  };

  const save = () => {
    if (!cond) {
      setSaveError("Set condition (coherent or scattered).");
      return;
    }
    if (!tarotCard) {
      setSaveError("Select a tarot card.");
      return;
    }
    if (tarotReversed === null) {
      setSaveError("Select orientation (upright or reversed) as seen by the camera.");
      return;
    }
    if (!pcRank || !pcSuit) {
      setSaveError("Select a playing card (rank and suit).");
      return;
    }
    setSaveError("");

    const tval = tarotValence(tarotCard, tarotReversed);
    const pval = SUIT_VALENCE[pcSuit] ?? 0;
    const thit = dirHit(tval, mood);
    const phit = dirHit(pval, mood);

    const session: PublicSession = {
      id: `pub-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      ts: new Date().toISOString(),
      cond,
      mood,
      tarot: tarotCard,
      tarot_reversed: tarotReversed,
      tval,
      thit,
      pc: `${pcRank}${pcSuit}`,
      pval,
      phit,
      note: note.trim(),
    };

    // FUTURE: community aggregation hook
    // When public aggregation is added, sessions would be submitted to a separate
    // clearly-labelled community endpoint here. Never wire to the operator
    // tam_sessions table — that table is the pre-registered run only.

    const next = [session, ...sessions];
    resetForm();
    setLastSaved(session.id);
    setSessions(next);
    persist(next);
  };

  const exportCsv = () => {
    const header = "id,ts,cond,mood,tarot,tarot_reversed,tval,thit,pc,pval,phit,note";
    const rows = sessions.map((s) =>
      [
        s.id,
        s.ts,
        s.cond,
        s.mood,
        `"${s.tarot}"`,
        s.tarot_reversed,
        s.tval,
        s.thit === null ? "" : s.thit,
        s.pc,
        s.pval,
        s.phit === null ? "" : s.phit,
        `"${s.note.replace(/"/g, '""')}"`,
      ].join(",")
    );
    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `tam-public-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    if (!confirm("Delete all local sessions? This cannot be undone.")) return;
    setSessions([]);
    setLastSaved(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch { /* ignore */ }
  };

  // Stats
  const tUp = armStats(sessions, "thit", "up");
  const tDn = armStats(sessions, "thit", "down");
  const pUp = armStats(sessions, "phit", "up");
  const pDn = armStats(sessions, "phit", "down");
  const tGap = tUp.p !== null && tDn.p !== null ? tUp.p - tDn.p : null;
  const pGap = pUp.p !== null && pDn.p !== null ? pUp.p - pDn.p : null;
  const tz = zTest(tUp, tDn);
  const totalValid = sessions.filter((s) => s.thit !== null).length;

  let verdict: React.ReactNode;
  if (totalValid < 6) {
    verdict = (
      <>
        <b>Preliminary.</b> Fewer than 6 scored sessions — nothing to read yet. Complete more draws before interpreting the gap.
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
            Tarot gap exceeds playing-deck gap by {Math.round(diff * 100)}% — symbols may be contributing beyond structure alone.{" "}
          </span>
        ) : diff < -0.05 ? (
          <span key="sym">
            Playing-deck gap exceeds tarot gap by {Math.round(Math.abs(diff) * 100)}% — structure alone explains more than symbolic content so far.{" "}
          </span>
        ) : (
          <span key="sym">Tarot and plain-deck gaps are close — no clear separation yet.{" "}</span>
        )
      );
    }
    verdict = (
      <>
        {parts}
        <span style={{ color: "var(--tam-muted)" }}>
          This is your private run — it doesn&apos;t count toward the pre-registered results.
        </span>
      </>
    );
  }

  const tvalDisplay =
    tarotCard && tarotReversed !== null ? tarotValence(tarotCard, tarotReversed) : null;
  const pvalDisplay = pcSuit ? SUIT_VALENCE[pcSuit] : null;

  if (!loaded) return null;

  return (
    <div className="tam-shell flex-1 hjc-fade" style={{ padding: "40px 0 80px" }}>
      <div style={{ maxWidth: 1040, margin: "0 auto", padding: "0 20px" }}>

        {/* Separation banner */}
        <div
          style={{
            borderLeft: "3px solid var(--tam-warn)",
            background: "rgba(196,100,44,0.08)",
            borderRadius: "0 8px 8px 0",
            padding: "12px 18px",
            marginBottom: 32,
            fontFamily: "var(--font-space-mono)",
            fontSize: 12,
            color: "#cfcabf",
            lineHeight: 1.7,
          }}
        >
          <strong style={{ color: "var(--tam-warn)" }}>Private run — not the official experiment.</strong>{" "}
          Sessions stay on this device only and are never submitted. Nothing here counts toward the pre-registered results.{" "}
          <Link
            href="/showcase/te-aho-matatu"
            style={{ color: "var(--tam-pounamu)", textDecoration: "underline" }}
          >
            View the live experiment →
          </Link>
        </div>

        {/* Back + header */}
        <Link
          href="/showcase/te-aho-matatu"
          style={{
            color: "var(--tam-pounamu)",
            fontFamily: "var(--font-space-mono)",
            fontSize: 12,
            textDecoration: "none",
            display: "inline-block",
            marginBottom: 20,
          }}
        >
          ← Te Aho Matatū
        </Link>
        <h1
          style={{
            fontFamily: "var(--font-spectral)",
            fontWeight: 600,
            fontSize: 28,
            color: "var(--tam-ink)",
            margin: "0 0 4px",
          }}
        >
          Run it yourself
        </h1>
        <p
          style={{
            fontFamily: "var(--font-space-mono)",
            fontSize: 13,
            color: "var(--tam-muted)",
            margin: "0 0 32px",
            lineHeight: 1.6,
          }}
        >
          σ-Correspondence Protocol · private instrument · {sessions.length} session
          {sessions.length !== 1 ? "s" : ""} on this device
        </p>

        {/* Two-column: Runner | Dashboard */}
        <div
          className="max-[880px]:grid-cols-1"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 28,
            alignItems: "start",
          }}
        >
          {/* ── Runner form ── */}
          <div className="tam-panel">
            <h2
              style={{
                fontFamily: "var(--font-spectral)",
                fontWeight: 600,
                fontSize: 18,
                margin: "0 0 20px",
                color: "var(--tam-ink)",
              }}
            >
              Log a draw
            </h2>

            {/* Condition */}
            <div style={{ marginBottom: 18 }}>
              <label
                style={{
                  display: "block",
                  fontFamily: "var(--font-space-mono)",
                  fontSize: 11,
                  color: "var(--tam-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  marginBottom: 8,
                }}
              >
                Condition
              </label>
              <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                <CondBtn label="↑ Coherent (∑Mi↑)" active={cond === "up"} onClick={() => setCond("up")} />
                <CondBtn
                  label="↓ Scattered (∑Mi↓)"
                  active={cond === "down"}
                  onClick={() => setCond("down")}
                />
              </div>
              <button
                onClick={flipCoin}
                style={{
                  width: "100%",
                  padding: "7px 0",
                  borderRadius: 8,
                  border: "1px solid var(--tam-line)",
                  background: "var(--tam-surface-2)",
                  color: "var(--tam-muted)",
                  fontFamily: "var(--font-space-mono)",
                  fontSize: 11,
                  cursor: "pointer",
                  letterSpacing: "0.06em",
                }}
              >
                flip coin
              </button>
            </div>

            {/* Mood */}
            <div style={{ marginBottom: 18 }}>
              <label
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontFamily: "var(--font-space-mono)",
                  fontSize: 11,
                  color: "var(--tam-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  marginBottom: 8,
                }}
              >
                <span>Inner state</span>
                <span
                  style={{
                    color:
                      mood > 0
                        ? "var(--tam-pounamu)"
                        : mood < 0
                          ? "var(--tam-warn)"
                          : "var(--tam-muted)",
                  }}
                >
                  {mood > 0 ? "+" : ""}
                  {mood}
                </span>
              </label>
              <input
                type="range"
                min={-5}
                max={5}
                step={1}
                value={mood}
                onChange={(e) => setMood(Number(e.target.value))}
                style={{ width: "100%", accentColor: "var(--tam-pounamu)" }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontFamily: "var(--font-space-mono)",
                  fontSize: 10,
                  color: "var(--tam-muted)",
                  marginTop: 4,
                }}
              >
                <span>−5 scattered</span>
                <span>0 neutral</span>
                <span>+5 coherent</span>
              </div>
            </div>

            {/* Tarot card */}
            <div style={{ marginBottom: 12 }}>
              <label
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontFamily: "var(--font-space-mono)",
                  fontSize: 11,
                  color: "var(--tam-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  marginBottom: 8,
                }}
              >
                <span>Tarot card</span>
                {tvalDisplay !== null && (
                  <span
                    style={{
                      color:
                        tvalDisplay > 0
                          ? "var(--tam-pounamu)"
                          : tvalDisplay < 0
                            ? "var(--tam-warn)"
                            : "var(--tam-muted)",
                    }}
                  >
                    val {tvalDisplay > 0 ? "+" : ""}
                    {tvalDisplay}
                  </span>
                )}
              </label>
              <select
                value={tarotCard}
                onChange={(e) => {
                  setTarotCard(e.target.value);
                  setTarotReversed(null);
                }}
                style={INPUT_STYLE}
              >
                <option value="">— select card —</option>
                {TAROT_KEYS.map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </select>
            </div>

            {/* Orientation */}
            <div style={{ marginBottom: 18 }}>
              <label
                style={{
                  display: "block",
                  fontFamily: "var(--font-space-mono)",
                  fontSize: 11,
                  color: "var(--tam-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  marginBottom: 8,
                }}
              >
                Orientation (camera view)
              </label>
              <div style={{ display: "flex", gap: 8 }}>
                <OrientBtn
                  label="↑ Upright"
                  active={tarotReversed === false}
                  disabled={!tarotCard}
                  onClick={() => setTarotReversed(false)}
                />
                <OrientBtn
                  label="↓ Reversed"
                  active={tarotReversed === true}
                  disabled={!tarotCard}
                  onClick={() => setTarotReversed(true)}
                />
              </div>
            </div>

            {/* Playing card */}
            <div style={{ marginBottom: 18 }}>
              <label
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontFamily: "var(--font-space-mono)",
                  fontSize: 11,
                  color: "var(--tam-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  marginBottom: 8,
                }}
              >
                <span>Playing card</span>
                {pvalDisplay !== null && (
                  <span
                    style={{
                      color:
                        pvalDisplay > 0
                          ? "var(--tam-pounamu)"
                          : pvalDisplay < 0
                            ? "var(--tam-warn)"
                            : "var(--tam-muted)",
                    }}
                  >
                    val {pvalDisplay > 0 ? "+" : ""}
                    {pvalDisplay}
                  </span>
                )}
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                <select value={pcRank} onChange={(e) => setPcRank(e.target.value)} style={INPUT_STYLE}>
                  <option value="">rank</option>
                  {Array.from(RANKS).map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                <select value={pcSuit} onChange={(e) => setPcSuit(e.target.value)} style={INPUT_STYLE}>
                  <option value="">suit</option>
                  {Array.from(SUITS).map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Note */}
            <div style={{ marginBottom: 20 }}>
              <label
                style={{
                  display: "block",
                  fontFamily: "var(--font-space-mono)",
                  fontSize: 11,
                  color: "var(--tam-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  marginBottom: 8,
                }}
              >
                Note (optional)
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={2}
                placeholder="anything relevant..."
                style={{ ...INPUT_STYLE, resize: "vertical", lineHeight: 1.5 }}
              />
            </div>

            {/* Feedback + Save */}
            {saveError && (
              <p
                style={{
                  fontFamily: "var(--font-space-mono)",
                  fontSize: 11,
                  color: "var(--tam-warn)",
                  marginBottom: 10,
                }}
              >
                {saveError}
              </p>
            )}
            {lastSaved && !saveError && (
              <p
                style={{
                  fontFamily: "var(--font-space-mono)",
                  fontSize: 11,
                  color: "var(--tam-pounamu)",
                  marginBottom: 10,
                }}
              >
                ✓ draw saved
              </p>
            )}
            <button
              onClick={save}
              style={{
                width: "100%",
                padding: "12px 0",
                borderRadius: 10,
                border: "none",
                background: "var(--tam-pounamu)",
                color: "#0d0c09",
                fontFamily: "var(--font-space-mono)",
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
                letterSpacing: "0.04em",
              }}
            >
              Save draw
            </button>
          </div>

          {/* ── Thread gap dashboard ── */}
          <div>
            <div className="tam-panel">
              <h2
                style={{
                  fontFamily: "var(--font-spectral)",
                  fontWeight: 600,
                  fontSize: 18,
                  margin: "0 0 4px",
                  color: "var(--tam-ink)",
                }}
              >
                Your thread gap
              </h2>
              <p
                style={{
                  color: "var(--tam-muted)",
                  fontSize: 12,
                  margin: "0 0 4px",
                  fontFamily: "var(--font-space-mono)",
                }}
              >
                {sessions.length} session{sessions.length !== 1 ? "s" : ""} · {sessions.filter((s) => s.cond === "up").length} coherent · {sessions.filter((s) => s.cond === "down").length} scattered
              </p>

              <DeckDisplay name="Tarot" label="symbolic deck" up={tUp} dn={tDn} gap={tGap} />
              <DeckDisplay name="Playing cards" label="plain deck" up={pUp} dn={pDn} gap={pGap} />

              <div
                style={{
                  marginTop: 16,
                  padding: 14,
                  borderRadius: 10,
                  border: "1px solid var(--tam-line)",
                  background: "var(--tam-surface-2)",
                  fontSize: 13,
                  color: "#cfcabf",
                  lineHeight: 1.55,
                  fontFamily: "var(--font-space-mono)",
                }}
              >
                {verdict}
              </div>
            </div>

            <div className="tam-panel" style={{ marginTop: 16 }}>
              <p
                style={{
                  fontFamily: "var(--font-space-mono)",
                  fontSize: 11,
                  color: "var(--tam-muted)",
                  margin: 0,
                  lineHeight: 1.8,
                }}
              >
                <a
                  href="/showcase/te-aho-matatu/paper.pdf"
                  style={{ color: "var(--tam-pounamu)" }}
                >
                  Download the protocol (PDF)
                </a>
                {" · "}
                <a href="/api/tam/codebook" style={{ color: "var(--tam-pounamu)" }}>
                  Download the scoring table
                </a>
                {" · "}
                <Link href="/showcase/te-aho-matatu" style={{ color: "var(--tam-pounamu)" }}>
                  View the live experiment
                </Link>
              </p>
              <p
                style={{
                  fontFamily: "var(--font-space-mono)",
                  fontSize: 10,
                  color: "var(--tam-muted)",
                  margin: "8px 0 0",
                  lineHeight: 1.6,
                }}
              >
                Orientation rule: upright/reversed is relative to the fixed camera frame, not the experimenter&apos;s view.
              </p>
            </div>
          </div>
        </div>

        {/* ── Session log ── */}
        {sessions.length > 0 ? (
          <div className="tam-panel" style={{ marginTop: 28 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-spectral)",
                  fontWeight: 600,
                  fontSize: 18,
                  margin: 0,
                  color: "var(--tam-ink)",
                }}
              >
                Session log
              </h2>
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  onClick={exportCsv}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 6,
                    border: "1px solid var(--tam-pounamu)",
                    background: "transparent",
                    color: "var(--tam-pounamu)",
                    fontFamily: "var(--font-space-mono)",
                    fontSize: 11,
                    cursor: "pointer",
                  }}
                >
                  Export CSV
                </button>
                <button
                  onClick={clearAll}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 6,
                    border: "1px solid var(--tam-warn)",
                    background: "transparent",
                    color: "var(--tam-warn)",
                    fontFamily: "var(--font-space-mono)",
                    fontSize: 11,
                    cursor: "pointer",
                  }}
                >
                  Clear all
                </button>
              </div>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontFamily: "var(--font-space-mono)",
                  fontSize: 11,
                }}
              >
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--tam-line)" }}>
                    {["#", "time", "cond", "mood", "tarot", "t-val", "t-hit", "card", "p-val", "p-hit", "note"].map(
                      (h) => (
                        <th
                          key={h}
                          style={{
                            textAlign: "left",
                            padding: "0 10px 8px 0",
                            color: "var(--tam-muted)",
                            fontWeight: 400,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {h}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {sessions.map((s, i) => (
                    <tr key={s.id} style={{ borderBottom: "1px solid var(--tam-line)", color: "#cfcabf" }}>
                      <td style={{ padding: "6px 10px 6px 0", color: "var(--tam-muted)" }}>
                        {sessions.length - i}
                      </td>
                      <td style={{ padding: "6px 10px 6px 0", color: "var(--tam-muted)", whiteSpace: "nowrap" }}>
                        {new Date(s.ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </td>
                      <td
                        style={{
                          padding: "6px 10px 6px 0",
                          color: s.cond === "up" ? "var(--tam-pounamu)" : "var(--tam-scatter)",
                        }}
                      >
                        {s.cond === "up" ? "↑" : "↓"}
                      </td>
                      <td style={{ padding: "6px 10px 6px 0" }}>
                        {s.mood > 0 ? "+" : ""}
                        {s.mood}
                      </td>
                      <td style={{ padding: "6px 10px 6px 0", whiteSpace: "nowrap" }}>
                        {s.tarot} {s.tarot_reversed ? "↓" : "↑"}
                      </td>
                      <td
                        style={{
                          padding: "6px 10px 6px 0",
                          color:
                            s.tval > 0
                              ? "var(--tam-pounamu)"
                              : s.tval < 0
                                ? "var(--tam-warn)"
                                : "var(--tam-muted)",
                        }}
                      >
                        {s.tval > 0 ? "+" : ""}
                        {s.tval}
                      </td>
                      <td style={{ padding: "6px 10px 6px 0" }}>
                        {s.thit === null ? "—" : s.thit ? "✓" : "✗"}
                      </td>
                      <td style={{ padding: "6px 10px 6px 0" }}>{s.pc}</td>
                      <td
                        style={{
                          padding: "6px 10px 6px 0",
                          color:
                            s.pval > 0
                              ? "var(--tam-pounamu)"
                              : s.pval < 0
                                ? "var(--tam-warn)"
                                : "var(--tam-muted)",
                        }}
                      >
                        {s.pval > 0 ? "+" : ""}
                        {s.pval}
                      </td>
                      <td style={{ padding: "6px 10px 6px 0" }}>
                        {s.phit === null ? "—" : s.phit ? "✓" : "✗"}
                      </td>
                      <td style={{ padding: "6px 10px 6px 0", color: "var(--tam-muted)" }}>
                        {s.note || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div
            className="tam-panel"
            style={{ marginTop: 28, textAlign: "center", padding: "32px 20px" }}
          >
            <p
              style={{
                fontFamily: "var(--font-space-mono)",
                fontSize: 13,
                color: "var(--tam-muted)",
                margin: 0,
              }}
            >
              No sessions yet — log your first draw above.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
