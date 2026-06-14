interface ShowcaseImagePlaceholderProps {
  title: string;
  label?: string;
}

export default function ShowcaseImagePlaceholder({
  title,
  label = "Screenshot coming soon",
}: ShowcaseImagePlaceholderProps) {
  return (
    <div
      style={{
        aspectRatio: "16 / 9",
        width: "100%",
        background: "var(--hjc-black)",
        border: "1px solid var(--hjc-charcoal)",
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxSizing: "border-box",
      }}
    >
      {/* Top accent */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div
          style={{
            width: "40px",
            height: "3px",
            background: "var(--hjc-yellow)",
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "9px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--hjc-yellow)",
          }}
        >
          {label}
        </span>
      </div>

      {/* Title block */}
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(1.6rem, 4vw, 2.6rem)",
          lineHeight: 1,
          letterSpacing: "-0.01em",
          textTransform: "uppercase",
          color: "var(--hjc-warm-white)",
          margin: 0,
        }}
      >
        {title}
      </h2>
    </div>
  );
}
