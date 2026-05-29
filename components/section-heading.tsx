interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionHeading({ title, subtitle, className = "" }: SectionHeadingProps) {
  return (
    <div className={className}>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--step-h2)",
          lineHeight: 1,
          letterSpacing: 0,
          textTransform: "uppercase",
          color: "var(--fg1)",
          borderLeft: "6px solid var(--hjc-yellow)",
          paddingLeft: "16px",
          margin: 0,
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--step-label)",
            letterSpacing: "0.1em",
            color: "var(--fg3)",
            marginTop: "12px",
            maxWidth: "600px",
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
