import Link from "next/link";
import { NAV_LINKS, BRAND_INFO } from "@/lib/site-content";

export default function SiteFooter() {
  return (
    <footer className="w-full border-t border-hjc-charcoal/20 bg-hjc-warm-white py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-bold tracking-tight text-hjc-black">
              {BRAND_INFO.name}
            </h2>
            <p className="text-sm text-hjc-charcoal/80 max-w-sm">
              {BRAND_INFO.tagline}
            </p>
            <p className="text-xs text-hjc-charcoal/60">
              {BRAND_INFO.location}
            </p>
          </div>

          {/* Quick Links Column 1 */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-widest font-semibold text-hjc-black">
              Navigation
            </h3>
            <ul className="space-y-2">
              {NAV_LINKS.slice(0, 4).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-hjc-charcoal/80 hover:text-hjc-aged-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column 2 */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-widest font-semibold text-hjc-black">
              Studio
            </h3>
            <ul className="space-y-2">
              {NAV_LINKS.slice(4).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-hjc-charcoal/80 hover:text-hjc-aged-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-hjc-charcoal/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-hjc-charcoal/65">
            {BRAND_INFO.copyright}
          </p>
          <p className="text-xs text-hjc-charcoal/60">
            Aotearoa New Zealand
          </p>
        </div>
      </div>
    </footer>
  );
}
