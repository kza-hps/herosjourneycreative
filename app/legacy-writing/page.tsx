import Link from "next/link";
import SectionHeading from "@/components/section-heading";

export default function LegacyWritingPage() {
  return (
    <div className="flex-1 bg-white py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        <SectionHeading
          title="Legacy Story Services"
          subtitle="Documenting lives, family records, and private histories."
        />
        
        <div className="space-y-6 text-hjc-charcoal/90 leading-relaxed max-w-3xl">
          <p className="text-base font-semibold text-hjc-black">
            Preserving memory through archival research and structured, premium biography authoring.
          </p>
          <p className="text-sm">
            Our Legacy Story service works with families, founders, and community elders to turn scattered memoirs, letters, and spoken recollections into a unified, publication-grade text.
          </p>
          <p className="text-sm">
            We lead structured recording interviews, compile historic context, edit transcripts, and design physical and digital portfolios. Each project is tailored to the individual's specific intent, producing an archival asset to be passed down.
          </p>
        </div>

        <div className="pt-8 border-t border-hjc-charcoal/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <span className="text-xs text-hjc-charcoal/60 font-mono">Private commissions by consultation</span>
          <Link
            href="/contact"
            className="inline-block text-xs font-mono font-semibold uppercase tracking-wider text-hjc-black hover:text-hjc-aged-gold border-b border-hjc-black hover:border-hjc-aged-gold pb-0.5 self-start"
          >
            Request Private Consultation →
          </Link>
        </div>
      </div>
    </div>
  );
}
