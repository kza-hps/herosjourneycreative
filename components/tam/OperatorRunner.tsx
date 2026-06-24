"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { TAROT, SUIT_VALENCE, RANKS, SUITS, dirHit } from "@/lib/tam/frozen";

interface Props {
  isOperator: boolean;
}

const TAROT_CARDS = Object.keys(TAROT);

function valColor(v: number) {
  return v > 0 ? "var(--tam-thread)" : v < 0 ? "var(--tam-warn)" : "var(--tam-muted)";
}

function fmtVal(v: number) {
  return (v > 0 ? "+" : "") + v;
}

function scoreChip(label: string, val: number, hit: boolean | null) {
  const isHit = hit === true;
  return (
    <span
      key={label}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        fontSize: 13,
        fontFamily: "var(--font-space-mono)",
        padding: "5px 11px",
        borderRadius: 8,
        border: `1px solid ${isHit ? "rgba(95,184,166,.5)" : "var(--tam-line)"}`,
        background: isHit ? "rgba(95,184,166,.08)" : "transparent",
        color: isHit ? "var(--tam-pounamu)" : "var(--tam-muted)",
        marginRight: 8,
        marginTop: 6,
      }}
    >
      {label} {fmtVal(val)} · {hit === null ? "—" : hit ? "hit" : "miss"}
    </span>
  );
}

function CardReference() {
  const tarotEntries = Object.entries(TAROT);
  const suitEntries = Object.entries(SUIT_VALENCE);

  return (
    <details style={{ textAlign: "left" }}>
      <summary
        style={{
          cursor: "pointer",
          fontFamily: "var(--font-space-mono)",
          fontSize: 11,
          letterSpacing: "0.1em",
          color: "var(--tam-muted)",
          listStyle: "none",
          userSelect: "none",
        }}
      >
        ▾ Card reference
      </summary>
      <div
        style={{
          marginTop: 10,
          padding: 14,
          background: "var(--tam-surface-2)",
          border: "1px solid var(--tam-line)",
          borderRadius: 10,
        }}
      >
        {/* Suit valences */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontFamily: "var(--font-space-mono)", fontSize: 10, color: "var(--tam-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>
            Playing cards — by suit
          </div>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {suitEntries.map(([suit, val]) => (
              <span key={suit} style={{ fontFamily: "var(--font-space-mono)", fontSize: 13, color: val > 0 ? "var(--tam-thread)" : "var(--tam-scatter)" }}>
                {suit} {fmtVal(val)}
              </span>
            ))}
          </div>
          <div style={{ fontFamily: "var(--font-space-mono)", fontSize: 10, color: "var(--tam-muted)", marginTop: 4 }}>
            Red (♥ ♦) = +1 &nbsp;·&nbsp; Black (♣ ♠) = −1
          </div>
        </div>

        {/* Tarot valences — upright + reversed columns */}
        <div style={{ fontFamily: "var(--font-space-mono)", fontSize: 10, color: "var(--tam-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>
          Tarot — {tarotEntries.length} cards (pre-registered RWS valences)
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: "1px 10px", fontFamily: "var(--font-space-mono)", fontSize: 10, color: "var(--tam-muted)", marginBottom: 4, paddingBottom: 4, borderBottom: "1px solid var(--tam-line)" }}>
          <span />
          <span style={{ textAlign: "right" }}>↑ up</span>
          <span style={{ textAlign: "right" }}>↓ rev</span>
        </div>
        <div
          style={{
            display: "grid",
            gap: "2px 0",
            maxHeight: 240,
            overflowY: "auto",
          }}
        >
          {tarotEntries.map(([card, vals]) => (
            <div
              key={card}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto auto",
                gap: "0 10px",
                fontFamily: "var(--font-space-mono)",
                fontSize: 11,
                padding: "2px 0",
                borderBottom: "1px solid var(--tam-line)",
                alignItems: "center",
              }}
            >
              <span style={{ color: "var(--tam-muted)" }}>{card}</span>
              <span style={{ color: valColor(vals.upright), textAlign: "right", minWidth: 28 }}>{fmtVal(vals.upright)}</span>
              <span style={{ color: valColor(vals.reversed), textAlign: "right", minWidth: 28 }}>{fmtVal(vals.reversed)}</span>
            </div>
          ))}
        </div>
      </div>
    </details>
  );
}

