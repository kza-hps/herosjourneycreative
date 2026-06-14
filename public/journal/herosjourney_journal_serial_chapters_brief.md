# Hero’s Journey Creative — Journal Serial Fiction Rebuild Brief

## Purpose

Rebuild the Hero’s Journey Creative `/journal` page so it is no longer a generic blog or essay index.

The Journal is the public slow-release home for **_Ho & the Baby Eater_**.

The page should present the work like a serialized novel: a book landing page with cover space, followed by chapter cards. Each card links to a dedicated chapter reader page that feels like reading a real book/manuscript rather than a standard web article.

---

## Current Local Chapter Source

The first two chapters have already been uploaded into the repo here:

```text
C:\Users\kauri\dev\herosjourneycreative\public\journal
```

Current files:

```text
C:\Users\kauri\dev\herosjourneycreative\public\journal\Ho and the Baby Eater - Chapter One.docx
C:\Users\kauri\dev\herosjourneycreative\public\journal\Ho and the Baby Eater - Chapter Two.docx
```

Use these as the initial source files for the chapter archive.

Do **not** hardcode the chapter body text into React components.

---

## Desired Outcome

Create a filesystem-driven chapter system where Kauri can add future `.docx` chapters to the repo and have them appear as chapter cards and reader pages through metadata/config, rather than manually coding each chapter into the site.

This is effectively a lightweight serial-fiction publishing system without a CMS.

---

## Required Public Routes

### 1. Journal Landing Page

```text
/journal
```

This becomes the serial landing page for **_Ho & the Baby Eater_**.

It should include:

- book/series hero
- book cover placeholder
- short description
- “start reading” CTA
- chapter card archive
- future-proof structure for additional chapters

### 2. Chapter Reader Pages

Recommended route pattern:

```text
/journal/ho-and-the-baby-eater/[slug]
```

Examples:

```text
/journal/ho-and-the-baby-eater/chapter-01-ho-stabbed-a-fish-at-the-lagoon
/journal/ho-and-the-baby-eater/chapter-02-tea-dug-wet-fingers-inside-wet-cracks
```

---

## Journal Landing Page Content

### Hero Title

```text
Ho & the Baby Eater
```

### Subtitle

```text
A slow-release mythic fantasy serial by Kauri Tukere.
```

### Description

```text
A Polynesian-inspired mythic fantasy novel about exile, hunger, mana, prophecy, pride, gods, monsters, and the cost of becoming a hero.
```

### Release Note

```text
Chapters will be released slowly through the Journal. Each chapter can be read online in a book-style reading window.
```

### Primary CTA

```text
Start Reading
```

This should link to the first published chapter.

### Secondary CTA

```text
View Chapters
```

This should scroll to or anchor the chapter archive section.

---

## Book Cover Placeholder Requirement

The `/journal` page must include a dedicated book-cover area.

The final cover is still being designed, so implement a styled placeholder for now.

### Placeholder Text

```text
Ho & the Baby Eater
Kauri Tukere

Cover artwork coming soon
```

### Design Requirements

The placeholder should:

- be portrait-oriented, similar to a real book cover ratio
- feel intentional, not like a broken image or empty grey box
- use the existing Hero’s Journey Creative visual language
- use the site’s current warm yellow/gold accent where appropriate
- be easy to replace later with an actual cover image
- sit prominently in the top hero section, but not overpower the page

### Suggested Behaviour

If a cover image is provided later, render the actual cover in the same frame.

If no cover image is provided, render the styled placeholder.

---

## Suggested Content Architecture

Prefer a repo-content model rather than hardcoded page content.

Because the current chapters are already in `public/journal`, either of the following approaches is acceptable.

---

## Option A — Minimal Change Using `public/journal`

Use the existing folder:

```text
public/
  journal/
    Ho and the Baby Eater - Chapter One.docx
    Ho and the Baby Eater - Chapter Two.docx
    book.json
    chapters.json
    cover-placeholder.svg
    cover.jpg   // future optional file
```

