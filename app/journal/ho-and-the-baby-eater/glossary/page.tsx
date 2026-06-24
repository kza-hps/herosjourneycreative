import fs from "fs";
import path from "path";
import Link from "next/link";
import type { Metadata } from "next";
import { getBook } from "@/lib/journal";
import ReturnToReading from "./return-to-reading";
import GlossaryClient, { type GlossarySection } from "./glossary-client";
import styles from "./glossary.module.css";

type PronGuideSection = { title: string; body: string[] };

type GlossaryData = {
  title: string;
  description: string;
  authorNote: string[];
  pronunciationGuide: PronGuideSection[];
  sections: GlossarySection[];
};

function getGlossaryData(): GlossaryData {
  const file = path.join(process.cwd(), "lib", "generated", "ho-baby-eater-glossary.json");
  return JSON.parse(fs.readFileSync(file, "utf-8")) as GlossaryData;
}

export async function generateMetadata(): Promise<Metadata> {
  const book = getBook();
  return {
    title: `${book.glossaryTitle ?? "Glossary"} | ${book.title} | Hero's Journey Creative`,
    description: book.glossaryDescription,
  };
}

export default function GlossaryPage() {
  const book = getBook();
  const data = getGlossaryData();

  return (
    <div
      className="hjc-fade flex-1"
      style={{ background: "var(--bg)", padding: "64px 0 96px" }}
    >
      <div
        className="max-w-[1200px] mx-auto px-8 max-[880px]:px-5"
        style={{ marginBottom: "56px" }}
      >
        <div style={{ display: "flex", gap: "18px", flexWrap: "wrap" }}>
          <ReturnToReading />
          <Link href="/journal" className="hjc-lnk">
            Back to journal
          </Link>
        </div>
      </div>

      <main className="chapter-reader-shell">
        <article className="chapter-reader-page">
          <span className="hjc-kick block mb-[16px]">{book.title}</span>

          <h1 className={styles.pageTitle}>{data.title}</h1>

          {data.description && (
            <p className={styles.pageSubtitle}>{data.description}</p>
          )}

          <hr className={styles.rule} />

          {data.authorNote.length > 0 && (
            <section className={styles.authorNote}>
              <h2 className={styles.noteHeading}>Author&rsquo;s Note on Language</h2>
              {data.authorNote.map((para, i) => (
                <p key={i} className={styles.notePara}>{para}</p>
              ))}
            </section>
          )}

          {data.pronunciationGuide.length > 0 && (
            <section className={styles.pronGuide}>
              <h2 className={styles.noteHeading}>Pronunciation Guide</h2>
              {data.pronunciationGuide.map((sub, i) => (
                <div key={i} className={styles.pronSection}>
                  {sub.title && (
                    <h3 className={styles.pronSectionTitle}>{sub.title}</h3>
                  )}
                  {sub.body.map((para, j) => (
                    <p key={j} className={styles.pronPara}>{para}</p>
                  ))}
                </div>
              ))}
            </section>
          )}

          <hr className={styles.rule} />

          <GlossaryClient sections={data.sections} />
        </article>
      </main>
    </div>
  );
}
