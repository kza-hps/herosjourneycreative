"use client";

import { useState, useCallback } from "react";

interface YoutubeThumbProps {
  youtubeId: string;
  title?: string;
}

export default function YoutubeThumb({ youtubeId, title }: YoutubeThumbProps) {
  const [active, setActive] = useState(false);

  const activate = useCallback(() => setActive(true), []);

  if (active) {
    return (
      <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1`}
          title={title ?? "Session recording"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: 0,
            borderRadius: "8px",
          }}
        />
      </div>
    );
  }

  return (
    <button
      onClick={activate}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && activate()}
      aria-label={`Play session recording${title ? `: ${title}` : ""}`}
      style={{
        position: "relative",
        display: "block",
        width: "100%",
        paddingBottom: "56.25%",
        background: "#000",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        overflow: "hidden",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
        alt=""
        aria-hidden
        loading="lazy"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.85,
        }}
      />
      <svg
        aria-hidden
        viewBox="0 0 68 48"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 68,
          height: 48,
          filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.5))",
        }}
      >
        <path
          d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79 0 34 0 34 0S12.21 0 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C0 13.05 0 24 0 24s0 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 48 34 48 34 48s21.79 0 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C68 34.95 68 24 68 24s0-10.95-1.48-16.26z"
          fill="rgba(0,0,0,0.7)"
        />
        <path d="M45 24L27 14v20z" fill="#fff" />
      </svg>
    </button>
  );
}
