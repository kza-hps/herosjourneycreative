import Link from "next/link";
import SectionHeading from "@/components/section-heading";

export default function PersonalMythAuthoringPage() {
  return (
    <div className="flex-1 bg-white py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        <SectionHeading
          title="Personal Myth Authoring"
          subtitle="Mapping lived biography to narrative frameworks and psychological archetypes."
        />
        
        <div className="space-y-6 text-hjc-charcoal/90 leading-relaxed max-w-3xl">
          <p className="text-base font-semibold text-hjc-black">
            Translate experiences into mythic, symbolic, and structural resources.
          </p>
          <p className="text-sm">
            Personal Myth Authoring is a structured, collaborative consultation framework. By overlaying your life milestones, struggles, and transitions onto classical story-world structures (such as the Hero’s Journey), we help you re-frame your narrative.
          </p>
          <p className="text-sm">
            This service serves autofiction novelists, memoirists, screenwriters, and creative practitioners who want to draw directly from their own psychology to build compelling story worlds.
          </p>
        </div>

        <div className="pt-8 border-t border-hjc-charcoal/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <span className="text-xs text-hjc-charcoal/60 font-mono">Available as single sessions or multi-month journeys</span>
          <Link
            href="/contact"
            className="inline-block text-xs font-mono font-semibold uppercase tracking-wider text-hjc-black hover:text-hjc-aged-gold border-b border-hjc-black hover:border-hjc-aged-gold pb-0.5 self-start"
          >
            Book An Intake Session →
          </Link>
        </div>
      </div>
    </div>
  );
}