function TokenGate({ onAuth }: { onAuth: () => void }) {
  const [token, setToken] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch("/api/tam/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    setLoading(false);
    if (res.ok) {
      onAuth();
    } else {
      const data = await res.json().catch(() => ({}));
      setError((data as { error?: string }).error ?? "Invalid token.");
    }
  }

  return (
    <form onSubmit={submit} style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "flex-start" }}>
      <input
        type="password"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Operator token"
        autoComplete="current-password"
        required
        style={{
          background: "var(--tam-surface-2)",
          color: "var(--tam-ink)",
          border: "1px solid var(--tam-line)",
          borderRadius: 9,
          padding: "9px 10px",
          fontFamily: "var(--font-space-mono)",
          fontSize: 13,
          width: 220,
        }}
      />
      <button
        type="submit"
        disabled={loading}
        style={{
          background: "var(--tam-surface-2)",
          color: "var(--tam-ink)",
          border: "1px solid var(--tam-line)",
          borderRadius: 10,
          padding: "9px 16px",
          fontFamily: "Inter, system-ui, sans-serif",
          fontWeight: 600,
          fontSize: 13,
          cursor: loading ? "wait" : "pointer",
        }}
      >
        {loading ? "Checking…" : "Authenticate"}
      </button>
      {error && (
        <p style={{ color: "var(--tam-warn)", fontSize: 13, margin: "4px 0 0", width: "100%" }}>
          {error}
        </p>
      )}
    </form>
  );
}

