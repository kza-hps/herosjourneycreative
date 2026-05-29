"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Logo() {
  const [hasError, setHasError] = useState(false);
  const logoPath = "/brand/NEW_HJC_LOGO.png";

  return (
    <Link href="/" className="inline-flex items-center py-1 select-none focus:outline-none">
      {!hasError ? (
        <div className="relative w-56 h-12">
          <Image
            src={logoPath}
            alt="Hero's Journey Creative Logo"
            fill
            sizes="224px"
            className="object-contain object-left"
            priority
            onError={() => setHasError(true)}
          />
        </div>
      ) : (
        <span className="text-xl font-bold tracking-tight text-hjc-black hover:text-hjc-aged-gold transition-colors">
          Hero’s Journey Creative
        </span>
      )}
    </Link>
  );
}
