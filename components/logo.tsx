"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface LogoProps {
  variant?: "black" | "yellow" | "white";
  height?: number;
  width?: number;
}

export default function Logo({ variant = "black", height = 22, width = 220 }: LogoProps) {
  const [hasError, setHasError] = useState(false);
  const logoPath = `/brand/assets/wordmark-line-${variant}.png`;

  return (
    <Link href="/" className="inline-flex items-center select-none">
      {!hasError ? (
        <div className="relative" style={{ height: `${height}px`, width: `${width}px` }}>
          <Image
            src={logoPath}
            alt="Hero's Journey Creative"
            fill
            sizes={`${width}px`}
            className="object-contain object-left"
            priority
            onError={() => setHasError(true)}
          />
        </div>
      ) : (
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: variant === "black" ? "var(--hjc-black)" : "var(--hjc-warm-white)",
          }}
        >
          Hero&apos;s Journey Creative
        </span>
      )}
    </Link>
  );
}
