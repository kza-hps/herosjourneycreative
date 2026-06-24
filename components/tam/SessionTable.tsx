"use client";

import type { TamSession } from "@/lib/tam/frozen";
import YoutubeThumb from "./YoutubeThumb";

interface Props {
  sessions: TamSession[];
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function DirDot({ hit }: { hit: boolean | null }) {
  if (hit === null)
    return <span style={{ color: "#555a68" }}>—</span>;
  if (hit)
    return <span style={{ color: "var(--tam-pounamu)" }}>●</span>;
  return <span style={{ color: "#555a68" }}>○</span>;
}

function exportCsv(sessions: TamSession[]) {
  const head = [
    "id",
    "timestamp",
    "condition",
    "state_valence",
    "tarot_card",
    "tarot_reversed",
    "tarot_valence",
    "tarot_dir_hit",
    "playing_card",
    "playing_valence",
    "playing_dir_hit",
    "youtube_url",
    "note",
  ];
  const rows = sessions.map((s) =>
    [
      s.id,
      s.created_at,
      s.condition,
      s.state_valence,
      s.tarot_card,
      s.tarot_reversed,
      s.tarot_valence,
      s.tarot_dir_hit,
      s.playing_card,
      s.playing_valence,
      s.playing_dir_hit,
      s.youtube_url ?? "",
      (s.note ?? "").replace(/"/g, '""'),
    ]
      .map((x) => `"${x ?? ""}"`)
      .join(",")
  );
  const blob = new Blob([head.join(",") + "\n" + rows.join("\n")], {
    type: "text/csv",
  });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "te-aho-matatu-sessions.csv";
  a.click();
}

export default function SessionTable({ sessions }: Props) {
  return (
    <section className="tam-panel">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          flexWrap: "wrap",
          gap: 8,
          marginBottom: 16,
        }}
      >
        <div>
          <h2 style={{ fontFamily: "var(--font-spectral)", fontWeight: 600, fontSize: 20, margin: "0 0 2px" }}>
            Session record
          </h2>
          <p style={{ color: "var(--tam-muted)", fontSize: 13, margin: 0 }}>
            Every session, hits and misses. The log is the evidence.
          </p>
        </div>
        {sessions.length > 0 && (
          <button
            onClick={() => exportCsv(sessions)}
            style={{
              fontFamily: "var(--font-space-mono)",
              fontSize: 12,
              padding: "8px 14px",
              border: "1px solid var(--tam-line)",
              borderRadius: 8,
              background: "var(--tam-surface-2)",
              color: "var(--tam-ink)",
              cursor: "pointer",
            }}
          >
            Export CSV
          </button>
        )}
      </div>

      {sessions.length === 0 ? (
        <p style={{ color: "var(--tam-muted)", fontSize: 14, padding: "18px 0" }}>
          No sessions yet — flip the coin and run your first one.
        </p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              borderCollapse: "collapse",
              width: "100%",
              fontSize: 13,
            }}
          >
            <thead>
              <tr>
                {["ID", "When", "∑Mi", "State", "Tarot", "val", "dir", "Playing", "val", "dir", "Clip"].map(
                  (h) => (
                    <th
                      key={h}
                      style={{
                        textAlign: "left",
                        padding: "8px 10px",
                        borderBottom: "1px solid var(--tam-line)",
                        fontFamily: "var(--font-space-mono)",
                        fontSize: 11,
                        letterSpacing: "0.06em",
                        color: "var(--tam-muted)",
                        textTransform: "uppercase",
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
              {sessions.map((s) => (
                <tr key={s.id}>
                  <td
                    style={{
                      padding: "8px 10px",
                      borderBottom: "1px solid var(--tam-line)",
                      fontFamily: "var(--font-space-mono)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {s.id}
                  </td>
                  <td
                    style={{
                      padding: "8px 10px",
                      borderBottom: "1px solid var(--tam-line)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {formatDate(s.created_at)}
                  </td>
                  <td style={{ padding: "8px 10px", borderBottom: "1px solid var(--tam-line)" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-space-mono)",
                        fontSize: 11,
                        padding: "2px 7px",
                        borderRadius: 6,
                        color: s.condition === "up" ? "var(--tam-thread)" : "var(--tam-scatter)",
                        background:
                          s.condition === "up"
                            ? "rgba(224,165,94,0.1)"
                            : "rgba(111,135,148,0.12)",
                      }}
                    >
                      {s.condition === "up" ? "∑Mi↑" : "∑Mi↓"}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "8px 10px",
                      borderBottom: "1px solid var(--tam-line)",
                      fontFamily: "var(--font-space-mono)",
                    }}
                  >
                    {s.state_valence > 0 ? "+" : ""}{s.state_valence}
                  </td>
                  <td style={{ padding: "8px 10px", borderBottom: "1px solid var(--tam-line)", whiteSpace: "nowrap" }}>
                    {s.tarot_card}{" "}
                    <span style={{ fontFamily: "var(--font-space-mono)", fontSize: 10, color: "var(--tam-muted)" }}>
                      {s.tarot_reversed ? "↓" : "↑"}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "8px 10px",
                      borderBottom: "1px solid var(--tam-line)",
                      fontFamily: "var(--font-space-mono)",
                    }}
                  >
                    {s.tarot_valence > 0 ? "+" : ""}{s.tarot_valence}
                  </td>
                  <td style={{ padding: "8px 10px", borderBottom: "1px solid var(--tam-line)" }}>
                    <DirDot hit={s.tarot_dir_hit} />
                  </td>
                  <td
                    style={{
                      padding: "8px 10px",
                      borderBottom: "1px solid var(--tam-line)",
                      fontFamily: "var(--font-space-mono)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {s.playing_card}
                  </td>
                  <td
                    style={{
                      padding: "8px 10px",
                      borderBottom: "1px solid var(--tam-line)",
                      fontFamily: "var(--font-space-mono)",
                    }}
                  >
                    {s.playing_valence > 0 ? "+" : ""}{s.playing_valence}
                  </td>
                  <td style={{ padding: "8px 10px", borderBottom: "1px solid var(--tam-line)" }}>
                    <DirDot hit={s.playing_dir_hit} />
                  </td>
                  <td style={{ padding: "8px 10px", borderBottom: "1px solid var(--tam-line)", minWidth: 120 }}>
                    {s.youtube_id ? (
                      <YoutubeThumb youtubeId={s.youtube_id} title={s.id} />
                    ) : (
                      <span style={{ color: "#555a68" }}>—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p
        style={{
          marginTop: 14,
          color: "var(--tam-muted)",
          fontSize: 12.5,
          lineHeight: 1.5,
        }}
      >
        Scoring rule (frozen): a <b style={{ color: "var(--tam-ink)" }}>directional hit</b> = the card&apos;s pre-assigned valence has the same sign as your logged state. Tarot valences are a Rider–Waite–Smith pre-registered reference for this run. Playing cards: red = +, black = −.
      </p>
    </section>
  );
}
