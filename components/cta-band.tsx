import Link from "next/link";

interface CtaBandProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  href?: string;
}

export default function CtaBand({
  title = "Begin your journey",
  subtitle = "Tell us what you're working on — a memoir, a cohort, a story world, an archive.",
  buttonText = "Initiate Contact",
  href = "/contact",
}: CtaBandProps) {
  return (
    <section
      style={{
        background: "var(--hjc-yellow)",
        borderTop: "2px solid var(--hjc-black)",
        borderBottom: "2px solid var(--hjc-black)",
        padding: "74px 0",
        textAlign: "center",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-8 max-[880px]:px-5">
        <h2
          style={{
            fontFamily: "var(--font-display)",
            textTransform: "uppercase",
            fontSize: "var(--step-display)",
            lineHeight: 0.96,
            color: "var(--hjc-black)",
            margin: "0 0 16px",
          }}
        >
          {title}
        </h2>
        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: "1.15rem",
            color: "#3a2c00",
            maxWidth: "540px",
            margin: "0 auto 30px",
          }}
        >
          {subtitle}
        </p>
        <Link href={href} className="hjc-btn hjc-btn-dark">
          {buttonText}
        </Link>
      </div>
    </section>
  );
}
