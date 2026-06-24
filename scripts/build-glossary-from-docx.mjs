import mammoth from 'mammoth';
import fs from 'fs';
import path from 'path';

const JOURNAL_DIR = path.join(process.cwd(), 'public', 'journal');
const OUTPUT_DIR = path.join(process.cwd(), 'lib', 'generated');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'ho-baby-eater-glossary.json');

const GLOSSARY_SECTION_IDS = [
  { match: 'core kupu', id: 'core-kupu' },
  { match: 'atua', id: 'atua' },
  { match: 'peoples', id: 'peoples-tribes-and-places' },
  { match: 'main characters', id: 'characters' },
];

const REMOVE_TERMS = new Set(['tokoroa']);
const FEATURED_TERMS = new Set(['mana']);

function decodeEntities(str) {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)));
}

function innerText(html) {
  return decodeEntities(
    html.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ')
  ).replace(/\s+/g, ' ').trim();
}

function slugify(str) {
  return str
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[ʻ‘’']/gu, '')
    .replace(/[“”]/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function sectionIdForHeading(heading) {
  const lower = heading.toLowerCase();
  for (const { match, id } of GLOSSARY_SECTION_IDS) {
    if (lower.includes(match)) return id;
  }
  return slugify(heading);
}

// Tokenize HTML into p/h2/h3 tokens
function tokenize(html) {
  const tokens = [];
  const re = /<(p|h2|h3)(?:[^>]*)>([\s\S]*?)<\/\1>/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    tokens.push({ type: m[1], inner: m[2] });
  }
  return tokens;
}

function parseGlossarySection(tokens) {
  const entries = [];
  let cur = null;
  let nextIs = null; // 'pronunciation' | 'meaning' | null

  for (const { inner } of tokens) {
    // Term paragraph: <p><strong>TERM</strong></p>
    // The strong must fill the entire inner content
    const singleStrong = inner.match(/^<strong>([^<]+)<\/strong>$/);
    if (singleStrong) {
      const term = decodeEntities(singleStrong[1]).trim();
      if (!term.endsWith(':')) {
        cur = {
          term,
          slug: slugify(term),
          pronunciation: '',
          meaning: '',
          story: null,
          wider: null,
          featured: FEATURED_TERMS.has(term.toLowerCase()),
          tags: [],
        };
        entries.push(cur);
        nextIs = 'pronunciation';
        continue;
      }
      // Falls through to label check below
    }

    if (!cur) continue;

    // Labeled paragraph: <p><strong>LABEL: </strong>text</p>
    const labeledStrong = inner.match(/^<strong>([^<]+)<\/strong>([\s\S]*)$/);
    if (labeledStrong) {
      const label = decodeEntities(labeledStrong[1]).trim();
      if (label.endsWith(':')) {
        const text = innerText(labeledStrong[2]);
        const lowerLabel = label.slice(0, -1).toLowerCase();
        if (lowerLabel.includes('story')) cur.story = text || null;
        else if (lowerLabel.includes('wider')) cur.wider = text || null;
        nextIs = null;
        continue;
      }
    }

    // Plain paragraph
    const text = innerText(inner);
    if (!text) continue;

    if (nextIs === 'pronunciation') {
      cur.pronunciation = text;
      nextIs = 'meaning';
    } else if (nextIs === 'meaning') {
      cur.meaning = cur.meaning ? cur.meaning + ' ' + text : text;
    }
  }

  return entries;
}

async function build() {
  const book = JSON.parse(fs.readFileSync(path.join(JOURNAL_DIR, 'book.json'), 'utf-8'));
  if (!book.glossarySourceFile) throw new Error('book.json: missing glossarySourceFile');

  const docxPath = path.join(JOURNAL_DIR, book.glossarySourceFile);
  if (!fs.existsSync(docxPath)) throw new Error(`Glossary docx not found: ${docxPath}`);

  const buf = fs.readFileSync(docxPath);
  const { value: html } = await mammoth.convertToHtml({ buffer: buf });

  // Find all h1 section positions
  const h1Re = /<h1(?:[^>]*)>([\s\S]*?)<\/h1>/g;
  const h1s = [];
  let m;
  while ((m = h1Re.exec(html)) !== null) {
    h1s.push({
      heading: innerText(m[1]),
      end: m.index + m[0].length,
    });
  }

  let authorNote = [];
  const pronunciationGuide = [];
  const sections = [];

  for (let i = 0; i < h1s.length; i++) {
    const { heading, end } = h1s[i];
    const nextStart = i < h1s.length - 1 ? h1s[i + 1].end - h1s[i + 1].heading.length - 9 : html.length;
    // Recalculate nextStart as the position of the next <h1>
    const nextH1Start = i < h1s.length - 1
      ? html.lastIndexOf('<h1', h1s[i + 1].end - 1)
      : html.length;
    const content = html.slice(end, nextH1Start);
    const lower = heading.toLowerCase();

    if (lower === 'contents' || lower.startsWith('content')) continue;

    if (lower.includes('author') && lower.includes('note')) {
      authorNote = tokenize(content)
        .filter(t => t.type === 'p')
        .map(t => innerText(t.inner))
        .filter(Boolean);
      continue;
    }

    if (lower.includes('pronunciation guide')) {
      const tokens = tokenize(content);
      let currentSub = null;
      for (const tok of tokens) {
        if (tok.type === 'h2') {
          currentSub = { title: innerText(tok.inner), body: [] };
          pronunciationGuide.push(currentSub);
        } else if (tok.type === 'p') {
          const text = innerText(tok.inner);
          if (text) {
            if (!currentSub) {
              currentSub = { title: '', body: [] };
              pronunciationGuide.push(currentSub);
            }
            currentSub.body.push(text);
          }
        }
      }
      continue;
    }

    const isGlossarySection = GLOSSARY_SECTION_IDS.some(({ match }) => lower.includes(match));
    if (!isGlossarySection) continue;

    const tokens = tokenize(content).filter(t => t.type === 'p');
    let entries = parseGlossarySection(tokens);
    entries = entries.filter(e => !REMOVE_TERMS.has(e.term.toLowerCase()));

    sections.push({ id: sectionIdForHeading(heading), title: heading, entries });
  }

  // Validate
  const warnings = [];
  let manaFound = false;
  let tokoroaFound = false;
  const usedSlugs = new Map();

  for (const section of sections) {
    if (!section.entries.length) warnings.push(`Section "${section.id}" has no entries`);
    for (const e of section.entries) {
      if (!e.pronunciation) warnings.push(`No pronunciation: "${e.term}" in ${section.id}`);
      if (!e.meaning) warnings.push(`No meaning: "${e.term}" in ${section.id}`);
      if (e.term.toLowerCase() === 'mana') manaFound = true;
      if (e.term.toLowerCase() === 'tokoroa') tokoroaFound = true;
      const key = `${section.id}::${e.slug}`;
      if (usedSlugs.has(key)) warnings.push(`Duplicate slug "${e.slug}" in ${section.id}`);
      usedSlugs.set(key, true);
    }
  }
  if (!manaFound) warnings.push('mana entry not found');
  if (tokoroaFound) warnings.push('Tokoroa still present — should be removed');
  if (sections.length === 0) warnings.push('No glossary sections parsed');

  for (const w of warnings) console.warn(`  WARN: ${w}`);

  const totalEntries = sections.reduce((n, s) => n + s.entries.length, 0);
  const output = {
    title: book.glossaryTitle ?? `${book.title}: Glossary`,
    description: book.glossaryDescription ?? '',
    authorNote,
    pronunciationGuide,
    sections,
    _meta: {
      generated: new Date().toISOString(),
      sourceFile: book.glossarySourceFile,
      sections: sections.length,
      totalEntries,
    },
  };

  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2) + '\n', 'utf-8');

  console.log(`Glossary built: ${sections.length} sections, ${totalEntries} entries`);
  if (warnings.length) console.log(`  ${warnings.length} warning(s) — see above`);
}

build().catch(e => {
  console.error('Build failed:', e.message);
  process.exit(1);
});
