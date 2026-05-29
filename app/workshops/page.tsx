import Link from "next/link";
import SectionHeading from "@/components/section-heading";

export default function WorkshopsPage() {
  return (
    <div className="flex-1 bg-white py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        <SectionHeading
          title="Workshops"
          subtitle="Guided sessions and structured writing environments."
        />
        
        <div className="space-y-6 text-hjc-charcoal/90 leading-relaxed max-w-3xl">
          <p className="text-base font-semibold text-hjc-black">
            Our workshops provide structured containers for people to unpack their experiences, find narrative clarity, and form writing habits.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            <div className="border border-hjc-charcoal/20 p-5 bg-hjc-warm-white">
              <h3 className="text-sm font-bold uppercase tracking-wider text-hjc-black mb-2">Morning Journal Cohorts</h3>
              <p className="text-xs text-hjc-charcoal/80">Structured morning journaling sessions aimed at clearing blocks and identifying recurring thematic content in raw text.</p>
            </div>
            <div className="border border-hjc-charcoal/20 p-5 bg-hjc-warm-white">
              <h3 className="text-sm font-bold uppercase tracking-wider text-hjc-black mb-2">World & Myth Architecture</h3>
              <p className="text-xs text-hjc-charcoal/80">Mapping character arcs, story worlds, and mythic sequences for novels, interactive screenplays, and games.</p>
            </div>
          </div>
          <p className="text-sm">
            We facilitate local in-person retreats in Aotearoa New Zealand, alongside remote cohorts for international participants.
          </p>
        </div>

        <div className="pt-8 border-t border-hjc-charcoal/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <span className="text-xs text-hjc-charcoal/60 font-mono">Cohort dates to be confirmed.</span>
          <Link
            href="/contact"
            className="inline-block text-xs font-mono font-semibold uppercase tracking-wider text-hjc-black hover:text-hjc-aged-gold border-b border-hjc-black hover:border-hjc-aged-gold pb-0.5 self-start"
          >
            Inquire About Enrolment →
          </Link>
        </div>
      </div>
    </div>
  );
}
