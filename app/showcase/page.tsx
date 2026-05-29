import Link from "next/link";
import SectionHeading from "@/components/section-heading";
import ShowcaseCard from "@/components/showcase-card";
import { SHOWCASE_ITEMS } from "@/lib/site-content";

export default function ShowcasePage() {
  return (
    <div className="flex-1 bg-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <SectionHeading
          title="Project Showcase"
          subtitle="Selected family history memoirs, storytelling workshops, and human-centred AI interactive nodes."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SHOWCASE_ITEMS.map((item) => (
            <div key={item.id} id={item.slug} className="scroll-mt-20">
              <ShowcaseCard item={item} />
            </div>
          ))}
        </div>

        <div className="pt-12 border-t border-hjc-charcoal/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <p className="text-sm text-hjc-charcoal/85 max-w-lg">
            We focus on bespoke, archival-grade physical books and carefully designed digital interfaces. Let’s co-create your story world.
          </p>
          <Link
            href="/contact"
            className="inline-block text-xs font-mono font-semibold uppercase tracking-wider text-hjc-black hover:text-hjc-aged-gold border-b border-hjc-black hover:border-hjc-aged-gold pb-0.5 self-start"
          >
            Inquire About Custom Projects →
          </Link>
        </div>
      </div>
    </div>
  );
}
