import ContactForm from "@/components/contact-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Hero's Journey Creative",
  description:
    "Start a conversation with Hero's Journey Creative about workshops, writing projects, story worlds, websites, or AI-assisted digital work.",
  alternates: { canonical: "/contact" },
};

const WEBSITE_REFRESH_INTERESTS = new Set([
  "website-refresh",
  "free-preview",
  "preview-followup",
  "starter",
  "local",
  "growth",
  "full",
  "domain-recovery",
]);

const PACKAGE_LABELS: Record<string, string> = {
  starter: "Starter package (3 pages, $300)",
  local: "Local package (5 pages, $500)",
  growth: "Growth package (8 pages, $800)",
  full: "Full package (12 pages, $1,200)",
};

function resolveFormDefaults(interest: string | undefined, pkg: string | undefined): {
  initialLane: string;
  notePlaceholder: string;
  initialPkg: string;
} {
  if (!interest) return { initialLane: "Workshops", notePlaceholder: "A memoir, a cohort, a story world, an archive...", initialPkg: "" };

  if (WEBSITE_REFRESH_INTERESTS.has(interest)) {
    const pkgLabel = pkg ? (PACKAGE_LABELS[pkg] ?? "") : "";
    const notePlaceholder =
      interest === "preview-followup"
        ? "Paste your preview link here, or tell us which business the preview was created for."
        : pkgLabel
        ? `I'm interested in the ${pkgLabel}. My current website address is...`
        : "Tell us your current website address and what kind of refresh you are interested in.";
    return { initialLane: "Website Refresh", notePlaceholder, initialPkg: pkg ?? "" };
  }

  return { initialLane: "Workshops", notePlaceholder: "A memoir, a cohort, a story world, an archive...", initialPkg: "" };
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ interest?: string | string[]; package?: string | string[] }>;
}) {
  const resolvedParams = await searchParams;
  const interest = Array.isArray(resolvedParams.interest) ? resolvedParams.interest[0] : resolvedParams.interest;
  const pkg = Array.isArray(resolvedParams.package) ? resolvedParams.package[0] : resolvedParams.package;
  const { initialLane, notePlaceholder, initialPkg } = resolveFormDefaults(interest, pkg);
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
          <ContactForm key={`${initialLane}-${initialPkg}`} initialLane={initialLane} notePlaceholder={notePlaceholder} initialPkg={initialPkg} />

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
              <a
                href="mailto:kauri@herosjourneycreative.co.nz"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  color: "var(--fg1)",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
              >
                kauri@herosjourneycreative.co.nz
              </a>
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
