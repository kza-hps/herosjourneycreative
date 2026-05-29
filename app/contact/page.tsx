import ContactForm from "@/components/contact-form";

export default function ContactPage() {
  return (
    <div
      className="hjc-fade flex-1"
      style={{ padding: "72px 0 80px", background: "var(--bg)" }}
    >
      <div className="max-w-[1200px] mx-auto px-8 max-[880px]:px-5">
        {/* Page header */}
        <span className="hjc-kick block mb-[18px]">Initiate Contact</span>
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
          Begin the
          <br />
          conversation
        </h1>
        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "48px 0" }} />

        {/* Two-column layout: form + contact aside */}
        <div
          className="grid grid-cols-[1.4fr_1fr] gap-14 max-[880px]:grid-cols-1 max-[880px]:gap-10"
        >
          {/* Form */}
          <ContactForm />

          {/* Contact info aside — 2px yellow left rule */}
          <aside className="hjc-cinfo">
            <div style={{ marginBottom: "22px" }}>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--fg3)",
                  marginBottom: "5px",
                }}
              >
                Studio
              </div>
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.05rem",
                  color: "var(--fg1)",
                }}
              >
                Aotearoa New Zealand
              </div>
            </div>

            <div style={{ marginBottom: "22px" }}>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--fg3)",
                  marginBottom: "5px",
                }}
              >
                In person &amp; remote
              </div>
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.05rem",
                  color: "var(--fg1)",
                }}
              >
                Local retreats · international cohorts
              </div>
            </div>

            <div style={{ marginBottom: "22px" }}>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--fg3)",
                  marginBottom: "5px",
                }}
              >
                Contact details
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  color: "var(--fg3)",
                }}
              >
                To be confirmed by the studio.
              </div>
            </div>

            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--fg3)",
                lineHeight: 1.6,
                marginTop: "32px",
              }}
            >
              Consultations by arrangement.
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
