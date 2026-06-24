"use client";

import { useState, useMemo } from "react";
import styles from "./glossary.module.css";

export type GlossaryEntry = {
  term: string;
  slug: string;
  pronunciation: string;
  meaning: string;
  story: string | null;
  wider: string | null;
  featured: boolean;
  tags: string[];
};

export type GlossarySection = {
  id: string;
  title: string;
  entries: GlossaryEntry[];
};

function GlossaryCard({
  entry,
  sectionId,
}: {
  entry: GlossaryEntry;
  sectionId: string;
}) {
  return (
    <div
      id={`${sectionId}-${entry.slug}`}
      className={`${styles.card} ${entry.featured ? styles.cardFeatured : ""}`}
    >
      <div className={styles.cardHead}>
        <span className={styles.cardTerm}>{entry.term}</span>
        {entry.pronunciation && (
          <span className={styles.cardPron}>{entry.pronunciation}</span>
        )}
      </div>
      {entry.meaning && <p className={styles.cardMeaning}>{entry.meaning}</p>}
      {entry.story && (
        <div className={styles.cardLabeled}>
          <span className={styles.cardLabel}>In the story</span>
          <p className={styles.cardLabeledText}>{entry.story}</p>
        </div>
      )}
      {entry.wider && (
        <div className={styles.cardLabeled}>
          <span className={styles.cardLabel}>Wider usage</span>
          <p className={styles.cardLabeledText}>{entry.wider}</p>
        </div>
      )}
    </div>
  );
}

export default function GlossaryClient({
  sections,
}: {
  sections: GlossarySection[];
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return sections;
    const q = query.trim().toLowerCase();
    return sections
      .map((section) => ({
        ...section,
        entries: section.entries.filter(
          (e) =>
            e.term.toLowerCase().includes(q) ||
            e.meaning.toLowerCase().includes(q) ||
            (e.story ?? "").toLowerCase().includes(q) ||
            (e.wider ?? "").toLowerCase().includes(q)
        ),
      }))
      .filter((s) => s.entries.length > 0);
  }, [query, sections]);

  const isSearching = query.trim().length > 0;
  const totalResults = filtered.reduce((n, s) => n + s.entries.length, 0);

  return (
    <div className={styles.client}>
      <nav className={styles.sectionNav} aria-label="Glossary sections">
        {sections.map((section) => {
          const hasResults =
            !isSearching || filtered.some((s) => s.id === section.id);
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={
                styles.sectionNavLink +
                (hasResults ? "" : " " + styles.sectionNavLinkMuted)
              }
            >
              {section.title.split(",")[0].split("(")[0].trim()}
            </a>
          );
        })}
      </nav>

      <div className={styles.searchRow}>
        <input
          type="search"
          placeholder="Search glossary…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={styles.searchInput}
          aria-label="Search glossary entries"
        />
        {isSearching && (
          <span className={styles.searchCount} aria-live="polite">
            {totalResults} {totalResults === 1 ? "result" : "results"}
          </span>
        )}
      </div>

      {filtered.length === 0 ? (
        <p className={styles.emptyState}>
          No entries match &ldquo;{query}&rdquo;.
        </p>
      ) : (
        filtered.map((section) => (
          <section key={section.id} id={section.id} className={styles.section}>
            <h2 className={styles.sectionTitle}>{section.title}</h2>
            <div className={styles.cardList}>
              {section.entries.map((entry) => (
                <GlossaryCard
                  key={`${section.id}-${entry.slug}`}
                  entry={entry}
                  sectionId={section.id}
                />
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
