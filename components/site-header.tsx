"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./logo";

const MAIN_NAV = [
  { label: "About",            href: "/about" },
  { label: "Workshops",        href: "/workshops" },
  { label: "Website Refresh",  href: "/services/free-website-preview" },
  { label: "Journal",          href: "/journal" },
  { label: "Showcase",         href: "/showcase" },
];

const ALL_NAV = [
  { label: "About",                   href: "/about" },
  { label: "Workshops",               href: "/workshops" },
  { label: "Website Refresh",         href: "/services/free-website-preview" },
  { label: "Legacy Writing",          href: "/legacy-writing" },
  { label: "Personal Myth Authoring", href: "/personal-myth-authoring" },
  { label: "Journal",                 href: "/journal" },
  { label: "Showcase",                href: "/showcase" },
  { label: "Initiate Contact →",      href: "/contact" },
];

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header
      className="sticky top-0 z-40 w-full"
      style={{
        background: "rgba(247,243,234,0.88)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid var(--rule)",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-8 max-[880px]:px-5">
        <div className="flex items-center justify-between" style={{ height: "74px" }}>
          {/* Wordmark */}
          <Logo variant="black" height={42} width={168} />

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-[26px]" style={{ display: "none" }} aria-label="Main navigation">
            {/* Rendered via media query — see below */}
          </nav>

          <div className="flex items-center gap-[26px] max-[880px]:hidden">
            {MAIN_NAV.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`hjc-nav-link ${isActive ? "hjc-nav-link-active" : ""}`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link href="/contact" className="hjc-btn-dark">
              Initiate Contact
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="min-[880px]:hidden p-2"
            style={{ background: "none", border: "none", color: "var(--fg1)", cursor: "pointer" }}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
              {isOpen ? (
                <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {isOpen && (
        <div id="mobile-navigation" style={{ borderTop: "1px solid var(--rule)", background: "var(--hjc-warm-white)" }}>
          {ALL_NAV.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              style={{
                display: "block",
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--fg1)",
                textDecoration: "none",
                padding: "14px 20px",
                borderBottom: "1px solid var(--rule)",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
