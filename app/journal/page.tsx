import Link from "next/link";
import SectionHeading from "@/components/section-heading";
import JournalCard from "@/components/journal-card";
import { JOURNAL_ITEMS } from "@/lib/site-content";

export default function JournalPage() {
  return (
    <div className="flex-1 bg-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <SectionHeading
          title="The Journal"
          subtitle="Reflections on language, notes from workshops, and insights from our human-centred AI experiments."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {JOURNAL_ITEMS.map((item) => (
            <div key={item.id} id={item.slug} className="scroll-mt-20">
              <JournalCard item={item} />
            </div>
          ))}
        </div>

        <div className="pt-12 border-t border-hjc-charcoal/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <p className="text-sm text-hjc-charcoal/80 max-w-lg">
            Interested in narrative workshops or submitting thoughts to our journal discussions? We host monthly writing groups based in Aotearoa.
          </p>
          <Link
            href="/contact"
            className="inline-block text-xs font-mono font-semibold uppercase tracking-wider text-hjc-black hover:text-hjc-aged-gold border-b border-hjc-black hover:border-hjc-aged-gold pb-0.5 self-start"
          >
            Contact Writing Cohorts →
          </Link>
        </div>
      </div>
    </div>
  );
}
