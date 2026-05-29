import Link from "next/link";
import Image from "next/image";

const STUDIO_LINKS = [
  { label: "About",                   href: "/about" },
  { label: "Workshops",               href: "/workshops" },
  { label: "Legacy Writing",          href: "/legacy-writing" },
  { label: "Personal Myth Authoring", href: "/personal-myth-authoring" },
];

const CONNECT_LINKS = [
  { label: "Journal",   href: "/journal" },
  { label: "Showcase",  href: "/showcase" },
  { label: "Contact",   href: "/contact" },
];

export default function SiteFooter() {
  return (
    <footer
      className="w-full mt-auto"
      style={{ background: "var(--hjc-black)", color: "var(--hjc-warm-white)", padding: "72px 0 40px" }}
    >
      <div className="max-w-[1200px] mx-auto px-8 max-[880px]:px-5">
        {/* Grid */}
        <div
          className="grid grid-cols-[2fr_1fr_1fr] gap-10 max-[880px]:grid-cols-1 max-[880px]:gap-7"
        >
          {/* Brand column */}
          <div>
            <div className="relative mb-5" style={{ height: "30px", width: "260px" }}>
              <Image
                src="/brand/assets/wordmark-line-yellow.png"
                alt="Hero's Journey Creative"
                fill
                sizes="260px"
                className="object-contain object-left"
              />
            </div>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                color: "var(--fg-on-ink-2)",
                fontSize: "0.95rem",
                maxWidth: "330px",
                lineHeight: "1.6",
                margin: 0,
              }}
            >
              A creative studio for writing, workshops, story worlds, and human-centred AI
              experiments. Built for people turning memory, experience, and imagination into story.
            </p>
          </div>

          {/* Studio links */}
          <div>
            <h5
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--hjc-yellow)",
                margin: "0 0 16px",
              }}
            >
              Studio
            </h5>
            {STUDIO_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="hjc-ft-link">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Connect links */}
          <div>
            <h5
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--hjc-yellow)",
                margin: "0 0 16px",
              }}
            >
              Connect
            </h5>
            {CONNECT_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="hjc-ft-link">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid var(--rule-ink)",
            marginTop: "48px",
            paddingTop: "24px",
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            letterSpacing: "0.06em",
            color: "var(--fg-on-ink-2)",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <span>© 2026 Hero&apos;s Journey Creative</span>
          <span>Aotearoa New Zealand</span>
        </div>
      </div>
    </footer>
  );
}
