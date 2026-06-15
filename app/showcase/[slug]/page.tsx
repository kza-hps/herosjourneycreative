import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { SHOWCASE_ITEMS } from "@/lib/site-content";
import SectionHeading from "@/components/section-heading";
import ShowcaseImagePlaceholder from "@/components/showcase-image-placeholder";
import ShowcaseGallery from "@/components/showcase-gallery";
import VideoPlaceholder from "@/components/video-placeholder";

export const dynamicParams = false;

export async function generateStaticParams() {
  return SHOWCASE_ITEMS.filter((item) => !item.hidden).map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = SHOWCASE_ITEMS.find((i) => i.slug === slug);
  if (!item) return {};
  return {
    title: `${item.title} — Showcase | Hero's Journey Creative`,
    description: item.detail.heroSubtitle,
  };
}

function DetailBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "10px",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--fg3)",
          margin: "0 0 10px",
        }}
      >
        {label}
      </p>
      <div
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "var(--step-body)",
          lineHeight: 1.6,
          color: "var(--fg2)",
          margin: 0,
        }}
      >
        {children}
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section style={{ margin: "60px 0" }}>
      <SectionHeading title={title} className="mb-[28px]" />
      {children}
    </section>
  );
}

export default async function ShowcaseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = SHOWCASE_ITEMS.find((i) => i.slug === slug);

  if (!item) {
    notFound();
  }

  const { detail } = item;

  return (
    <div className="hjc-fade flex-1" style={{ padding: "64px 0 80px", background: "var(--bg)" }}>
      <div className="max-w-[1200px] mx-auto px-8 max-[880px]:px-5">
        {/* Back link */}
        <Link
          href="/showcase"
          className="hjc-lnk"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "40px",
          }}
        >
          ← Showcase
        </Link>

        {/* ── Hero ── */}
        <span className="hjc-kick block mb-[18px]">{item.eyebrow}</span>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            textTransform: "uppercase",
            fontSize: "var(--step-display)",
            lineHeight: 0.94,
            color: "var(--fg1)",
            margin: "0 0 18px",
          }}
        >
          {item.title}
        </h1>
        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: "var(--step-body-lg)",
            lineHeight: 1.5,
            color: "var(--fg2)",
            maxWidth: "680px",
            margin: "0 0 28px",
          }}
        >
          {detail.heroSubtitle}
        </p>

        {item.externalLinks.length > 0 && (
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "48px" }}>
            {item.externalLinks.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hjc-btn hjc-btn-ghost"
                >
                  {link.label} ↗
                </a>
              ) : (
                <Link key={link.href} href={link.href} className="hjc-btn hjc-btn-ghost">
                  {link.label} →
                </Link>
              )
            )}
          </div>
        )}

        {item.heroImage ? (
          <div style={{ border: "1px solid var(--rule)", lineHeight: 0 }}>
            <Image
              src={item.heroImage}
              alt={`${item.title} screenshot`}
              width={item.heroImageDimensions?.width ?? 1600}
              height={item.heroImageDimensions?.height ?? 900}
              style={{ width: "100%", height: "auto", display: "block" }}
              sizes="(max-width: 880px) 100vw, 1200px"
              priority
            />
          </div>
        ) : (
          <ShowcaseImagePlaceholder title={item.title} />
        )}

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "60px 0 0" }} />

        {/* ── Project Summary ── */}
        <Section title="Project Summary">
          <div className="grid grid-cols-3 gap-6 max-[880px]:grid-cols-1">
            <DetailBlock label="What It Is">{detail.summary.whatItIs}</DetailBlock>
            <DetailBlock label="Why It Exists">{detail.summary.whyItExists}</DetailBlock>
            <DetailBlock label="What Was Built">{detail.summary.whatWasBuilt}</DetailBlock>
          </div>
        </Section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "0" }} />

        {/* ── Build Story ── */}
        <Section title="Build Story">
          <div
            className="grid grid-cols-2 gap-6 max-[880px]:grid-cols-1"
            style={{ rowGap: "32px" }}
          >
            <DetailBlock label="The Original Problem">{detail.buildStory.problem}</DetailBlock>
            <DetailBlock label="The Creative / Product Insight">
              {detail.buildStory.insight}
            </DetailBlock>
            <DetailBlock label="The Role of AI Agents">{detail.buildStory.aiRole}</DetailBlock>
            <DetailBlock label="The Human-in-the-Loop Decisions">
              {detail.buildStory.humanInLoop}
            </DetailBlock>
          </div>
        </Section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "0" }} />

        {/* ── Production Notes ── */}
        <Section title="Production Notes">
          <div style={{ marginBottom: "32px" }}>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--fg3)",
                margin: "0 0 10px",
              }}
            >
              Tech / Method Stack
            </p>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                lineHeight: 1.8,
                color: "var(--fg2)",
                margin: 0,
              }}
            >
              {detail.productionNotes.stack}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-6 max-[880px]:grid-cols-1">
            <DetailBlock label="Design Process">{detail.productionNotes.designProcess}</DetailBlock>
            <DetailBlock label="Prompting / Agent Workflow">
              {detail.productionNotes.promptingWorkflow}
            </DetailBlock>
            <DetailBlock label="Testing / Validation / Review">
              {detail.productionNotes.testing}
            </DetailBlock>
          </div>
        </Section>

        {item.screenshots && item.screenshots.length > 0 && (
          <>
            <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "0" }} />

            {/* ── Production Gallery ── */}
            <Section title="Production Gallery">
              <ShowcaseGallery items={item.screenshots} />
            </Section>
          </>
        )}

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "0" }} />

        {/* ── Video Walkthrough ── */}
        <Section title="Video Walkthrough">
          <VideoPlaceholder title={detail.videoPlaceholderTitle} />
        </Section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "0" }} />

        {/* ── Outcome ── */}
        <Section title="Outcome">
          <div className="grid grid-cols-2 gap-6 max-[880px]:grid-cols-1">
            <DetailBlock label="Current State">{detail.outcome.currentState}</DetailBlock>
            <DetailBlock label="What This Project Demonstrates">
              {detail.outcome.demonstrates}
            </DetailBlock>
          </div>
        </Section>

        <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "0 0 48px" }} />

        {/* ── Footer ── */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <Link href="/showcase" className="hjc-lnk">
            ← Back to Showcase
          </Link>
          <Link href="/contact" className="hjc-lnk">
            Inquire About Custom Projects →
          </Link>
        </div>
      </div>
    </div>
  );
}
