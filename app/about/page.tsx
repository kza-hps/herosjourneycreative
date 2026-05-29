import Link from "next/link";
import SectionHeading from "@/components/section-heading";

export default function AboutPage() {
  return (
    <div className="flex-1 bg-white py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        <SectionHeading
          title="About the Studio"
          subtitle="Cinematic creative studio meets workshop house based in Aotearoa New Zealand."
        />
        
        <div className="space-y-6 text-hjc-charcoal/90 leading-relaxed max-w-3xl">
          <p className="text-base font-semibold text-hjc-black">
            Hero’s Journey Creative works with people turning memory, experience, and imagination into story.
          </p>
          <p className="text-sm">
            We are a creative studio that believes in narrative as the foundational infrastructure of human experience. Our work is split between analog writing practices—such as journal writing, structural memoir coaching, and interactive physical workshops—and digital frontier experiments, specifically focusing on human-centred AI collaboration.
          </p>
          <p className="text-sm">
            Our mission is to help individuals and collectives architect story worlds, preserve family histories, and explore their own mythologies through structured creative processes.
          </p>
        </div>

        <div className="pt-8 border-t border-hjc-charcoal/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <span className="text-xs text-hjc-charcoal/60 font-mono">Aotearoa NZ • Built for Storytellers</span>
          <Link
            href="/contact"
            className="inline-block text-xs font-mono font-semibold uppercase tracking-wider text-hjc-black hover:text-hjc-aged-gold border-b border-hjc-black hover:border-hjc-aged-gold pb-0.5 self-start"
          >
            Get In Touch →
          </Link>
        </div>
      </div>
    </div>
  );
}