export default function OperatorRunner({ isOperator }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(isOperator);
  const [authed, setAuthed] = useState(isOperator);

  const [condition, setCondition] = useState<"up" | "down" | null>(null);
  const [flipping, setFlipping] = useState(false);
  const [flipLabel, setFlipLabel] = useState("— flip —");
  const [stateValence, setStateValence] = useState(0);
  const [tarotCard, setTarotCard] = useState("");
  const [tarotReversed, setTarotReversed] = useState<boolean | null>(null);
  const [pcRank, setPcRank] = useState("");
  const [pcSuit, setPcSuit] = useState<string>("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [note, setNote] = useState("");
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

  const flip = useCallback(() => {
    if (flipping) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const settle = (c: "up" | "down") => {
      setCondition(c);
      setFlipping(false);
      setFlipLabel(c === "up" ? "Coherent ∑Mi↑" : "Scattered ∑Mi↓");
    };
    if (reduce) {
      settle(Math.random() < 0.5 ? "up" : "down");
      return;
    }
    setFlipping(true);
    let n = 0;
    intervalRef.current = setInterval(() => {
      setFlipLabel(n % 2 === 0 ? "Coherent ∑Mi↑" : "Scattered ∑Mi↓");
      if (++n > 7) {
        clearInterval(intervalRef.current!);
        settle(Math.random() < 0.5 ? "up" : "down");
      }
    }, 70);
  }, [flipping]);

  function resetForm() {
    setCondition(null);
    setFlipLabel("— flip —");
    setStateValence(0);
    setTarotCard("");
    setTarotReversed(null);
    setPcRank("");
    setPcSuit("");
    setYoutubeUrl("");
    setNote("");
    setSaveError(null);
    setLastSaved(null);
  }

  async function save() {
    if (!condition) { setSaveError("Flip the coin to set the condition first."); return; }
    if (!tarotCard) { setSaveError("Record the tarot card you drew."); return; }
    if (tarotReversed === null) { setSaveError("Select the card orientation (Upright or Reversed) as seen by the camera."); return; }
    if (!pcRank || !pcSuit) { setSaveError("Record the playing card you drew."); return; }

    setSaving(true);
    setSaveError(null);

    const res = await fetch("/api/tam/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        condition,
        state_valence: stateValence,
        tarot_card: tarotCard,
        tarot_reversed: tarotReversed,
        pc_rank: pcRank,
        pc_suit: pcSuit,
        youtube_url: youtubeUrl || undefined,
        note: note || undefined,
      }),
    });

    setSaving(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setSaveError((data as { error?: string }).error ?? "Failed to save.");
      return;
    }

    const saved = await res.json();
    setLastSaved(saved.id as string);
    resetForm();
    router.refresh();
  }

  // Live score preview
  const tarotVal =
    tarotCard && tarotReversed !== null
      ? tarotReversed
        ? TAROT[tarotCard].reversed
        : TAROT[tarotCard].upright
      : null;
  const suitVal = pcSuit ? SUIT_VALENCE[pcSuit] : null;
  const tarotHit = tarotVal !== null ? dirHit(tarotVal, stateValence) : null;
  const playHit = suitVal !== null ? dirHit(suitVal, stateValence) : null;

  const pillColor =
    condition === "up"
      ? { color: "var(--tam-thread)", border: "1px solid var(--tam-thread)", background: "rgba(224,165,94,.08)" }
      : condition === "down"
        ? { color: "var(--tam-scatter)", border: "1px solid var(--tam-scatter)", background: "rgba(111,135,148,.10)" }
        : { color: "var(--tam-muted)", border: "1px solid var(--tam-line)", background: "transparent" };

  return (
    <details
      open={open}
      onToggle={(e) => setOpen((e.currentTarget as HTMLDetailsElement).open)}
      style={{ marginTop: 24 }}
    >
      <summary
        style={{
          cursor: "pointer",
          fontFamily: "var(--font-space-mono)",
          fontSize: 11,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--tam-muted)",
          listStyle: "none",
          display: "flex",
          alignItems: "center",
          gap: 6,
          userSelect: "none",
        }}
      >
        <span style={{ fontSize: 10 }}>{open ? "▴" : "▾"}</span> Operator
      </summary>

      <div className="tam-panel" style={{ marginTop: 12 }}>
        {!authed ? (
          <div>
            <h2 style={{ fontFamily: "var(--font-spectral)", fontWeight: 600, fontSize: 20, margin: "0 0 12px" }}>
              Operator access
            </h2>
            <TokenGate onAuth={() => { setAuthed(true); router.refresh(); }} />
          </div>
        ) : (
          <div>
            <h2 style={{ fontFamily: "var(--font-spectral)", fontWeight: 600, fontSize: 20, margin: "0 0 4px" }}>
              Run a session
            </h2>
            <p style={{ color: "var(--tam-muted)", fontSize: 13, margin: "0 0 16px" }}>
              One card per deck. Log your state <em>before</em> you draw. Don&apos;t interpret — just record.
            </p>

            {/* Step 1: Coin flip */}
            <div style={{ borderTop: "1px solid var(--tam-line)", padding: "16px 0" }}>
              <div style={{ fontFamily: "var(--font-space-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--tam-muted)", marginBottom: 8 }}>
                1 · Condition (coin decides, not you)
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                <div
                  style={{
                    fontFamily: "var(--font-spectral)",
                    fontSize: 22,
                    padding: "8px 18px",
                    borderRadius: 999,
                    minWidth: 160,
                    textAlign: "center",
                    ...pillColor,
                  }}
                >
                  {flipLabel}
                </div>
                <button
                  onClick={flip}
                  disabled={flipping}
                  style={{
                    fontFamily: "Inter, system-ui, sans-serif",
                    fontWeight: 600,
                    fontSize: 14,
                    cursor: flipping ? "wait" : "pointer",
                    borderRadius: 10,
                    padding: "11px 18px",
                    border: "1px solid var(--tam-line)",
                    background: "var(--tam-surface-2)",
                    color: "var(--tam-ink)",
                  }}
                >
                  Flip the coin
                </button>
              </div>
              {condition && (
                <p style={{ fontSize: 14, color: "#cfcabf", marginTop: 10 }}>
                  {condition === "up"
                    ? "Attune. Breathe, settle, hold your real state for a couple of minutes — then draw."
                    : "Stay scattered. Count down from 100 by 7s, rushed and distracted, while you shuffle — then draw."}
                </p>
              )}
            </div>

            {/* Step 2: State slider */}
            <div style={{ borderTop: "1px solid var(--tam-line)", padding: "16px 0" }}>
              <div style={{ fontFamily: "var(--font-space-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--tam-muted)", marginBottom: 8 }}>
                2 · Your state right now (before drawing)
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontFamily: "var(--font-space-mono)", fontSize: 20, width: 46, textAlign: "center" }}>
                  {stateValence > 0 ? "+" : ""}{stateValence}
                </span>
                <input
                  type="range"
                  min={-5}
                  max={5}
                  value={stateValence}
                  step={1}
                  onChange={(e) => setStateValence(Number(e.target.value))}
                  style={{ flex: 1, accentColor: "var(--tam-thread)", height: 4 }}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-space-mono)", fontSize: 11, color: "var(--tam-muted)", marginTop: 2 }}>
                <span>−5 rough</span><span>0</span><span>+5 great</span>
              </div>
            </div>

            {/* Step 3: Cards */}
            <div style={{ borderTop: "1px solid var(--tam-line)", padding: "16px 0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
                <div style={{ fontFamily: "var(--font-space-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--tam-muted)" }}>
                  3 · Draw, then record both cards
                </div>
                <CardReference />
              </div>
              <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
                {/* Tarot card + orientation */}
                <div>
                  <label style={{ display: "block", fontSize: 12, color: "var(--tam-muted)", marginBottom: 5 }} htmlFor="tarot-select">
                    Tarot card drawn
                  </label>
                  <select
                    id="tarot-select"
                    value={tarotCard}
                    onChange={(e) => setTarotCard(e.target.value)}
                    style={{
                      width: "100%",
                      background: "var(--tam-surface-2)",
                      color: "var(--tam-ink)",
                      border: "1px solid var(--tam-line)",
                      borderRadius: 9,
                      padding: "9px 10px",
                      fontFamily: "Inter, system-ui, sans-serif",
                      fontSize: 14,
                    }}
                  >
                    <option value="">Select…</option>
                    {TAROT_CARDS.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>

                  {/* Orientation toggle — required, defaults to unselected */}
                  <div style={{ marginTop: 8 }}>
                    <div style={{ fontSize: 11, color: "var(--tam-muted)", fontFamily: "var(--font-space-mono)", marginBottom: 5 }}>
                      Orientation — as seen by the camera
                    </div>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button
                        type="button"
                        onClick={() => setTarotReversed(false)}
                        style={{
                          padding: "6px 14px",
                          borderRadius: 8,
                          border: `1px solid ${tarotReversed === false ? "var(--tam-thread)" : "var(--tam-line)"}`,
                          background: tarotReversed === false ? "rgba(224,165,94,.12)" : "transparent",
                          color: tarotReversed === false ? "var(--tam-thread)" : "var(--tam-muted)",
                          fontFamily: "var(--font-space-mono)",
                          fontSize: 12,
                          cursor: "pointer",
                        }}
                      >
                        ↑ Upright
                      </button>
                      <button
                        type="button"
                        onClick={() => setTarotReversed(true)}
                        style={{
                          padding: "6px 14px",
                          borderRadius: 8,
                          border: `1px solid ${tarotReversed === true ? "var(--tam-warn)" : "var(--tam-line)"}`,
                          background: tarotReversed === true ? "rgba(211,91,91,.08)" : "transparent",
                          color: tarotReversed === true ? "var(--tam-warn)" : "var(--tam-muted)",
                          fontFamily: "var(--font-space-mono)",
                          fontSize: 12,
                          cursor: "pointer",
                        }}
                      >
                        ↓ Reversed
                      </button>
                    </div>
                  </div>
                </div>

                {/* Playing card */}
                <div>
                  <label style={{ display: "block", fontSize: 12, color: "var(--tam-muted)", marginBottom: 5 }}>
                    Playing card drawn
                  </label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 80px", gap: 8 }}>
                    <select
                      value={pcRank}
                      onChange={(e) => setPcRank(e.target.value)}
                      style={{
                        background: "var(--tam-surface-2)",
                        color: "var(--tam-ink)",
                        border: "1px solid var(--tam-line)",
                        borderRadius: 9,
                        padding: "9px 10px",
                        fontFamily: "Inter, system-ui, sans-serif",
                        fontSize: 14,
                      }}
                    >
                      <option value="">Rank…</option>
                      {RANKS.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                    <select
                      value={pcSuit}
                      onChange={(e) => setPcSuit(e.target.value)}
                      style={{
                        background: "var(--tam-surface-2)",
                        color: "var(--tam-ink)",
                        border: "1px solid var(--tam-line)",
                        borderRadius: 9,
                        padding: "9px 10px",
                        fontFamily: "Inter, system-ui, sans-serif",
                        fontSize: 14,
                      }}
                    >
                      <option value="">Suit…</option>
                      {SUITS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: 8 }}>
                {tarotVal !== null && scoreChip(
                  `tarot ${tarotCard} ${tarotReversed ? "↓rev" : "↑up"}`,
                  tarotVal,
                  tarotHit
                )}
                {suitVal !== null && scoreChip(`playing ${pcSuit}`, suitVal, playHit)}
              </div>
            </div>

            {/* Step 4: Clip + note */}
            <div style={{ borderTop: "1px solid var(--tam-line)", padding: "16px 0" }}>
              <div style={{ fontFamily: "var(--font-space-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--tam-muted)", marginBottom: 8 }}>
                4 · Optional — link the clip & a note
              </div>
              <div style={{ display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
                <input
                  type="url"
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  placeholder="https://… YouTube URL of this session"
                  style={{
                    background: "var(--tam-surface-2)",
                    color: "var(--tam-ink)",
                    border: "1px solid var(--tam-line)",
                    borderRadius: 9,
                    padding: "9px 10px",
                    fontFamily: "Inter, system-ui, sans-serif",
                    fontSize: 14,
                  }}
                />
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Note (optional)"
                  style={{
                    background: "var(--tam-surface-2)",
                    color: "var(--tam-ink)",
                    border: "1px solid var(--tam-line)",
                    borderRadius: 9,
                    padding: "9px 10px",
                    fontFamily: "Inter, system-ui, sans-serif",
                    fontSize: 14,
                  }}
                />
              </div>
            </div>

            {saveError && (
              <p style={{ color: "var(--tam-warn)", fontSize: 13, margin: "4px 0 8px" }}>{saveError}</p>
            )}
            {lastSaved && (
              <p style={{ color: "var(--tam-pounamu)", fontSize: 13, margin: "4px 0 8px", fontFamily: "var(--font-space-mono)" }}>
                Saved {lastSaved}
              </p>
            )}

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 8 }}>
              <button
                onClick={save}
                disabled={saving}
                style={{
                  fontFamily: "Inter, system-ui, sans-serif",
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: saving ? "wait" : "pointer",
                  borderRadius: 10,
                  padding: "11px 18px",
                  border: "1px solid var(--tam-thread)",
                  background: "var(--tam-thread)",
                  color: "#241a0d",
                }}
              >
                {saving ? "Saving…" : "Save session"}
              </button>
              <button
                onClick={resetForm}
                style={{
                  fontFamily: "Inter, system-ui, sans-serif",
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: "pointer",
                  borderRadius: 10,
                  padding: "11px 18px",
                  border: "1px solid var(--tam-line)",
                  background: "transparent",
                  color: "var(--tam-ink)",
                }}
              >
                Reset form
              </button>
            </div>
          </div>
        )}
      </div>
    </details>
  );
}