Example `book.json`:

```json
{
  "title": "Ho & the Baby Eater",
  "author": "Kauri Tukere",
  "subtitle": "A slow-release mythic fantasy serial",
  "description": "A Polynesian-inspired mythic fantasy novel about exile, hunger, mana, prophecy, pride, gods, monsters, and the cost of becoming a hero.",
  "coverImage": null,
  "coverPlaceholder": true,
  "status": "serialising"
}
```

Example `chapters.json`:

```json
[
  {
    "chapterNumber": 1,
    "title": "Ho Stabbed a Fish at the Lagoon When He Heard It",
    "slug": "chapter-01-ho-stabbed-a-fish-at-the-lagoon",
    "sourceFile": "Ho and the Baby Eater - Chapter One.docx",
    "summary": "Starving and alone on his tiny island, Ho sees the sky tear open and two strange beings crash onto the shore. When he tries to intervene, the encounter reveals more about his bloodline than he is ready to know.",
    "status": "published",
    "publishDate": "2026-06-05",
    "contentWarning": "Mature fantasy themes"
  },
  {
    "chapterNumber": 2,
    "title": "Teā Dug Wet Fingers Inside Wet Cracks",
    "slug": "chapter-02-tea-dug-wet-fingers-inside-wet-cracks",
    "sourceFile": "Ho and the Baby Eater - Chapter Two.docx",
    "summary": "Teā climbs the forbidden falls to prove his courage before his friends, Sukey, and perhaps the gods themselves. But above the first cascade, a sacred pool and hidden cave lead him toward something far older and more dangerous than youthful pride.",
    "status": "published",
    "publishDate": "2026-06-05",
    "contentWarning": "Mature fantasy themes"
  }
]
```

This option is simpler because it uses the folder where the files already exist.

---

## Option B — More Structured Content Folder

If the repo already prefers content outside `public`, use:

```text
content/
  ho-and-the-baby-eater/
    book.json
    cover-placeholder.svg
    cover.jpg
    chapters/
      001-ho-stabbed-a-fish-at-the-lagoon/
        chapter.docx
        meta.json
      002-tea-dug-wet-fingers-inside-wet-cracks/
        chapter.docx
        meta.json
```

This is cleaner long-term, but requires moving or copying the existing `.docx` files.

Use whichever approach best fits the existing repo architecture.

---

## Chapter Card Requirements

Each published chapter should appear as a card generated from metadata.

Each card should include:

- chapter number
- chapter title
- short summary
- optional publish date
- optional content warning
- CTA: `Read Chapter`

### Chapter One Card

```text
Chapter One
Ho Stabbed a Fish at the Lagoon When He Heard It

Starving and alone on his tiny island, Ho sees the sky tear open and two strange beings crash onto the shore. When he tries to intervene, the encounter reveals more about his bloodline than he is ready to know.

Read Chapter One
```

### Chapter Two Card

```text
Chapter Two
Teā Dug Wet Fingers Inside Wet Cracks

Teā climbs the forbidden falls to prove his courage before his friends, Sukey, and perhaps the gods themselves. But above the first cascade, a sacred pool and hidden cave lead him toward something far older and more dangerous than youthful pride.

Read Chapter Two
```

---

## Chapter Reader Page Requirements

The reader page should feel like a book-reading window inside the existing Hero’s Journey Creative design system.

It should include:

- back-to-chapters link
- series title
- chapter number
- chapter title
- manuscript/book-style reading panel
- previous chapter link, where available
- next chapter link, where available

Avoid:

- blog sidebars
- generic article layout
- category clutter
- share buttons inside the reading area
- author bio blocks interrupting the manuscript
- page controls that make it feel like a CMS/admin page

---

## DOCX Rendering Requirements

Use build-time parsing of `.docx` files.

Recommended package:

```text
mammoth
```

or an equivalent `.docx` to semantic HTML parser.

The parser should:

