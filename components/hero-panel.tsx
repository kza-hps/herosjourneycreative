import Link from "next/link";
import { BRAND_INFO } from "@/lib/site-content";

export default function HeroPanel() {
  return (
    <section className="py-16 md:py-24 border-b border-hjc-charcoal/10 bg-hjc-warm-white flex flex-col justify-center">
      <div className="max-w-4xl mx-auto text-center px-4 space-y-8">
        <div className="inline-block px-3 py-1 border border-hjc-charcoal text-xs uppercase tracking-widest font-mono text-hjc-charcoal">
          Creative Studio & Workshop House
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-hjc-black leading-tight max-w-3xl mx-auto">
          {BRAND_INFO.tagline}
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-hjc-charcoal/85 leading-relaxed font-serif max-w-2xl mx-auto italic">
          {BRAND_INFO.location}
        </p>
        <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link
            href="/contact"
            className="w-full sm:w-auto px-6 py-3 text-xs uppercase tracking-widest font-semibold bg-hjc-black text-hjc-warm-white border border-hjc-black hover:bg-hjc-warm-white hover:text-hjc-black transition-colors"
          >
            Initiate Contact
          </Link>
          <Link
            href="/about"
            className="w-full sm:w-auto px-6 py-3 text-xs uppercase tracking-widest font-semibold border border-hjc-black text-hjc-black hover:bg-hjc-yellow transition-colors"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
