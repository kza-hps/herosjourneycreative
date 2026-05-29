"use client";

import Image from "next/image";
import { useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", lane: "Workshops", note: "" });

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  if (sent) {
    return (
      <div
        style={{
          border: "2px solid var(--hjc-black)",
          background: "var(--hjc-yellow)",
          padding: "30px",
          display: "flex",
          gap: "20px",
          alignItems: "center",
        }}
      >
        <div className="relative flex-none" style={{ width: "54px", height: "54px" }}>
          <Image
            src="/brand/assets/bust-yellow.png"
            alt=""
            fill
            sizes="54px"
            className="object-contain"
            style={{ filter: "brightness(0)" }}
          />
        </div>
        <div>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              textTransform: "uppercase",
              fontSize: "1.4rem",
              margin: "0 0 4px",
              color: "var(--hjc-black)",
            }}
          >
            Message received
          </h3>
          <p style={{ margin: 0, color: "#3a2c00", fontSize: "0.98rem" }}>
            Thank you — we&apos;ll be in touch. (Illustrative — no message was actually sent.)
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); setSent(true); }}
      className="grid grid-cols-2 gap-[22px] max-[880px]:grid-cols-1"
    >
      {/* Name */}
      <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
        <label
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--fg3)",
          }}
        >
          Your name
        </label>
        <input
          type="text"
          className="hjc-input"
          placeholder="Begin here…"
          value={form.name}
          onChange={set("name")}
          required
        />
      </div>

      {/* Email */}
      <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
        <label
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--fg3)",
          }}
        >
          Email
        </label>
        <input
          type="email"
          className="hjc-input"
          placeholder="you@example.com"
          value={form.email}
          onChange={set("email")}
          required
        />
      </div>

      {/* Which lane — full width */}
      <div style={{ gridColumn: "1 / -1", display: "flex", flexDirection: "column", gap: "7px" }}>
        <label
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--fg3)",
          }}
        >
          Which lane?
        </label>
        <select className="hjc-input" value={form.lane} onChange={set("lane")}>
          <option>Workshops</option>
          <option>Legacy &amp; Personal Story</option>
          <option>Personal Myth Authoring</option>
          <option>A project / collaboration</option>
          <option>General enquiry</option>
        </select>
      </div>

      {/* What are you working on — full width */}
      <div style={{ gridColumn: "1 / -1", display: "flex", flexDirection: "column", gap: "7px" }}>
        <label
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--fg3)",
          }}
        >
          What are you working on?
        </label>
        <textarea
          className="hjc-input"
          placeholder="A memoir, a cohort, a story world, an archive…"
          value={form.note}
          onChange={set("note")}
          rows={5}
          style={{ resize: "vertical", minHeight: "120px", lineHeight: 1.5 }}
        />
      </div>

      {/* Footer row — full width */}
      <div
        style={{
          gridColumn: "1 / -1",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "4px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--fg3)",
          }}
        >
          We reply to every enquiry.
        </span>
        <button type="submit" className="hjc-btn-submit">
          Send Enquiry →
        </button>
      </div>
    </form>
  );
}
