/**
 * One-time script: creates public/journal/epigraph.docx from the published epigraph text.
 *
 * After initial creation, edit epigraph.docx in Word and run `npm run journal:sync`
 * to regenerate epigraph.html from the updated DOCX.
 *
 * Paragraph structure:
 *   - Each blockquote is a sequence of content paragraphs followed by an attribution
 *     line starting with "—". The sync script uses this convention to wrap the output
 *     in <blockquote> and <footer> elements.
 *   - A blank paragraph between blockquotes is optional and will be ignored by the sync.
 */

import fs from "node:fs";
import path from "node:path";
import { Document, Packer, Paragraph, TextRun } from "docx";

const OUTPUT_PATH = path.join(process.cwd(), "public", "journal", "epigraph.docx");

// Content in document order: content paragraphs, then attribution line (starting with —),
// then blank separator, then next blockquote. The attribution pattern drives HTML grouping.
const PARAGRAPHS = [
  // Blockquote 1 — John 1:1
  "“In the beginning was the Word, and the Word was with God, and the Word was God.”",
  "— John 1:1",

  // Visual separator between blockquotes
  "",

  // Blockquote 2 — Faturaki
  "“Before the beginning was Io, the Parentless One, hidden above all heavens and beneath all names. And with Io was the first thought, and the thought was not yet spoken.",
  "From that thought came Te Kore, the emptiness without form; and Te Kore deepened into Te Pō, the long Night in which all things waited unborn.",
  "In the dark, Ranginui and Papatūānuku were bound together, sky and earth in one embrace. Between them their children stirred without room, without light, and without knowing. Long did the children endure the press of their parents until Tāne set his feet against the earth and his shoulders to the sky and forced them apart.",
  "Then light entered the world.",
  "Ranginui was lifted into the heavens, and Papatūānuku remained below, and grief passed between them as mist, rain, and longing.",
  "Then the children took their dominions. Tāne entered the forests and all growing things. Takaroa received the seas and all that moved within them. Tāwhirimātea gathered the winds and storms. Tūmatauenga took up conflict and hunger. Rā carried fire across the face of day. And Wātea opened the spaces between darkness and light.",
  "Then from the sacred red earth of Papatūānuku, Tāne shaped the first woman; and by the breath appointed from Io, life entered her nostrils.",
  "Thus the people came forth from darkness, from earth, from breath, and from the first wound between heaven and land.”",
  "— Faturaki, spoken on the 2nd day of the voyage to retrieve Howaru",
];

async function main() {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: PARAGRAPHS.map(
          (text) =>
            new Paragraph({
              children: [new TextRun({ text })],
            })
        ),
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(OUTPUT_PATH, buffer);
  console.log(`Created ${path.relative(process.cwd(), OUTPUT_PATH)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
