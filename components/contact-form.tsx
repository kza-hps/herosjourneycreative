"use client";

import Image from "next/image";
import { useState } from "react";

const contactEmail = "kauri@herosjourneycreative.co.nz";

interface ContactFormProps {
  initialLane?: string;
  notePlaceholder?: string;
  initialPkg?: string;
}

export default function ContactForm({
  initialLane = "Workshops",
  notePlaceholder = "A memoir, a cohort, a story world, an archive...",
  initialPkg = "",
}: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({ name: "", email: "", lane: initialLane, note: "", website: "", pkg: initialPkg });

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message ?? "Something went wrong. Please email us directly.");
      }

      setStatus("sent");
      setMessage(data.message ?? "Thanks, your enquiry has been received.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong. Please email us directly.");
    }
  }

  if (status === "sent") {
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
          <p style={{ margin: 0, color: "#3a2c00", fontSize: "0.98rem" }}>{message}</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid grid-cols-2 gap-[22px] max-[880px]:grid-cols-1">
      <input
        type="text"
        name="website"
        value={form.website}
        onChange={set("website")}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ display: "none" }}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
        <label
          htmlFor="contact-name"
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
          id="contact-name"
          name="name"
          type="text"
          className="hjc-input"
          placeholder="Begin here..."
          value={form.name}
          onChange={set("name")}
          required
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
        <label
          htmlFor="contact-email"
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
          id="contact-email"
          name="email"
          type="email"
          className="hjc-input"
          placeholder="you@example.com"
          value={form.email}
          onChange={set("email")}
          required
        />
      </div>

      <div style={{ gridColumn: "1 / -1", display: "flex", flexDirection: "column", gap: "7px" }}>
        <label
          htmlFor="contact-lane"
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
        <select id="contact-lane" name="lane" className="hjc-input" value={form.lane} onChange={set("lane")}>
          <option>Website Refresh</option>
          <option>Workshops</option>
          <option>Legacy &amp; Personal Story</option>
          <option>Personal Myth Authoring</option>
          <option>A project / collaboration</option>
          <option>General enquiry</option>
        </select>
      </div>

      <div style={{ gridColumn: "1 / -1", display: "flex", flexDirection: "column", gap: "7px" }}>
        <label
          htmlFor="contact-note"
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
          id="contact-note"
          name="note"
          className="hjc-input"
          placeholder={notePlaceholder}
          value={form.note}
          onChange={set("note")}
          rows={5}
          style={{ resize: "vertical", minHeight: "120px", lineHeight: 1.5 }}
        />
      </div>

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
            maxWidth: "520px",
            lineHeight: 1.6,
          }}
          role={status === "error" ? "alert" : undefined}
        >
          {status === "error" ? (
            <>
              {message}{" "}
              <a href={`mailto:${contactEmail}`} className="hjc-lnk">
                Email directly
              </a>
            </>
          ) : (
            "We reply to every enquiry."
          )}
        </span>
        <button type="submit" className="hjc-btn-submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending..." : "Send Enquiry ->"}
        </button>
      </div>
    </form>
  );
}