- preserve paragraphs
- preserve italic runs
- preserve bold where present
- preserve scene breaks such as `***`
- preserve chapter heading text
- strip Word page numbers / footer page markers if they appear
- sanitize generated HTML before rendering
- avoid exposing raw unsanitized HTML directly to the browser

If exact Word layout cannot be perfectly preserved, use CSS to preserve the manuscript reading feel.

---

## Manuscript / Reader Styling

Use a dedicated reader wrapper so manuscript styling does not leak into the rest of the site.

Suggested CSS intent:

```css
.chapterReader {
  max-width: 760px;
  margin: 0 auto;
}

.chapterBody {
  font-family: Garamond, "EB Garamond", Georgia, serif;
  font-size: 1.12rem;
  line-height: 2;
}

.chapterBody p {
  margin: 0;
  text-indent: 1.5em;
  text-align: justify;
}

.chapterBody p:first-of-type {
  text-indent: 0;
}

.chapterBody em,
.chapterBody i {
  font-style: italic;
}

.chapterBody .scene-break {
  text-indent: 0;
  text-align: center;
  margin: 2.5rem 0;
}
```

### Mobile Behaviour

On mobile:

- keep font size comfortable
- reduce excessive side margins
- avoid horizontal scrolling
- stack book-cover hero layout vertically
- consider left-aligning manuscript text if justification creates poor word spacing
- preserve paragraph indents if they remain readable

---

## Desktop Layout

The `/journal` page should use a two-column book landing layout at the top.

Left column:

- title
- subtitle
- description
- release note
- CTA buttons

Right column:

- book cover placeholder

Below hero:

- chapter archive section
- chapter cards in a responsive grid

---

## Mobile Layout

On mobile:

- stack title and intro first
- show the cover placeholder underneath
- then show CTAs
- then show chapter cards
- ensure the cover does not dominate too much of the first screen
- preserve the quiet, literary feel of the current site

---

## Helper Functions

Implement helper functions such as:

```ts
getBook()
getAllChapters()
getPublishedChapters()
getChapterBySlug(slug)
getAdjacentChapters(slug)
renderChapterDocx(sourceFile)
```

If using Next.js static generation, generate static params from published chapter metadata.

---

## Validation Requirements

Add lightweight validation that warns or fails during build if:

- `book.json` is missing
- chapter metadata is missing
- a published chapter source file does not exist
- two chapters share the same slug
- chapter number is missing
- title is missing
- summary is missing
- source file is missing
- published chapter has no readable body

Draft or scheduled chapters should not expose body text publicly.

---

## Design Requirements

Retain the established Hero’s Journey Creative style:

- minimal
- editorial
- literary
- warm
- spacious
- premium but not corporate
- connected to the current homepage and workshops page

The Journal should feel like:

- a serial fiction shelf
- a book archive
- a quiet reading room
- the public home of a novel in progress

It should not feel like:

- a generic blog
- a CMS template
- a news page
- a Substack clone
- an admin/editor interface

---

## Acceptance Criteria

The implementation is complete when:

1. `/journal` no longer presents as a blog or essay page.
2. `/journal` presents **_Ho & the Baby Eater_** as a slow-release serialized novel.
3. `/journal` includes a dedicated book-cover area.
4. The current cover implementation uses a styled placeholder, not a broken image or empty grey box.
5. The cover placeholder can later be replaced by adding a cover image path to book metadata.
6. Each chapter appears as a card generated from repo content/metadata.
7. Chapter One and Chapter Two are generated from the existing files in:

   ```text
   C:\Users\kauri\dev\herosjourneycreative\public\journal
   ```

8. Clicking a chapter opens a dedicated reader page.
9. The reader page feels like a book or manuscript reading window.
10. Paragraph spacing, first-line indents, italics, and manuscript feel are preserved as closely as practical.
11. New chapters can be added without hardcoding body text into React components.
12. Chapter cards and routes are generated from metadata/filesystem content.
13. Draft or scheduled chapters are not publicly readable until marked published.
14. The implementation is responsive on mobile and desktop.
15. The visual style remains consistent with Hero’s Journey Creative.
