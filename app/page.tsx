import HeroPanel from "@/components/hero-panel";
import ServiceCard from "@/components/service-card";
import CtaBand from "@/components/cta-band";
import SectionHeading from "@/components/section-heading";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <HeroPanel />

      {/* Main Focus Lanes */}
      <section className="py-16 bg-white dark:bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <SectionHeading
            title="Studio Lanes"
            subtitle="The core disciplines of our creative studio and story house."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ServiceCard
              title="Workshops"
              description="Guided sessions, writing workshops, and generative text experiments built for writers turning experience into structure."
              href="/workshops"
              ctaText="Explore Workshops"
            />
            <ServiceCard
              title="Legacy & Personal Story"
              description="Deep-dive memoir creation, family archive structuring, and personal myth writing services to capture lifetimes."
              href="/legacy-writing"
              ctaText="Explore Writing Services"
            />
            <ServiceCard
              title="Journal"
              description="Reflections on language, notes from workshops, and insights from our human-centred AI experiments."
              href="/journal"
              ctaText="Read Journal"
            />
            <ServiceCard
              title="Showcase / Projects"
              description="Selected case studies, hand-bound archive portfolios, and digital world-building experiments."
              href="/showcase"
              ctaText="View Showcase"
            />
          </div>
        </div>
      </section>

      {/* Contact CTA Band */}
      <CtaBand />
    </div>
  );
}
