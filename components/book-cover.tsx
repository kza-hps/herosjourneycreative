import Image from "next/image";
import type { BookMeta } from "@/lib/journal";

interface BookCoverProps {
  book: BookMeta;
}

export default function BookCover({ book }: BookCoverProps) {
  if (book.coverImage) {
    return (
      <div
        style={{
          aspectRatio: "2 / 3",
          maxWidth: "320px",
          width: "100%",
          position: "relative",
          border: "1px solid var(--rule)",
        }}
      >
        <Image
          src={book.coverImage}
          alt={`${book.title} cover`}
          fill
          style={{ objectFit: "cover" }}
          sizes="320px"
        />
      </div>
    );
  }

  return (
    <div
      style={{
        aspectRatio: "2 / 3",
        maxWidth: "320px",
        width: "100%",
        background: "var(--hjc-black)",
        border: "1px solid var(--hjc-charcoal)",
        padding: "36px 28px",
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
          Cover artwork coming soon
        </span>
      </div>

      {/* Title block */}
      <div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.6rem, 4vw, 2rem)",
            lineHeight: 0.96,
            letterSpacing: "-0.01em",
            textTransform: "uppercase",
            color: "var(--hjc-warm-white)",
            margin: "0 0 20px",
          }}
        >
          {book.title}
        </h2>
        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: "0.85rem",
            lineHeight: 1.4,
            color: "var(--fg-on-ink-2)",
            margin: 0,
          }}
        >
          {book.author}
        </p>
      </div>

      {/* Bottom accent */}
      <div
        style={{
          width: "40px",
          height: "3px",
          background: "var(--hjc-aged-gold)",
          alignSelf: "flex-end",
        }}
      />
    </div>
  );
}
