interface VideoPlaceholderProps {
  title?: string;
}

export default function VideoPlaceholder({ title = "Walkthrough coming soon" }: VideoPlaceholderProps) {
  return (
    <div
      style={{
        border: "1px solid var(--rule)",
        background: "var(--surface-inset)",
        aspectRatio: "16 / 9",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "40px",
        gap: "16px",
        boxSizing: "border-box",
      }}
    >
      <span className="hjc-kick">{title}</span>
      <p
        style={{
          fontFamily: "var(--font-serif)",
          fontStyle: "italic",
          fontSize: "var(--step-body)",
          lineHeight: 1.6,
          color: "var(--fg2)",
          maxWidth: "480px",
          margin: 0,
        }}
      >
        A guided tour of the product, build process, agent workflow, and production decisions
        will be embedded here.
      </p>
    </div>
  );
}
